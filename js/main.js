/**
 * Main JavaScript file for the website
 * Handles dynamic content loading and navigation
 */

// GET THE REFERENCES
const container = document.querySelector('main');
const links = document.querySelectorAll('.nav-link');
let url = './partials/home.html';

// CREATE THE FUNCTION THAT WILL LOAD THE REQUESTED PARTIAL
const loadContent = (urlFeed) => {
    /*
    IMPORTANT NOTES:
    loadContent RUNS EVERY TIME A LINK IS CLICKED.
    loadContent REQUIRES THE INPUT. THIS INPUT IS
    THE VALUE OF href ATTRIBUTE OF THE CLICKED LINK.
    EVERY TIME A LINK IS CLICKED, urlFeed WILL GET 
    THE UPDATED PATH TO THE REQUESTED CONTENT.
    */
    fetch(urlFeed)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            container.innerHTML = data;
        })
        .catch(error => {
            container.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
};

// CALL loadContent WITH THE CURRENT VALUE OF url 
loadContent(url);

// CREATE THE FUNCTION THAT WILL SELECT A PARTIAL:
const selectContent = (event) => {
    // PREVENT DEFAULT BEHAVIOUR OF A LINK TAG
    event.preventDefault();
    // GET THE VALUE OF href ATTRIBUTE OF THE CLICKED LINK
    const clickedLink = event.currentTarget;
    const href = clickedLink.getAttribute('href');
    // CALL THE FUNCTION loadContent PROVIDING THE href
    // VALUE OF THE CLICKED LINK AS THE VALUE FOR THE PARAMETER
    // OF loadContent FUNCTION.
    url = `./partials/${href}`;
    loadContent(url);
};

// REGISTER links FOR CLICK EVENT WITH selectContent AS EVENT HANDLER!
links.forEach(link => {
    link.addEventListener('click', selectContent);
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state) {
        const pageName = event.state.page;
        loadContent(`./partials/${pageName}.html`);
    } else {
        loadContent('./partials/home.html');
    }
});

// Load initial content based on current URL
const path = window.location.pathname.replace(basePath, '');
const pageName = path.substring(1) || 'home';
loadContent(`./partials/${pageName}.html`); 