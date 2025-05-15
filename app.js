// Task Manager Class
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }

    // Load tasks from localStorage
    loadTasks = () => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    };

    // Save tasks to localStorage
    saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    };

    // Add a new task
    addTask = (text) => {
        const task = {
            id: Date.now(),
            text,
            completed: false
        };
        this.tasks.push(task);
        this.saveTasks();
        return task;
    };

    // Delete a task by ID
    deleteTask = (taskId) => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    };

    // Toggle task completion status
    toggleTask = (taskId) => {
        this.tasks = this.tasks.map(task => 
            task.id === taskId 
                ? { ...task, completed: !task.completed }
                : task
        );
        this.saveTasks();
    };

    // Filter tasks based on completion status
    filterTasks = (filterType = 'all') => {
        switch (filterType) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    };
}

// Update progress bar
const updateProgress = (tasks) => {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (tasks.length === 0) {
        progressFill.style.width = '0%';
        progressText.textContent = '0% Complete';
        return;
    }

    const completedCount = tasks.reduce((count, task) => 
        task.completed ? count + 1 : count, 0
    );
    
    const percentage = Math.round((completedCount / tasks.length) * 100);
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Complete`;
};

// Render tasks to the DOM
const renderTasks = (tasks) => {
    const tasksContainer = document.querySelector('.tasks-container');
    
    const tasksHTML = tasks.map(task => `
        <div class="task-item" data-id="${task.id}">
            <input type="checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   class="task-checkbox">
            <span class="task-text ${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>
            <button class="delete-btn">×</button>
        </div>
    `).join('');

    tasksContainer.innerHTML = tasksHTML;
    updateProgress(tasks);
};

// Main application entry point
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const taskManager = new TaskManager();
    let currentFilter = 'all';

    // Form submission handler
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('task-input');
        const text = input.value.trim();
        
        if (text) {
            taskManager.addTask(text);
            input.value = '';
            renderTasks(taskManager.filterTasks(currentFilter));
        }
    });

    // Event delegation for task interactions
    app.addEventListener('click', (e) => {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;
        
        const taskId = parseInt(taskItem.dataset.id);

        // Delete button click
        if (e.target.classList.contains('delete-btn')) {
            taskManager.deleteTask(taskId);
            renderTasks(taskManager.filterTasks(currentFilter));
        }

        // Checkbox click
        if (e.target.classList.contains('task-checkbox')) {
            taskManager.toggleTask(taskId);
            renderTasks(taskManager.filterTasks(currentFilter));
        }
    });

    // Filter button clicks
    const filterButtons = document.querySelector('.filter-buttons');
    filterButtons.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;
        
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Update filter and render
        currentFilter = e.target.dataset.filter;
        renderTasks(taskManager.filterTasks(currentFilter));
    });

    // Initial render
    renderTasks(taskManager.filterTasks());
    
    console.log('Task Manager initialized');
}); 