/* 
Travel Explorer Website JavaScript
Tasks:
1. Handle hero background transitions and navigation
2. Implement search functionality with Unsplash API integration
3. Fetch weather data from OpenWeatherMap API
4. Create dynamic photo gallery rendering
5. Manage search history with localStorage
6. Handle responsive navigation and mobile interactions
7. Error handling and loading states
8. Destination card interactions and background changes
*/

// API Configuration
const CONFIG = {
    UNSPLASH_ACCESS_KEY: 'YOUR_UNSPLASH_ACCESS_KEY', // Replace with your Unsplash API key
    OPENWEATHER_API_KEY: 'YOUR_OPENWEATHER_API_KEY', // Replace with your OpenWeatherMap API key
    UNSPLASH_URL: 'https://api.unsplash.com/search/photos',
    WEATHER_URL: 'https://api.openweathermap.org/data/2.5/weather'
};

// DOM Elements
const elements = {
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    photoGallery: document.getElementById('photoGallery'),
    weatherSection: document.getElementById('weatherSection'),
    weatherCity: document.getElementById('weatherCity'),
    temperature: document.getElementById('temperature'),
    condition: document.getElementById('condition'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    weatherIcon: document.getElementById('weatherIcon'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    retryBtn: document.getElementById('retryBtn'),
    clearResults: document.getElementById('clearResults'),
    searchResults: document.querySelector('.search-results'),
    hamburger: document.querySelector('.hamburger'),
    navMenu: document.querySelector('.nav-menu'),
    navbar: document.querySelector('.navbar'),
    heroNavPrev: document.querySelector('.nav-prev'),
    heroNavNext: document.querySelector('.nav-next'),
    destinationCards: document.querySelectorAll('.destination-card'),
    heroBackground: document.querySelector('.hero-background')
};

// State Management
let currentSearchTerm = '';
let searchHistory = JSON.parse(localStorage.getItem('travelSearchHistory')) || [];
let currentBackgroundIndex = 0;

// Background images for hero section
const heroBackgrounds = [
    {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        name: 'Swiss Alps'
    },
    {
        url: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        name: 'Ha Long Bay'
    },
    {
        url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        name: 'Cinque Terre'
    },
    {
        url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
        name: 'Okavango Delta'
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    updateActiveDestinationCard();
    loadSearchHistory();
    
    // Display welcome message
    console.log('🌍 Travel Explorer initialized successfully!');
    console.log('📝 Please add your API keys to CONFIG object for full functionality');
}

// Event Listeners Setup
function setupEventListeners() {
    // Search functionality
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Clear results
    elements.clearResults.addEventListener('click', clearSearchResults);

    // Retry button
    elements.retryBtn.addEventListener('click', function() {
        hideError();
        handleSearch();
    });

    // Mobile navigation
    elements.hamburger.addEventListener('click', toggleMobileMenu);

    // Hero navigation
    elements.heroNavPrev.addEventListener('click', function() {
        changeHeroBackground(-1);
    });

    elements.heroNavNext.addEventListener('click', function() {
        changeHeroBackground(1);
    });

    // Destination card interactions
    elements.destinationCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            selectDestinationCard(index);
            const destination = card.dataset.destination;
            performSearch(destination);
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Window resize
    window.addEventListener('resize', handleWindowResize);
}

// Search Functionality
async function handleSearch() {
    const searchTerm = elements.searchInput.value.trim();
    
    if (!searchTerm) {
        showError('Please enter a destination to search');
        return;
    }

    currentSearchTerm = searchTerm;
    addToSearchHistory(searchTerm);
    await performSearch(searchTerm);
}

async function performSearch(searchTerm) {
    showLoading();
    
    try {
        // Fetch both photos and weather data in parallel
        const [photos, weather] = await Promise.all([
            fetchPhotos(searchTerm),
            fetchWeather(searchTerm)
        ]);

        hideLoading();
        
        if (photos && photos.length > 0) {
            displayPhotos(photos, searchTerm);
        } else {
            showError('No photos found for this destination');
            return;
        }

        if (weather) {
            displayWeather(weather, searchTerm);
        } else {
            console.warn('Weather data not available');
        }

        showSearchResults();

    } catch (error) {
        hideLoading();
        showError(`Failed to fetch data: ${error.message}`);
        console.error('Search error:', error);
    }
}

// API Functions
async function fetchPhotos(query) {
    if (!CONFIG.UNSPLASH_ACCESS_KEY || CONFIG.UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
        // Demo data when API key is not configured
        return getDemoPhotos(query);
    }

    try {
        const response = await fetch(
            `${CONFIG.UNSPLASH_URL}?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape`,
            {
                headers: {
                    'Authorization': `Client-ID ${CONFIG.UNSPLASH_ACCESS_KEY}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.error('Photo fetch error:', error);
        return getDemoPhotos(query);
    }
}

async function fetchWeather(city) {
    if (!CONFIG.OPENWEATHER_API_KEY || CONFIG.OPENWEATHER_API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
        // Demo data when API key is not configured
        return getDemoWeather(city);
    }

    try {
        const response = await fetch(
            `${CONFIG.WEATHER_URL}?q=${encodeURIComponent(city)}&appid=${CONFIG.OPENWEATHER_API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Weather fetch error:', error);
        return getDemoWeather(city);
    }
}

// Demo Data (for when API keys are not configured)
function getDemoPhotos(query) {
    // Dynamic photo selection based on destination
    const photoCollections = {
        // European destinations
        'paris': [
            'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Eiffel Tower
            'https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Louvre
            'https://images.unsplash.com/photo-1554939437-ecc492c67b78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Seine River
        ],
        'london': [
            'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // London Bridge
            'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Big Ben
            'https://images.unsplash.com/photo-1520637836862-4d197d17c43a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Tower Bridge
        ],
        'rome': [
            'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Colosseum
            'https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Vatican
            'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Roman Forum
        ],
        'barcelona': [
            'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Sagrada Familia
            'https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Park Guell
            'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Gothic Quarter
        ],
        'amsterdam': [
            'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Canal houses
            'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Canals
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Tulips
        ],
        
        // Asian destinations
        'tokyo': [
            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Tokyo skyline
            'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Tokyo street
            'https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Tokyo temple
        ],
        'bali': [
            'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Bali temple
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Rice terraces
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Bali beach
        ],
        'singapore': [
            'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Marina Bay
            'https://images.unsplash.com/photo-1496939376851-89342e90adcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Gardens by the Bay
            'https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Singapore skyline
        ],
        'thailand': [
            'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Thai temple
            'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Thai beach
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Thai market
        ],
        
        // American destinations
        'new york': [
            'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // NYC skyline
            'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Central Park
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Times Square
        ],
        'los angeles': [
            'https://images.unsplash.com/photo-1544413164-c55fad42bb6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // LA skyline
            'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Hollywood sign
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Sunset beach
        ],
        'las vegas': [
            'https://images.unsplash.com/photo-1605833556294-ea5bcd3853c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Vegas strip
            'https://images.unsplash.com/photo-1574943400455-d281b3cc6e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Vegas night
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Casino
        ],
        'brazil': [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Christ the Redeemer
            'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Copacabana
            'https://images.unsplash.com/photo-1516306580123-e6036e65290f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Amazon
        ],
        
        // African destinations
        'egypt': [
            'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Pyramids
            'https://images.unsplash.com/photo-1471919743851-c4df8b6ee133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Sphinx
            'https://images.unsplash.com/photo-1568322445389-f64ac2515020?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Nile
        ],
        'morocco': [
            'https://images.unsplash.com/photo-1489749798305-4fea3ae436d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Marrakech
            'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Sahara
            'https://images.unsplash.com/photo-1486150622100-6d2ab8f56f53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Casablanca
        ],
        'south africa': [
            'https://images.unsplash.com/photo-1484318571209-661cf29a69ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Cape Town
            'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Safari
            'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Table Mountain
        ],
        
        // Oceania destinations
        'australia': [
            'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Sydney Opera House
            'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Uluru
            'https://images.unsplash.com/photo-1599722180881-6dfcb4bbd9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Great Barrier Reef
        ],
        'new zealand': [
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Milford Sound
            'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Auckland
            'https://images.unsplash.com/photo-1543916925-4c136d7b4d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Hobbiton
        ]
    };
    
    // Generic fallback photos for unknown destinations
    const genericPhotos = [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Mountain landscape
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Beach sunset
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // City skyline
    ];
    
    // Find matching photos for the destination
    const queryLower = query.toLowerCase();
    let selectedPhotos = null;
    
    // Check for exact matches first
    if (photoCollections[queryLower]) {
        selectedPhotos = photoCollections[queryLower];
    } else {
        // Check for partial matches
        for (const [destination, photos] of Object.entries(photoCollections)) {
            if (queryLower.includes(destination) || destination.includes(queryLower)) {
                selectedPhotos = photos;
                break;
            }
        }
    }
    
    // Use generic photos if no match found
    if (!selectedPhotos) {
        selectedPhotos = genericPhotos;
    }
    
    // Create photo objects
    const demoPhotos = selectedPhotos.map((url, index) => ({
        id: `${queryLower}-${index + 1}`,
        urls: { regular: url },
        alt_description: `Beautiful view of ${query}`,
        user: { name: 'Travel Explorer' },
        description: `${index === 0 ? 'Iconic landmark' : index === 1 ? 'Popular attraction' : 'Must-see destination'} in ${query}`
    }));
    
    return demoPhotos;
}

function getDemoWeather(city) {
    return {
        name: city,
        main: {
            temp: Math.floor(Math.random() * 30) + 5, // 5-35°C
            humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        },
        weather: [{
            main: 'Clear',
            description: 'Clear sky',
            icon: '01d'
        }],
        wind: {
            speed: Math.floor(Math.random() * 15) + 5 // 5-20 km/h
        }
    };
}

// Display Functions
function displayPhotos(photos, searchTerm) {
    elements.photoGallery.innerHTML = '';
    
    photos.forEach((photo, index) => {
        const photoElement = createPhotoElement(photo, index);
        elements.photoGallery.appendChild(photoElement);
    });
}

function createPhotoElement(photo, index) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo-item';
    photoDiv.style.animationDelay = `${index * 0.1}s`;
    
    photoDiv.innerHTML = `
        <img src="${photo.urls.regular}" alt="${photo.alt_description || 'Travel destination'}" loading="lazy">
        <div class="photo-overlay">
            <p>${photo.description || photo.alt_description || 'Beautiful destination'}</p>
            <small>Photo by ${photo.user?.name || 'Unknown'}</small>
        </div>
    `;
    
    return photoDiv;
}

function displayWeather(weatherData, city) {
    elements.weatherCity.textContent = `Weather in ${weatherData.name || city}`;
    elements.temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    elements.condition.textContent = weatherData.weather[0].description;
    elements.humidity.textContent = `${weatherData.main.humidity}%`;
    elements.windSpeed.textContent = `${Math.round(weatherData.wind.speed * 3.6)} km/h`;
    
    // Update weather icon
    const iconCode = weatherData.weather[0].icon;
    const iconClass = getWeatherIconClass(weatherData.weather[0].main);
    elements.weatherIcon.innerHTML = `<i class="${iconClass}"></i>`;
}

function getWeatherIconClass(condition) {
    const iconMap = {
        'Clear': 'fas fa-sun',
        'Clouds': 'fas fa-cloud',
        'Rain': 'fas fa-cloud-rain',
        'Snow': 'fas fa-snowflake',
        'Thunderstorm': 'fas fa-bolt',
        'Drizzle': 'fas fa-cloud-drizzle',
        'Mist': 'fas fa-smog',
        'Fog': 'fas fa-smog'
    };
    
    return iconMap[condition] || 'fas fa-cloud-sun';
}

// UI State Management
function showLoading() {
    elements.loadingIndicator.classList.add('show');
}

function hideLoading() {
    elements.loadingIndicator.classList.remove('show');
}

function showError(message) {
    elements.errorText.textContent = message;
    elements.errorMessage.classList.add('show');
}

function hideError() {
    elements.errorMessage.classList.remove('show');
}

function showSearchResults() {
    elements.searchResults.classList.add('show');
    // Smooth scroll to results
    elements.searchResults.scrollIntoView({ behavior: 'smooth' });
}

function clearSearchResults() {
    elements.searchResults.classList.remove('show');
    elements.photoGallery.innerHTML = '';
    elements.searchInput.value = '';
    currentSearchTerm = '';
}

// Navigation Functions
function toggleMobileMenu() {
    elements.navMenu.classList.toggle('active');
    elements.hamburger.classList.toggle('active');
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        elements.navbar.classList.add('scrolled');
    } else {
        elements.navbar.classList.remove('scrolled');
    }
}

// Hero Background Management
function changeHeroBackground(direction) {
    currentBackgroundIndex += direction;
    
    if (currentBackgroundIndex >= heroBackgrounds.length) {
        currentBackgroundIndex = 0;
    } else if (currentBackgroundIndex < 0) {
        currentBackgroundIndex = heroBackgrounds.length - 1;
    }
    
    updateHeroBackground();
    updateActiveDestinationCard();
}

function updateHeroBackground() {
    const background = heroBackgrounds[currentBackgroundIndex];
    elements.heroBackground.style.backgroundImage = `
        linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
        url('${background.url}')
    `;
}

function updateActiveDestinationCard() {
    elements.destinationCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentBackgroundIndex);
    });
}

function selectDestinationCard(index) {
    currentBackgroundIndex = index;
    updateHeroBackground();
    updateActiveDestinationCard();
}

// Search History Management
function addToSearchHistory(searchTerm) {
    const normalizedTerm = searchTerm.toLowerCase().trim();
    
    // Remove if already exists
    searchHistory = searchHistory.filter(term => 
        term.toLowerCase() !== normalizedTerm
    );
    
    // Add to beginning
    searchHistory.unshift(searchTerm);
    
    // Keep only last 10 searches
    searchHistory = searchHistory.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('travelSearchHistory', JSON.stringify(searchHistory));
}

function loadSearchHistory() {
    // Could implement search suggestions dropdown here
    console.log('Search history loaded:', searchHistory);
}

// Responsive Handling
function handleWindowResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        elements.navMenu.classList.remove('active');
        elements.hamburger.classList.remove('active');
    }
}

// Auto-start hero background rotation
setInterval(() => {
    changeHeroBackground(1);
}, 8000);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        performSearch,
        fetchPhotos,
        fetchWeather
    };
}