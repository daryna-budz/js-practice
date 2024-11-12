/*
Write a function that returns a string in which firstname is swapped with last name.

Example(Input --> Output)

"john McClane" --> "McClane john"
*/


function nameShuffler(str){
    let arr = str.split(" ");
    let temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
    return arr.join(" ").toString();
  }