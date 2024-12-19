const inputData = document.getElementById('text');
const buttonData = document.getElementById('btn');
const taskList = document.getElementById('task-list');

function addTask(event) {
    event.preventDefault(); 

    const taskText = inputData.value.trim();
    if (taskText === '') {
        alert('Text is missing! Please write something.');
        return;
    }

    const li = document.createElement('li');
    li.className = 'li';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        taskTextSpan.style.textDecoration = 'line-through';
        saveData(); 
    });

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveData(); 
    });

    li.appendChild(checkbox);
    li.appendChild(taskTextSpan);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    inputData.value = '';

    saveData(); 
}


function saveData() {
    const tasks = Array.from(taskList.children).map((li) => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        const text = li.querySelector('span').textContent;
        return { text, completed: checkbox.checked };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadData() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            taskTextSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            saveData();
        });

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;
        taskTextSpan.style.textDecoration = task.completed ? 'line-through' : 'none';

        const deleteBtn = document.createElement('button');
        deleteBtn.className= 'deletebtn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveData(); 
        });

        li.appendChild(checkbox);
        li.appendChild(taskTextSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

buttonData.addEventListener('click', addTask);

loadData();