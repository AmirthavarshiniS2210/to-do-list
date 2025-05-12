document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;
        
        // Basic validation
        if (!title) {
            alert('Task title is required');
            return;
        }
        
        // Create new task
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            dueDate,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        const tasks = getAllTasks();
        tasks.push(newTask);
        saveTasks(tasks);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    });
});