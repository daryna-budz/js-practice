/**
 
Створіть асинхронну функцію, яка повертає "Hello, World!" через 1 секунду.

Викличте цю функцію і виведіть результат в консоль.

Використовуйте try/catch для обробки помилки в асинхронній функції, яка кидає помилку.

 */

async function func(){
    return new Promise((resolve) => {
        setTimeout(() => resolve ("Hello, World!"),1000)
    });
}

async function errorFunc(){
    throw new Error("Error");
}

(async () => {
    try{
        const msg = await func();
        console.log(msg);
        await errorFunc();
    }catch(error){
        console.error(error.message)
    }
})()