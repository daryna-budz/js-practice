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

function displayData(){
    let lastDayOfMonth = new Date(currentYear,currentMonth + 1, 0).getDate();
    let liContent = "";
    for (let i = 1;i<=lastDayOfMonth;i++){
        liContent += `<li>${i}</li>`;
    }

    currentDate.textContent = `${monthNames[currentMonth]}, ${currentYear} `;
    calendarDays.innerHTML = liContent;
    /*console.log(`Days in ${monthNames[currentMonth]}: ${lastDayOfMonth}`); */

    setCurrentDate();
}


function setCurrentDate(){
    if(currentYear === todayYear && currentMonth===todayMonth){
        const calendarDaysItems = calendarDays.querySelectorAll("li")
        calendarDaysItems.forEach(function(li){
           if(parseInt(li.textContent) === todayDay){
              li.classList.add('current');
           }
        });
    }
}


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