/**
 * Setting the constants here instead of hardcoding them
 * into the HTML file for readability.
 */

/**
 * Constants
 */

NAME = "Danial";
FAMILY_NAME = "Hosseintabar";
AFFILIATION = "Computer Science and Mathematics Student at MIT";

NAVIGATION_BAR_LINKS = {
	About: "index.html",
	"Reading list": "reading_list.html",
	Publications: "publications.html",
};

/**
 * Code
 */

// Setting the name, family name, affiliation
const nameEl = document.getElementById("nameAndFamilyName");
if (nameEl) nameEl.innerHTML = NAME + " " + FAMILY_NAME;
// document.getElementById("affiliation").innerHTML = AFFILIATION; 

// Hamburger Menu Toggle
function toggleMenu() {
	const navMenu = document.getElementById('navMenu');
	if (navMenu) {
		navMenu.classList.toggle('active');
	}
}

// Close menu when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('.navigation a');
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			const navMenu = document.getElementById('navMenu');
			if (navMenu) {
				navMenu.classList.remove('active');
			}
		});
	});
});

// Theme toggle
function toggleTheme() {
	document.documentElement.classList.add('theme-transitioning');
	const isDark = document.documentElement.classList.toggle('dark-theme');
	localStorage.setItem('theme', isDark ? 'dark' : 'light');
	setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 300);
}