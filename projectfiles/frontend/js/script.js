let body = document.body;
let profile = document.querySelector('.header .flex .profile');
let searchForm = document.querySelector('.header .flex .search-form');
let sideBar = document.querySelector('.side-bar');

// Get elements for dynamic header profile
const headerProfileImage = profile.querySelector('.image');
const headerProfileName = profile.querySelector('.name');
const headerProfileRole = profile.querySelector('.role');
const headerLoginBtn = profile.querySelector('.flex-btn .option-btn[href="login.html"]');
const headerRegisterBtn = profile.querySelector('.flex-btn .option-btn[href="register.html"]');
const headerLogoutBtn = profile.querySelector('.flex-btn .option-btn[href="logout"]');

// Get elements for dynamic sidebar profile
const sideBarProfileImage = sideBar.querySelector('.profile img.image');
const sideBarProfileName = sideBar.querySelector('.profile h3.name');
const sideBarProfileRole = sideBar.querySelector('.profile p.role');


// Function to update the header and sidebar profile sections
const updateHeaderProfile = async () => {
    console.log('[script.js] Attempting to update header/sidebar profile...');
    try {
        const response = await fetch('/api/user-profile'); // Fetch user data from backend
        console.log(`[script.js] Response status from /api/user-profile: ${response.status}`);
        const data = await response.json();
        console.log('[script.js] Response data:', data);

        if (response.ok) { // Check if status is 200-299
            // User is logged in, update profile details for HEADER
            headerProfileName.textContent = data.name || 'User';
            headerProfileRole.textContent = data.role || 'student';
            if (data.profileImagePath) {
                headerProfileImage.src = data.profileImagePath;
            } else {
                headerProfileImage.src = 'images/pic-1.jpg'; // Default image
            }
            headerLoginBtn.style.display = 'none';
            headerRegisterBtn.style.display = 'none';
            headerLogoutBtn.style.display = 'inline-block';

            // Update profile details for SIDEBAR
            sideBarProfileName.textContent = data.name || 'User';
            sideBarProfileRole.textContent = data.role || 'student';
            if (data.profileImagePath) {
                sideBarProfileImage.src = data.profileImagePath;
            } else {
                sideBarProfileImage.src = 'images/pic-1.jpg'; // Default image
            }
            console.log('[script.js] Profile updated successfully with user data.');

        } else if (response.status === 401) {
            console.log('[script.js] User not authenticated (401). Displaying guest profile.');
            // User not authenticated, show login/register, hide logout for HEADER
            headerProfileName.textContent = 'Guest';
            headerProfileRole.textContent = 'Not logged in';
            headerProfileImage.src = 'images/pic-1.jpg'; // Default guest image
            headerLoginBtn.style.display = 'inline-block';
            headerRegisterBtn.style.display = 'inline-block';
            headerLogoutBtn.style.display = 'none';

            // Update for SIDEBAR
            sideBarProfileName.textContent = 'Guest';
            sideBarProfileRole.textContent = 'Not logged in';
            sideBarProfileImage.src = 'images/pic-1.jpg'; // Default guest image

        } else {
            // Handle other errors (e.g., server error)
            console.error('[script.js] Failed to fetch user profile for header:', data.message, 'Status:', response.status);
            headerProfileName.textContent = 'Error';
            headerProfileRole.textContent = '';
            headerProfileImage.src = 'images/pic-1.jpg'; // Default image on error
            headerLoginBtn.style.display = 'inline-block';
            headerRegisterBtn.style.display = 'inline-block';
            headerLogoutBtn.style.display = 'none';

            // Update for SIDEBAR
            sideBarProfileName.textContent = 'Error';
            sideBarProfileRole.textContent = '';
            sideBarProfileImage.src = 'images/pic-1.jpg'; // Default image on error
        }
    } catch (error) {
        console.error('[script.js] Network error fetching user profile:', error);
        headerProfileName.textContent = 'Network error';
        headerProfileRole.textContent = 'Please check your connection.';
        headerLoginBtn.style.display = 'inline-block';
        headerRegisterBtn.style.display = 'inline-block';
        headerLogoutBtn.style.display = 'none';

        sideBarProfileName.textContent = 'Network error';
        sideBarProfileRole.textContent = 'Please check your connection.';
        sideBarProfileImage.src = 'images/pic-1.jpg';
    }
};

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   searchForm.classList.remove('active');
}

document.querySelector('#search-btn').onclick = () =>{
   searchForm.classList.toggle('active');
   profile.classList.remove('active');
}

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

document.querySelector('#toggle-btn').onclick = () =>{
   body.classList.toggle('dark');
}

// Call the function to update header profile on page load
document.addEventListener('DOMContentLoaded', updateHeaderProfile);
