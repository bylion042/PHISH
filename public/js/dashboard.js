// Get all the menu items
const menuItems = document.querySelectorAll('.menu a');

// Add click event to each item
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove 'active' class from all menu items
        menuItems.forEach(item => item.classList.remove('active'));
        
        // Add 'active' class to the clicked menu item
        this.classList.add('active');
    });
});



// close sidebar and open sidebar 
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const container = document.querySelector('.container');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    container.classList.toggle('sidebar-closed');

    // Change the icon direction
    const icon = toggleBtn.querySelector('i');
    if (sidebar.classList.contains('closed')) {
        // Change to right arrow when sidebar is closed
        icon.classList.remove('ri-menu-3-line');
        icon.classList.add('ri-menu-2-line');
    } else {
        // Change to left arrow when sidebar is open
        icon.classList.remove('ri-menu-2-line');
        icon.classList.add('ri-menu-3-line');
    }
});

// Select all network elements
const networkItems = document.querySelectorAll('.network');

// Loop through each network element and add click event listener
networkItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove 'active' class from any previously active item
        networkItems.forEach(el => el.classList.remove('active'));

        // Add 'active' class to the clicked item
        this.classList.add('active');
    });
});




// HAMBURGER 
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const menuContainer = document.getElementById("menu-container");
    const openIcon = document.getElementById("open-menu");
    const closeIcon = document.getElementById("close-menu");

    // Toggle menu visibility
    hamburgerMenu.addEventListener("click", function() {
        menuContainer.classList.toggle("active");

        // Toggle hamburger icons
        if (menuContainer.classList.contains("active")) {
            openIcon.style.display = "none";
            closeIcon.style.display = "block";
        } else {
            openIcon.style.display = "block";
            closeIcon.style.display = "none";
        }
    });
});





//  OVER ALL SECTION SLIDE DOWN 
document.querySelectorAll('.free-offers, .premium-offers').forEach(section => {
    section.addEventListener('click', () => {
        // Remove 'active' class and close all other sections
        document.querySelectorAll('.free-offers, .premium-offers').forEach(s => {
            if (s !== section) {
                s.classList.remove('active');
                s.querySelector('.content').classList.remove('show');
            }
        });

        // Toggle the clicked section's content and border
        const content = section.querySelector('.content');
        content.classList.toggle('show');
        section.classList.toggle('active');
    });
});





// DRAGABLE IMAGE 
document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.querySelector('.draggable-image');
    const closeButton = document.querySelector('.close-btn');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Common function to start dragging
    const startDrag = (e) => {
        isDragging = true;
        draggable.style.cursor = 'grabbing';

        const rect = draggable.getBoundingClientRect();

        // Calculate offsets for mouse or touch
        if (e.type === 'mousedown') {
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        } else if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        }
    };

    // Common function to drag
    const onDrag = (e) => {
        if (!isDragging) return;

        // Get cursor or touch position
        let clientX, clientY;
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        // Update position of the draggable element
        draggable.style.left = `${clientX - offsetX}px`;
        draggable.style.top = `${clientY - offsetY}px`;
        draggable.style.right = 'auto'; // Prevent snapping back to right
        draggable.style.transform = 'none'; // Remove initial centering
    };

    // Common function to stop dragging
    const stopDrag = () => {
        isDragging = false;
        draggable.style.cursor = 'grab';
    };

    // Mouse events
    draggable.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('close-btn')) return; // Ignore drag on close button
        startDrag(e);
    });

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);

    // Touch events
    draggable.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('close-btn')) return; // Ignore drag on close button
        startDrag(e);
    });

    window.addEventListener('touchmove', onDrag);
    window.addEventListener('touchend', stopDrag);

    // Close functionality
    closeButton.addEventListener('click', () => {
        draggable.style.display = 'none'; // Hide the draggable container
    });
});
