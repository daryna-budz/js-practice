/*
Завдання 2: Приложение для відстеження статусу мережевого з'єднання з використанням Service Workers і Fetch API
Опис завдання: Розробіть додаток, який використовує Service Workers для кешування даних та забезпечення функціональності офлайн з можливістю синхронізації даних при відновленні з'єднання.

Технічні вимоги:

Кешування даних: Використовуйте Service Workers для кешування зовнішніх запитів до API, що забезпечує доступ до збережених даних навіть без інтернет-з'єднання.

Функціональність офлайн: Забезпечте можливість перегляду та взаємодії з даними у режимі офлайн.

Синхронізація даних: Використовуйте Fetch API для відправлення зібраних офлайн даних на сервер після відновлення інтернет-з'єднання. Використовуйте підходи, що відрізняються від XMLHttpRequest, такі як Promises для керування асинхронними запитами.
*/

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker registered successfully'))
      .catch(err => console.error('Service Worker registration failed:', err));
}
  
  

const statusSpan = document.getElementById('network-status');

function updateNetworkStatus() {
  statusSpan.textContent = navigator.onLine ? 'Online' : 'Offline';
  statusSpan.style.color = navigator.onLine ? 'green' : 'red';
}

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

updateNetworkStatus();

const apiURL = 'https://jsonplaceholder.typicode.com/posts';
const dataList = document.getElementById('data-list');

function fetchData() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      dataList.innerHTML = '';
      data.slice(0, 10).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        dataList.appendChild(li);
      });
    })
    .catch(err => console.error('Error fetching data:', err));
}

fetchData();

let offlineData = [];

function saveOfflineData(data) {
  offlineData.push(data);
  localStorage.setItem('offlineData', JSON.stringify(offlineData));
}

window.addEventListener('online', () => {
    const storedData = JSON.parse(localStorage.getItem('offlineData') || '[]');
    if (storedData.length > 0) {
      storedData.forEach(data => {
        fetch(apiURL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        }).then(response => {
          if (response.ok) {
            console.log('Data synced:', data);
            offlineData = [];
            localStorage.removeItem('offlineData');
          }
        });
      });
    }
  });
  