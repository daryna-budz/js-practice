/*
Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.

Example:

Given an input string of:

apples, pears # and bananas
grapes
bananas !apples
The output expected would be:

apples, pears
grapes
bananas
*/




function solution(text, markers) {
    let regex = new RegExp(`\\s*[${markers.map(marker => '\\' + marker).join('')}]`);
    let newText = text.split('\n').map(line => line.split(regex)[0].trimEnd());
    return newText.join('\n');
  }