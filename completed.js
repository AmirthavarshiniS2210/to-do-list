document.addEventListener('DOMContentLoaded', function() {
    const completedTasksContainer = document.getElementById('completed-tasks-container');
    
    loadCompletedTasks();
    
    function loadCompletedTasks() {
        const tasks = getAllTasks().filter(task => task.completed);
        displayCompletedTasks(tasks, completedTasksContainer);
    }
    
    function displayCompletedTasks(tasks, container) {
        container.innerHTML = '';
        
        if (tasks.length === 0) {
            container.innerHTML = '<p>No completed tasks yet. Complete some tasks to see them here!</p>';
            return;
        }
        
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = `task-card ${getPriorityClass(task.priority)}`;
            
            taskCard.innerHTML = `
                <div class="task-info">
                    <h4>${task.title}</h4>
                    ${task.description ? `<p>${task.description}</p>` : ''}
                    <p class="task-due">Completed on: ${formatDate(task.completedAt)}</p>
                </div>
                <div class="task-actions">
                    <button class="restore-btn" data-id="${task.id}">Restore</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>
            `;
            
            container.appendChild(taskCard);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.restore-btn').forEach(button => {
            button.addEventListener('click', restoreTask);
        });
        
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteTask);
        });
    }
    
    function restoreTask(e) {
        const taskId = e.target.getAttribute('data-id');
        const tasks = getAllTasks();
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: false, completedAt: null };
            }
            return task;
        });
        
        saveTasks(updatedTasks);
        loadCompletedTasks();
    }
    
    function deleteTask(e) {
        if (confirm('Are you sure you want to permanently delete this task?')) {
            const taskId = e.target.getAttribute('data-id');
            const tasks = getAllTasks();
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            
            saveTasks(updatedTasks);
            loadCompletedTasks();
        }
    }
});