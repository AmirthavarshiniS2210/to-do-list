// Shared functions across all pages

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Check if localStorage is available
    if (typeof(Storage) === "undefined") {
        alert("Your browser doesn't support localStorage. Some features may not work.");
    }
    
    // Initialize task data if it doesn't exist
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]));
    }
    
    // Contact form submission (for about page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo, so your message wasn\'t actually sent.');
            contactForm.reset();
        });
    }
});

// Get all tasks from localStorage
function getAllTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'No due date';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Get priority class for task cards
function getPriorityClass(priority) {
    switch (priority) {
        case 'high': return 'high';
        case 'medium': return 'medium';
        case 'low': return 'low';
        default: return '';
    }
}