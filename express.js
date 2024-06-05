// Fetch tasks on page load
async function fetchTasks() {
    const response = await fetch('http://localhost:3001/tasks');
    const tasks = await response.json();
    tasks.forEach(task => addTaskItem(task.taskText, task._id));
}

fetchTasks();

// Add a new task
async function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskText }),
    });

    const newTask = await response.json();
    addTaskItem(newTask.taskText, newTask._id);
    taskInput.value = '';
}

// Delete a task
async function deleteTask(id) {
    const response = await fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' });

    if (response.status === 404) {
        alert('Task not found');
    } else {
        const taskItem = document.getElementById(id);
        taskList.removeChild(taskItem);
    }
}