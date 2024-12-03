const addButton = document.getElementById("add-button");
const container = document.getElementById('todo-list');
const inputTask = document.getElementById("inputTask");

const allFilter = document.getElementById("all-filter");
const completedFilter = document.getElementById("completed-filter");
const incompleteFilter = document.getElementById("incomplete-filter");

let tasks = [];

window.addEventListener('load', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            const todoItem = createTask(task.labelText, task.completed);
            container.appendChild(todoItem);
            tasks.push({ element: todoItem, checkbox: todoItem.querySelector('input'), label: todoItem.querySelector('label') });
        });
    }
    filterTasks("all")
});


addButton.addEventListener("click",function(){
        if (inputTask.value.trim() === "") {
            alert("Please enter a task");
            return;
        }

        const todoItem = createTask(inputTask.value,false);
        container.appendChild(todoItem);
        
        tasks.push({ element: todoItem, checkbox: todoItem.querySelector('input'), label: todoItem.querySelector('label') });
        inputTask.value="";
        saveTasksToLocalStorage();
});
  
function createTask(labelText, isChecked) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const taskId = `task-${Date.now()}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = taskId;
    checkbox.classList.add('checkbox');
    checkbox.checked = isChecked;

    const label = document.createElement('label');
    label.htmlFor = taskId;
    label.textContent = labelText;

    const span = document.createElement("span");
    span.style.fontSize = '35px';
    span.style.marginLeft = '250px';
    span.style.marginTop = '-10px';
    span.id = 'taskButton';
    span.innerHTML = '&#10005;';
    span.addEventListener('click', function() {
        deleteTask(span);
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(span);

    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            label.classList.add("completed");
        } else {
            label.classList.remove("completed");
        }
        saveTasksToLocalStorage();
    });

    return todoItem;
}

function deleteTask(elem) {
    const todoItem = elem.closest('.todo-item');
    todoItem.remove();

    tasks = tasks.filter(task => task.element !== todoItem);
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasksData = tasks.map(task => ({
        labelText: task.label.textContent,
        completed: task.checkbox.checked
    }));
    localStorage.setItem('tasks', JSON.stringify(tasksData));
}

function filterTasks(filter = 'all') {
    tasks.forEach(task => task.element.style.display = 'none');
  
    let filteredTasks = [];
    
    if (filter === 'all') {
      filteredTasks = tasks;
    } else if (filter === 'completed') {
      filteredTasks = tasks.filter(task => task.checkbox.checked);
    } else if (filter === 'incomplete') {
      filteredTasks = tasks.filter(task => !task.checkbox.checked);
    }
  
    filteredTasks.forEach(task => task.element.style.display = 'flex');
  }
  
  
  allFilter.addEventListener("click", function() {
    filterTasks('all');
  });
  
  completedFilter.addEventListener("click", function() {
    filterTasks('completed');
  });
  
  incompleteFilter.addEventListener("click", function() {
    filterTasks('incomplete');
  });

  




