/*
Напишіть функцію, яка приймає два числа і повертає їх суму.

Напишіть функцію, яка приймає рядок і повертає його в верхньому регістрі.

Напишіть функцію, яка приймає масив чисел і повертає новий масив з квадратами цих чисел.
 */


function calc(num1,num2){
    return num1+num2;
}

function upper(text){
    return text.toUpperCase();
}

function powArray(arr){
    return arr.map(elem => Math.pow(elem,2));
}

console.log(calc(2,3));
console.log(upper("hello"));
console.log(powArray([2,3,4]));
