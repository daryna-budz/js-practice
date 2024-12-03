
const addButton = document.getElementById("add-button");
const container = document.getElementById('todo-list');
const inputTask = document.getElementById("inputTask");

addButton.addEventListener("click",function(){
        if (inputTask.value.trim() === "") {
            alert("Please enter a task");
            return;
        }

        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
  
        const taskId = `task-${Date.now()}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = taskId;
        checkbox.classList.add('checkbox');
  
        const label = document.createElement('label');
        label.htmlFor = taskId;
        label.textContent = inputTask.value;

        const span = document.createElement("span");
        span.style.fontSize = '35px';
        span.style.marginLeft = '250px';
        span.style.marginTop = '-10px';
        span.id = 'taskButton';
        span.innerHTML = '&#10005;';
        span.setAttribute('onclick', 'deleteTask(this)');

  
        todoItem.appendChild(checkbox);
        todoItem.appendChild(label);
        todoItem.appendChild(span);
        container.appendChild(todoItem);

        inputTask.value = "";

});

function deleteTask(elem) {
    const todoItem = elem.closest('.todo-item');
    todoItem.remove();
}



