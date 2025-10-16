---
title: Basic algorithms
date: "2025-10-04"
description: "Basic algorithmic approaches"
mainPage: true
---

# Complete LeetCode Patterns Guide

A comprehensive guide to all major algorithm patterns for technical interview preparation.

---

## 1. Two Pointers

### When to Use

- Sorted arrays
- Finding pairs/triplets
- Removing duplicates in-place
- Palindrome checking
- Linked list cycle detection
- Finding middle element

### Sub-Patterns

#### A) Opposite Direction

Start from both ends, move toward center.

**Example: Two Sum II (Sorted Array)**

```python
def twoSum(nums, target):
    left, right = 0, len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]

        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # need larger sum
        else:
            right -= 1  # need smaller sum

    return []
```

**Example: Valid Palindrome**

```python
def isPalindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True
```

**Example: Container With Most Water**

```python
def maxArea(height):
    left, right = 0, len(height) - 1
    max_water = 0

    while left < right:
        width = right - left
        current_height = min(height[left], height[right])
        max_water = max(max_water, width * current_height)

        # Move pointer with smaller height
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water
```

#### B) Fast and Slow (Floyd's Algorithm)

Both pointers move in same direction at different speeds.

**Example: Linked List Cycle Detection**

```python
def hasCycle(head):
    if not head:
        return False

    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False
```

**Example: Find Middle of Linked List**

```python
def middleNode(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow
```

#### C) Same Direction with Gap

Maintain fixed distance between pointers.

**Example: Remove Nth Node From End**

```python
def removeNthFromEnd(head, n):
    dummy = ListNode(0)
    dummy.next = head
    fast = slow = dummy

    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next

    # Move both until fast reaches end
    while fast:
        fast = fast.next
        slow = slow.next

    # Remove node
    slow.next = slow.next.next

    return dummy.next
```

#### D) Same Direction (Write Pointer)

One pointer scans, another writes.

**Example: Remove Duplicates from Sorted Array**

```python
def removeDuplicates(nums):
    if not nums:
        return 0

    write_pos = 1

    for i in range(1, len(nums)):
        if nums[i] != nums[i-1]:
            nums[write_pos] = nums[i]
            write_pos += 1

    return write_pos
```

**Example: Move Zeroes**

```python
def moveZeroes(nums):
    write_pos = 0

    # Move all non-zeros to front
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[write_pos] = nums[i]
            write_pos += 1

    # Fill rest with zeros
    for i in range(write_pos, len(nums)):
        nums[i] = 0
```

### Key Insights

- **Opposite direction**: Works on sorted data, makes directional decisions
- **Fast/slow**: Detects cycles, finds middle elements
- **Gap**: Useful for "Nth from end" problems
- **Write pointer**: In-place array modifications

---

## 2. Hash Tables and Sets

### When to Use

- "Does X exist?"
- "Have I seen this before?"
- Counting frequencies
- Finding duplicates
- Complement searches
- Grouping/categorizing data

### Mental Model

Trade space for speed - remember past elements for O(1) lookups.

**Example: Two Sum (Unsorted)**

```python
def twoSum(nums, target):
    seen = {}  # value -> index

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:
            return [seen[complement], i]

        seen[num] = i

    return []
```

**Example: First Unique Character**

```python
def firstUniqChar(s):
    count = {}

    # Count frequencies
    for char in s:
        count[char] = count.get(char, 0) + 1

    # Find first with count 1
    for i, char in enumerate(s):
        if count[char] == 1:
            return i

    return -1
```

**Example: Group Anagrams**

```python
from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)

    for s in strs:
        # Sort as key (or use char count tuple)
        key = ''.join(sorted(s))
        groups[key].append(s)

    return list(groups.values())
```

**Example: Longest Consecutive Sequence**

```python
def longestConsecutive(nums):
    num_set = set(nums)
    max_length = 0

    for num in num_set:
        # Only start counting if it's the start of a sequence
        if num - 1 not in num_set:
            current = num
            length = 1

            while current + 1 in num_set:
                current += 1
                length += 1

            max_length = max(max_length, length)

    return max_length
```

### Key Insights

- Use hash map when you need to **remember and lookup**
- Use hash set for **existence checks**
- Count frequencies for **duplicate/unique problems**
- Time: O(1) average, Space: O(n)

---

## 3. Stack

### When to Use

- Parentheses/bracket matching
- "Next greater/smaller element"
- Evaluating expressions
- Undo operations
- Processing in reverse order
- Nested structures

### Mental Model

LIFO (Last In, First Out) - like a pile of plates.

**Example: Valid Parentheses**

```python
def isValid(s):
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}

    for char in s:
        if char in pairs:  # opening bracket
            stack.append(char)
        else:  # closing bracket
            if not stack or pairs[stack.pop()] != char:
                return False

    return len(stack) == 0
```

**Example: Evaluate Reverse Polish Notation**

```python
def evalRPN(tokens):
    stack = []

    for token in tokens:
        if token in ['+', '-', '*', '/']:
            b = stack.pop()
            a = stack.pop()

            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            else:
                stack.append(int(a / b))
        else:
            stack.append(int(token))

    return stack[0]
```

**Example: Min Stack**

```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self):
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]
```

**Example: Daily Temperatures**

```python
def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # indices

    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            prev_idx = stack.pop()
            result[prev_idx] = i - prev_idx

        stack.append(i)

    return result
```

**Example: Simplify Path**

```python
def simplifyPath(path):
    stack = []
    parts = path.split('/')

    for part in parts:
        if part == '..' and stack:
            stack.pop()
        elif part and part != '.' and part != '..':
            stack.append(part)

    return '/' + '/'.join(stack)
```

### Key Insights

- Opening elements → push
- Closing elements → pop and verify
- "Next greater" problems → monotonic stack pattern
- Nested structures → natural stack use case

---

## 4. Tree Traversal (DFS & BFS)

### When to Use

- Any tree/hierarchical structure
- Finding paths
- Level-order problems
- Validation problems
- Calculating depths/heights

### A) DFS (Depth-First Search)

Go deep first, explore one path completely before backtracking.

#### Recursive DFS (Most Common)

**Example: Maximum Depth**

```python
def maxDepth(root):
    if not root:
        return 0

    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)

    return 1 + max(left_depth, right_depth)
```

**Example: Validate Binary Search Tree**

```python
def isValidBST(root):
    def validate(node, min_val, max_val):
        if not node:
            return True

        if not (min_val < node.val < max_val):
            return False

        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))
```

**Example: Path Sum**

```python
def hasPathSum(root, targetSum):
    if not root:
        return False

    # Leaf node
    if not root.left and not root.right:
        return root.val == targetSum

    remaining = targetSum - root.val
    return (hasPathSum(root.left, remaining) or
            hasPathSum(root.right, remaining))
```

**Example: Lowest Common Ancestor**

```python
def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root

    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)

    if left and right:
        return root

    return left if left else right
```

**Example: Diameter of Binary Tree**

```python
def diameterOfBinaryTree(root):
    max_diameter = 0

    def height(node):
        nonlocal max_diameter
        if not node:
            return 0

        left_height = height(node.left)
        right_height = height(node.right)

        # Update diameter
        max_diameter = max(max_diameter, left_height + right_height)

        return 1 + max(left_height, right_height)

    height(root)
    return max_diameter
```

#### Iterative DFS (Using Stack)

**Example: Inorder Traversal**

```python
def inorderTraversal(root):
    result = []
    stack = []
    current = root

    while current or stack:
        # Go to leftmost node
        while current:
            stack.append(current)
            current = current.left

        # Process node
        current = stack.pop()
        result.append(current.val)

        # Go right
        current = current.right

    return result
```

### B) BFS (Breadth-First Search)

Process level by level using a queue.

**Example: Level Order Traversal**

```python
from collections import deque

def levelOrder(root):
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
```

**Example: Right Side View**

```python
def rightSideView(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)

        for i in range(level_size):
            node = queue.popleft()

            # Last node in level
            if i == level_size - 1:
                result.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result
```

**Example: Minimum Depth**

```python
def minDepth(root):
    if not root:
        return 0

    queue = deque([(root, 1)])

    while queue:
        node, depth = queue.popleft()

        # First leaf found = minimum depth
        if not node.left and not node.right:
            return depth

        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))

    return 0
```

### Key Insights

- **DFS**: Use for paths, validation, heights (recursive is cleaner)
- **BFS**: Use for shortest paths, level-order, minimum depth
- **DFS Time/Space**: O(n) time, O(h) space where h = height
- **BFS Time/Space**: O(n) time, O(w) space where w = max width

---

## 5. Linked List Manipulation

### When to Use

- Reversing lists
- Reordering nodes
- Merging lists
- Detecting cycles
- Finding intersections

### Mental Model

Keep track of multiple pointers to avoid losing references.

**Example: Reverse Linked List**

```python
def reverseList(head):
    prev = None
    curr = head

    while curr:
        next_temp = curr.next  # save next
        curr.next = prev       # reverse link
        prev = curr            # move prev forward
        curr = next_temp       # move curr forward

    return prev
```

**Example: Merge Two Sorted Lists**

```python
def mergeTwoLists(l1, l2):
    dummy = ListNode(0)
    current = dummy

    while l1 and l2:
        if l1.val < l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next

    # Attach remaining nodes
    current.next = l1 if l1 else l2

    return dummy.next
```

**Example: Reorder List**

```python
def reorderList(head):
    if not head or not head.next:
        return

    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    second = slow.next
    slow.next = None

    prev = None
    while second:
        next_temp = second.next
        second.next = prev
        prev = second
        second = next_temp

    # Merge alternating
    first, second = head, prev
    while second:
        temp1, temp2 = first.next, second.next
        first.next = second
        second.next = temp1
        first, second = temp1, temp2
```

**Example: Palindrome Linked List**

```python
def isPalindrome(head):
    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    second = slow.next
    slow.next = None

    prev = None
    while second:
        next_temp = second.next
        second.next = prev
        prev = second
        second = next_temp

    # Compare
    first, second = head, prev
    while second:
        if first.val != second.val:
            return False
        first = first.next
        second = second.next

    return True
```

**Example: Add Two Numbers**

```python
def addTwoNumbers(l1, l2):
    dummy = ListNode(0)
    current = dummy
    carry = 0

    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0

        total = val1 + val2 + carry
        carry = total // 10
        current.next = ListNode(total % 10)

        current = current.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None

    return dummy.next
```

### Key Insights

- Use **dummy node** to simplify edge cases
- Save `next` before breaking links
- Three pointers for reversal: `prev`, `curr`, `next`
- Combine with fast/slow for complex operations

---

## 6. Sliding Window

### When to Use

- Longest/shortest substring/subarray
- Fixed-size window problems
- "All subarrays of size K"
- Contiguous sequences with constraints

### Mental Model

Maintain a window that expands (right pointer) and contracts (left pointer) to satisfy conditions.

### A) Fixed Size Window

**Example: Maximum Sum Subarray of Size K**

```python
def maxSumSubarray(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum

    for i in range(k, len(nums)):
        # Slide window: remove left, add right
        window_sum = window_sum - nums[i-k] + nums[i]
        max_sum = max(max_sum, window_sum)

    return max_sum
```

### B) Variable Size Window

**Example: Longest Substring Without Repeating Characters**

```python
def lengthOfLongestSubstring(s):
    seen = set()
    left = 0
    max_length = 0

    for right in range(len(s)):
        # Shrink window while duplicate exists
        while s[right] in seen:
            seen.remove(s[left])
            left += 1

        seen.add(s[right])
        max_length = max(max_length, right - left + 1)

    return max_length
```

**Example: Minimum Window Substring**

```python
from collections import Counter

def minWindow(s, t):
    if not s or not t:
        return ""

    need = Counter(t)
    have = {}

    left = 0
    min_len = float('inf')
    min_start = 0
    matched = 0

    for right in range(len(s)):
        char = s[right]
        have[char] = have.get(char, 0) + 1

        if char in need and have[char] == need[char]:
            matched += 1

        # Try to shrink window
        while matched == len(need):
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_start = left

            left_char = s[left]
            have[left_char] -= 1
            if left_char in need and have[left_char] < need[left_char]:
                matched -= 1

            left += 1

    return "" if min_len == float('inf') else s[min_start:min_start + min_len]
```

**Example: Longest Repeating Character Replacement**

```python
def characterReplacement(s, k):
    count = {}
    left = 0
    max_length = 0
    max_count = 0

    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_count = max(max_count, count[s[right]])

        # Window size - most frequent char > k replacements allowed
        while (right - left + 1) - max_count > k:
            count[s[left]] -= 1
            left += 1

        max_length = max(max_length, right - left + 1)

    return max_length
```

**Example: Permutation in String**

```python
from collections import Counter

def checkInclusion(s1, s2):
    if len(s1) > len(s2):
        return False

    s1_count = Counter(s1)
    window_count = Counter(s2[:len(s1)])

    if s1_count == window_count:
        return True

    for i in range(len(s1), len(s2)):
        # Add new char
        window_count[s2[i]] += 1

        # Remove old char
        left_char = s2[i - len(s1)]
        window_count[left_char] -= 1
        if window_count[left_char] == 0:
            del window_count[left_char]

        if s1_count == window_count:
            return True

    return False
```

### Key Insights

- **Fixed window**: Simple sliding, calculate on each slide
- **Variable window**: Expand with right, contract with left
- Use hash map/set to track window contents
- Time: O(n), Space: O(k) where k = unique elements

---

## 7. Binary Search

### When to Use

- Sorted arrays
- "Find target/boundary/peak"
- Minimizing/maximizing with constraint
- "Can we achieve X?" problems

### Mental Model

Eliminate half of search space each iteration.

### A) Classic Binary Search

**Example: Find Target**

```python
def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1
```

### B) Finding Boundaries

**Example: First and Last Position**

```python
def searchRange(nums, target):
    def findBoundary(is_first):
        left, right = 0, len(nums) - 1
        result = -1

        while left <= right:
            mid = left + (right - left) // 2

            if nums[mid] == target:
                result = mid
                if is_first:
                    right = mid - 1  # search left half
                else:
                    left = mid + 1   # search right half
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return result

    return [findBoundary(True), findBoundary(False)]
```

### C) Search in Rotated Array

**Example: Search in Rotated Sorted Array**

```python
def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid

        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1
```

### D) Find Peak Element

**Example: Find Peak**

```python
def findPeakElement(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2

        if nums[mid] > nums[mid + 1]:
            # Peak is on left (or mid itself)
            right = mid
        else:
            # Peak is on right
            left = mid + 1

    return left
```

### E) Minimize/Maximize Problems

**Example: Minimum in Rotated Sorted Array**

```python
def findMin(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2

        if nums[mid] > nums[right]:
            # Minimum is in right half
            left = mid + 1
        else:
            # Minimum is in left half (or mid itself)
            right = mid

    return nums[left]
```

**Example: Koko Eating Bananas**

```python
import math

def minEatingSpeed(piles, h):
    def canFinish(speed):
        hours = sum(math.ceil(pile / speed) for pile in piles)
        return hours <= h

    left, right = 1, max(piles)

    while left < right:
        mid = left + (right - left) // 2

        if canFinish(mid):
            right = mid  # try slower speed
        else:
            left = mid + 1  # need faster speed

    return left
```

### Key Insights

- Use `left + (right - left) // 2` to avoid overflow
- **left <= right** for finding exact value
- **left < right** for finding boundary
- "Can we achieve X?" → Binary search on answer space
- Time: O(log n)

---

## 8. Prefix Sum

### When to Use

- Subarray sum problems
- Range sum queries
- "Count subarrays with sum = K"
- Problems with negative numbers

### Mental Model

Precompute cumulative sums to answer range queries in O(1).

**Example: Subarray Sum Equals K**

```python
def subarraySum(nums, k):
    count = 0
    prefix_sum = 0
    sum_count = {0: 1}  # prefix_sum -> count

    for num in nums:
        prefix_sum += num

        # Check if there's a previous prefix that gives us k
        if prefix_sum - k in sum_count:
            count += sum_count[prefix_sum - k]

        sum_count[prefix_sum] = sum_count.get(prefix_sum, 0) + 1

    return count
```

**Example: Contiguous Array (Equal 0s and 1s)**

```python
def findMaxLength(nums):
    # Treat 0 as -1, find subarray with sum 0
    max_length = 0
    sum_index = {0: -1}  # sum -> first index
    running_sum = 0

    for i, num in enumerate(nums):
        running_sum += 1 if num == 1 else -1

        if running_sum in sum_index:
            max_length = max(max_length, i - sum_index[running_sum])
        else:
            sum_index[running_sum] = i

    return max_length
```

**Example: Range Sum Query (Immutable)**

```python
class NumArray:
    def __init__(self, nums):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)

    def sumRange(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]
```

**Example: Product of Array Except Self**

```python
def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n

    # Left products
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= nums[i]

    # Right products
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= nums[i]

    return result
```

### Key Insights

- **Prefix sum**: `sum(i, j) = prefix[j+1] - prefix[i]`
- Use hash map to store prefix sums for subarray problems
- Works with negative numbers (unlike sliding window)
- Time: O(n), Space: O(n)

---

## 9. Graph Traversal

### When to Use

- Connected components
- Cycle detection
- Shortest paths
- Topological sorting
- Dependencies (course schedule)

### A) DFS on Graph

**Example: Number of Islands**

```python
def numIslands(grid):
    if not grid:
        return 0

    def dfs(r, c):
        if (r < 0 or r >= len(grid) or c < 0

## The Recognition Framework

Most easy-mid problems can be solved by asking yourself these questions in order:

1. Does this involve a sorted array or finding pairs/triplets?
   → Two Pointers
2. Do I need to check if something exists or count frequencies?
   → Hash Table/Set
3. Does this involve parentheses, operations in reverse order, or "most recent" logic?
   → Stack
4. Is this about a tree or graph structure?
   → DFS (Recursion) or BFS (Queue)
5. Does this involve reversing or reordering a linked list?
   → Three-Pointer Technique
```
