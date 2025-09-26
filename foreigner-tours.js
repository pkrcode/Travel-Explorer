/*
Foreigner Tours Page JavaScript
Handles tour type selection, tour details, and booking functionality
*/

document.addEventListener('DOMContentLoaded', function() {
    initializeForeignerToursPage();
});

function initializeForeignerToursPage() {
    setupMobileNavigation();
    setupTourTypeButtons();
    setupTourCards();
    setupBookingProcess();
    
    console.log('🌎 Foreigner Tours page initialized successfully!');
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

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Tour type button functionality
function setupTourTypeButtons() {
    const typeButtons = document.querySelectorAll('.type-btn');
    
    typeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tourType = this.textContent.toLowerCase();
            showTourTypeDetails(tourType);
        });
    });
}

function showTourTypeDetails(tourType) {
    showNotification(`Exploring ${tourType.charAt(0).toUpperCase() + tourType.slice(1)} options...`);
    
    // Scroll to featured tours section
    const featuredTours = document.querySelector('.featured-tours');
    if (featuredTours) {
        featuredTours.scrollIntoView({ behavior: 'smooth' });
    }
}

// Tour card interactions
function setupTourCards() {
    const tourCards = document.querySelectorAll('.tour-card');
    const tourButtons = document.querySelectorAll('.tour-btn');
    
    tourCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('tour-btn')) {
                const tourName = this.querySelector('h3').textContent;
                showTourDetails(tourName, this);
            }
        });
    });
    
    tourButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const tourCard = this.closest('.tour-card');
            const tourName = tourCard.querySelector('h3').textContent;
            showTourBooking(tourName, tourCard);
        });
    });
}

function showTourDetails(tourName, card) {
    const tourInfo = extractTourInfo(card);
    
    const modal = document.createElement('div');
    modal.className = 'tour-details-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${tourName}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="tour-image">
                        <img src="${tourInfo.image}" alt="${tourName}">
                    </div>
                    <div class="tour-info">
                        <div class="tour-rating">
                            ${tourInfo.rating}
                        </div>
                        <div class="tour-details-grid">
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span>Duration: ${tourInfo.duration}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-dollar-sign"></i>
                                <span>Price: ${tourInfo.price}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-users"></i>
                                <span>Group Size: 8-16 people</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-calendar"></i>
                                <span>Available: Year-round</span>
                            </div>
                        </div>
                        <div class="tour-description">
                            <h3>Tour Description</h3>
                            <p>${tourInfo.description}</p>
                        </div>
                        <div class="tour-highlights">
                            <h3>Tour Highlights</h3>
                            <ul>
                                ${tourInfo.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="tour-includes">
                            <h3>What's Included</h3>
                            <div class="includes-grid">
                                <div class="include-item">
                                    <i class="fas fa-check"></i>
                                    <span>Expert local guide</span>
                                </div>
                                <div class="include-item">
                                    <i class="fas fa-check"></i>
                                    <span>All transportation</span>
                                </div>
                                <div class="include-item">
                                    <i class="fas fa-check"></i>
                                    <span>Accommodation</span>
                                </div>
                                <div class="include-item">
                                    <i class="fas fa-check"></i>
                                    <span>Selected meals</span>
                                </div>
                                <div class="include-item">
                                    <i class="fas fa-check"></i>
                                    <span>Entry tickets</span>
                                </div>
                                <div class="include-item">
                                    <i class="fas fa-check"></i>
                                    <span>Travel insurance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-close-btn">Close</button>
                    <button class="btn-primary book-tour-btn">Book This Tour</button>
                </div>
            </div>
        </div>
    `;
    
    addTourModalStyles();
    document.body.appendChild(modal);
    setupModalClose(modal);
    
    // Book button in modal
    const bookBtn = modal.querySelector('.book-tour-btn');
    bookBtn.addEventListener('click', function() {
        closeModal(modal);
        setTimeout(() => showTourBooking(tourName), 300);
    });
}

function extractTourInfo(card) {
    const image = card.querySelector('img').src;
    const rating = card.querySelector('.tour-rating').innerHTML;
    const duration = card.querySelector('.tour-duration').textContent;
    const price = card.querySelector('.price').textContent;
    const description = card.querySelector('p').textContent;
    
    // Extract highlights from the card
    const highlights = Array.from(card.querySelectorAll('.highlight span')).map(span => span.textContent);
    
    return { image, rating, duration, price, description, highlights };
}

function showTourBooking(tourName) {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Book ${tourName}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="booking-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" required placeholder="Enter your full name">
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="email" required placeholder="Enter your email">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" required placeholder="Enter your phone">
                            </div>
                            <div class="form-group">
                                <label>Nationality</label>
                                <select required>
                                    <option value="">Select country</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="CA">Canada</option>
                                    <option value="AU">Australia</option>
                                    <option value="DE">Germany</option>
                                    <option value="FR">France</option>
                                    <option value="JP">Japan</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Preferred Start Date</label>
                                <input type="date" required>
                            </div>
                            <div class="form-group">
                                <label>Number of Travelers</label>
                                <select required>
                                    <option value="">Select travelers</option>
                                    <option value="1">1 Person</option>
                                    <option value="2">2 People</option>
                                    <option value="3">3 People</option>
                                    <option value="4">4 People</option>
                                    <option value="5+">5+ People</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Room Preference</label>
                            <select required>
                                <option value="">Select room type</option>
                                <option value="single">Single Occupancy</option>
                                <option value="double">Double/Twin Share</option>
                                <option value="triple">Triple Share</option>
                                <option value="suite">Suite Upgrade</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Special Requirements</label>
                            <textarea placeholder="Dietary restrictions, accessibility needs, special occasions..."></textarea>
                        </div>
                        <div class="terms-checkbox">
                            <input type="checkbox" id="terms" required>
                            <label for="terms">I agree to the terms and conditions and privacy policy</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-close-btn">Cancel</button>
                    <button class="btn-primary submit-booking">Submit Booking</button>
                </div>
            </div>
        </div>
    `;
    
    addModalStyles();
    document.body.appendChild(modal);
    setupModalClose(modal);
    
    const submitBtn = modal.querySelector('.submit-booking');
    submitBtn.addEventListener('click', function() {
        if (validateBookingForm(modal)) {
            submitTourBooking(tourName, modal);
        }
    });
}

function validateBookingForm(modal) {
    const form = modal.querySelector('.booking-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields');
    }
    
    return isValid;
}

function submitTourBooking(tourName, modal) {
    showNotification('Booking submitted successfully! We\'ll contact you within 24 hours. 🌟');
    closeModal(modal);
}

// Booking process step highlighting
function setupBookingProcess() {
    const steps = document.querySelectorAll('.step');
    
    // Add click functionality to steps
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            highlightStep(index);
        });
    });
}

function highlightStep(stepIndex) {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        if (index <= stepIndex) {
            step.classList.add('completed');
        } else {
            step.classList.remove('completed');
        }
    });
}

// CTA button functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-btn')) {
        if (e.target.textContent.includes('Custom Quote')) {
            showCustomQuoteForm();
        } else if (e.target.textContent.includes('View All Tours')) {
            // Scroll to tours section
            document.querySelector('.featured-tours').scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function showCustomQuoteForm() {
    const modal = document.createElement('div');
    modal.className = 'quote-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Get Custom Quote</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Tell us about your dream international trip and we'll create a custom package just for you!</p>
                    <form class="quote-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Your Name</label>
                                <input type="text" required>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Destination(s)</label>
                                <input type="text" required placeholder="Where would you like to go?">
                            </div>
                            <div class="form-group">
                                <label>Budget Range</label>
                                <select required>
                                    <option value="">Select budget</option>
                                    <option value="1000-2000">$1,000 - $2,000</option>
                                    <option value="2000-5000">$2,000 - $5,000</option>
                                    <option value="5000-10000">$5,000 - $10,000</option>
                                    <option value="10000+">$10,000+</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Travel Dates</label>
                                <input type="text" placeholder="Flexible / Specific dates">
                            </div>
                            <div class="form-group">
                                <label>Group Size</label>
                                <select required>
                                    <option value="">Select size</option>
                                    <option value="1-2">1-2 people</option>
                                    <option value="3-5">3-5 people</option>
                                    <option value="6-10">6-10 people</option>
                                    <option value="10+">10+ people</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Tell us about your ideal trip</label>
                            <textarea required placeholder="Interests, activities, accommodation preferences, special occasions..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-close-btn">Cancel</button>
                    <button class="btn-primary submit-quote">Get My Quote</button>
                </div>
            </div>
        </div>
    `;
    
    addModalStyles();
    document.body.appendChild(modal);
    setupModalClose(modal);
    
    const submitBtn = modal.querySelector('.submit-quote');
    submitBtn.addEventListener('click', function() {
        showNotification('Quote request submitted! Our travel experts will contact you within 24 hours. 📧');
        closeModal(modal);
    });
}

// Utility functions (similar to honeymoon.js)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
        .booking-modal, .quote-modal {
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
            max-width: 600px;
            width: 90%;
            max-height: 85vh;
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
        
        .booking-form .form-row, .quote-form .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
        }
        
        .form-group label {
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 500;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }
        
        .terms-checkbox {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .terms-checkbox input[type="checkbox"] {
            width: auto;
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
            border: none;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
        }
        
        .btn-secondary {
            background: #f8f9fa;
            color: #333;
            border: 2px solid #ddd;
        }
        
        .btn-primary:hover, .btn-secondary:hover {
            transform: translateY(-2px);
        }
        
        .step.completed {
            opacity: 1;
        }
        
        .step.completed .step-number {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
            .booking-form .form-row, .quote-form .form-row {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

function addTourModalStyles() {
    if (document.querySelector('#tour-modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'tour-modal-styles';
    styles.textContent = `
        .tour-details-modal {
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
        
        .tour-details-modal .modal-content {
            max-width: 800px;
        }
        
        .tour-image img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 15px;
            margin-bottom: 2rem;
        }
        
        .tour-details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0;
        }
        
        .detail-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .detail-item i {
            color: #3498db;
        }
        
        .tour-description, .tour-highlights, .tour-includes {
            margin: 2rem 0;
        }
        
        .tour-description h3, .tour-highlights h3, .tour-includes h3 {
            color: #333;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .tour-highlights ul {
            list-style: none;
            padding: 0;
        }
        
        .tour-highlights li {
            padding: 0.5rem 0;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .tour-highlights li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #27ae60;
            font-weight: bold;
        }
        
        .includes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
        }
        
        .include-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
        }
        
        .include-item i {
            color: #27ae60;
        }
    `;
    
    document.head.appendChild(styles);
}

function setupModalClose(modal) {
    const closeBtn = modal.querySelector('.modal-close');
    const closeBtnSecondary = modal.querySelector('.modal-close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    function handleClose() {
        closeModal(modal);
    }
    
    if (closeBtn) closeBtn.addEventListener('click', handleClose);
    if (closeBtnSecondary) closeBtnSecondary.addEventListener('click', handleClose);
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                handleClose();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            handleClose();
        }
    });
}

function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (modal.parentNode) {
            document.body.removeChild(modal);
        }
    }, 300);
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