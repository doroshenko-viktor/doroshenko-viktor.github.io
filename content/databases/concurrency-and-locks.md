---
title: SQL Databases Concurrency And Locks
date: "2023-08-12"
description: "Dealing with concurrency in SQL databases"
---

## Some Issues Related To Concurrency

There are problems that can happen when multiple operations try to read and write data at the same time. Knowing these helps fix and design better systems.

### Non-repeatable reads

Imagine you read a piece of data, and when you check it again moments later, it's different. That's a non-repeatable read. This can happen when others are allowed to change data while you're still working on it.

### Dirty reads

This is when you read data that someone else is still changing. They haven't finished (or "committed") their change, but you see their work in progress. It's like reading a note someone's still writing.

### Phantom reads

Imagine you count something (like customers). You count again a bit later, and the number changes because someone added or removed an item, but without telling the system to "protect" that range of data. This sudden appearance or disappearance is called a "phantom" read.

## Range Locks

Think of locks as ways to protect data. There are different types of locks:

**Serialized Access:** Only one task can use the data at a time. It's safe but slow.
**Table Lock:** Protects the whole table. Better speed, but can still be slow if many tasks want to write data.
**Row Lock:** Only locks a specific row of data. Faster, but tasks might wait if they need the same row.
**Range Locks:** These lock a group or "range" of data. They ensure no one adds or changes data in that range while you're working on it.

## Isolation Levels

SQL has 4 standard isolation levels to decide how data is accessed and protected during operations. 
It's crucial to set a global standard for these levels to avoid unexpected behaviors.

**REPEATABLE READ:**

Think of it as taking a snapshot when you first read the data. Until you finish your task, that snapshot remains unchanged, even if others make changes.
It stops problems like seeing different data on multiple reads (non-repeatable reads) or accessing data that's still being edited by others (dirty reads). 
However, to ensure data is always fresh, it's best to keep tasks brief.

**SERIALIZABLE:**

It's like waiting in line. Only one task can work at a time, ensuring total consistency.
There's no chance of reading errors because each task finishes completely before the next one starts. But, tasks can sometimes fail 
when too many try to run at once, so a system to try again (retry mechanism) is helpful.

**READ COMMITTED:**

Unlike REPEATABLE READ, every time you read data, you get a new, updated view. This means you can sometimes read data that appears or disappears 
suddenly (phantom reads) if you read multiple times in one task.

**READ UNCOMMITTED:**

This is the wild west of isolation levels! You can access data even if someone else is still working on it. This can lead to reading half-finished 
(dirty) data. Not ideal for systems needing accuracy.

