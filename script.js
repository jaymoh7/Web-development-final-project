// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Check for saved dark mode preference
function checkDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Search functionality
function searchPosts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll('.blog-post');

    posts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        const isVisible = title.includes(searchTerm) || content.includes(searchTerm);
        
        post.style.display = isVisible ? 'block' : 'none';
        if (isVisible) {
            post.classList.add('fade-in');
        }
    });
}

// Filter posts by category
function filterPosts(category) {
    const posts = document.querySelectorAll('.blog-post');
    
    posts.forEach(post => {
        if (category === 'all' || post.dataset.category === category) {
            post.style.display = 'block';
            post.classList.add('fade-in');
        } else {
            post.style.display = 'none';
        }
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to blog posts
function animatePosts() {
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach((post, index) => {
        post.style.animationDelay = `${index * 0.1}s`;
        post.classList.add('fade-in');
    });
}

// Add like functionality
function addLikeButtons() {
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach(post => {
        const likeButton = document.createElement('button');
        likeButton.className = 'like-button';
        likeButton.innerHTML = '❤️ <span class="like-count">0</span>';
        likeButton.onclick = function() {
            const likeCount = this.querySelector('.like-count');
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
            this.classList.add('liked');
        };
        post.appendChild(likeButton);
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerText = 'Toggle Dark Mode';
    darkModeToggle.onclick = toggleDarkMode;
    document.body.appendChild(darkModeToggle);

    // Check for saved dark mode preference
    checkDarkModePreference();

    // Initialize animations and features
    animatePosts();
    addLikeButtons();

    // Add search input event listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchPosts);
    }
}); 