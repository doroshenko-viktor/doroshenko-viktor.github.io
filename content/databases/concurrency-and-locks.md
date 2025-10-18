---
title: SQL Databases Concurrency And Locks
date: "2025-10-17"
description: "Dealing with concurrency in SQL databases"
---

## Introduction

Transactions are fundamental building blocks of database systems that ensure data integrity and consistency. In PostgreSQL, understanding how transactions work and how different isolation levels affect concurrent operations is crucial for building reliable applications.

This guide explores PostgreSQL's transaction model, isolation levels, concurrency control mechanisms, and best practices for handling transactions in production environments.

## What is a Transaction?

A transaction is a sequence of one or more SQL operations that are treated as a single unit of work. Transactions follow the ACID properties:

- **Atomicity**: All operations in a transaction succeed or all fail together
- **Consistency**: Transactions move the database from one valid state to another
- **Isolation**: Concurrent transactions don't interfere with each other
- **Durability**: Once committed, changes persist even after system failures

## Basic Transaction Commands

### Starting and Ending Transactions

```sql
-- Begin a transaction
BEGIN;

-- Perform operations
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Commit the transaction
COMMIT;
```

### Rolling Back Transactions

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;

-- Something went wrong, undo everything
ROLLBACK;
```

### Savepoints

Savepoints allow you to partially rollback a transaction:

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;

SAVEPOINT my_savepoint;

UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Rollback only to the savepoint
ROLLBACK TO SAVEPOINT my_savepoint;

-- The first UPDATE is still active
COMMIT;
```

## Isolation Levels

PostgreSQL implements four standard SQL isolation levels, each providing different guarantees about what phenomena can occur when transactions run concurrently.

### Read Phenomena

Before discussing isolation levels, it's important to understand the read phenomena they prevent:

**Dirty Read**: Reading uncommitted changes from another transaction

**Non-Repeatable Read**: Reading the same row twice in a transaction and getting different values because another transaction modified and committed the row

**Phantom Read**: Re-executing a query and finding rows that weren't there before because another transaction inserted and committed new rows

**Serialization Anomaly**: The result of successfully committing a group of transactions is inconsistent with all possible orderings of running those transactions one at a time

### PostgreSQL Isolation Levels

| Isolation Level  | Dirty Read     | Non-Repeatable Read | Phantom Read     | Serialization Anomaly |
| ---------------- | -------------- | ------------------- | ---------------- | --------------------- |
| Read Uncommitted | Not possible\* | Possible            | Possible         | Possible              |
| Read Committed   | Not possible   | Possible            | Possible         | Possible              |
| Repeatable Read  | Not possible   | Not possible        | Not possible\*\* | Possible              |
| Serializable     | Not possible   | Not possible        | Not possible     | Not possible          |

\*PostgreSQL treats Read Uncommitted as Read Committed  
\*\*PostgreSQL prevents phantom reads at Repeatable Read level

### Read Committed (Default)

This is PostgreSQL's default isolation level. Each query within a transaction sees a snapshot of the database as of the start of that query.

```sql
-- Session 1
BEGIN;
SELECT balance FROM accounts WHERE id = 1;
-- Returns 1000
```

```sql
-- Session 2
BEGIN;
UPDATE accounts SET balance = 1500 WHERE id = 1;
COMMIT;
```

```sql
-- Session 1 (continuing)
SELECT balance FROM accounts WHERE id = 1;
-- Returns 1500 (sees the committed change)
COMMIT;
```

**Use cases**: Most applications work well with Read Committed. It provides good performance while preventing dirty reads.

### Repeatable Read

Each query in a transaction sees a snapshot of the database as of the start of the first query in that transaction.

```sql
-- Session 1
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT balance FROM accounts WHERE id = 1;
-- Returns 1000
```

```sql
-- Session 2
BEGIN;
UPDATE accounts SET balance = 1500 WHERE id = 1;
COMMIT;
```

```sql
-- Session 1 (continuing)
SELECT balance FROM accounts WHERE id = 1;
-- Still returns 1000 (doesn't see the committed change)
COMMIT;
```

**Use cases**: Long-running reports, data exports, or any operation that needs a consistent view of data throughout the transaction.

### Serializable

The strictest isolation level. Transactions execute as if they ran one at a time, with no concurrency. PostgreSQL uses Serializable Snapshot Isolation (SSI) to implement this efficiently.

```sql
-- Session 1
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT SUM(balance) FROM accounts WHERE type = 'checking';
-- Returns 10000
```

```sql
-- Session 2
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
INSERT INTO accounts (type, balance) VALUES ('checking', 500);
COMMIT;
```

```sql
-- Session 1 (continuing)
INSERT INTO audit_log (total_checking)
VALUES ((SELECT SUM(balance) FROM accounts WHERE type = 'checking'));
-- ERROR: could not serialize access due to read/write dependencies
```

**Use cases**: Financial systems, inventory management, or any scenario where serialization anomalies would cause data corruption.

### Setting Isolation Levels

```sql
-- For a single transaction
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- For the current session
SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Using SET TRANSACTION
BEGIN;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

## Multi-Version Concurrency Control (MVCC)

PostgreSQL uses MVCC to implement isolation levels efficiently. Instead of locking rows, it maintains multiple versions of data:

- When a row is updated, PostgreSQL creates a new version rather than overwriting the old one
- Each transaction sees the appropriate version based on its isolation level and start time
- Old versions are cleaned up by the VACUUM process

### Benefits of MVCC

- Readers don't block writers
- Writers don't block readers
- High concurrency with minimal locking
- No dirty reads

### Transaction IDs

Every transaction receives a unique transaction ID (XID). Each row version is tagged with XIDs indicating when it was created and deleted:

```sql
-- View transaction IDs (requires superuser or appropriate permissions)
SELECT txid_current();

-- See row versions (for debugging)
SELECT xmin, xmax, * FROM accounts;
```

## Locking in PostgreSQL

While MVCC reduces the need for locks, PostgreSQL still uses locks for certain operations.

### Lock Modes

**Table-Level Locks**:

- ACCESS SHARE: Acquired by SELECT
- ROW SHARE: Acquired by SELECT FOR UPDATE
- ROW EXCLUSIVE: Acquired by UPDATE, DELETE, INSERT
- SHARE UPDATE EXCLUSIVE: Acquired by VACUUM, CREATE INDEX CONCURRENTLY
- SHARE: Acquired by CREATE INDEX
- SHARE ROW EXCLUSIVE: Acquired by CREATE TRIGGER
- EXCLUSIVE: Blocks all concurrent access except ACCESS SHARE
- ACCESS EXCLUSIVE: Acquired by DROP TABLE, TRUNCATE, REINDEX, VACUUM FULL

**Row-Level Locks**:

```sql
-- Lock rows for update (blocks other locks)
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;

-- Lock rows but allow other shared locks
SELECT * FROM accounts WHERE id = 1 FOR SHARE;

-- Skip locked rows instead of waiting
SELECT * FROM queue WHERE status = 'pending'
FOR UPDATE SKIP LOCKED LIMIT 1;

-- Don't wait for locks, error immediately
SELECT * FROM accounts WHERE id = 1 FOR UPDATE NOWAIT;
```

### Advisory Locks

PostgreSQL provides advisory locks for application-level coordination:

```sql
-- Session-level advisory lock
SELECT pg_advisory_lock(12345);
SELECT pg_advisory_unlock(12345);

-- Transaction-level advisory lock
SELECT pg_advisory_xact_lock(12345);
-- Automatically released at transaction end

-- Try lock without blocking
SELECT pg_try_advisory_lock(12345);
```

## Handling Deadlocks

A deadlock occurs when transactions wait for each other in a cycle. PostgreSQL automatically detects and resolves deadlocks by aborting one transaction.

### Example Deadlock

```sql
-- Session 1
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Waiting to update id = 2
```

```sql
-- Session 2
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 2;
-- Waiting to update id = 1
UPDATE accounts SET balance = balance + 100 WHERE id = 1;
-- ERROR: deadlock detected
```

### Preventing Deadlocks

Always access resources in the same order across all transactions:

```sql
-- Good: consistent ordering
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = LEAST(1, 2);
UPDATE accounts SET balance = balance + 100 WHERE id = GREATEST(1, 2);
COMMIT;
```

Use timeouts:

```sql
-- Set statement timeout
SET statement_timeout = '5s';

-- Set lock timeout
SET lock_timeout = '2s';
```

## Serialization Failures

At Repeatable Read and Serializable levels, transactions may fail with serialization errors:

```
ERROR: could not serialize access due to concurrent update
ERROR: could not serialize access due to read/write dependencies among transactions
```

### Handling Serialization Errors

Always implement retry logic:

```python
def transfer_money(from_id, to_id, amount):
    max_retries = 3
    for attempt in range(max_retries):
        try:
            with connection.cursor() as cur:
                cur.execute("BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE")
                cur.execute(
                    "UPDATE accounts SET balance = balance - %s WHERE id = %s",
                    (amount, from_id)
                )
                cur.execute(
                    "UPDATE accounts SET balance = balance + %s WHERE id = %s",
                    (amount, to_id)
                )
                cur.execute("COMMIT")
                return True
        except SerializationFailure:
            if attempt < max_retries - 1:
                time.sleep(0.1 * (2 ** attempt))  # Exponential backoff
                continue
            raise
```

## Transaction Best Practices

### Keep Transactions Short

Long-running transactions hold locks, prevent VACUUM from cleaning old row versions, and increase the chance of conflicts:

```sql
-- Bad: transaction open while waiting for user input
BEGIN;
SELECT * FROM products WHERE id = 123;
-- Application waits for user to confirm
UPDATE products SET quantity = quantity - 1 WHERE id = 123;
COMMIT;

-- Good: transaction only during database operations
SELECT * FROM products WHERE id = 123;
-- Application waits for user to confirm
BEGIN;
UPDATE products SET quantity = quantity - 1 WHERE id = 123;
COMMIT;
```

### Use Appropriate Isolation Levels

Don't use stricter isolation than necessary:

- Use Read Committed for most operations
- Use Repeatable Read for reports and data exports
- Use Serializable only when business logic requires it

### Handle Errors Properly

Always handle transaction errors:

```sql
BEGIN;
SAVEPOINT before_risky_operation;

-- Risky operation
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;

-- Check constraint violation
DO $$
BEGIN
    IF (SELECT balance FROM accounts WHERE id = 1) < 0 THEN
        ROLLBACK TO SAVEPOINT before_risky_operation;
        RAISE EXCEPTION 'Insufficient funds';
    END IF;
END $$;

COMMIT;
```

### Use Connection Pooling Wisely

Connection pools can complicate transaction management:

```python
# Ensure transactions are completed before returning to pool
try:
    connection = pool.get_connection()
    # Do work
    connection.commit()
except Exception:
    connection.rollback()
    raise
finally:
    pool.return_connection(connection)
```

### Monitor Transaction Age

Long-running transactions cause problems. Monitor them:

```sql
SELECT
    pid,
    now() - xact_start AS duration,
    state,
    query
FROM pg_stat_activity
WHERE xact_start IS NOT NULL
ORDER BY xact_start;
```

### Avoid Explicit Locking When Possible

Let MVCC do its job. Only use explicit locks when necessary:

```sql
-- Usually unnecessary
BEGIN;
LOCK TABLE accounts IN EXCLUSIVE MODE;
-- operations
COMMIT;

-- Better: let MVCC handle it
BEGIN;
-- operations
COMMIT;
```

## Common Patterns

### Optimistic Locking with Version Columns

```sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    version INTEGER DEFAULT 1
);

-- Update with version check
UPDATE documents
SET content = 'new content', version = version + 1
WHERE id = 123 AND version = 5;

-- Check if update succeeded
GET DIAGNOSTICS rows_updated = ROW_COUNT;
IF rows_updated = 0 THEN
    RAISE EXCEPTION 'Document was modified by another user';
END IF;
```

### Queue Processing with SKIP LOCKED

```sql
-- Multiple workers can process queue concurrently
BEGIN;

SELECT id FROM job_queue
WHERE status = 'pending'
ORDER BY created_at
FOR UPDATE SKIP LOCKED
LIMIT 1;

UPDATE job_queue
SET status = 'processing', started_at = now()
WHERE id = <selected_id>;

COMMIT;

-- Process the job

BEGIN;
UPDATE job_queue
SET status = 'completed', completed_at = now()
WHERE id = <selected_id>;
COMMIT;
```

### Conditional Inserts

```sql
-- Insert only if not exists
INSERT INTO users (email, name)
VALUES ('user@example.com', 'John Doe')
ON CONFLICT (email) DO NOTHING;

-- Insert or update
INSERT INTO user_stats (user_id, login_count)
VALUES (123, 1)
ON CONFLICT (user_id)
DO UPDATE SET login_count = user_stats.login_count + 1;
```

## Monitoring and Troubleshooting

### Check Current Transactions

```sql
SELECT
    pid,
    usename,
    application_name,
    state,
    query_start,
    state_change,
    query
FROM pg_stat_activity
WHERE state != 'idle';
```

### Find Blocking Queries

```sql
SELECT
    blocked_locks.pid AS blocked_pid,
    blocked_activity.usename AS blocked_user,
    blocking_locks.pid AS blocking_pid,
    blocking_activity.usename AS blocking_user,
    blocked_activity.query AS blocked_statement,
    blocking_activity.query AS blocking_statement
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks blocking_locks
    ON blocking_locks.locktype = blocked_locks.locktype
    AND blocking_locks.database IS NOT DISTINCT FROM blocked_locks.database
    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
    AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
    AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
    AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
    AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
    AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
    AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid
    AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid
    AND blocking_locks.pid != blocked_locks.pid
JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.granted;
```

### View Lock Information

```sql
SELECT
    locktype,
    relation::regclass,
    mode,
    granted,
    pid
FROM pg_locks
WHERE NOT granted;
```

### Enable Query Logging

```sql
-- Log long-running queries
ALTER SYSTEM SET log_min_duration_statement = '1000'; -- 1 second

-- Log lock waits
ALTER SYSTEM SET log_lock_waits = on;
ALTER SYSTEM SET deadlock_timeout = '1s';

-- Apply changes
SELECT pg_reload_conf();
```

## Performance Considerations

### Transaction ID Wraparound

PostgreSQL uses 32-bit transaction IDs that can wrap around. Regular VACUUM prevents this:

```sql
-- Check age of oldest transaction
SELECT datname, age(datfrozenxid)
FROM pg_database
ORDER BY age(datfrozenxid) DESC;

-- Warning occurs at 200 million, emergency at 2 billion
```

### Bloat from Long Transactions

Long transactions prevent VACUUM from cleaning up old row versions:

```sql
-- Check table bloat
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
    n_dead_tup
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
```

### Index-Only Scans

Ensure visibility map is updated for better performance:

```sql
VACUUM ANALYZE your_table;
```

## Conclusion

Understanding transactions and isolation levels in PostgreSQL is essential for building reliable, concurrent applications. Key takeaways:

- Use the default Read Committed isolation level for most operations
- Keep transactions short to minimize locking and bloat
- Implement retry logic for serialization failures at higher isolation levels
- Leverage MVCC and avoid unnecessary explicit locking
- Monitor long-running transactions and blocking queries
- Use appropriate patterns like SKIP LOCKED for queue processing

PostgreSQL's sophisticated transaction system provides excellent tools for maintaining data consistency while achieving high concurrency. By understanding these mechanisms and following best practices, you can build robust applications that handle concurrent access gracefully.
