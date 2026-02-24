// ─── Types ───────────────────────────────────────────────────────────────────

export interface CodingProblem {
  id: number;
  slug: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  hints: string[];
  solution: string;
  companies: string[];
}

export interface SystemDesignTopic {
  id: number;
  slug: string;
  title: string;
  type: "HLD" | "LLD";
  description: string;
  content: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface BehavioralQuestion {
  id: number;
  question: string;
  category: string;
  sampleAnswer: string;
  tips: string[];
}

// ─── Coding Problems ─────────────────────────────────────────────────────────

export const codingProblems: CodingProblem[] = [
  // ── Easy (8) ───────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: "two-sum",
    title: "Two Sum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- Only one valid answer exists.`,
    difficulty: "Easy",
    topics: ["Arrays", "Hash Map"],
    hints: [
      "A brute force approach would check every pair — O(n²). Can you do better?",
      "Use a hash map to store each number's index as you iterate.",
      "For each element, check if target - element exists in the map.",
    ],
    solution: `## Approach — Hash Map (One Pass)

Iterate through the array once. For each element, compute the complement (\`target - nums[i]\`). If the complement is already in the map, return both indices. Otherwise, store the current number and its index.

**Time:** O(n) · **Space:** O(n)

\`\`\`ts
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}
\`\`\``,
    companies: ["Google", "Amazon", "Meta", "Apple", "Microsoft"],
  },
  {
    id: 2,
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    description: `Given a string \`s\` containing just the characters \`(\`, \`)\`, \`{\`, \`}\`, \`[\` and \`]\`, determine if the input string is valid.

A string is valid if:
1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.
3. Every close bracket has a corresponding open bracket.

**Example 1:**
\`\`\`
Input: s = "()"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

**Example 3:**
\`\`\`
Input: s = "(]"
Output: false
\`\`\`

**Constraints:**
- 1 <= s.length <= 10^4
- s consists of parentheses only.`,
    difficulty: "Easy",
    topics: ["Stack", "Strings"],
    hints: [
      "Use a stack data structure.",
      "Push opening brackets onto the stack; when you see a closing bracket, check the top of the stack.",
    ],
    solution: `## Approach — Stack

Use a stack. For every opening bracket, push its expected closing bracket. For every closing bracket, pop and compare.

**Time:** O(n) · **Space:** O(n)

\`\`\`ts
function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { "(": ")", "{": "}", "[": "]" };

  for (const ch of s) {
    if (map[ch]) {
      stack.push(map[ch]);
    } else {
      if (stack.pop() !== ch) return false;
    }
  }
  return stack.length === 0;
}
\`\`\``,
    companies: ["Amazon", "Meta", "Bloomberg", "Google"],
  },
  {
    id: 3,
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    description: `Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.

**Example 1:**
\`\`\`
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
\`\`\`

**Example 2:**
\`\`\`
Input: list1 = [], list2 = [0]
Output: [0]
\`\`\`

**Constraints:**
- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both lists are sorted in non-decreasing order.`,
    difficulty: "Easy",
    topics: ["Linked Lists"],
    hints: [
      "Use a dummy head node to simplify edge cases.",
      "Compare the heads of both lists and advance the smaller one.",
    ],
    solution: `## Approach — Iterative with Dummy Head

Create a dummy node, maintain a tail pointer. Compare heads of both lists and attach the smaller node.

**Time:** O(n + m) · **Space:** O(1)

\`\`\`ts
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  tail.next = list1 ?? list2;
  return dummy.next;
}
\`\`\``,
    companies: ["Amazon", "Microsoft", "Apple", "Adobe"],
  },
  {
    id: 4,
    slug: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the i-th day.

You want to maximize your profit by choosing a single day to buy and a single day to sell. Return the maximum profit. If no profit is possible, return 0.

**Example 1:**
\`\`\`
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5.
\`\`\`

**Example 2:**
\`\`\`
Input: prices = [7,6,4,3,1]
Output: 0
\`\`\`

**Constraints:**
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4`,
    difficulty: "Easy",
    topics: ["Arrays", "Dynamic Programming"],
    hints: [
      "Track the minimum price seen so far as you iterate.",
      "At each step, compute the profit if you sold today and update the max.",
    ],
    solution: `## Approach — Single Pass

Keep track of the minimum price and maximum profit as you scan left to right.

**Time:** O(n) · **Space:** O(1)

\`\`\`ts
function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }

  return maxProfit;
}
\`\`\``,
    companies: ["Amazon", "Google", "Meta", "Goldman Sachs"],
  },
  {
    id: 5,
    slug: "valid-anagram",
    title: "Valid Anagram",
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An anagram uses all the original letters exactly once.

**Example 1:**
\`\`\`
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s = "rat", t = "car"
Output: false
\`\`\`

**Constraints:**
- 1 <= s.length, t.length <= 5 * 10^4
- s and t consist of lowercase English letters.`,
    difficulty: "Easy",
    topics: ["Strings", "Hash Map", "Sorting"],
    hints: [
      "If lengths differ, they can't be anagrams.",
      "Count character frequencies using a hash map or array of size 26.",
    ],
    solution: `## Approach — Character Frequency Count

Count each character's frequency in both strings and compare.

**Time:** O(n) · **Space:** O(1) (fixed 26 letters)

\`\`\`ts
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);
  const a = "a".charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - a]++;
    count[t.charCodeAt(i) - a]--;
  }

  return count.every((c) => c === 0);
}
\`\`\``,
    companies: ["Amazon", "Google", "Uber"],
  },
  {
    id: 6,
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: root = [1,null,2]
Output: 2
\`\`\`

**Constraints:**
- The number of nodes is in the range [0, 10^4].
- -100 <= Node.val <= 100`,
    difficulty: "Easy",
    topics: ["Trees"],
    hints: [
      "Think recursively: the depth is 1 + max depth of subtrees.",
      "Base case: a null node has depth 0.",
    ],
    solution: `## Approach — Recursion (DFS)

Recursively compute the depth of each subtree and return 1 + max of both.

**Time:** O(n) · **Space:** O(h) where h is tree height

\`\`\`ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\``,
    companies: ["Amazon", "Google", "Microsoft"],
  },
  {
    id: 7,
    slug: "binary-search",
    title: "Binary Search",
    description: `Given a sorted array of integers \`nums\` and a target value, return the index of the target if found. If not, return -1.

You must write an algorithm with O(log n) runtime complexity.

**Example 1:**
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
\`\`\`

**Constraints:**
- 1 <= nums.length <= 10^4
- All integers in nums are unique.
- nums is sorted in ascending order.`,
    difficulty: "Easy",
    topics: ["Binary Search", "Arrays"],
    hints: [
      "Maintain two pointers: left and right.",
      "Compute mid and compare nums[mid] with target to decide which half to search.",
    ],
    solution: `## Approach — Classic Binary Search

Standard binary search with left/right pointers.

**Time:** O(log n) · **Space:** O(1)

\`\`\`ts
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
\`\`\``,
    companies: ["Google", "Microsoft", "Apple"],
  },
  {
    id: 8,
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and \`false\` if every element is distinct.

**Example 1:**
\`\`\`
Input: nums = [1,2,3,1]
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,3,4]
Output: false
\`\`\`

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9`,
    difficulty: "Easy",
    topics: ["Arrays", "Hash Map", "Sorting"],
    hints: [
      "A Set stores unique elements.",
      "If the Set size is less than the array length, there must be duplicates.",
    ],
    solution: `## Approach — Hash Set

Insert elements into a Set. If an element already exists, return true.

**Time:** O(n) · **Space:** O(n)

\`\`\`ts
function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}
\`\`\``,
    companies: ["Amazon", "Apple", "Adobe"],
  },

  // ── Medium (10) ────────────────────────────────────────────────────────────
  {
    id: 9,
    slug: "three-sum",
    title: "3Sum",
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

The solution set must not contain duplicate triplets.

**Example 1:**
\`\`\`
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0,1,1]
Output: []
\`\`\`

**Constraints:**
- 3 <= nums.length <= 3000
- -10^5 <= nums[i] <= 10^5`,
    difficulty: "Medium",
    topics: ["Arrays", "Sorting"],
    hints: [
      "Sort the array first to make duplicate handling easier.",
      "Fix one element, then use two pointers on the remaining subarray to find pairs that sum to the complement.",
      "Skip duplicate elements to avoid duplicate triplets.",
    ],
    solution: `## Approach — Sort + Two Pointers

Sort the array. For each element, use two pointers to find complementary pairs. Skip duplicates.

**Time:** O(n²) · **Space:** O(1) extra (excluding output)

\`\`\`ts
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
\`\`\``,
    companies: ["Meta", "Amazon", "Google", "Microsoft"],
  },
  {
    id: 10,
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

**Example 1:**
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
\`\`\`

**Example 2:**
\`\`\`
Input: root = [1]
Output: [[1]]
\`\`\`

**Constraints:**
- The number of nodes is in the range [0, 2000].
- -1000 <= Node.val <= 1000`,
    difficulty: "Medium",
    topics: ["Trees"],
    hints: [
      "Use BFS (Breadth-First Search) with a queue.",
      "Process all nodes at the current level before moving to the next.",
    ],
    solution: `## Approach — BFS with Queue

Use a queue. For each level, process all nodes currently in the queue and enqueue their children.

**Time:** O(n) · **Space:** O(n)

\`\`\`ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
\`\`\``,
    companies: ["Amazon", "Meta", "Microsoft", "Bloomberg"],
  },
  {
    id: 11,
    slug: "number-of-islands",
    title: "Number of Islands",
    description: `Given an \`m x n\` 2D binary grid which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

**Example 1:**
\`\`\`
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
\`\`\`

**Constraints:**
- m == grid.length, n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j] is '0' or '1'.`,
    difficulty: "Medium",
    topics: ["Graphs", "Arrays"],
    hints: [
      "Iterate over every cell. When you find a '1', start a DFS/BFS to mark all connected land.",
      "Mark visited land as '0' to avoid counting it again.",
      "Each DFS/BFS initiation counts as one island.",
    ],
    solution: `## Approach — DFS Flood Fill

Iterate over the grid. For each unvisited land cell, increment the count and DFS to mark the entire island.

**Time:** O(m*n) · **Space:** O(m*n) in the worst case for the call stack

\`\`\`ts
function numIslands(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") return;
    grid[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}
\`\`\``,
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
  },
  {
    id: 12,
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

**Example 1:**
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "bbbbb"
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: s = "pwwkew"
Output: 3
\`\`\`

**Constraints:**
- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols, and spaces.`,
    difficulty: "Medium",
    topics: ["Strings", "Hash Map"],
    hints: [
      "Use a sliding window approach.",
      "Maintain a set of characters in the current window and expand/shrink as needed.",
    ],
    solution: `## Approach — Sliding Window + Hash Map

Use two pointers and a map storing the last index of each character.

**Time:** O(n) · **Space:** O(min(n, m)) where m is the charset size

\`\`\`ts
function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right])! >= left) {
      left = map.get(s[right])! + 1;
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
\`\`\``,
    companies: ["Amazon", "Meta", "Google", "Bloomberg", "Microsoft"],
  },
  {
    id: 13,
    slug: "group-anagrams",
    title: "Group Anagrams",
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.

**Example 1:**
\`\`\`
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\`

**Example 2:**
\`\`\`
Input: strs = [""]
Output: [[""]]
\`\`\`

**Constraints:**
- 1 <= strs.length <= 10^4
- 0 <= strs[i].length <= 100
- strs[i] consists of lowercase English letters.`,
    difficulty: "Medium",
    topics: ["Strings", "Hash Map", "Sorting"],
    hints: [
      "Two strings are anagrams if they have the same sorted form.",
      "Use the sorted string as a hash map key to group anagrams.",
    ],
    solution: `## Approach — Sort-based Grouping

Sort each string and use the sorted version as a map key.

**Time:** O(n * k log k) where k = max string length · **Space:** O(n*k)

\`\`\`ts
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const s of strs) {
    const key = s.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }

  return Array.from(map.values());
}
\`\`\``,
    companies: ["Amazon", "Meta", "Google", "Goldman Sachs"],
  },
  {
    id: 14,
    slug: "coin-change",
    title: "Coin Change",
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins needed to make up that amount. If it cannot be made up, return -1.

**Example 1:**
\`\`\`
Input: coins = [1,5,10,25], amount = 30
Output: 2
Explanation: 5 + 25 = 30
\`\`\`

**Example 2:**
\`\`\`
Input: coins = [2], amount = 3
Output: -1
\`\`\`

**Constraints:**
- 1 <= coins.length <= 12
- 1 <= coins[i] <= 2^31 - 1
- 0 <= amount <= 10^4`,
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    hints: [
      "Think of this as a classic DP problem. Define dp[i] as the minimum coins for amount i.",
      "For each amount, try every coin denomination and take the minimum.",
      "Initialize dp[0] = 0 and all others to Infinity.",
    ],
    solution: `## Approach — Bottom-Up DP

Build a dp array where dp[i] = minimum coins for amount i.

**Time:** O(amount * coins.length) · **Space:** O(amount)

\`\`\`ts
function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
\`\`\``,
    companies: ["Amazon", "Google", "Microsoft", "Apple"],
  },
  {
    id: 15,
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

You must solve it in O(n) time and without using the division operation.

**Example 1:**
\`\`\`
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
\`\`\`

**Constraints:**
- 2 <= nums.length <= 10^5
- -30 <= nums[i] <= 30
- The product of any prefix or suffix fits in a 32-bit integer.`,
    difficulty: "Medium",
    topics: ["Arrays"],
    hints: [
      "For each index, you need the product of all elements to its left and all to its right.",
      "Build prefix products in one pass, then suffix products in a second pass.",
    ],
    solution: `## Approach — Prefix and Suffix Products

First pass: compute prefix products. Second pass: multiply by suffix products.

**Time:** O(n) · **Space:** O(1) extra (output array doesn't count)

\`\`\`ts
function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }

  return answer;
}
\`\`\``,
    companies: ["Amazon", "Meta", "Apple", "Microsoft"],
  },
  {
    id: 16,
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.

**Example 1:**
\`\`\`
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1], k = 1
Output: [1]
\`\`\`

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
- k is in the range [1, number of unique elements].`,
    difficulty: "Medium",
    topics: ["Arrays", "Hash Map", "Sorting"],
    hints: [
      "Count frequencies with a hash map first.",
      "Use bucket sort: create buckets indexed by frequency, then collect from the highest bucket.",
    ],
    solution: `## Approach — Bucket Sort

Count frequencies, then use bucket sort where index = frequency.

**Time:** O(n) · **Space:** O(n)

\`\`\`ts
function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}
\`\`\``,
    companies: ["Amazon", "Meta", "Google", "Apple"],
  },
  {
    id: 17,
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

**Example 1:**
\`\`\`
Input: root = [2,1,3]
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child is 4.
\`\`\`

**Constraints:**
- The number of nodes is in the range [1, 10^4].
- -2^31 <= Node.val <= 2^31 - 1`,
    difficulty: "Medium",
    topics: ["Trees", "Binary Search"],
    hints: [
      "Pass valid ranges (min, max) down the recursion.",
      "An in-order traversal of a valid BST produces a sorted sequence.",
    ],
    solution: `## Approach — Recursive Range Validation

Pass allowed range (min, max) to each node. Narrow the range as you recurse.

**Time:** O(n) · **Space:** O(h)

\`\`\`ts
function isValidBST(root: TreeNode | null): boolean {
  function validate(
    node: TreeNode | null,
    min: number,
    max: number
  ): boolean {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return (
      validate(node.left, min, node.val) &&
      validate(node.right, node.val, max)
    );
  }
  return validate(root, -Infinity, Infinity);
}
\`\`\``,
    companies: ["Amazon", "Meta", "Microsoft", "Bloomberg"],
  },
  {
    id: 18,
    slug: "lru-cache",
    title: "LRU Cache",
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(capacity)\` Initialize the LRU cache with positive size capacity.
- \`get(key)\` Return the value of the key if it exists, otherwise return -1.
- \`put(key, value)\` Update or insert the value. When the cache reaches capacity, evict the least recently used key.

Both operations must run in **O(1)** average time.

**Example:**
\`\`\`
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output: [null, null, null, 1, null, -1, null, -1, 3, 4]
\`\`\`

**Constraints:**
- 1 <= capacity <= 3000
- 0 <= key <= 10^4
- 0 <= value <= 10^5
- At most 2 * 10^5 calls to get and put.`,
    difficulty: "Medium",
    topics: ["Hash Map", "Linked Lists"],
    hints: [
      "Combine a hash map for O(1) lookups with a doubly linked list for O(1) ordering.",
      "Move accessed nodes to the head; evict from the tail.",
      "In JavaScript, you can use the built-in Map which preserves insertion order.",
    ],
    solution: `## Approach — Hash Map + Doubly Linked List

Use a Map (ordered) in JS/TS for a clean O(1) implementation.

**Time:** O(1) per operation · **Space:** O(capacity)

\`\`\`ts
class LRUCache {
  private capacity: number;
  private cache: Map<number, number>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
    }
  }
}
\`\`\``,
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  },

  // ── Hard (7) ───────────────────────────────────────────────────────────────
  {
    id: 19,
    slug: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    description: `You are given an array of \`k\` linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

**Example 1:**
\`\`\`
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
\`\`\`

**Example 2:**
\`\`\`
Input: lists = []
Output: []
\`\`\`

**Constraints:**
- k == lists.length
- 0 <= k <= 10^4
- 0 <= lists[i].length <= 500
- -10^4 <= lists[i][j] <= 10^4
- Total number of nodes will not exceed 10^4.`,
    difficulty: "Hard",
    topics: ["Linked Lists", "Sorting"],
    hints: [
      "Use a divide-and-conquer strategy: merge pairs of lists recursively.",
      "Alternatively, use a min-heap / priority queue to always pick the smallest head.",
      "Merge lists pairwise like merge sort to achieve O(N log k).",
    ],
    solution: `## Approach — Divide and Conquer

Merge lists pairwise, halving the number of lists each round, like merge sort.

**Time:** O(N log k) · **Space:** O(1) extra

\`\`\`ts
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  if (lists.length === 0) return null;

  while (lists.length > 1) {
    const merged: (ListNode | null)[] = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    lists = merged;
  }

  return lists[0];
}

function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 ?? l2;
  return dummy.next;
}
\`\`\``,
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
  },
  {
    id: 20,
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Example 1:**
\`\`\`
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
\`\`\`

**Example 2:**
\`\`\`
Input: height = [4,2,0,3,2,5]
Output: 9
\`\`\`

**Constraints:**
- n == height.length
- 1 <= n <= 2 * 10^4
- 0 <= height[i] <= 10^5`,
    difficulty: "Hard",
    topics: ["Arrays", "Stack"],
    hints: [
      "Water at each position = min(maxLeft, maxRight) - height[i].",
      "Use two pointers from both ends to compute this in O(1) space.",
      "Alternatively, precompute prefix max and suffix max arrays.",
    ],
    solution: `## Approach — Two Pointers

Maintain left and right pointers with running maxLeft and maxRight. Process the side with the smaller max.

**Time:** O(n) · **Space:** O(1)

\`\`\`ts
function trap(height: number[]): number {
  let left = 0, right = height.length - 1;
  let maxLeft = 0, maxRight = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      maxLeft = Math.max(maxLeft, height[left]);
      water += maxLeft - height[left];
      left++;
    } else {
      maxRight = Math.max(maxRight, height[right]);
      water += maxRight - height[right];
      right--;
    }
  }

  return water;
}
\`\`\``,
    companies: ["Amazon", "Google", "Meta", "Goldman Sachs", "Apple"],
  },
  {
    id: 21,
    slug: "word-search-ii",
    title: "Word Search II",
    description: `Given an \`m x n\` board of characters and a list of strings \`words\`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells (horizontally or vertically neighboring). The same cell may not be used more than once in a word.

**Example 1:**
\`\`\`
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
\`\`\`

**Constraints:**
- m == board.length, n == board[i].length
- 1 <= m, n <= 12
- 1 <= words.length <= 3 * 10^4
- 1 <= words[i].length <= 10`,
    difficulty: "Hard",
    topics: ["Graphs", "Strings"],
    hints: [
      "Build a Trie from all the words for efficient prefix matching.",
      "DFS from each cell, following Trie nodes instead of checking each word.",
      "Prune branches in the Trie once a word is found to avoid duplicates.",
    ],
    solution: `## Approach — Trie + Backtracking DFS

Insert all words into a Trie. DFS from every cell, walking the Trie. When a complete word is reached, add it to results.

**Time:** O(m*n * 4^L) worst case · **Space:** O(sum of word lengths)

\`\`\`ts
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  word: string | null = null;
}

function findWords(board: string[][], words: string[]): string[] {
  const root = new TrieNode();
  for (const w of words) {
    let node = root;
    for (const ch of w) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.word = w;
  }

  const result: string[] = [];
  const rows = board.length, cols = board[0].length;

  function dfs(r: number, c: number, node: TrieNode) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const ch = board[r][c];
    if (ch === "#" || !node.children.has(ch)) return;

    const next = node.children.get(ch)!;
    if (next.word) {
      result.push(next.word);
      next.word = null;
    }

    board[r][c] = "#";
    dfs(r + 1, c, next);
    dfs(r - 1, c, next);
    dfs(r, c + 1, next);
    dfs(r, c - 1, next);
    board[r][c] = ch;

    if (next.children.size === 0) node.children.delete(ch);
  }

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      dfs(r, c, root);

  return result;
}
\`\`\``,
    companies: ["Amazon", "Microsoft", "Google"],
  },
  {
    id: 22,
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    description: `Given two strings \`s\` and \`t\`, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return \`""\`.

**Example 1:**
\`\`\`
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
\`\`\`

**Example 2:**
\`\`\`
Input: s = "a", t = "a"
Output: "a"
\`\`\`

**Constraints:**
- 1 <= s.length, t.length <= 10^5
- s and t consist of uppercase and lowercase English letters.`,
    difficulty: "Hard",
    topics: ["Strings", "Hash Map"],
    hints: [
      "Use a sliding window with two pointers.",
      "Expand the right pointer to include characters; shrink the left pointer to minimize the window.",
      "Track how many required characters are satisfied.",
    ],
    solution: `## Approach — Sliding Window

Expand right to satisfy all characters, then contract left to find the minimum.

**Time:** O(|s| + |t|) · **Space:** O(|s| + |t|)

\`\`\`ts
function minWindow(s: string, t: string): string {
  const need = new Map<string, number>();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);

  let have = 0;
  const required = need.size;
  const window = new Map<string, number>();
  let left = 0;
  let minLen = Infinity;
  let minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    window.set(ch, (window.get(ch) || 0) + 1);

    if (need.has(ch) && window.get(ch) === need.get(ch)) have++;

    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const lch = s[left];
      window.set(lch, window.get(lch)! - 1);
      if (need.has(lch) && window.get(lch)! < need.get(lch)!) have--;
      left++;
    }
  }

  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
}
\`\`\``,
    companies: ["Meta", "Amazon", "Google", "Airbnb"],
  },
  {
    id: 23,
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.

**Example 1:**
\`\`\`
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The LIS is [2,3,7,101].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0,1,0,3,2,3]
Output: 4
\`\`\`

**Constraints:**
- 1 <= nums.length <= 2500
- -10^4 <= nums[i] <= 10^4`,
    difficulty: "Hard",
    topics: ["Dynamic Programming", "Binary Search"],
    hints: [
      "O(n^2) DP: dp[i] = length of LIS ending at index i.",
      "O(n log n): maintain a tails array and use binary search to find the position to replace.",
    ],
    solution: `## Approach — Patience Sorting (Binary Search)

Maintain an array \`tails\` where \`tails[i]\` is the smallest tail element of an increasing subsequence of length \`i+1\`. Use binary search to update.

**Time:** O(n log n) · **Space:** O(n)

\`\`\`ts
function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];

  for (const num of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num;
  }

  return tails.length;
}
\`\`\``,
    companies: ["Google", "Amazon", "Microsoft"],
  },
  {
    id: 24,
    slug: "serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    description: `Design an algorithm to serialize and deserialize a binary tree. Serialization is the process of converting a tree to a string. Deserialization reconstructs the tree from the string.

**Example:**
\`\`\`
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
\`\`\`

There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized back to the original tree.

**Constraints:**
- The number of nodes is in the range [0, 10^4].
- -1000 <= Node.val <= 1000`,
    difficulty: "Hard",
    topics: ["Trees"],
    hints: [
      "Use pre-order traversal for serialization, marking null nodes.",
      "Use a queue or index to reconstruct the tree during deserialization.",
    ],
    solution: `## Approach — Pre-order DFS

Serialize with pre-order DFS, writing "null" for null nodes. Deserialize by consuming tokens in the same order.

**Time:** O(n) · **Space:** O(n)

\`\`\`ts
function serialize(root: TreeNode | null): string {
  const parts: string[] = [];
  function dfs(node: TreeNode | null) {
    if (!node) { parts.push("null"); return; }
    parts.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return parts.join(",");
}

function deserialize(data: string): TreeNode | null {
  const tokens = data.split(",");
  let idx = 0;

  function dfs(): TreeNode | null {
    if (tokens[idx] === "null") { idx++; return null; }
    const node = new TreeNode(Number(tokens[idx++]));
    node.left = dfs();
    node.right = dfs();
    return node;
  }

  return dfs();
}
\`\`\``,
    companies: ["Meta", "Google", "Amazon", "Microsoft"],
  },
  {
    id: 25,
    slug: "alien-dictionary",
    title: "Alien Dictionary",
    description: `There is a new alien language that uses the English alphabet. The order among the letters is unknown to you.

You are given a list of strings \`words\` from the alien dictionary, sorted lexicographically by the rules of this new language.

Derive the order of letters in this language. If the order is invalid, return \`""\`. If there are multiple valid orders, return any of them.

**Example 1:**
\`\`\`
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
\`\`\`

**Example 2:**
\`\`\`
Input: words = ["z","x"]
Output: "zx"
\`\`\`

**Example 3:**
\`\`\`
Input: words = ["z","x","z"]
Output: ""
Explanation: The order is invalid, so return "".
\`\`\`

**Constraints:**
- 1 <= words.length <= 100
- 1 <= words[i].length <= 100
- words[i] consists of only lowercase English letters.`,
    difficulty: "Hard",
    topics: ["Graphs", "Sorting"],
    hints: [
      "Compare adjacent words to derive ordering edges between characters.",
      "Build a directed graph and perform topological sort.",
      "If a cycle is detected, the ordering is invalid.",
    ],
    solution: `## Approach — Topological Sort (BFS / Kahn's)

Build a graph from adjacent word comparisons. Use BFS topological sort to determine ordering.

**Time:** O(C) where C = total characters · **Space:** O(1) (26 letters max)

\`\`\`ts
function alienOrder(words: string[]): string {
  const adj = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();

  for (const word of words)
    for (const ch of word) {
      if (!adj.has(ch)) adj.set(ch, new Set());
      if (!inDegree.has(ch)) inDegree.set(ch, 0);
    }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return "";
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j])!.has(w2[j])) {
          adj.get(w1[j])!.add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j])! + 1);
        }
        break;
      }
    }
  }

  const queue: string[] = [];
  for (const [ch, deg] of inDegree) if (deg === 0) queue.push(ch);

  const result: string[] = [];
  while (queue.length) {
    const ch = queue.shift()!;
    result.push(ch);
    for (const next of adj.get(ch)!) {
      inDegree.set(next, inDegree.get(next)! - 1);
      if (inDegree.get(next) === 0) queue.push(next);
    }
  }

  return result.length === inDegree.size ? result.join("") : "";
}
\`\`\``,
    companies: ["Meta", "Google", "Amazon", "Airbnb", "Uber"],
  },
];

// ─── System Design Topics ────────────────────────────────────────────────────

export const systemDesignTopics: SystemDesignTopic[] = [
  {
    id: 1,
    slug: "url-shortener",
    title: "URL Shortener",
    type: "HLD",
    description: "Design a URL shortening service like TinyURL or Bit.ly that converts long URLs into short, unique aliases.",
    difficulty: "Medium",
    content: `# URL Shortener — High Level Design

## 1. Requirements

### Functional
- Given a long URL, generate a short unique alias.
- When users visit the short URL, redirect to the original.
- Users can optionally set custom aliases.
- Links expire after a configurable time (default: 5 years).

### Non-Functional
- High availability (reads vastly outnumber writes).
- Minimal latency for redirection (< 50 ms).
- Short URLs should not be predictable.

## 2. Capacity Estimation
- 100 M new URLs per month -> ~40 URLs/sec write.
- Read-to-write ratio: 100:1 -> ~4000 reads/sec.
- Storage (5 years): 100M x 12 x 5 = 6 B records -> ~3 TB.

## 3. API Design
\`\`\`
POST /api/shorten  { longUrl, customAlias?, expiry? } -> { shortUrl }
GET  /:shortCode   -> 301 Redirect
\`\`\`

## 4. Short Code Generation
- **Base-62 encoding** of an auto-increment ID or a counter from a distributed ID generator (Twitter Snowflake).
- 7-character code -> 62^7 = 3.5 trillion combinations.
- Alternatively, use MD5/SHA-256 hash of the URL and take first 7 chars (handle collisions with retry).

## 5. Architecture

\`\`\`
Client -> Load Balancer -> API Servers -> Cache (Redis) -> Database (NoSQL)
\`\`\`

### Components
| Component | Purpose |
|-----------|---------|
| **Load Balancer** | Distribute traffic across API servers |
| **API Server** | Handle create & redirect requests |
| **Cache (Redis)** | Hot URL lookups to reduce DB load |
| **Database** | Store URL mappings (DynamoDB / Cassandra) |
| **ID Generator** | Distributed unique ID service (Snowflake) |

## 6. Database Schema
\`\`\`
urls {
  shortCode: string (PK)
  longUrl: string
  userId: string
  createdAt: timestamp
  expiresAt: timestamp
}
\`\`\`

## 7. Redirect Flow
1. User hits GET /:shortCode.
2. Check Redis cache; if hit, redirect (301).
3. If miss, query DB, populate cache, redirect.
4. If not found, return 404.

## 8. Scaling Considerations
- **Caching:** Cache the top 20% of URLs (Pareto principle).
- **Database Partitioning:** Range-based or hash-based sharding on shortCode.
- **Rate Limiting:** Protect against abuse.
- **Analytics:** Async logging of click events to Kafka -> analytics pipeline.`,
  },
  {
    id: 2,
    slug: "chat-system",
    title: "Chat System",
    type: "HLD",
    description: "Design a real-time messaging system like WhatsApp or Slack supporting 1-on-1 and group chats.",
    difficulty: "Hard",
    content: `# Chat System — High Level Design

## 1. Requirements

### Functional
- 1-on-1 messaging with delivery/read receipts.
- Group chats (up to 500 members).
- Online/offline presence indicator.
- Message history and search.
- Push notifications for offline users.

### Non-Functional
- Real-time delivery (< 200 ms).
- Messages must be reliably stored and ordered.
- Support 50 M DAU.

## 2. Communication Protocol
- **WebSocket** for real-time bidirectional communication.
- HTTP for non-real-time operations (login, profile, history fetch).

## 3. Architecture

\`\`\`
Client <-> WebSocket Gateway <-> Chat Service -> Message Queue -> Storage
                                    |
                              Presence Service
                              Push Notification Service
\`\`\`

### Components
| Component | Purpose |
|-----------|---------|
| **WebSocket Gateway** | Manages persistent connections, routes messages |
| **Chat Service** | Business logic: send, receive, group management |
| **Message Queue (Kafka)** | Decouple sending from storage; ensure ordering |
| **Message Store** | Cassandra or HBase for messages (write-heavy) |
| **Presence Service** | Track online/offline status via heartbeats |
| **Push Service** | APNs / FCM for offline users |

## 4. Message Flow (1-on-1)
1. Sender sends message over WebSocket -> Gateway -> Chat Service.
2. Chat Service writes to Message Queue (partitioned by chatId).
3. Consumer writes to Message Store and delivers via Gateway to recipient.
4. If recipient offline -> push notification.
5. Delivery receipt sent back.

## 5. Group Chat
- Fan-out on write for small groups: write one copy per member.
- Fan-out on read for large groups: store once, fetch per member.

## 6. Data Model
\`\`\`
messages {
  messageId: uuid (PK)
  chatId: string (partition key)
  senderId: string
  content: string (encrypted)
  timestamp: bigint (sort key)
  status: enum (sent, delivered, read)
}
\`\`\`

## 7. Scaling
- Shard WebSocket gateways by userId.
- Partition message store by chatId.
- Use Redis for presence with TTL-based heartbeats.
- End-to-end encryption (Signal Protocol).`,
  },
  {
    id: 3,
    slug: "news-feed",
    title: "News Feed",
    type: "HLD",
    description: "Design a social media news feed system like Facebook or Twitter timeline.",
    difficulty: "Hard",
    content: `# News Feed — High Level Design

## 1. Requirements

### Functional
- Users create posts (text, images, videos).
- Users see a personalized feed of posts from people they follow.
- Feed is ranked (not purely chronological).
- Support likes, comments, shares.

### Non-Functional
- Feed generation latency < 500 ms.
- Support 500 M users, 10 M DAU.
- High read throughput.

## 2. Feed Generation Approaches

### Fan-out on Write (Push)
- When a user posts, pre-compute and push to all followers' feed caches.
- **Pros:** Fast read. **Cons:** Expensive for celebrities.

### Fan-out on Read (Pull)
- When a user opens their feed, fetch posts from all followed users at read time.
- **Pros:** No wasted writes. **Cons:** Slow reads.

### Hybrid (Recommended)
- Push for normal users; pull for celebrities (> 10K followers).

## 3. Architecture

\`\`\`
Client -> API Gateway -> Feed Service -> Feed Cache (Redis)
                            |
                       Post Service -> DB + Object Storage
                       Ranking Service (ML)
                       Fan-out Service -> Message Queue
\`\`\`

## 4. Data Flow
1. **Post creation:** Post Service stores in DB + media in S3. Fan-out Service publishes to followers' feed lists.
2. **Feed read:** Feed Service retrieves pre-computed feed IDs from Redis, hydrates with Post Service, applies ranking.

## 5. Ranking
- ML-based ranking: recency, affinity, content type, engagement signals.

## 6. Data Model
\`\`\`
posts    { postId, userId, content, mediaUrls, createdAt }
feeds    { userId, postId, score } -- stored in Redis sorted sets
follows  { followerId, followeeId }
\`\`\`

## 7. Scaling
- Cache hot feeds in Redis (sorted sets by score).
- Shard feeds by userId.
- CDN for media content.`,
  },
  {
    id: 4,
    slug: "video-streaming",
    title: "Video Streaming Platform",
    type: "HLD",
    description: "Design a video streaming service like YouTube or Netflix with upload, processing, and playback.",
    difficulty: "Hard",
    content: `# Video Streaming Platform — High Level Design

## 1. Requirements

### Functional
- Upload videos (up to 1 GB).
- Transcode to multiple resolutions (240p-4K).
- Adaptive bitrate streaming.
- Search, recommendations, comments, likes.

### Non-Functional
- High availability for playback.
- Low buffering latency.
- Support 1 B total users, 100 M DAU.

## 2. Architecture

\`\`\`
Upload Client -> API Gateway -> Upload Service -> Object Store (S3)
                                     |
                              Transcoding Pipeline (Queue + Workers)
                                     |
                              CDN <- Transcoded Segments

Playback Client -> CDN (edge) -> Origin (S3)
\`\`\`

## 3. Video Upload Flow
1. Client requests a pre-signed upload URL.
2. Client uploads directly to S3 (chunked/resumable).
3. Upload Service creates a job in the transcoding queue.
4. Workers transcode to HLS/DASH segments at multiple bitrates.
5. Segments stored in S3, metadata updated in DB.

## 4. Video Playback Flow
1. Client requests video manifest (.m3u8 / .mpd).
2. CDN serves the manifest + segments.
3. Player uses Adaptive Bitrate (ABR) to switch quality based on bandwidth.

## 5. Components
| Component | Purpose |
|-----------|---------|
| **Upload Service** | Handle uploads, generate pre-signed URLs |
| **Transcoding Workers** | FFmpeg-based; scale horizontally |
| **Object Storage (S3)** | Store original + transcoded segments |
| **CDN (CloudFront)** | Edge caching for low-latency delivery |
| **Metadata DB** | Video info, user data (PostgreSQL) |
| **Search Service** | Elasticsearch for video search |

## 6. Scaling
- CDN handles most read traffic.
- Transcoding scales with message queue + auto-scaling workers.
- Database read replicas for metadata.
- Geo-distributed CDN PoPs.`,
  },
  {
    id: 5,
    slug: "rate-limiter",
    title: "Rate Limiter",
    type: "HLD",
    description: "Design a distributed rate limiting service to protect APIs from abuse and overload.",
    difficulty: "Medium",
    content: `# Rate Limiter — High Level Design

## 1. Requirements

### Functional
- Limit requests per user/IP/API key within a time window.
- Support multiple rules (e.g., 100 req/min, 1000 req/hour).
- Return 429 Too Many Requests when limit exceeded.

### Non-Functional
- Low latency (< 5 ms overhead per request).
- Highly available; fail-open preferred.
- Distributed across multiple servers.

## 2. Algorithms

### Token Bucket
- Bucket holds tokens; refills at a fixed rate.
- Each request consumes a token. Rejected if empty.
- **Pros:** Allows bursts. **Cons:** Two parameters to tune.

### Sliding Window Log
- Store timestamps of requests. Count within the window.
- **Pros:** Accurate. **Cons:** Memory-heavy.

### Sliding Window Counter (Recommended)
- Combine fixed window counts with weighted overlap.
- **Pros:** Memory-efficient + fairly accurate.

## 3. Architecture

\`\`\`
Client -> API Gateway (rate limiter middleware) -> Backend Service
                |
          Redis (counters / token state)
          Rules DB (rate limit configs)
\`\`\`

## 4. Implementation (Sliding Window Counter)
\`\`\`
Key: rate_limit:{userId}:{currentMinute}
INCR key
EXPIRE key 120

currentCount = prevWindowCount * overlapRatio + currentWindowCount
if currentCount > limit -> reject
\`\`\`

## 5. Distributed Considerations
- Use Redis cluster for centralized state.
- Race conditions: use Redis Lua scripts for atomic INCR + check.
- If Redis is down: fail-open (allow requests).

## 6. Response Headers
\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1672531260
\`\`\``,
  },
  {
    id: 6,
    slug: "distributed-cache",
    title: "Distributed Cache",
    type: "HLD",
    description: "Design a distributed caching system like Memcached or Redis for low-latency data access.",
    difficulty: "Hard",
    content: `# Distributed Cache — High Level Design

## 1. Requirements

### Functional
- GET / SET / DELETE operations on key-value pairs.
- TTL-based expiration.
- Support various data types (strings, lists, hashes).

### Non-Functional
- Sub-millisecond latency.
- High throughput (millions of ops/sec).
- Horizontal scalability.
- High availability with minimal data loss.

## 2. Architecture

\`\`\`
Clients -> Client Library (consistent hashing) -> Cache Nodes
                                                    |
                                              Replication (async)
                                              Config Service (ZooKeeper)
\`\`\`

## 3. Data Partitioning
- **Consistent Hashing** with virtual nodes to distribute keys evenly.
- Each node owns a range on the hash ring.
- Adding/removing nodes only remaps ~1/N of keys.

## 4. Replication
- Each key replicated to N successor nodes on the ring.
- Write to primary, async replicate to replicas.
- Configurable consistency: W writes + R reads where W + R > N for strong consistency.

## 5. Eviction Policies
- **LRU** (Least Recently Used) -- most common.
- **LFU** (Least Frequently Used).
- **TTL-based** expiration (lazy + periodic cleanup).

## 6. Cache Patterns
### Cache-Aside
App reads from cache; on miss, reads from DB and populates cache.

### Write-Through
App writes to cache, cache synchronously writes to DB.

### Write-Behind
App writes to cache, cache asynchronously writes to DB.

## 7. Failure Handling
- Node failure: requests rerouted to next node on ring.
- Config Service detects failures via heartbeats.
- Rehash affected keys.`,
  },

  // ── LLD (6) ────────────────────────────────────────────────────────────────
  {
    id: 7,
    slug: "parking-lot",
    title: "Parking Lot System",
    type: "LLD",
    description: "Design an object-oriented parking lot system with multiple levels, spot types, and ticketing.",
    difficulty: "Medium",
    content: `# Parking Lot — Low Level Design

## 1. Requirements
- Multi-level parking lot with different spot sizes (Small, Medium, Large).
- Vehicles: Motorcycle, Car, Truck.
- Assign the nearest available spot matching the vehicle size.
- Issue a ticket on entry, calculate fee on exit.
- Track available spots per level.

## 2. Class Diagram

\`\`\`
ParkingLot
  levels: ParkingLevel[]
  enterVehicle(vehicle): Ticket
  exitVehicle(ticket): Payment
  getAvailableSpots(): number

ParkingLevel
  levelNumber: number
  spots: ParkingSpot[]
  findAvailableSpot(size): ParkingSpot | null

ParkingSpot
  id: string
  size: SpotSize
  isOccupied: boolean
  vehicle: Vehicle | null
  park(vehicle): void
  release(): void

Vehicle
  licensePlate: string
  type: VehicleType
  size: SpotSize

Ticket
  id: string
  vehicle: Vehicle
  spot: ParkingSpot
  entryTime: Date

Payment
  ticket: Ticket
  exitTime: Date
  amount: number
\`\`\`

## 3. Implementation

\`\`\`ts
enum SpotSize { SMALL = 1, MEDIUM = 2, LARGE = 3 }
enum VehicleType { MOTORCYCLE, CAR, TRUCK }

class ParkingSpot {
  constructor(
    public id: string,
    public size: SpotSize,
    public isOccupied = false,
    public vehicle: Vehicle | null = null
  ) {}

  park(vehicle: Vehicle) {
    this.vehicle = vehicle;
    this.isOccupied = true;
  }

  release() {
    this.vehicle = null;
    this.isOccupied = false;
  }
}

class ParkingLevel {
  constructor(public levelNumber: number, public spots: ParkingSpot[]) {}

  findAvailableSpot(size: SpotSize): ParkingSpot | null {
    return this.spots.find(s => !s.isOccupied && s.size >= size) ?? null;
  }
}

class ParkingLot {
  private levels: ParkingLevel[];
  private activeTickets = new Map<string, Ticket>();
  private hourlyRate = 5;

  constructor(levels: ParkingLevel[]) { this.levels = levels; }

  enterVehicle(vehicle: Vehicle): Ticket | null {
    for (const level of this.levels) {
      const spot = level.findAvailableSpot(vehicle.size);
      if (spot) {
        spot.park(vehicle);
        const ticket: Ticket = {
          id: crypto.randomUUID(),
          vehicle, spot,
          entryTime: new Date(),
        };
        this.activeTickets.set(ticket.id, ticket);
        return ticket;
      }
    }
    return null;
  }

  exitVehicle(ticketId: string): Payment | null {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) return null;
    ticket.spot.release();
    this.activeTickets.delete(ticketId);
    const exitTime = new Date();
    const hours = Math.ceil(
      (exitTime.getTime() - ticket.entryTime.getTime()) / 3600000
    );
    return { ticket, exitTime, amount: hours * this.hourlyRate };
  }
}
\`\`\`

## 4. Design Patterns Used
- **Strategy Pattern** for pricing (hourly, daily, weekend rates).
- **Factory Pattern** for creating vehicles.
- **Singleton Pattern** for ParkingLot instance.`,
  },
  {
    id: 8,
    slug: "elevator-system",
    title: "Elevator System",
    type: "LLD",
    description: "Design an elevator control system for a multi-floor building with multiple elevators.",
    difficulty: "Medium",
    content: `# Elevator System — Low Level Design

## 1. Requirements
- Building with N floors and M elevators.
- Users press Up/Down buttons on each floor and select destination inside.
- Efficiently schedule elevators to minimize wait time.
- Handle multiple concurrent requests.

## 2. Class Diagram

\`\`\`
ElevatorSystem
  elevators: Elevator[]
  requestElevator(floor, direction): void

Elevator
  id: number
  currentFloor: number
  direction: Direction (UP, DOWN, IDLE)
  requests: Set<number>
  move(): void
  addRequest(floor): void

Scheduler (Strategy)
  selectElevator(elevators, request): Elevator
\`\`\`

## 3. Scheduling Algorithm — SCAN (Elevator Algorithm)
1. Continue in the current direction, stopping at requested floors.
2. When no more requests in the current direction, reverse.
3. When idle, respond to the nearest request.

## 4. Implementation

\`\`\`ts
enum Direction { UP, DOWN, IDLE }

class Elevator {
  currentFloor = 0;
  direction = Direction.IDLE;
  upStops = new Set<number>();
  downStops = new Set<number>();

  constructor(public id: number) {}

  addRequest(floor: number) {
    if (floor > this.currentFloor) this.upStops.add(floor);
    else if (floor < this.currentFloor) this.downStops.add(floor);
  }

  step() {
    if (this.direction === Direction.UP) {
      this.currentFloor++;
      this.upStops.delete(this.currentFloor);
      if (this.upStops.size === 0) {
        this.direction = this.downStops.size > 0
          ? Direction.DOWN : Direction.IDLE;
      }
    } else if (this.direction === Direction.DOWN) {
      this.currentFloor--;
      this.downStops.delete(this.currentFloor);
      if (this.downStops.size === 0) {
        this.direction = this.upStops.size > 0
          ? Direction.UP : Direction.IDLE;
      }
    }
  }
}

class ElevatorSystem {
  elevators: Elevator[];

  constructor(count: number) {
    this.elevators = Array.from({ length: count }, (_, i) => new Elevator(i));
  }

  request(floor: number, direction: Direction) {
    const best = this.findBestElevator(floor, direction);
    best.addRequest(floor);
    if (best.direction === Direction.IDLE) {
      best.direction = floor > best.currentFloor
        ? Direction.UP : Direction.DOWN;
    }
  }

  private findBestElevator(floor: number, dir: Direction): Elevator {
    let best = this.elevators[0];
    let bestScore = Infinity;
    for (const e of this.elevators) {
      let score = Math.abs(e.currentFloor - floor);
      if (e.direction === Direction.IDLE) score -= 1;
      if (score < bestScore) { bestScore = score; best = e; }
    }
    return best;
  }
}
\`\`\`

## 5. Design Patterns
- **Strategy Pattern** for scheduling algorithms.
- **Observer Pattern** for floor display updates.
- **State Pattern** for elevator states.`,
  },
  {
    id: 9,
    slug: "library-management",
    title: "Library Management System",
    type: "LLD",
    description: "Design an online library management system to manage books, members, borrowing, and returns.",
    difficulty: "Easy",
    content: `# Library Management System — Low Level Design

## 1. Requirements
- Add, remove, search books by title/author/ISBN.
- Register members; support different membership types.
- Borrow and return books with due dates.
- Fine calculation for late returns.
- Reserve books that are currently checked out.

## 2. Class Diagram

\`\`\`
Library
  books: Map<string, Book>
  members: Map<string, Member>
  addBook(book): void
  searchBooks(query): Book[]
  borrowBook(memberId, bookId): Loan
  returnBook(loanId): Fine?

Book
  isbn, title, author, copies, availableCopies

Member
  id, name, type (BASIC, PREMIUM), activeLoans, maxBooks

Loan
  id, book, member, borrowDate, dueDate, returnDate?
\`\`\`

## 3. Implementation

\`\`\`ts
enum MembershipType { BASIC = "BASIC", PREMIUM = "PREMIUM" }

const MAX_BOOKS = { BASIC: 3, PREMIUM: 10 };
const LOAN_DAYS = 14;
const FINE_PER_DAY = 1;

class Library {
  private books = new Map<string, Book>();
  private members = new Map<string, Member>();
  private loans = new Map<string, Loan>();

  addBook(book: Book) { this.books.set(book.isbn, book); }

  searchBooks(query: string): Book[] {
    const q = query.toLowerCase();
    return [...this.books.values()].filter(
      b => b.title.toLowerCase().includes(q) ||
           b.author.toLowerCase().includes(q) ||
           b.isbn.includes(q)
    );
  }

  borrowBook(memberId: string, isbn: string): Loan | null {
    const member = this.members.get(memberId);
    const book = this.books.get(isbn);
    if (!member || !book) return null;
    if (member.activeLoans.length >= MAX_BOOKS[member.type]) return null;
    if (book.availableCopies <= 0) return null;

    book.availableCopies--;
    const loan: Loan = {
      id: crypto.randomUUID(),
      book, member,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + LOAN_DAYS * 86400000),
    };
    member.activeLoans.push(loan);
    this.loans.set(loan.id, loan);
    return loan;
  }

  returnBook(loanId: string): number {
    const loan = this.loans.get(loanId);
    if (!loan) return 0;
    loan.returnDate = new Date();
    loan.book.availableCopies++;
    loan.member.activeLoans = loan.member.activeLoans.filter(
      l => l.id !== loanId
    );
    const overdueDays = Math.max(0, Math.ceil(
      (loan.returnDate.getTime() - loan.dueDate.getTime()) / 86400000
    ));
    return overdueDays * FINE_PER_DAY;
  }
}
\`\`\`

## 4. Design Patterns
- **Observer Pattern** to notify members when reserved books become available.
- **Strategy Pattern** for fine calculation.
- **Repository Pattern** for data access.`,
  },
  {
    id: 10,
    slug: "snake-and-ladder",
    title: "Snake and Ladder Game",
    type: "LLD",
    description: "Design the classic Snake and Ladder board game with support for multiple players.",
    difficulty: "Easy",
    content: `# Snake and Ladder — Low Level Design

## 1. Requirements
- Board of configurable size (default 100 squares).
- Multiple players (2-4) take turns rolling a die.
- Snakes move the player down; ladders move up.
- First player to reach or exceed the final square wins.

## 2. Class Diagram

\`\`\`
Game
  board: Board
  players: Player[]
  currentPlayerIndex: number
  play(): Player (winner)

Board
  size: number
  snakes: Map<number, number>
  ladders: Map<number, number>
  getDestination(position): number

Player { name, position }
Dice { roll(): number }
\`\`\`

## 3. Implementation

\`\`\`ts
class Dice {
  static roll(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}

class Board {
  constructor(
    public size: number,
    public snakes: Map<number, number>,
    public ladders: Map<number, number>
  ) {}

  getDestination(pos: number): number {
    if (this.snakes.has(pos)) return this.snakes.get(pos)!;
    if (this.ladders.has(pos)) return this.ladders.get(pos)!;
    return pos;
  }
}

class Player {
  position = 0;
  constructor(public name: string) {}
}

class Game {
  private currentPlayerIndex = 0;
  private winner: Player | null = null;

  constructor(private board: Board, private players: Player[]) {}

  playTurn(): string {
    const player = this.players[this.currentPlayerIndex];
    const roll = Dice.roll();
    let newPos = player.position + roll;

    if (newPos > this.board.size) {
      this.advanceTurn();
      return player.name + " rolled " + roll + " but stays at " + player.position;
    }

    newPos = this.board.getDestination(newPos);
    player.position = newPos;

    if (newPos === this.board.size) {
      this.winner = player;
      return player.name + " rolled " + roll + " and wins!";
    }

    this.advanceTurn();
    return player.name + " rolled " + roll + ", moved to " + newPos;
  }

  private advanceTurn() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  isOver(): boolean { return this.winner !== null; }
  getWinner(): Player | null { return this.winner; }
}
\`\`\`

## 4. Design Patterns
- **Template Method** for game turn structure.
- **Strategy Pattern** for dice variants.`,
  },
  {
    id: 11,
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    type: "LLD",
    description: "Design the classic Tic Tac Toe game with support for NxN boards and win detection.",
    difficulty: "Easy",
    content: `# Tic Tac Toe — Low Level Design

## 1. Requirements
- NxN board (default 3x3).
- Two players alternate placing X and O.
- Detect win (row, column, diagonal) or draw.
- Validate moves (occupied cell, out of bounds).

## 2. Class Diagram

\`\`\`
Game
  board: Board
  players: [Player, Player]
  currentPlayer: Player
  makeMove(row, col): MoveResult

Board
  size: number
  grid: (string | null)[][]
  place(row, col, symbol): boolean
  checkWin(row, col): boolean
  isFull(): boolean

Player { name, symbol: "X" | "O" }
\`\`\`

## 3. Implementation

\`\`\`ts
type Symbol = "X" | "O";
type GameStatus = "IN_PROGRESS" | "WIN" | "DRAW";

class Board {
  grid: (Symbol | null)[][];
  private moveCount = 0;
  private rows: number[];
  private cols: number[];
  private diag = 0;
  private antiDiag = 0;

  constructor(public size: number) {
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.rows = new Array(size).fill(0);
    this.cols = new Array(size).fill(0);
  }

  place(row: number, col: number, symbol: Symbol): boolean {
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) return false;
    if (this.grid[row][col] !== null) return false;

    this.grid[row][col] = symbol;
    this.moveCount++;

    const val = symbol === "X" ? 1 : -1;
    this.rows[row] += val;
    this.cols[col] += val;
    if (row === col) this.diag += val;
    if (row + col === this.size - 1) this.antiDiag += val;

    return true;
  }

  checkWin(row: number, col: number): boolean {
    const n = this.size;
    return (
      Math.abs(this.rows[row]) === n ||
      Math.abs(this.cols[col]) === n ||
      Math.abs(this.diag) === n ||
      Math.abs(this.antiDiag) === n
    );
  }

  isFull(): boolean { return this.moveCount === this.size * this.size; }
}

class TicTacToe {
  private board: Board;
  private players: [Player, Player];
  private currentIdx = 0;
  private status: GameStatus = "IN_PROGRESS";

  constructor(size = 3, p1Name = "Player 1", p2Name = "Player 2") {
    this.board = new Board(size);
    this.players = [
      { name: p1Name, symbol: "X" },
      { name: p2Name, symbol: "O" },
    ];
  }

  makeMove(row: number, col: number): string {
    if (this.status !== "IN_PROGRESS") return "Game is over.";
    const player = this.players[this.currentIdx];
    if (!this.board.place(row, col, player.symbol)) return "Invalid move.";

    if (this.board.checkWin(row, col)) {
      this.status = "WIN";
      return player.name + " (" + player.symbol + ") wins!";
    }

    if (this.board.isFull()) {
      this.status = "DRAW";
      return "It's a draw!";
    }

    this.currentIdx = 1 - this.currentIdx;
    return player.name + " placed " + player.symbol + " at (" + row + ", " + col + ")";
  }
}

interface Player { name: string; symbol: Symbol; }
\`\`\`

## 4. Key Design Decisions
- **O(1) win detection** using row/col/diagonal counters.
- **Strategy Pattern** possible for AI opponents.`,
  },
  {
    id: 12,
    slug: "vending-machine",
    title: "Vending Machine",
    type: "LLD",
    description: "Design a vending machine system with inventory management, payment processing, and state management.",
    difficulty: "Medium",
    content: `# Vending Machine — Low Level Design

## 1. Requirements
- Display available products with prices.
- Accept coins/bills and track balance.
- Dispense selected product if sufficient balance.
- Return change.
- Handle out-of-stock items.
- Admin: refill products, collect money.

## 2. States (State Machine)
\`\`\`
IDLE -> (insert money) -> HAS_MONEY -> (select product) -> DISPENSING -> IDLE
                            |
                      (cancel) -> RETURNING_CHANGE -> IDLE
\`\`\`

## 3. Class Diagram

\`\`\`
VendingMachine
  state: State
  inventory: Map<string, Product>
  balance: number
  insertMoney(amount): void
  selectProduct(code): DispenseResult
  cancel(): number
  refill(code, quantity): void

Product { code, name, price, quantity }
\`\`\`

## 4. Implementation

\`\`\`ts
interface Product {
  code: string;
  name: string;
  price: number;
  quantity: number;
}

type DispenseResult =
  | { success: true; product: Product; change: number }
  | { success: false; message: string };

class VendingMachine {
  private inventory = new Map<string, Product>();
  private balance = 0;

  addProduct(product: Product) {
    this.inventory.set(product.code, { ...product });
  }

  insertMoney(amount: number): number {
    if (amount <= 0) return this.balance;
    this.balance += amount;
    return this.balance;
  }

  selectProduct(code: string): DispenseResult {
    const product = this.inventory.get(code);
    if (!product) return { success: false, message: "Invalid product code." };
    if (product.quantity <= 0)
      return { success: false, message: product.name + " is out of stock." };
    if (this.balance < product.price)
      return { success: false, message: "Insufficient balance." };

    product.quantity--;
    const change = this.balance - product.price;
    this.balance = 0;
    return { success: true, product, change };
  }

  cancel(): number {
    const refund = this.balance;
    this.balance = 0;
    return refund;
  }

  getBalance(): number { return this.balance; }
  getProducts(): Product[] { return [...this.inventory.values()]; }

  refill(code: string, quantity: number) {
    const product = this.inventory.get(code);
    if (product) product.quantity += quantity;
  }
}
\`\`\`

## 5. Design Patterns
- **State Pattern** for machine states (Idle, HasMoney, Dispensing).
- **Singleton Pattern** for the machine instance.
- **Command Pattern** for operations.`,
  },
];

// ─── Behavioral Questions ────────────────────────────────────────────────────

export const behavioralQuestions: BehavioralQuestion[] = [
  {
    id: 1,
    question: "Tell me about a time you led a project that faced significant obstacles.",
    category: "Leadership",
    sampleAnswer: `**Situation:** I was the tech lead on a payments migration project. Two weeks before the deadline, a critical third-party API we depended on announced deprecation of the endpoints we had built against.

**Task:** I needed to re-architect the integration layer while keeping the team on track and stakeholders informed.

**Action:** I called an emergency planning session, broke the new work into parallel streams, and reassigned tasks based on each engineer's strengths. I personally took on the most uncertain integration piece and set up daily 15-minute syncs to track blockers. I communicated a revised timeline to product and negotiated a one-week extension.

**Result:** We delivered just three days past the original deadline. The new integration was actually more robust, reducing payment failures by 15%. The VP of Engineering cited it as a model for crisis management.`,
    tips: [
      "Focus on YOUR leadership actions, not just the team's work.",
      "Show how you adapted your plan when things went wrong.",
      "Quantify the outcome where possible.",
    ],
  },
  {
    id: 2,
    question: "Describe a time you had to make a difficult technical decision with limited information.",
    category: "Leadership",
    sampleAnswer: `**Situation:** Our startup needed to choose between serverless versus containers for a new real-time analytics pipeline. We had limited benchmarking data and a tight 6-week deadline.

**Task:** As the senior engineer, I had to make the architectural recommendation.

**Action:** I spent two days building minimal prototypes of both approaches, focusing on our two highest-risk scenarios: cold start latency and sustained throughput. I documented trade-offs in a decision matrix and presented it to the team, being transparent about what we still didn't know. I recommended serverless with a fallback plan.

**Result:** The serverless approach worked well for 90% of our use cases. For the one high-throughput pipeline, we migrated to containers as planned. Having the fallback plan gave the team confidence and we shipped on time.`,
    tips: [
      "Demonstrate a structured decision-making process.",
      "Acknowledge uncertainty honestly.",
      "Show you had contingency plans.",
    ],
  },
  {
    id: 3,
    question: "Tell me about a time you mentored someone and helped them grow.",
    category: "Leadership",
    sampleAnswer: `**Situation:** A junior developer on my team was struggling with code reviews -- their PRs frequently had architectural issues and they were becoming discouraged by the feedback.

**Task:** I wanted to help them level up while maintaining their confidence and motivation.

**Action:** I set up weekly 1-on-1 pairing sessions where we would work through design decisions together before they wrote code. I started reviewing their PRs in person rather than just leaving comments. I also assigned them ownership of a well-scoped feature.

**Result:** Within two months, the quality of their PRs improved dramatically -- review rounds dropped from 4 to 1.5. They successfully led a feature end-to-end and were promoted to mid-level six months later.`,
    tips: [
      "Show genuine investment in others' development.",
      "Describe specific techniques you used, not just general mentoring.",
      "Include the mentee's perspective if possible.",
    ],
  },
  {
    id: 4,
    question: "Describe a situation where you had a conflict with a coworker. How did you resolve it?",
    category: "Conflict Resolution",
    sampleAnswer: `**Situation:** A fellow senior engineer and I disagreed strongly on whether to adopt GraphQL or stick with REST for our new customer-facing API. The discussion in Slack was becoming tense.

**Task:** I needed to resolve the disagreement constructively and arrive at the best technical decision.

**Action:** I suggested we take the conversation offline into a 1-on-1 video call. I started by acknowledging the valid points in their argument. We agreed to evaluate both approaches against specific criteria: team familiarity, client requirements, and maintenance cost. We wrote up a joint RFC.

**Result:** We ended up going with GraphQL for the customer portal and REST for internal services. The joint RFC was well-received and the collaboration strengthened our working relationship.`,
    tips: [
      "Never badmouth the other person -- show respect throughout.",
      "Demonstrate active listening and empathy.",
      "Focus on finding the best solution, not winning the argument.",
    ],
  },
  {
    id: 5,
    question: "Tell me about a time you received harsh feedback. How did you handle it?",
    category: "Conflict Resolution",
    sampleAnswer: `**Situation:** During a sprint retrospective, my manager publicly pointed out that a system I designed had caused two production incidents in a month.

**Task:** I needed to handle the feedback professionally and address the underlying issues.

**Action:** I thanked them for the feedback and acknowledged the incidents. After the meeting, I scheduled a private 1-on-1 to understand the specifics. I created a remediation plan with better alerting, circuit breakers, and a post-mortem process. I also privately told my manager I'd appreciate critical feedback in 1-on-1s.

**Result:** The system ran incident-free for the next six months. My manager appreciated both the improvements and my candid feedback about delivery.`,
    tips: [
      "Show emotional maturity -- don't get defensive.",
      "Separate the delivery from the substance of the feedback.",
      "Demonstrate that you took actionable steps.",
    ],
  },
  {
    id: 6,
    question: "Describe a time when you disagreed with your manager's decision.",
    category: "Conflict Resolution",
    sampleAnswer: `**Situation:** My manager decided to skip writing tests for a major feature to meet a deadline.

**Task:** I believed this was risky and wanted to advocate for quality without being insubordinate.

**Action:** I prepared data from our last two launches showing that untested features had 3x more post-launch bugs. I proposed a compromise: write tests for the critical payment paths and defer tests for the UI layer. I framed it as risk management.

**Result:** My manager accepted the compromise. We launched on time with the critical paths tested. Post-launch, we had zero payment bugs versus three on the previous launch.`,
    tips: [
      "Always 'disagree and commit' if the final decision goes against you.",
      "Use data and specific examples, not opinions.",
      "Propose alternatives rather than just objecting.",
    ],
  },
  {
    id: 7,
    question: "Tell me about a time you worked with a cross-functional team to deliver a project.",
    category: "Teamwork",
    sampleAnswer: `**Situation:** I was part of a cross-functional team including engineering, design, product, and data science to build a recommendation engine for our e-commerce platform.

**Task:** As the backend lead, I needed to coordinate with the ML team on model serving, the frontend team on API contracts, and product on requirements.

**Action:** I organized a kick-off where each team shared constraints. I created a shared technical spec and API contract early so teams could work in parallel. When the ML team's model was delayed, I built a rule-based fallback so frontend development wasn't blocked.

**Result:** We shipped the recommendation engine two days early. It increased click-through rates by 23% and average order value by 8%.`,
    tips: [
      "Highlight YOUR specific coordination efforts.",
      "Show you proactively removed blockers for other teams.",
      "Mention measurable business impact.",
    ],
  },
  {
    id: 8,
    question: "Describe a time when a teammate wasn't pulling their weight. What did you do?",
    category: "Teamwork",
    sampleAnswer: `**Situation:** A teammate on a four-person project was consistently missing sprint commitments and not attending standups.

**Task:** I wanted to address the situation fairly without damaging the team dynamic.

**Action:** I had a private, empathetic conversation asking if everything was okay. They revealed they were dealing with a family health issue. Together, we re-scoped their work to smaller tickets. I paired with them on the hardest task. I suggested they talk to our manager about temporary flexibility.

**Result:** Their productivity recovered within a week. They completed all re-scoped tasks on time. The project delivered on schedule.`,
    tips: [
      "Lead with empathy -- don't assume laziness.",
      "Try direct peer conversation before escalating.",
      "Focus on solutions, not blame.",
    ],
  },
  {
    id: 9,
    question: "Tell me about a time you helped your team through a tough deadline.",
    category: "Teamwork",
    sampleAnswer: `**Situation:** Three weeks before a major product launch, we discovered that a critical data migration was far more complex than estimated. The team was stressed and morale was low.

**Task:** I needed to help the team deliver without compromising quality or burning people out.

**Action:** I facilitated a re-planning session to identify must-haves versus nice-to-haves. I negotiated with product to defer two non-critical features. I reorganized pair programming sessions and took the on-call rotation myself so others could focus.

**Result:** We launched on time with all critical features. The deferred features shipped the following sprint. No one worked more than 50 hours in any week.`,
    tips: [
      "Show how you protected the team, not just delivered the project.",
      "Demonstrate prioritization skills.",
      "Mention work-life balance considerations.",
    ],
  },
  {
    id: 10,
    question: "Describe a complex technical problem you solved. Walk me through your approach.",
    category: "Problem Solving",
    sampleAnswer: `**Situation:** Our API response times spiked from 50ms to 3 seconds during peak traffic, causing timeouts for 20% of users.

**Task:** I needed to diagnose and fix the performance regression quickly.

**Action:** I checked the deployment diff -- no obvious issues. I used distributed tracing (Jaeger) to find the bottleneck: a new database query was doing a full table scan on a 50M row table. I added the missing composite index, verified with EXPLAIN ANALYZE, and deployed. I then added a query performance test to our CI pipeline.

**Result:** Response times dropped back to 40ms. The CI check caught two more unindexed queries in the following month before they reached production.`,
    tips: [
      "Walk through your debugging methodology step by step.",
      "Show how you used tools and data, not just intuition.",
      "Include preventative measures you put in place.",
    ],
  },
  {
    id: 11,
    question: "Tell me about a time you had to learn a new technology quickly to deliver a project.",
    category: "Problem Solving",
    sampleAnswer: `**Situation:** Our team was tasked with building a real-time notification system using Apache Kafka. I had no prior Kafka experience.

**Task:** I had two weeks to learn Kafka well enough to design and implement a production-grade notification pipeline.

**Action:** I spent the first three days going through official docs and building a local prototype. I reached out to engineers at a partner company for two video calls. By day five, I had a working prototype. I shared my design with the team and iterated based on feedback.

**Result:** The notification system launched on schedule, handling 10K messages/second. I wrote internal docs and gave a lunch-and-learn session.`,
    tips: [
      "Show your learning strategy -- be specific about resources and methods.",
      "Demonstrate you sought expert help when appropriate.",
      "Highlight knowledge sharing after learning.",
    ],
  },
  {
    id: 12,
    question: "Describe a time you identified and fixed a problem before it became critical.",
    category: "Problem Solving",
    sampleAnswer: `**Situation:** While reviewing our cloud billing dashboard, I noticed S3 storage costs were growing 40% month-over-month, far exceeding our user growth rate.

**Task:** I wanted to investigate and address the cost issue before it became a budget problem.

**Action:** I audited our S3 buckets and discovered our logging pipeline was storing uncompressed debug logs indefinitely -- over 8TB. I implemented gzip compression, lifecycle policies (Glacier after 30 days, delete after 90), and added a cost anomaly alert.

**Result:** Storage costs dropped 65% the following month, saving approximately $4,000/month. The anomaly alert caught another cost spike two months later.`,
    tips: [
      "Show proactive ownership -- you noticed, not someone told you.",
      "Demonstrate business awareness (cost impact).",
      "Include monitoring/alerting you set up to prevent recurrence.",
    ],
  },
  {
    id: 13,
    question: "Tell me about a time you had to explain a complex technical concept to a non-technical audience.",
    category: "Communication",
    sampleAnswer: `**Situation:** The sales team was struggling to explain our API rate limiting to enterprise clients.

**Task:** I needed to create a clear explanation and help the sales team communicate it effectively.

**Action:** I created a water faucet analogy: "Your API access is like a faucet. You can fill a glass at a certain rate. If you try to fill too fast, the faucet slows down to protect the building's water pressure." I built a one-page visual guide and did a training session with the sales team.

**Result:** Customer complaints about rate limiting dropped by 70%. Two enterprise deals closed partly because of the improved communication.`,
    tips: [
      "Use relatable analogies -- avoid jargon entirely.",
      "Show you tailored the explanation to the audience.",
      "Demonstrate that you created lasting resources.",
    ],
  },
  {
    id: 14,
    question: "Describe a time you had to present a technical proposal and get buy-in.",
    category: "Communication",
    sampleAnswer: `**Situation:** I wanted to migrate our monolithic application to microservices, but leadership was skeptical.

**Task:** I needed to build a compelling case and get approval.

**Action:** I wrote a detailed RFC covering pain points, proposed architecture, migration strategy (strangler fig pattern), and risk mitigation. I included cost projections and a timeline. I presented to leadership with a live demo of a proof-of-concept microservice handling 10x the traffic.

**Result:** The proposal was approved. We migrated three critical services in Q1, reducing deploy time from 45 minutes to 3 minutes per service. The full migration completed over 9 months.`,
    tips: [
      "Show preparation -- written proposals carry more weight than verbal pitches.",
      "Address objections proactively.",
      "Include proof-of-concept or data when possible.",
    ],
  },
  {
    id: 15,
    question: "Tell me about a time you had to give difficult feedback to a peer.",
    category: "Communication",
    sampleAnswer: `**Situation:** A fellow senior engineer's code reviews were excessively harsh. Junior developers were intimidated and some avoided submitting PRs.

**Task:** I felt responsible for team health and wanted to address this constructively.

**Action:** I invited them for coffee and started with genuine appreciation for their thoroughness. Then I shared specific examples of demoralizing comments. I suggested separating "must-fix" from "consider" in reviews. I offered to pair-review a few PRs together to calibrate.

**Result:** After pair-reviewing three PRs, they adjusted their style. A junior dev later mentioned reviews had become much more helpful. The engineer thanked me a month later.`,
    tips: [
      "Lead with positive intent and appreciation.",
      "Use specific examples, not generalizations.",
      "Offer to help -- don't just point out the problem.",
    ],
  },
  {
    id: 16,
    question: "Tell me about a time you had to adapt to a major change at work.",
    category: "Adaptability",
    sampleAnswer: `**Situation:** Midway through a quarter, our company pivoted from B2C to B2B. The entire product roadmap was scrapped.

**Task:** I needed to redirect my team's energy toward the new B2B focus without losing momentum.

**Action:** I facilitated a team discussion to process the change openly. I mapped our skills to B2B priorities and identified the admin dashboard as the best fit. I reframed the narrative: our social feed work had taught us real-time data patterns that were directly applicable.

**Result:** The team transitioned smoothly and shipped the first admin dashboard in three weeks. We became the fastest team to deliver on the new B2B roadmap.`,
    tips: [
      "Acknowledge the emotional impact of change.",
      "Show how you helped others adapt, not just yourself.",
      "Reframe challenges as opportunities authentically.",
    ],
  },
  {
    id: 17,
    question: "Describe a time you failed. What did you learn?",
    category: "Adaptability",
    sampleAnswer: `**Situation:** I was responsible for migrating our authentication system from session-based to JWT tokens. I underestimated the complexity and pushed to launch without sufficient testing.

**Task:** The launch resulted in a two-hour outage where 30% of users couldn't log in due to token refresh issues.

**Action:** I immediately rolled back and took full ownership in the incident review. I identified three root causes: insufficient load testing, no canary deployment, and missing monitoring. The second rollout was phased over three days with automatic rollback triggers.

**Result:** The second migration was flawless. I established a migration playbook used for three subsequent migrations without incident.`,
    tips: [
      "Choose a real failure -- interviewers see through fake ones.",
      "Take ownership without excessive self-flagellation.",
      "Emphasize specific lessons learned and changes you made.",
    ],
  },
  {
    id: 18,
    question: "Tell me about a time you had to work with ambiguous requirements.",
    category: "Adaptability",
    sampleAnswer: `**Situation:** A VP asked our team to "build something that helps us understand customer churn" with no further specification.

**Task:** I needed to turn this vague ask into a concrete, deliverable project.

**Action:** I interviewed five stakeholders to understand what "understanding churn" meant to each. I identified three common needs and wrote a one-page proposal with three milestones, starting with the simplest (dashboard) to deliver value quickly. I set up weekly demos to validate.

**Result:** The dashboard shipped in two weeks and immediately surfaced that customers who didn't use a specific feature in the first week had 5x churn rates. This led to an onboarding improvement that reduced churn by 12%.`,
    tips: [
      "Show comfort with ambiguity -- don't complain about unclear requirements.",
      "Demonstrate stakeholder management and requirement gathering skills.",
      "Start small, iterate, and validate.",
    ],
  },
  {
    id: 19,
    question: "Describe a time you went above and beyond what was expected.",
    category: "Problem Solving",
    sampleAnswer: `**Situation:** I was asked to fix a bug in our search feature where certain queries returned zero results. The fix was straightforward -- a missing index.

**Task:** While fixing it, I noticed the entire search infrastructure had several issues beyond the reported bug.

**Action:** After fixing the immediate bug (30 minutes), I spent the rest of the week auditing the entire search pipeline. I found that relevance scoring was poorly configured, auto-complete had a 2-second delay, and search analytics were not being tracked. I fixed all three and set up an A/B test.

**Result:** Search conversion rate improved by 35%. Auto-complete became near-instant. The analytics revealed that 15% of searches returned no results, leading to a catalog review.`,
    tips: [
      "Show initiative and ownership beyond the ticket.",
      "Demonstrate business awareness -- connect your work to outcomes.",
      "Don't make it sound like you ignore priorities.",
    ],
  },
  {
    id: 20,
    question: "Tell me about a time you had to balance multiple competing priorities.",
    category: "Communication",
    sampleAnswer: `**Situation:** I was simultaneously responsible for a critical security patch (deadline: 3 days), a feature for an enterprise client demo (deadline: 1 week), and supporting a junior engineer's onboarding.

**Task:** I needed to deliver all three without dropping any balls.

**Action:** I prioritized by impact and urgency: security patch was P0. I blocked two days for the patch. I delegated the initial data modeling for the enterprise feature to the junior engineer -- serving double duty as onboarding. I spent afternoons pairing with them. I communicated timelines clearly to all stakeholders.

**Result:** Security patch shipped in 1.5 days. The enterprise feature was 100% ready for the demo. The junior engineer said the real project work was more valuable than any onboarding docs.`,
    tips: [
      "Show a clear prioritization framework (urgency vs. impact).",
      "Demonstrate delegation and trust in others.",
      "Communicate expectations proactively to stakeholders.",
    ],
  },
];
