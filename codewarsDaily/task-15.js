/*
In this kata, your task is to create all permutations of a non-empty input string and remove duplicates, if present.

Create as many "shufflings" as you can!

Examples:

With input 'a':
Your function should return: ['a']

With input 'ab':
Your function should return ['ab', 'ba']

With input 'abc':
Your function should return ['abc','acb','bac','bca','cab','cba']

With input 'aabb':
Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
*/

function permutations(string) {
	if (string.length == 1){
    return [string];
  }
  let permutArr = [];
  for(let i = 0;i<string.length;i++){
    let char = string[i];
    let rest = string.slice(0,i) + string.slice(i + 1);
    let subPermut = permutations(rest);
    for (let sub of subPermut){
      permutArr.push(char + sub);
    }
  }
  return [...new Set(permutArr)];
}