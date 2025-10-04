---
title: Breadth-First Search
date: "2025-10-03"
description: "Understanding Breadth-First Search (BFS)"
mainPage: true
---

## Breadth-First Search (BFS) on Trees

Breadth-First Search (BFS) is a fundamental algorithm used to traverse or search through tree and graph data structures. In trees, `BFS` explores nodes level by level, starting from the root and moving down to each subsequent level. This makes it ideal for scenarios where we want to process nodes in order of their depth.

---

## Why BFS is Needed

BFS is particularly useful in situations such as:

- **Finding the shortest path** in an unweighted tree or graph.
- **Level-order traversal** of a tree.
- **Checking connectivity** or presence of a node.
- **Solving problems** where we need information from nodes closest to the root first.

Unlike `Depth-First Search (DFS)`, which goes deep into one branch before exploring others, `BFS` guarantees that we process all nodes at depth`d`before moving to depth`d+1`.

---

## How BFS Works

1. **Start at the root node.**
2. **Initialize a queue** and enqueue the root node.
3. **While the queue is not empty**:
   - Dequeue the front node.
   - Process the node (e.g., print its value).
   - Enqueue all of its children.
4. **Repeat** until all nodes are processed.

The key idea is using a **queue** to maintain the order of nodes to be processed.

---

## Python Implementation

Here’s a simple implementation of BFS for a binary tree:

```python
from collections import deque

class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def bfs(root):
    if not root:
        return

    queue = deque([root])

    while queue:
        node = queue.popleft()
        print(node.val, end=" ")

        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)

# Example usage
if __name__ == "__main__":
    # Construct the tree
    #       1
    #      / \
    #     2   3
    #    / \   \
    #   4   5   6
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.right = TreeNode(6)

    print("BFS traversal of the tree:")
    bfs(root)
```

## BFS for Level-Order Traversal

Sometimes we want `BFS` not just for traversal but to separate nodes by level. Here’s an example:

```python
def bfs_level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)

    return result

# Example usage
levels = bfs_level_order(root)
print("Level-order traversal:")
print(levels)

```

## Summary

`BFS` explores nodes level by level using a queue.

It's ideal for shortest path problems, level-order traversal, and proximity-based searches.

Python’s `collections.deque` makes implementing the `BFS` queue efficient.

`BFS` guarantees that nodes are visited in order of their distance from the root, unlike `DFS` which can go deep into one branch first.
