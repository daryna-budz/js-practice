/* Завдання:

Реалізуйте систему управління бібліотекою книг. Створіть конструктор Book, який має властивості title, author, і year. Потім створіть конструктор EBook, який наслідує Book і додає властивість fileSize та метод для завантаження книги. Додайте метод для виведення інформації про книгу (title і author) в прототип Book і переконайтесь, що EBook успадковує цей метод.

Вимоги:

Використовуйте прототипи для наслідування.

Додайте метод для виведення інформації про книгу до прототипу Book.

Створіть метод для завантаження електронної книги в конструкторі EBook.

Переконайтесь, що метод для виведення інформації про книгу працює для об'єктів EBook. */

class Book{
    constructor(title,author,year){
        this.title = title;
        this.author = author;
        this.year = year;
    }
    printInfo(){
        console.log(`The book is ${this.title} and the author is ${this.author}`);
    }
}


class EBook extends Book{
    constructor(title, author, year, fileSize){
        super(title, author, year);
        this.fileSize = fileSize;
    }
    
    downloadBook(){
        console.log(`The book ${this.title} is downloaded`);
    }
}