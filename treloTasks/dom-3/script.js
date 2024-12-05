
const inputName = document.getElementById("inputName");
const inputPhone = document.getElementById("inputPhone");
const addButton = document.getElementById("add-button");
const container = document.getElementById("all-contacts");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");




addButton.addEventListener("click",function(){
    if (inputName.value.trim() === "" || inputPhone.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    const contactItem = createContact(inputName.value,inputPhone.value);
    container.appendChild(contactItem);
    inputName.value="";
    inputPhone.value="";
    
    saveContactsToLocalStorage();
});


function createContact(contactName, contactPhone) {
    const contactItem = document.createElement('div');
    contactItem.classList.add('contact-item');

    const contactIcon = document.createElement("img");
    contactIcon.src = "images/contact-icon.svg";
    contactIcon.alt = "contact icon";

    const contactId = `contact-${Date.now()}`;
    const phoneId = `phone-${Date.now()}`;

    const name = document.createElement("p");
    name.id = contactId;
    name.textContent = contactName;

    const phone = document.createElement("p");
    phone.id = phoneId;
    phone.textContent = contactPhone;

    const removeButton = document.createElement("button");
    removeButton.id = "removeButton";
    removeButton.onclick = "deleteTask(this)";
    removeButton.textContent = "Remove";

    removeButton.addEventListener('click', function() {
        deleteTask(removeButton);
    });

    contactItem.appendChild(contactIcon);
    contactItem.appendChild(name);
    contactItem.appendChild(phone);
    contactItem.appendChild(removeButton);

    return contactItem;
}


 

function deleteTask(elem) {
    const contactItem = elem.closest('.contact-item');
    contactItem.remove();


    saveContactsToLocalStorage();
}

searchButton.addEventListener("click", function () {
    const keyword = searchInput.value.toLowerCase();
    const contactItems = container.querySelectorAll(".contact-item");

    contactItems.forEach(contact => {
        const name = contact.querySelector("p").textContent.toLowerCase();
        const phone = contact.querySelectorAll("p")[1].textContent;

        if (name.includes(keyword) || phone.includes(keyword)) {
            contact.style.display = "flex";
        } else {
            contact.style.display = "none";
        }
    });
});

function saveContactsToLocalStorage() {
    const contacts = Array.from(container.children).map(contact => {
        return {
            name: contact.querySelector("p").textContent,
            phone: contact.querySelectorAll("p")[1].textContent
        };
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContactsFromLocalStorage() {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    savedContacts.forEach(contact => {
        const contactItem = createContact(contact.name, contact.phone);
        container.appendChild(contactItem);
    });
}

document.addEventListener("DOMContentLoaded", loadContactsFromLocalStorage);

