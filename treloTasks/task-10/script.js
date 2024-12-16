/*
Завдання: Розробка мульти-табової синхронізації стану за допомогою LocalStorage/SessionStorage
Мета: Розробити систему, яка дозволяє синхронізувати стан користувача між кількома вкладками браузера в реальному часі, використовуючи LocalStorage та/або SessionStorage.

Технічні вимоги:
Ініціалізація стану:

Створіть простий об'єкт стану, який може включати користувацькі налаштування, такі як тема інтерфейсу, мовні налаштування, або статус логіна.

Ініціалізуйте цей стан у LocalStorage або SessionStorage при першому відкритті вкладки.

Синхронізація стану між вкладками:

Реалізуйте механізм, який слухає зміни у LocalStorage або SessionStorage (використовуючи події storage).

При зміні даних у одній вкладці автоматично оновлюйте стан у всіх інших відкритих вкладках.

Інтерфейс користувача:

Розробіть простий інтерфейс користувача, де можна змінювати стан (наприклад, змінити тему або мову).

Відобразіть актуальний стан у всіх вкладках браузера в реальному часі.

Обробка помилок і обмежень:

Забезпечте обробку помилок, наприклад, коли LocalStorage досягає ліміту квоти.

Реалізуйте fallback для старіших браузерів, які можливо не підтримують LocalStorage або SessionStorage.

Додаткові завдання для розширення проекту:
Автоматичне видалення старих даних: Розробіть механізм для очищення застарілих або неактивних даних зі сховища.

Захист даних: Впровадіть шифрування даних перед їх зберіганням у LocalStorage/SessionStorage для підвищення безпеки. */


let state = {
    theme: "light",     //об'єкт стану  
    language: "en",            
};

if (!localStorage.getItem("state")){
    localStorage.setItem("state", JSON.stringify(state)); //перевірка чи є state в localStorage(якщо немає то додаємо)
}

state = JSON.parse(localStorage.getItem("state"));

const button = document.getElementById("button");
const body = document.body;

//оновлення ui
function updateTheme() {
    if (state.theme === "dark") {
        button.classList.add("dark");
        body.classList.add("dark-bg");
    } else {
        button.classList.add("light");
        body.classList.add("light-bg");
    }
};

updateTheme();

//зміна теми при кліці на кнопку
button.addEventListener("click", function() {
    if (state.theme === "dark") {
        state.theme = "light";
        button.classList.remove("dark");
        body.classList.remove("dark-bg");
    } else {
        state.theme = "dark";
        button.classList.remove("light");
        body.classList.remove("light-bg");
    }
    button.classList.add(state.theme);
    body.classList.add(`${state.theme}-bg`);
    
    //зберігання стану в localStorage
    localStorage.setItem("state", JSON.stringify(state));
});

//синхронізування між вкладками
window.addEventListener('storage', function(event) {
    if (event.key === 'state' && event.newValue !== null) {
        try {
            state = JSON.parse(event.newValue);
            updateTheme();  
        } catch (error) {
            console.error("Error parsing state from LocalStorage:", error);
        } 
    }
});

