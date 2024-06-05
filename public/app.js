document.getElementById('add-task').addEventListener('click', addTask);

async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const newTask = { name: newTaskInput.value, completed: false };
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    });
    newTaskInput.value = '';
    fetchTasks();
}

fetchTasks();