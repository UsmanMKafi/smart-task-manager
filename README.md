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
| 🌙 Dark Mode | Automatic dark mode support | CSS Media Queries |
| 🎭 Advanced Animations | Smooth transitions and hover effects | CSS Animations & Transitions |
| 🎨 SASS/SCSS Implementation | Advanced styling with SASS features | SASS/SCSS |

## 🎨 Modern CSS Features

### 1. **CSS Custom Properties (Variables)**
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --transition-speed: 0.3s;
    --border-radius: 8px;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
}
```

### 2. **Advanced Animations & Transitions**
```css
/* Shimmer effect on progress bar */
.progress-fill::after {
    content: '';
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}
```

### 3. **Modern Layout Techniques**
```css
/* Responsive Grid Layout */
.tasks-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
}

/* Flexbox for Form Layout */
.task-form {
    display: flex;
    gap: 1rem;
}
```

### 4. **Dark Mode Support**
```css
@media (prefers-color-scheme: dark) {
    :root {
        --primary-color: #3498db;
        --background-color: #1a1a1a;
        --text-color: #f8f9fa;
    }
}
```

### 5. **Custom Scrollbar**
```css
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}
```

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

## 🚀 Installation

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
6. Enjoy automatic dark mode support based on system preferences

## 🤔 Why This Project?

This project aligns with FlexiSAF Edusoft's mission of enhancing productivity through technology. It solves real-world task management challenges by:

- Providing a simple, intuitive interface for task organization
- Implementing modern web technologies for better performance
- Using local storage for offline functionality
- Following best practices in code organization and maintainability
- Offering a responsive and accessible design
- Supporting both light and dark themes

## 🔮 Future Improvements

- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Drag-and-drop task reordering
- [ ] Custom theme selection
- [ ] Export/import functionality
- [ ] Task search and sorting
- [ ] Collaborative features
- [ ] Advanced animations and transitions
- [ ] Accessibility improvements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

[Your Name]

## 🎨 SASS/SCSS Implementation

The project uses SASS/SCSS for advanced styling capabilities:

### Structure
```
scss/
├── _variables.scss    # Global variables (colors, spacing, etc.)
├── _mixins.scss      # Reusable mixins
├── _base.scss        # Base styles and resets
├── _components.scss  # Component-specific styles
└── main.scss         # Main file that imports all partials
```

### SASS Features Used
- **Variables**: For consistent colors, spacing, and typography
- **Mixins**: For reusable style patterns
- **Nesting**: For cleaner, more maintainable CSS
- **Functions**: For color manipulation and calculations
- **Partials**: For modular code organization
- **Dark Mode**: Using SASS variables for theme switching

### Key SASS Implementations
1. **Color Management**
   ```scss
   $primary-color: #4f46e5;
   $secondary-color: #818cf8;
   $text-color: #1e293b;
   ```

2. **Responsive Mixins**
   ```scss
   @mixin mobile {
     @media (max-width: $breakpoint-sm) {
       @content;
     }
   }
   ```

3. **Component Styling**
   ```scss
   .task-item {
     @include card-style;
     &:hover {
       transform: translateY(-2px);
     }
   }
   ```

4. **Dark Mode**
   ```scss
   @media (prefers-color-scheme: dark) {
     :root {
       --background-color: #0f172a;
       --text-color: #f8fafc;
     }
   }
   ```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the SASS compiler in watch mode:
   ```bash
   npm run sass:watch
   ```
4. Open `index.html` in your browser

## 🚀 Development

- **SASS Compilation**: 
  - `npm run sass` - One-time compilation
  - `npm run sass:watch` - Watch mode for development

## 🚀 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

---

Made with ❤️ and JavaScript 