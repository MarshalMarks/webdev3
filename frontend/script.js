const API_URL = 'http://localhost:3000';

// Fetch and display tasks
async function fetchTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the list
    tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${task.name}</span>
        <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
async function addTask(event) {
    event.preventDefault(); // Prevent form submission
    const taskInput = document.getElementById('task-input');
    const newTask = { name: taskInput.value };
    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
    });
    taskInput.value = ''; // Clear the input field
    fetchTasks(); // Refresh the task list
}

// Delete a task
async function deleteTask(taskId) {
    await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
    });
    fetchTasks(); // Refresh the task list
}

// Event listeners
document.getElementById('new-task-form').addEventListener('submit', addTask);

// Initial fetch of tasks
fetchTasks();