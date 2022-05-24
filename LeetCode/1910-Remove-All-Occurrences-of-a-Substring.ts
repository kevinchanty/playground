// Given two strings s and part, perform the following operation on s until all occurrences of the substring part are removed:

//     Find the leftmost occurrence of the substring part and remove it from s.

// Return s after removing all occurrences of part.

// A substring is a contiguous sequence of characters in a string.

// Example 1:

// Input: s = "daabcbaabcbc", part = "abc"
// Output: "dab"
// Explanation: The following operations are done:
// - s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
// - s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
// - s = "dababc", remove "abc" starting at index 3, so s = "dab".
// Now s has no occurrences of "abc".

// Example 2:

// Input: s = "axxxxyyyyb", part = "xy"
// Output: "ab"
// Explanation: The following operations are done:
// - s = "axxxxyyyyb", remove "xy" starting at index 4 so s = "axxxyyyb".
// - s = "axxxyyyb", remove "xy" starting at index 3 so s = "axxyyb".
// - s = "axxyyb", remove "xy" starting at index 2 so s = "axyb".
// - s = "axyb", remove "xy" starting at index 1 so s = "ab".
// Now s has no occurrences of "xy".

// Constraints:

//     1 <= s.length <= 1000
//     1 <= part.length <= 1000
//     s​​​​​​ and part consists of lowercase English letters.

function removeOccurrences1(s: string, part: string): string {
    let pL = part.length;
  
    let startMatch = 0;
    let matching = false;
    let matchIndex = 0;
  
    for (let i = 0; i < s.length; i++) {
      if (matching) {
        matchIndex++;
        if (s[i] === part[matchIndex]) {
          if (matchIndex === pL - 1) {
            s.slice(startMatch, startMatch + pL);
            s = s.substring(0, startMatch) + s.substring(startMatch + pL);
            return removeOccurrences1(s, part);
          }
        } else {
          if (s[i] === part[0]) {
            matching = true;
            startMatch = i;
            matchIndex = 0;
          } else {
            matching = false;
            matchIndex = 0;
          }
        }
      } else {
        if (s[i] === part[0]) {
          if (pL === 1) {
            startMatch = i;
            s = s.substring(0, startMatch) + s.substring(startMatch + pL);
            return removeOccurrences1(s, part);
          } else {
            matching = true;
            startMatch = i;
          }
        }
      }
    }
    return s;
  }
  
  function removeOccurrences2(s: string, part: string): string {
    let pL = part.length;
  
    const searchResult = s.search(part);
    if (searchResult === -1) {
      return s;
    } else {
      const stripped =
        s.substring(0, searchResult) + s.substring(searchResult + pL);
      s = removeOccurrences2(stripped, part);
    }
  
    return s;
  }
  
  const removeOccurrences3 = (s: string, part: string): string => {
    while (s.includes(part)) s = s.replace(part, "");
    return s;
  };
  
  function removeOccurrences(s: string, part: string): string {
    let pL = part.length;
  
    while (s.includes(part)) {
      const searchResult = s.search(part);
      if (searchResult === -1) {
        return s;
      } else {
        const stripped = (s =
          s.substring(0, searchResult) + s.substring(searchResult + pL));
      }
    }
  
    return s;
  }
  
  console.log(
    removeOccurrences(
      "wwwwwwwwwwwwwwwwwwwwwvwwwwswxwwwwsdwxweeohapwwzwuwajrnogb",
      "w"
    )
  );
  