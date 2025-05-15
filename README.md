# 🎯 Smart Task Manager

A modern, responsive task management web application built with vanilla JavaScript and ES6+ features. Designed to enhance daily productivity through an intuitive interface and powerful task organization capabilities.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

![Smart Task Manager Screenshot]([Screenshot.png])

## ✨ Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| ✅ Task Management | Add, delete, and toggle task completion | ES6 Classes & LocalStorage |
| 📊 Progress Tracking | Visual progress bar with percentage | Array Methods & DOM Updates |
| 🔍 Task Filtering | Filter tasks by status (All/Active/Completed) | Array Methods & Event Delegation |
| 💾 Data Persistence | Tasks saved in browser's localStorage | JSON & LocalStorage API |
| 📱 Responsive Design | Mobile-first approach with modern CSS | CSS Grid & Flexbox |
| 🎨 Modern UI | Clean interface with smooth animations | CSS Transitions & Transforms |

## 🛠️ ES6 Features Used

### 1. **Block Scoping (`const`/`let`)**
```javascript
const taskManager = new TaskManager();
let currentFilter = 'all';
```

### 2. **Arrow Functions**
```javascript
// Event delegation with arrow function
app.addEventListener('click', (e) => {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;
    // ... handle task interactions
});
```

### 3. **Array Methods**
```javascript
// Using reduce() to calculate completion percentage
const completedCount = tasks.reduce((count, task) => 
    task.completed ? count + 1 : count, 0
);

// Using filter() to get active tasks
filterTasks = (filterType = 'all') => {
    switch (filterType) {
        case 'active':
            return this.tasks.filter(task => !task.completed);
        // ... other cases
    }
};
```

### 4. **Classes & Methods**
```javascript
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }

    // Class methods using arrow functions
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
}
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/[Your Name]/smart-task-manager.git
```

2. Navigate to the project directory:
```bash
cd smart-task-manager
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## 💻 Usage

1. Add a new task using the input field
2. Click the checkbox to mark tasks as complete
3. Use the filter buttons to view different task states
4. Delete tasks using the × button
5. Track progress with the visual progress bar

## Why This Project?

This project aligns with FlexiSAF Edusoft's mission of enhancing productivity through technology. It solves real-world task management challenges by:

- Providing a simple, intuitive interface for task organization
- Implementing modern web technologies for better performance
- Using local storage for offline functionality
- Following best practices in code organization and maintainability

## Future Improvements

- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Drag-and-drop task reordering
- [ ] Dark mode support
- [ ] Export/import functionality
- [ ] Task search and sorting
- [ ] Collaborative features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

[Usman Muhammad Kafi]

---

Made with ❤️ and JavaScript 