/*
Завдання 1: Чат-додаток із використанням WebSockets
Опис завдання: Створіть чат-додаток, який дозволяє користувачам спілкуватися в реальному часі. Використовуйте WebSockets для забезпечення двостороннього зв'язку між клієнтами та сервером.

Технічні вимоги:

Створення WebSocket-сервера: Реалізуйте сервер, який може обробляти множину одночасних підключень користувачів.

Інтерфейс користувача для чату: Використовуйте HTML/CSS/JS для створення користувацького інтерфейсу, де користувачі можуть вводити та отримувати повідомлення.

Безпека з'єднань: Забезпечте безпеку зв'язку через SSL/TLS і розгляньте міркування безпеки, такі як XSS та CSRF захисти.

Повідомлення про статус: Додайте функціональність, щоб користувачі могли бачити, чи є інші користувачі онлайн.
*/

const ws = new WebSocket('ws://localhost:3000');

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');


const userId = Math.random().toString(36).slice(2, 9); 
ws.onmessage = async (event) => {
    let messageText;

    if (event.data instanceof Blob) {
        messageText = await event.data.text();
    } else {
        messageText = event.data;
    }

    try {
        const messageData = JSON.parse(messageText); 
        const message = document.createElement('div');

        
        if (messageData.userId === userId) {
            message.className = 'message my-message';
        } else {
            message.className = 'message other-message';
        }

        message.textContent = messageData.text; 
        messagesDiv.appendChild(message);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
        console.error('Помилка парсингу JSON:', error, messageText);
    }
};



sendButton.addEventListener('click', () => {
    if (messageInput.value.trim() !== '') {
        const messageData = {
            userId, 
            text: messageInput.value.trim(),
        };
        ws.send(JSON.stringify(messageData)); 
        messageInput.value = ''; 
    }
});


messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

