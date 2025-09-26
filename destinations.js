/*
Destinations Page JavaScript
Handles filtering functionality and interactions
*/

document.addEventListener('DOMContentLoaded', function() {
    initializeDestinationsPage();
});

function initializeDestinationsPage() {
    setupFilterButtons();
    setupMobileNavigation();
    setupDestinationCardInteractions();
    
    console.log('🌍 Destinations page initialized successfully!');
}

// Filter functionality
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationItems = document.querySelectorAll('.destination-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter destinations
            filterDestinations(filterValue, destinationItems);
        });
    });
}

function filterDestinations(filterValue, destinationItems) {
    destinationItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            item.classList.remove('hidden');
            // Add animation
            item.style.animation = 'fadeInScale 0.5s ease';
        } else {
            item.style.display = 'none';
            item.classList.add('hidden');
        }
    });
    
    // Update results count
    const visibleCount = document.querySelectorAll('.destination-item:not(.hidden)').length;
    updateResultsCount(visibleCount);
}

function updateResultsCount(count) {
    // Create or update results counter if needed
    let counter = document.querySelector('.results-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'results-counter';
        const filterSection = document.querySelector('.filter-section .container');
        if (filterSection) {
            filterSection.appendChild(counter);
        }
    }
    counter.textContent = `Showing ${count} destinations`;
    counter.style.textAlign = 'center';
    counter.style.marginTop = '1rem';
    counter.style.color = '#666';
    counter.style.fontSize = '1rem';
}

// Mobile navigation toggle
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Destination card interactions
function setupDestinationCardInteractions() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const destinationName = this.querySelector('h3').textContent;
            handleDestinationClick(destinationName);
        });
        
        // Add explore button functionality
        const exploreBtn = card.querySelector('.explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                const destinationName = card.querySelector('h3').textContent;
                handleExploreClick(destinationName);
            });
        }
    });
}

function handleDestinationClick(destinationName) {
    console.log(`Destination clicked: ${destinationName}`);
    // You can add logic here to show more details or navigate to a detail page
    showDestinationDetails(destinationName);
}

function handleExploreClick(destinationName) {
    console.log(`Explore clicked for: ${destinationName}`);
    // Add logic for explore functionality
    // For now, we'll redirect to the main search with the destination pre-filled
    redirectToSearch(destinationName);
}

function showDestinationDetails(destinationName) {
    // Create a modal or detail view (placeholder for now)
    const modal = document.createElement('div');
    modal.className = 'destination-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${destinationName}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Detailed information about ${destinationName} will be displayed here.</p>
                    <p>This could include:</p>
                    <ul>
                        <li>Best time to visit</li>
                        <li>Popular attractions</li>
                        <li>Local cuisine</li>
                        <li>Travel tips</li>
                        <li>Photo gallery</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary">Book Now</button>
                    <button class="btn-secondary">Add to Wishlist</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
        .destination-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideInUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h2 {
            color: #333;
            font-size: 1.8rem;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: #999;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #f0f0f0;
            color: #333;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .modal-body ul {
            margin: 1rem 0;
            padding-left: 1.5rem;
        }
        
        .modal-body li {
            margin: 0.5rem 0;
            color: #666;
        }
        
        .modal-footer {
            display: flex;
            gap: 1rem;
            padding: 1rem 2rem 2rem;
        }
        
        .btn-primary, .btn-secondary {
            flex: 1;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #f4d03f, #e67e22);
            color: white;
            border: none;
        }
        
        .btn-secondary {
            background: transparent;
            color: #333;
            border: 2px solid #ddd;
        }
        
        .btn-primary:hover, .btn-secondary:hover {
            transform: translateY(-2px);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from { 
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        </style>
    `;
    
    // Add modal to page
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function redirectToSearch(destinationName) {
    // Redirect to main page with search parameter
    const searchUrl = `index.html?search=${encodeURIComponent(destinationName)}`;
    window.location.href = searchUrl;
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add search functionality from URL parameters
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
        // Highlight destinations that match the search term
        highlightSearchResults(searchTerm);
    }
});

function highlightSearchResults(searchTerm) {
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm.toLowerCase())) {
            card.style.border = '3px solid #f4d03f';
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}