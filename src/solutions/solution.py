def tribonacci(n):
    table = [0] * 40
    if n == 0:
        return 0
    elif n == 1:
        return 1
    elif n == 2:
        return 1
    else:
        table[0] = 0
        table[1] = 1
        table[2] = 1
        for i in range(3, n + 1):
            table[i] = table[i - 1] + table[i - 2] + table[i - 3]
        return table[n]

if __name__ == "__main__":
    a = [0]  
    a[0] = int(input())  
    print(tribonacci(a[0]))





















# def length_of_longest_substring(s: str) -> int:
#     char_index_map = {}  # To store the last index of each character
#     max_length = 0  # To store the maximum length
#     start = 0  # Start index of the current window

#     for i, char in enumerate(s):
#         # If the character is already in the map and within the current window
#         if char in char_index_map and char_index_map[char] >= start:
#             start = char_index_map[char] + 1  # Move the start of the window

#         # Update the character's last index in the map
#         char_index_map[char] = i

#         # Update the maximum length
#         max_length = max(max_length, i - start + 1)

#     return max_length


# if __name__ == "__main__":
#     s = []
#     s.append(input())  # Input as an array, similar to your C++ version

#     result = length_of_longest_substring(s[0])
#     print(result)









# def longest_palindrome(s: str) -> str:
#     n = len(s)
#     if n == 0:
#         return ""

#     # Start and length of the longest palindromic substring
#     start = 0
#     max_length = 1

#     # Dynamic Programming table
#     dp = [[False] * n for _ in range(n)]

#     # All substrings of length 1 are palindromes
#     for i in range(n):
#         dp[i][i] = True

#     # Check substrings of length 2
#     for i in range(n - 1):
#         if s[i] == s[i + 1]:
#             dp[i][i + 1] = True
#             start = i
#             max_length = 2

#     # Check substrings of length 3 or more
#     for length in range(3, n + 1):  # Length of substring
#         for i in range(n - length + 1):
#             j = i + length - 1  # End of the current substring

#             if s[i] == s[j] and dp[i + 1][j - 1]:
#                 dp[i][j] = True
#                 start = i
#                 max_length = length

#     return s[start:start + max_length]


# if __name__ == "__main__":
#     s = []
#     s.append(input())
#     result = longest_palindrome(s[0])
#     print(result)




















def tribonacci(n):
    # Initialize the table with sufficient size
    table = [0] * 40
    if n == 0:
        return 0
    elif n == 1:
        return 1
    elif n == 2:
        return 1
    else:
        table[0] = 0
        table[1] = 1
        table[2] = 1
        for i in range(3, n + 1):
            table[i] = table[i - 1] + table[i - 2] + table[i - 3]
        return table[n]

if __name__ == "__main__":
    a = [0]  # Define an array to mimic the C++ array input
    a[0] = int(input())  # Input a single value
    print(tribonacci(a[0]))


































# def tribonacci(n):
#     # Create a list to store Tribonacci numbers up to `n`
#     table = [0] * 40
#     if n == 0:
#         return 0
#     elif n == 1 or n == 2:
#         return 1
#     else:
#         table[0], table[1], table[2] = 0, 1, 1
#         for i in range(3, n + 1):
#             table[i] = table[i - 1] + table[i - 2] + table[i - 3]
#         return table[n]

# if __name__ == "__main__":
#     # Take input from the user
#     a = int(input())
#     print(tribonacci(a))
