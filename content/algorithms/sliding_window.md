---
title: Sliding Window
date: "2025-10-15"
description: "A comprehensive guide to mastering the sliding window pattern for coding interviews."
mainPage: true
---

## What is Sliding Window?

Sliding window is an optimization technique for solving problems involving **contiguous sequences** (subarrays or substrings). Instead of recalculating everything for each potential solution, we "slide" a window across the data structure and adjust our calculation incrementally.

### The Core Idea

**Without Sliding Window (Naive):**

```python
# Find max sum of k consecutive elements
def maxSum_Naive(arr, k):
    max_sum = float('-inf')

    for i in range(len(arr) - k + 1):
        current_sum = 0
        for j in range(i, i + k):
            current_sum += arr[j]
        max_sum = max(max_sum, current_sum)

    return max_sum

# Time: O(n * k) - recalculate sum for each window
```

**With Sliding Window (Optimized):**

```python
# Find max sum of k consecutive elements
def maxSum_SlidingWindow(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)

    return max_sum

# Time: O(n) - reuse previous calculation
```

**Key Insight:** Instead of recalculating the entire window, we remove the element leaving the window and add the new element entering it.

---

## Why Use Sliding Window?

### Performance Improvement

| Approach             | Time Complexity | Example (n=10000, k=100) |
| -------------------- | --------------- | ------------------------ |
| Naive (nested loops) | O(n × k)        | ~1,000,000 operations    |
| Sliding Window       | O(n)            | ~10,000 operations       |

### When to Use

✅ **Use Sliding Window when:**

- Problem involves **contiguous** subarrays/substrings
- Looking for longest/shortest/count with a condition
- Keywords: "substring", "subarray", "consecutive", "window", "in a row"
- You can determine validity from current window alone

❌ **Don't use Sliding Window when:**

- Elements can be picked from anywhere (not contiguous)
- "Subsequence" problems (can skip elements)
- Need global information beyond current window
- Requires sorting or complex preprocessing

---

## The Mental Model

### Visualization

Imagine a physical window sliding across an array:

```
Array: [1, 4, 2, 10, 23, 3, 1, 0, 20]
Window size = 3

Position 1:  [1, 4, 2], 10, 23, 3, 1, 0, 20
             └─────┘

Position 2:  1, [4, 2, 10], 23, 3, 1, 0, 20
                └───────┘
                Remove 1, Add 10

Position 3:  1, 4, [2, 10, 23], 3, 1, 0, 20
                   └────────┘
                   Remove 4, Add 23
```

### The Pointer Dance

```
Fixed Window:
  right pointer moves → left pointer follows at fixed distance

Variable Window:
  right pointer always moves forward (expand)
  left pointer moves forward when needed (shrink)
```

---

## Two Categories

### Category 1: Fixed-Size Window

**Characteristics:**

- Window size K is given
- Simply slide the window and compute
- Usually easier

**Template:**

```python
def fixed_window(arr, k):
    # Step 1: Calculate first window
    window_state = calculate_initial(arr[:k])
    result = window_state

    # Step 2: Slide window
    for i in range(k, len(arr)):
        # Remove left element, add right element
        window_state = adjust(window_state, remove=arr[i-k], add=arr[i])
        result = update_result(result, window_state)

    return result
```

### Category 2: Variable-Size Window

**Characteristics:**

- Window size changes dynamically
- Find optimal window size
- Uses two pointers (left and right)
- More complex but very powerful

**Template:**

```python
def variable_window(arr):
    left = 0
    window_state = initialize()
    result = 0

    for right in range(len(arr)):
        # Expand: add arr[right]
        add_to_window(arr[right])

        # Shrink: while invalid
        while not is_valid(window_state):
            remove_from_window(arr[left])
            left += 1

        # Update result
        result = update(result, right - left + 1)

    return result
```

---

## Fixed-Size Window Problems

### Problem 1: Maximum Sum Subarray of Size K

**Problem:**
Given an array and integer k, find the maximum sum of any k consecutive elements.

```
Input: arr = [2, 1, 5, 1, 3, 2], k = 3
Output: 9
Explanation: [5, 1, 3] has sum 9
```

**Solution:**

```python
def maxSumSubarray(arr, k):
    if len(arr) < k:
        return 0

    # Calculate first window
    window_sum = sum(arr[:k])
    max_sum = window_sum

    # Slide window
    for i in range(k, len(arr)):
        # Remove leftmost, add rightmost
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)

    return max_sum
```

**Trace:**

```
arr = [2, 1, 5, 1, 3, 2], k = 3

Window 1: [2, 1, 5] → sum = 8
Window 2: [1, 5, 1] → sum = 7  (8 - 2 + 1)
Window 3: [5, 1, 3] → sum = 9  (7 - 1 + 3) ✓ max
Window 4: [1, 3, 2] → sum = 6  (9 - 5 + 2)

Result: 9
```

**Time:** O(n), **Space:** O(1)

---

### Problem 2: First Negative Number in Every Window

**Problem:**
For each window of size k, find the first negative number.

```
Input: arr = [12, -1, -7, 8, -15, 30, 16, 28], k = 3
Output: [-1, -1, -7, -15, -15, 0]
```

**Solution:**

```python
from collections import deque

def firstNegativeInWindow(arr, k):
    result = []
    negatives = deque()  # stores indices of negative numbers

    for i in range(len(arr)):
        # Add negative numbers to deque
        if arr[i] < 0:
            negatives.append(i)

        # Remove elements outside current window
        while negatives and negatives[0] < i - k + 1:
            negatives.popleft()

        # If window is complete (i >= k-1)
        if i >= k - 1:
            if negatives:
                result.append(arr[negatives[0]])
            else:
                result.append(0)

    return result
```

**Key Insight:** Use a deque to track negative numbers and remove those outside the window.

**Time:** O(n), **Space:** O(k)

---

### Problem 3: Count Anagrams in String

**Problem:**
Count how many anagrams of a pattern exist as substrings in text.

```
Input: text = "forxxorfxdofr", pattern = "for"
Output: 3
Explanation: "for", "orf", "ofr" are anagrams of "for"
```

**Solution:**

```python
from collections import Counter

def countAnagrams(text, pattern):
    if len(pattern) > len(text):
        return 0

    pattern_count = Counter(pattern)
    window_count = Counter()
    k = len(pattern)
    count = 0

    for i in range(len(text)):
        # Add character to window
        window_count[text[i]] += 1

        # Remove character outside window
        if i >= k:
            left_char = text[i - k]
            window_count[left_char] -= 1
            if window_count[left_char] == 0:
                del window_count[left_char]

        # Check if current window is anagram
        if i >= k - 1 and window_count == pattern_count:
            count += 1

    return count
```

**Key Insight:** Two Counters are equal if they have the same characters with the same frequencies.

**Time:** O(n), **Space:** O(1) - at most 26 characters for lowercase English

---

### Problem 4: Maximum of All Subarrays of Size K

**Problem:**
Find the maximum element in each window of size k.

```
Input: arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
Output: [3, 3, 5, 5, 6, 7]
```

**Solution (Using Deque - Monotonic Queue):**

```python
from collections import deque

def maxSlidingWindow(arr, k):
    result = []
    dq = deque()  # stores indices, maintains decreasing order

    for i in range(len(arr)):
        # Remove elements outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()

        # Remove smaller elements (they'll never be max)
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()

        dq.append(i)

        # Add to result when window is complete
        if i >= k - 1:
            result.append(arr[dq[0]])

    return result
```

**Key Insight:** Maintain a deque in decreasing order - the front always has the maximum.

**Time:** O(n), **Space:** O(k)

---

## Variable-Size Window Problems

### Problem 5: Longest Substring Without Repeating Characters

**Problem:**
Find the length of the longest substring without repeating characters.

```
Input: s = "abcabcbb"
Output: 3
Explanation: "abc" is the longest substring
```

**Solution:**

```python
def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_length = 0

    for right in range(len(s)):
        # Shrink window while duplicate exists
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1

        # Add current character
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)

    return max_length
```

**Detailed Trace:**

```
s = "abcabcbb"

right=0, char='a': set={'a'}, left=0, length=1
right=1, char='b': set={'a','b'}, left=0, length=2
right=2, char='c': set={'a','b','c'}, left=0, length=3
right=3, char='a':
  'a' in set! Remove 'a', left=1, set={'b','c'}
  Add 'a': set={'b','c','a'}, length=3
right=4, char='b':
  'b' in set! Remove 'b', left=2, set={'c','a'}
  Add 'b': set={'c','a','b'}, length=3
right=5, char='c':
  'c' in set! Remove 'c', left=3, set={'a','b'}
  Add 'c': set={'a','b','c'}, length=3
right=6, char='b':
  'b' in set! Remove 'a', left=4, set={'b','c'}
  'b' still in set! Remove 'b', left=5, set={'c'}
  Add 'b': set={'c','b'}, length=2
right=7, char='b':
  'b' in set! Remove 'c', left=6, set={'b'}
  'b' still in set! Remove 'b', left=7, set={}
  Add 'b': set={'b'}, length=1

Max length = 3
```

**Time:** O(n), **Space:** O(min(n, m)) where m is charset size

---

### Problem 6: Longest Substring with At Most K Distinct Characters

**Problem:**
Find the length of the longest substring with at most k distinct characters.

```
Input: s = "eceba", k = 2
Output: 3
Explanation: "ece" has 2 distinct characters
```

**Solution:**

```python
def lengthOfLongestSubstringKDistinct(s, k):
    if k == 0:
        return 0

    char_count = {}
    left = 0
    max_length = 0

    for right in range(len(s)):
        # Expand: add s[right]
        char_count[s[right]] = char_count.get(s[right], 0) + 1

        # Shrink: while too many distinct characters
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1

        # Update max length
        max_length = max(max_length, right - left + 1)

    return max_length
```

**Key Insight:** Track character counts, shrink when distinct count exceeds k.

**Time:** O(n), **Space:** O(k)

---

### Problem 7: Minimum Window Substring

**Problem:**
Find the minimum window in s that contains all characters of t.

```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
```

**Solution:**

```python
from collections import Counter

def minWindow(s, t):
    if not s or not t or len(s) < len(t):
        return ""

    need = Counter(t)
    have = {}

    left = 0
    min_len = float('inf')
    min_start = 0
    matched = 0  # number of character types fully matched

    for right in range(len(s)):
        char = s[right]
        have[char] = have.get(char, 0) + 1

        # If this character's requirement is satisfied
        if char in need and have[char] == need[char]:
            matched += 1

        # Try to shrink window while valid
        while matched == len(need):
            # Update minimum
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_start = left

            # Shrink from left
            left_char = s[left]
            have[left_char] -= 1
            if left_char in need and have[left_char] < need[left_char]:
                matched -= 1

            left += 1

    return "" if min_len == float('inf') else s[min_start:min_start + min_len]
```

**Detailed Trace:**

```
s = "ADOBECODEBANC", t = "ABC"
need = {'A': 1, 'B': 1, 'C': 1}

Expand to "ADOBEC":
  have = {'A':1, 'D':1, 'O':2, 'B':1, 'E':1, 'C':1}
  matched = 3 ✓ (all requirements met)
  min_window = "ADOBEC" (length 6)

Shrink:
  Remove 'A': matched = 2 (lost A requirement)

Continue expanding...
Eventually find "BANC" (length 4) ✓
```

**Key Insight:** Use `matched` counter to quickly check if window is valid.

**Time:** O(n + m), **Space:** O(1) - at most 52 English letters

---

### Problem 8: Longest Repeating Character Replacement

**Problem:**
Find the longest substring with same character after replacing at most k characters.

```
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace one 'A' in "AABA" to get "AAAA"
```

**Solution:**

```python
def characterReplacement(s, k):
    char_count = {}
    left = 0
    max_length = 0
    max_freq = 0  # frequency of most common char in window

    for right in range(len(s)):
        # Add character to window
        char_count[s[right]] = char_count.get(s[right], 0) + 1
        max_freq = max(max_freq, char_count[s[right]])

        # Window size - most frequent char > k replacements
        # This means we need more than k replacements to make all chars same
        while (right - left + 1) - max_freq > k:
            char_count[s[left]] -= 1
            left += 1
            # Note: we don't update max_freq here (optimization)

        max_length = max(max_length, right - left + 1)

    return max_length
```

**Key Insight:**

- Window is valid if: `window_size - max_frequency <= k`
- We can replace the non-most-frequent characters

**Time:** O(n), **Space:** O(1) - at most 26 letters

---

### Problem 9: Permutation in String

**Problem:**
Check if s2 contains a permutation of s1.

```
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains "ba" which is a permutation of "ab"
```

**Solution:**

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
        # Add new character
        window_count[s2[i]] += 1

        # Remove old character
        left_char = s2[i - len(s1)]
        window_count[left_char] -= 1
        if window_count[left_char] == 0:
            del window_count[left_char]

        # Check if window matches
        if s1_count == window_count:
            return True

    return False
```

**Key Insight:** This is actually a fixed-size window problem! Window size = len(s1).

**Time:** O(n), **Space:** O(1)

---

## Advanced Patterns

### Pattern 1: Sliding Window + Two Pointers

**Problem: Container With Most Water**

```python
def maxArea(height):
    """
    Not a typical sliding window, but uses two-pointer technique.
    Find two lines that form the largest container.
    """
    left, right = 0, len(height) - 1
    max_water = 0

    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)

        # Move pointer with smaller height
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water
```

---

### Pattern 2: At Most K → Exactly K

**Trick:** `exactly(K) = atMost(K) - atMost(K-1)`

**Problem: Subarrays with K Different Integers**

```python
def subarraysWithKDistinct(nums, k):
    def atMostK(k):
        count = {}
        left = 0
        result = 0

        for right in range(len(nums)):
            count[nums[right]] = count.get(nums[right], 0) + 1

            while len(count) > k:
                count[nums[left]] -= 1
                if count[nums[left]] == 0:
                    del count[nums[left]]
                left += 1

            # All subarrays ending at right
            result += right - left + 1

        return result

    return atMostK(k) - atMostK(k - 1)
```

**Key Insight:** For each position, `right - left + 1` subarrays end at that position.

---

### Pattern 3: Sliding Window with Constraints

**Problem: Max Consecutive Ones III**

```python
def longestOnes(nums, k):
    """
    Find longest subarray of 1s after flipping at most k zeros.
    """
    left = 0
    zeros = 0
    max_length = 0

    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1

        # Shrink if too many zeros
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1

        max_length = max(max_length, right - left + 1)

    return max_length
```

---

### Pattern 4: Sliding Window with Product

**Problem: Subarray Product Less Than K**

```python
def numSubarrayProductLessThanK(nums, k):
    """
    Count subarrays where product < k.
    """
    if k <= 1:
        return 0

    product = 1
    left = 0
    count = 0

    for right in range(len(nums)):
        product *= nums[right]

        # Shrink while product >= k
        while product >= k:
            product //= nums[left]
            left += 1

        # Add all subarrays ending at right
        count += right - left + 1

    return count
```

**Key Insight:** When window [left, right] is valid, it contributes `right - left + 1` subarrays.

---

## Pattern Recognition

### Decision Tree

```
Does the problem involve contiguous elements?
  └─ NO → Not sliding window (try hash map, two pointers, etc.)
  └─ YES → Continue

Is the window size fixed?
  └─ YES → Fixed-size sliding window
      ├─ Initialize first window
      ├─ Slide: remove left, add right
      └─ Track result

  └─ NO → Variable-size sliding window
      Are you looking for longest/maximum?
        └─ YES → Expand right, shrink left when invalid
            ├─ Update result when VALID

      Are you looking for shortest/minimum?
        └─ YES → Expand right, shrink left while valid
            ├─ Update result while SHRINKING

      Are you counting subarrays?
        └─ YES → For each right, add (right - left + 1)
            ├─ Consider "at most K" trick
```

### Keywords to Look For

**Strong Indicators:**

- "substring" (always contiguous)
- "subarray" (contiguous, unlike subsequence)
- "consecutive elements"
- "window of size K"
- "at most K" / "at least K"
- "longest/shortest contiguous"

**Weak/Misleading:**

- "subsequence" (NOT contiguous → not sliding window)
- "any elements" (not necessarily contiguous)
- "find all pairs" (might be two pointers, not sliding window)

---

## Common Mistakes

### Mistake 1: Using Sliding Window for Non-Contiguous Problems

```python
# WRONG: Finding two elements that sum to target
def twoSum(nums, target):
    left, right = 0, len(nums) - 1  # ❌ This is two pointers, not sliding window
    # Elements don't need to be contiguous!
```

### Mistake 2: Not Handling Window Initialization

```python
# WRONG: Off-by-one errors
for right in range(len(arr)):
    # Add arr[right]
    if right > k:  # ❌ Should be right >= k
        # Remove arr[right - k]
```

### Mistake 3: Updating Result at Wrong Time

```python
# For LONGEST problems:
while invalid:
    shrink()
result = max(result, size)  # ✓ Update when VALID

# For SHORTEST problems:
while valid:
    result = min(result, size)  # ✓ Update while SHRINKING
    shrink()
```

### Mistake 4: Not Cleaning Up Data Structures

```python
# WRONG: Memory leak
char_count[s[left]] -= 1
left += 1

# RIGHT: Remove when count becomes 0
char_count[s[left]] -= 1
if char_count[s[left]] == 0:
    del char_count[s[left]]
left += 1
```

### Mistake 5: Confusing Window Size Calculation

```python
# Window from left to right (inclusive)
window_size = right - left + 1  # ✓ Correct

window_size = right - left  # ❌ Off by one
```

---

## Practice Problems

### Easy

1. **Maximum Average Subarray I** - Fixed window, find max average of k elements
2. **Minimum Size Subarray Sum** - Variable window, shortest subarray with sum ≥ target
3. **Contains Duplicate II** - Check if duplicate exists within k distance

### Medium

4. **Longest Substring Without Repeating Characters** - Variable window, no repeating chars
5. **Longest Repeating Character Replacement** - Variable window, at most k replacements
6. **Permutation in String** - Fixed window, check if s2 contains permutation of s1
7. **Find All Anagrams in a String** - Fixed window, find all anagram start indices
8. **Max Consecutive Ones III** - Variable window, flip at most k zeros
9. **Fruit Into Baskets** - Variable window, at most 2 types
10. **Longest Substring with At Most K Distinct Characters** - Variable window

### Hard

11. **Minimum Window Substring** - Variable window, shortest window containing all chars of t
12. **Sliding Window Maximum** - Fixed window with deque, find max in each window
13. **Subarrays with K Different Integers** - Count subarrays with exactly k distinct
14. **Longest Substring with At Most Two Distinct Characters** - Similar to #10 but k=2

---

## Summary

### Key Takeaways

1. **Sliding window = optimization for contiguous sequences**
2. **Two types: Fixed-size (simpler) vs Variable-size (more powerful)**
3. **Variable window uses two pointers: right expands, left shrinks**
4. **Track window state with hash map/set/counters**
5. **Update result at the right time (valid for longest, shrinking for shortest)**

### Time/Space Complexity

- **Time:** O(n) - each element visited at most twice (once by right, once by left)
- **Space:** O(k) - where k is window size or unique elements

### When to Use

✅ Contiguous subarrays/substrings  
✅ Longest/shortest/count with condition  
✅ Keywords: substring, subarray, consecutive, window  
✅ Can determine validity from current window alone

❌ Subsequences (can skip elements)  
❌ Elements from anywhere  
❌ Requires global state beyond window  
❌ Needs sorting first

### The Universal Template

```python
def sliding_window(arr):
    left = 0
    window_state = {}  # hash map, set, counter, sum
    result = 0  # or float('inf') for minimum

    for right in range(len(arr)):
        # 1. Expand: add arr[right]
        update_window(arr[right])

        # 2. Shrink: while invalid
        while not is_valid():
            remove_from_window(arr[left])
            left += 1

        # 3. Update result
        result = update(result, right - left + 1)

    return result
```
