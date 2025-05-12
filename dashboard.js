document.addEventListener('DOMContentLoaded', function() {
    const activeTasksContainer = document.getElementById('active-tasks-container');
    const viewAllButton = document.getElementById('view-all');
    
    // Load active tasks
    loadActiveTasks();
    
    // View all button click handler
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            loadAllTasks();
        });
    }
    
    function loadActiveTasks() {
        const tasks = getAllTasks().filter(task => !task.completed);
        displayTasks(tasks, activeTasksContainer);
    }
    
    function loadAllTasks() {
        const tasks = getAllTasks();
        displayTasks(tasks, activeTasksContainer);
        viewAllButton.textContent = 'Show Active Only';
        viewAllButton.removeEventListener('click', loadAllTasks);
        viewAllButton.addEventListener('click', function() {
            loadActiveTasks();
            viewAllButton.textContent = 'View All';
            viewAllButton.addEventListener('click', loadAllTasks);
        });
    }
    
    function displayTasks(tasks, container) {
        container.innerHTML = '';
        
        if (tasks.length === 0) {
            container.innerHTML = '<p>No tasks found. Add a task to get started!</p>';
            return;
        }
        
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = `task-card ${getPriorityClass(task.priority)}`;
            
            taskCard.innerHTML = `
                <div class="task-info">
                    <h4>${task.title}</h4>
                    ${task.description ? `<p>${task.description}</p>` : ''}
                    <p class="task-due">Due: ${formatDate(task.dueDate)}</p>
                </div>
                <div class="task-actions">
                    <button class="complete-btn" data-id="${task.id}">Complete</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>
            `;
            
            container.appendChild(taskCard);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.complete-btn').forEach(button => {
            button.addEventListener('click', markTaskComplete);
        });
        
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteTask);
        });
    }
    
    function markTaskComplete(e) {
        const taskId = e.target.getAttribute('data-id');
        const tasks = getAllTasks();
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: true };
            }
            return task;
        });
        
        saveTasks(updatedTasks);
        loadActiveTasks();
    }
    
    function deleteTask(e) {
        if (confirm('Are you sure you want to delete this task?')) {
            const taskId = e.target.getAttribute('data-id');
            const tasks = getAllTasks();
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            
            saveTasks(updatedTasks);
            loadActiveTasks();
        }
    }
});