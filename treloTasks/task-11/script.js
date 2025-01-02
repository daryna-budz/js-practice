if ('serviceWorker' in navigator) { 
    navigator.serviceWorker
    .register('service-worker.js') 
    .then(() => console.log('Service Worker успішно зареєстрований')) 
    .catch(error => console.error('Помилка реєстрації Service Worker:', error)); 
}

