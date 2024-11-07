/*
Створіть об'єкт, який представляє книгу з властивостями title, author та year.

Додайте нову властивість genre до об'єкта книги.

Видаліть властивість year з об'єкта книги.

*/

const book = {
    title : 'Inferno',
    author : 'Dan Brown',
    year : 2013
  }
  
book.genre = "Detective novel";
delete book.year;