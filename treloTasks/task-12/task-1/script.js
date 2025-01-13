/*
Завдання 1: Динамічний контент-редактор з використанням DOM API і localStorage/sessionStorage
Опис завдання: Створіть веб-додаток, який дозволяє користувачам створювати, редагувати та зберігати текстовий контент у браузері з можливістю відновлення після перезавантаження сторінки.
Технічні вимоги:

Створення контенту: Використовуючи DOM API, дозвольте користувачам додавати нові текстові блоки на сторінку з використанням різних HTML тегів (наприклад, p, h1, h2).

Редагування контенту: Імплементуйте інтерфейс для редагування тексту прямо на сторінці, включаючи стилізацію тексту (жирний, курсив тощо).

Збереження та відновлення стану: Використовуйте localStorage або sessionStorage для збереження стану сторінки. Забезпечте можливість відновлення збереженого контенту після перезавантаження сторінки.
*/

const tagSelector = document.getElementById("add-tag");
const addBtn = document.getElementById("add-button");
const contentArea = document.getElementById("content-area");

addBtn.addEventListener("click", () => {
  const tag = tagSelector.value;
  const newBlock = document.createElement(tag);
  newBlock.contentEditable = "true";
  newBlock.textContent = "Натисніть, щоб редагувати";
  newBlock.classList.add("content-block");
  contentArea.appendChild(newBlock);
  saveContent();
});

function saveContent() {
    localStorage.setItem("content", contentArea.innerHTML);
}

window.addEventListener("load", () => {
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
      contentArea.innerHTML = savedContent;
      const blocks = contentArea.querySelectorAll(".content-block");
      blocks.forEach((block) => {
        block.contentEditable = "true";
      });
    }
});


function toggleStyle(tagName) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const parent = range.commonAncestorContainer.parentNode;

    if (parent && parent.classList.contains(tagName)) {
        parent.classList.remove(tagName); 
    } else {
        parent.classList.add(tagName);
    }
}


const toolbar = document.querySelector(".toolbar");

const boldBtn = document.createElement("button");
boldBtn.textContent = "Жирний";
boldBtn.addEventListener("click", () => toggleStyle("bold"));

const italicBtn = document.createElement("button");
italicBtn.textContent = "Курсив";
italicBtn.addEventListener("click", () => toggleStyle("italic"));

toolbar.appendChild(boldBtn);
toolbar.appendChild(italicBtn);


  
  