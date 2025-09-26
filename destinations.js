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
    // Create a modal or detail view with enhanced design
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
                    <p>Discover the magic of ${destinationName} with our expertly curated travel experiences.</p>
                    
                    <h3>What Makes This Special</h3>
                    <p>Our professional travel consultants have handpicked the finest experiences this destination has to offer, ensuring you create memories that last a lifetime.</p>
                    
                    <h3>Your Journey Includes</h3>
                    <ul>
                        <li>🌟 Best time to visit recommendations</li>
                        <li>🏛️ Popular attractions and hidden gems</li>
                        <li>🍽️ Local cuisine and dining experiences</li>
                        <li>💡 Expert travel tips and insights</li>
                        <li>📸 Stunning photo opportunities</li>
                        <li>🏨 Luxury accommodation options</li>
                    </ul>
                    
                    <h3>Ready to Explore?</h3>
                    <p>Let our travel experts craft a personalized itinerary just for you. Book now or save this destination to plan your perfect getaway.</p>
                    
                    <div class="modal-buttons">
                        <button class="modal-btn book-btn">
                            <i class="fas fa-plane"></i>
                            Book Now
                        </button>
                        <button class="modal-btn wishlist-btn">
                            <i class="fas fa-heart"></i>
                            Add to Wishlist
                        </button>
                    </div>
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
            padding: 20px;
            box-sizing: border-box;
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
            max-width: 600px;
            width: 95%;
            max-height: 85vh;
            overflow-y: auto;
            animation: slideInUp 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            margin: auto;
            z-index: 2001;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 2px solid #f8f9fa;
            background: linear-gradient(135deg, #f8f9fa, #ffffff);
        }
        
        .modal-header h2 {
            color: #2c3e50;
            font-size: 2rem;
            font-family: 'Playfair Display', serif;
            font-weight: 600;
            margin: 0;
        }
        
        .modal-close {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            font-size: 1.5rem;
            color: #666;
            cursor: pointer;
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #e74c3c;
            border-color: #e74c3c;
            color: white;
            transform: rotate(90deg);
        }
        
        .modal-body {
            padding: 2rem;
            line-height: 1.6;
        }
        
        .modal-body p {
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
            color: #555;
        }
        
        .modal-body h3 {
            color: #2c3e50;
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            margin: 2rem 0 1rem 0;
            border-bottom: 2px solid #f4d03f;
            padding-bottom: 0.5rem;
            display: inline-block;
        }
        
        .modal-body ul {
            margin: 1rem 0 1.5rem 0;
            padding-left: 1.5rem;
        }
        
        .modal-body li {
            margin: 0.8rem 0;
            font-size: 1rem;
            color: #666;
        }
        
        .modal-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .modal-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .book-btn {
            background: linear-gradient(135deg, #e67e22, #f4d03f);
            color: white;
        }
        
        .wishlist-btn {
            background: white;
            color: #e67e22;
            border: 2px solid #e67e22;
        }
        
        .book-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(230, 126, 34, 0.3);
        }
        
        .wishlist-btn:hover {
            background: #e67e22;
            color: white;
            transform: translateY(-2px);
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .destination-modal {
                padding: 10px;
            }
            
            .modal-content {
                max-width: 95%;
                max-height: 90vh;
                border-radius: 15px;
            }
            
            .modal-header {
                padding: 1.5rem 1.5rem 1rem;
            }
            
            .modal-header h2 {
                font-size: 1.5rem;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .modal-body h3 {
                font-size: 1.2rem;
            }
            
            .modal-buttons {
                flex-direction: column;
                gap: 0.8rem;
            }
            
            .modal-btn {
                width: 100%;
                justify-content: center;
            }
        }
        
        /* Animation Keyframes */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from { 
                opacity: 0; 
                transform: translateY(50px) scale(0.9);
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideOutDown {
            from { 
                opacity: 1; 
                transform: translateY(0) scale(1);
            }
            to { 
                opacity: 0; 
                transform: translateY(30px) scale(0.95);
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