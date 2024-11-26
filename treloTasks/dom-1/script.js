const currentDate = document.querySelector(".current-date");
const calendarDays = document.querySelector(".calendar-days");
const arrows = document.querySelectorAll(".arrows span")
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDay = date.getDate();

let todayYear = date.getFullYear(); 
let todayMonth = date.getMonth();   
let todayDay = date.getDate();

function renderCalendar() {
    const calendarDaysItems = calendarDays.querySelectorAll("li");
    calendarDaysItems.forEach(day => {
        const selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day.textContent).padStart(2, '0')}`;
        if (events[selectedDate]) {
            day.classList.add("taken");
        } else {
            day.classList.remove("taken");
        }
    });
}

function displayData(){
    let lastDayOfMonth = new Date(currentYear,currentMonth + 1, 0).getDate();
    let liContent = "";
    for (let i = 1;i<=lastDayOfMonth;i++){
        liContent += `<li>${i}</li>`;
    }

    currentDate.textContent = `${monthNames[currentMonth]}, ${currentYear}`;
    calendarDays.innerHTML = liContent;
    /*console.log(Days in ${monthNames[currentMonth]}: ${lastDayOfMonth}); */
    setCurrentDate();
    checkDayClick();
    renderCalendar();
}


function setCurrentDate(){
    if(currentYear === todayYear && currentMonth===todayMonth){
        const calendarDaysItems = calendarDays.querySelectorAll("li");
        calendarDaysItems.forEach(function(li){
           if(parseInt(li.textContent) === todayDay){
              li.classList.add('current');
           }
        });
    }
}

function checkDayClick(){
    const calendarDaysItems = calendarDays.querySelectorAll("li");
    calendarDaysItems.forEach(day => {
        day.addEventListener("click", (event) =>{
            const clickedDay = parseInt(event.target.textContent);
            handleClickedDay(clickedDay,day);
        });
     });
}

let events = JSON.parse(localStorage.getItem("events")) || {};

function handleClickedDay(day,li){
        const selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const selectedDateElement = document.getElementById("selected-date");
        selectedDateElement.textContent = `${day}, ${monthNames[currentMonth]} ${currentYear}`;
    
        const eventForm = document.getElementById("calendar-form");
        const eventInput = document.getElementById("event-input");
        eventForm.classList.remove("hidden");
    
        eventForm.dataset.selectedDate = selectedDate;
        eventForm.dataset.selectedLi = li;
        eventInput.value = events[selectedDate] || "";
    
        saveEvent(eventForm, eventInput, li);
    
}

function saveEvent(eventForm, eventInput, li) {

    const saveHandler = () => {
        const selectedDate = eventForm.dataset.selectedDate; 
        const eventText = eventInput.value.trim();

        if (eventText) {
            events[selectedDate] = eventText;
            localStorage.setItem("events", JSON.stringify(events));

            li.classList.add("taken");

            alert(`Event saved for ${selectedDate}: "${eventText}"`);
        } else {
            delete events[selectedDate];
            localStorage.setItem("events", JSON.stringify(events));
            li.classList.remove("taken");
        }

        eventForm.classList.add("hidden");
        eventInput.value = "";
    };
    const saveEventBtn = document.getElementById("save-event");

    saveEventBtn.removeEventListener("click", saveHandler);
    saveEventBtn.addEventListener("click", saveHandler);
}




const cancelEventBtn = document.getElementById("cancel-event");
cancelEventBtn.addEventListener("click", () => {
    const eventForm = document.getElementById("calendar-form");
    const eventInput = document.getElementById("event-input");
    eventForm.classList.add("hidden");
    eventInput.value = "";
});



arrows.forEach(icon => {
    icon.addEventListener("click", () =>{
        if(icon.id === "prev"){
            currentMonth -= 1;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear -= 1;
            }
        }else{
            currentMonth+=1;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear += 1;
            }
        }
        displayData();
    });
});

displayData();
/*localStorage.clear();*/
console.log('LocalStorage:', localStorage.getItem('events'));

