---
title: Basic algorithms
date: "2025-10-04"
description: "Basic algorithmic approaches"
mainPage: true
---

## Advanced Algorithmic Strategies for Technical Interviews

Successfully passing technical interviews often requires mastering specific algorithmic patterns that ensure optimal time complexity. A strong foundation in these core strategies is essential for turning complex problems into efficient code.

### 1. The Two Pointers Algorithm

This technique is a linear scan that optimizes algorithms involving sequences (arrays, strings, linked lists) by tracking two positions simultaneously. It is most often used to avoid nested loops and optimize time complexity to **$O(n)$**.

| Approach                         | Mechanism and Efficiency                                                                                                                          | Key Insight                                                                                                                                        |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Opposite Direction**           | Pointers start at opposite ends and move toward each other. Since each pointer makes only one pass, the total time complexity remains **$O(n)$**. | Exploits sorted data (Two Sum II) or checks symmetrical properties (Palindromes).                                                                  |
| **Different Speeds (Fast/Slow)** | The slow pointer moves 1x speed, while the fast pointer moves 2x speed. The distance between them increases linearly.                             | **Cycle Detection (Floyd's Algorithm):** If a cycle exists, the fast pointer is guaranteed to eventually _catch_ the slow pointer within the loop. |

### 2. Hash Tables and Sets

Hash tables (dictionaries in Python) are the primary tool for optimizing time complexity by sacrificing space. They are used when search speed is critical in unsorted data.

- **Mechanism (The $O(1)$ Secret):** Hash tables map a key to a specific memory location (index) using a _hash function_. This allows retrieval of a value (or a check for existence) in **$O(1)$** (constant time) on average, regardless of the data size.
- **Space-Time Trade-off:** By allocating $O(n)$ extra space (to store the table), you reduce the time complexity from $O(n^2)$ to **$O(n)$**.
- **Key Insight:** The solution for many problems (like Two Sum) is to look for the **complement** (`target - current\_value`). A hash map allows you to check for this complement instantly.

### 3. Tree Traversal (DFS vs. BFS)

Two main approaches are used for traversing tree structures, each optimizing for a different kind of search:

| Method                         | Data Structure             | Principle                                                                                                                                           | When to Use                                                                                                        |
| :----------------------------- | :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **DFS (Depth-First Search)**   | Recursion (Implicit Stack) | Explores one branch completely ("goes deep") before backtracking. The depth is $1 + \max(\text{depth}_{\text{left}}, \text{depth}_{\text{right}})$. | Finding the maximum depth, checking symmetry, preorder/inorder/postorder traversal.                                |
| **BFS (Breadth-First Search)** | Queue (FIFO)               | Explores all nodes level by level, moving outward from the root.                                                                                    | Level Order Traversal, finding the **shortest path** (as BFS naturally explores nodes closer to the source first). |

### 4. The Stack for Order Enforcement

The Stack is an Abstract Data Type defined by the **LIFO (Last-In, First-Out)** principle, making it perfect for problems requiring nested symmetry or correct ordering.

- **Core Application (Valid Parentheses):** The stack enforces that the most recently opened element must be the first one closed.
- **Strategy:**
  1. **Push:** On an opening element (`(`, `{`, `[`), push the corresponding opening character onto the stack.
  2. **Pop and Match:** On a closing element, immediately pop the stack and check that the popped opening character exactly matches the current closing character (often done using a hash map for fast pair lookup).
- **Failure Conditions:** A string is invalid if: (1) The elements do not match, (2) the stack is empty when a closing element is found, or (3) the stack is **not** empty after processing the entire string (meaning an opening element was never closed).

### 5. Linked List Pointer Manipulation

While linked list traversal often uses the Two Pointers pattern, specific problems require mastering the **three-pointer technique** to modify the list structure in-place.

- **Reversing a Linked List:** The solution requires meticulous tracking of three pointers in every iteration:
  1. **Preserve:** Save the link to the next node (`next\_node = current.next`).
  2. **Reverse:** Reassign the current node's pointer (`current.next = previous`).
  3. **Advance:** Shift the `previous` and `current` pointers forward.
- This approach achieves an optimal **$O(n)$** time complexity with **$O(1)$** space complexity.
