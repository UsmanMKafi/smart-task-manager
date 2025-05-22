// Error handling utilities
const ErrorHandler = {
    showError: (message) => {
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.textContent = message || 'An unknown error occurred.'; // Ensure message is not empty
            errorContainer.hidden = false;
            console.error('Displayed error:', message);
            // Automatically hide after 5 seconds
            setTimeout(() => {
                errorContainer.hidden = true;
                errorContainer.textContent = ''; // Clear message when hidden
            }, 5000);
        }
    },

    handleStorageError: (error) => {
        console.error('Storage error:', error);
        ErrorHandler.showError('Unable to save or load tasks. Please check your browser storage settings.');
    }
};

// Loading state management
const LoadingState = {
    show: () => {
        const loader = document.getElementById('loading-indicator');
        if (loader) {
            loader.hidden = false;
            console.log('Loading indicator shown.');
        }
    },
    hide: () => {
        const loader = document.getElementById('loading-indicator');
        if (loader) {
            loader.hidden = true;
            console.log('Loading indicator hidden.');
        }
    }
};

// Debounce utility
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Task Manager Class
class TaskManager {
    constructor() {
        this.tasks = [];
        this.loadTasks().catch(error => {
            console.error('Failed to load tasks:', error);
            ErrorHandler.showError('Failed to load tasks. Please refresh the page.');
        });
    }

    // Load tasks from localStorage
    loadTasks = async () => {
        LoadingState.show(); // Show spinner immediately
        try {
            console.log('Attempting to load tasks from localStorage...');
            const savedTasks = localStorage.getItem('tasks');
            console.log('Got savedTasks from localStorage:', savedTasks);
            this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
            console.log('Tasks parsed:', this.tasks);
            // Ensure updateProgress and initial render happen *after* tasks are loaded
            this.updateProgress();
            console.log('Progress updated after loading.');
            // The initial render is now called after the TaskManager is created
        } catch (error) {
            console.error('Error loading tasks in loadTasks:', error);
            ErrorHandler.handleStorageError(error);
            this.tasks = []; // Reset tasks to empty array on error
        } finally {
            LoadingState.hide(); // Hide spinner regardless of outcome
            console.log('loadTasks process finished.');
        }
    };

    // Save tasks to localStorage
    saveTasks = debounce(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        } catch (error) {
            ErrorHandler.handleStorageError(error);
        }
    }, 300);

    // Add a new task
    addTask = (text) => {
        try {
            const task = {
                id: Date.now(),
                text,
                completed: false
            };
            this.tasks.push(task);
            this.saveTasks();
            return task;
        } catch (error) {
            ErrorHandler.showError('Failed to add task. Please try again.');
            return null;
        }
    };

    // Delete a task by ID
    deleteTask = (taskId) => {
        try {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
        } catch (error) {
            ErrorHandler.showError('Failed to delete task. Please try again.');
        }
    };

    // Toggle task completion status
    toggleTask = (taskId) => {
        try {
            this.tasks = this.tasks.map(task => 
                task.id === taskId 
                    ? { ...task, completed: !task.completed }
                    : task
            );
            this.saveTasks();
        } catch (error) {
            ErrorHandler.showError('Failed to update task. Please try again.');
        }
    };

    // Filter tasks based on completion status
    filterTasks = (filterType = 'all') => {
        try {
            switch (filterType) {
                case 'active':
                    return this.tasks.filter(task => !task.completed);
                case 'completed':
                    return this.tasks.filter(task => task.completed);
                default:
                    return this.tasks;
            }
        } catch (error) {
            ErrorHandler.showError('Failed to filter tasks. Please try again.');
            return this.tasks;
        }
    };

    // Update progress bar
    updateProgress = () => {
        const progressContainer = document.querySelector('.progress-container');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (this.tasks.length === 0) {
            progressFill.style.width = '0%';
            progressText.textContent = '0% Complete';
            progressContainer.setAttribute('aria-valuenow', '0');
            return;
        }

        const completedCount = this.tasks.reduce((count, task) => 
            task.completed ? count + 1 : count, 0
        );
        
        const percentage = Math.round((completedCount / this.tasks.length) * 100);
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Complete`;
        progressContainer.setAttribute('aria-valuenow', percentage.toString());
    };
}

// Render tasks to the DOM
const renderTasks = (tasks, taskManager) => {
    const tasksContainer = document.querySelector('.tasks-container');
    
    const tasksHTML = tasks.map(task => `
        <div class="task-item" 
             data-id="${task.id}"
             role="listitem">
            <input type="checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   class="task-checkbox"
                   aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}">
            <span class="task-text ${task.completed ? 'completed' : ''}"
                  aria-label="${task.text} ${task.completed ? '(completed)' : ''}">
                ${task.text}
            </span>
            <button class="delete-btn" 
                    aria-label="Delete task">
                ×
            </button>
        </div>
    `).join('');

    tasksContainer.innerHTML = tasksHTML;
    taskManager.updateProgress();
};

// Main application entry point
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const taskManager = new TaskManager();
    let currentFilter = 'all';

    // Handle potential errors during initial rendering or progress update
    try {
        // Initial render needs to happen AFTER tasks are potentially loaded asynchronously
        // The renderTasks call was moved outside the loadTasks method, but still needs taskManager instance.
        // Let's ensure initial render happens after loadTasks completes (implicitly via the TaskManager constructor calling loadTasks)
        // The previous fix where renderTasks is called at the end of DOMContentLoaded is correct for initial display.
        renderTasks(taskManager.filterTasks(), taskManager);
    } catch (renderError) {
        console.error('Error during initial render or progress update:', renderError);
        ErrorHandler.showError('Failed to display tasks. Please refresh the page.');
        LoadingState.hide(); // Ensure spinner is hidden even if rendering fails
    }

    // Form submission handler
    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('task-input');
        const text = input.value.trim();
        
        if (text) {
            const task = taskManager.addTask(text);
            if (task) {
                input.value = '';
                renderTasks(taskManager.filterTasks(currentFilter), taskManager);
            }
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
            renderTasks(taskManager.filterTasks(currentFilter), taskManager);
        }

        // Checkbox click
        if (e.target.classList.contains('task-checkbox')) {
            taskManager.toggleTask(taskId);
            renderTasks(taskManager.filterTasks(currentFilter), taskManager);
        }
    });

    // Filter button clicks
    const filterButtons = document.querySelector('.filter-buttons');
    filterButtons.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;
        
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        e.target.classList.add('active');
        e.target.setAttribute('aria-pressed', 'true');
        
        // Update filter and render
        currentFilter = e.target.dataset.filter;
        renderTasks(taskManager.filterTasks(currentFilter), taskManager);
    });

    // Keyboard navigation for tasks
    app.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('task-checkbox')) {
                activeElement.click();
            } else if (activeElement.classList.contains('delete-btn')) {
                activeElement.click();
            }
        }
    });

    console.log('Task Manager initialized');
}); 