/**
 * Setting the constants here instead of hardcoding them
 * into the HTML file for readability.
 */

// TODO: the footer name, the denoiser photo link

/**
 * Constants
 */

NAME = "Danial";
FAMILY_NAME = "Hosseintabar";
AFFILIATION = "Computer Science and Mathematics Student at MIT";
GLITCH_EFFECT = true; // Adds a glitch effect on anything having in the `glitchText` class

NAVIGATION_BAR_LINKS = {
	About: "index.html",
	Projects: "projects.html",
	Coursework: "coursework.html",
	"Reading list": "reading_list.html",
	Contact: "contact.html",
	Publications: "publications.html",
	Experiences: "experiences.html",
};

/**
 * Code
 */

// Setting the name, family name, affiliation
document.getElementById("nameAndFamilyName").innerHTML =
	NAME + " " + FAMILY_NAME;
// document.getElementById("affiliation").innerHTML = AFFILIATION; 

// Setting the links for the navigation bar on top
navigationArr = document.getElementsByClassName("navigation")[0].children;

for (const child of navigationArr) {
	const liElement = child.querySelector("a");
	const insideText = liElement.innerHTML;
	liElement.setAttribute("href", NAVIGATION_BAR_LINKS[insideText]);
}

// Setting the glitch effect for the name on top
if (GLITCH_EFFECT) {
	const textElements = document.getElementsByClassName("glitchText");
	for (textElement of textElements) {
		const originalText = textElement.textContent;
		const glitchChars = [
			"−",
			"×",
			"÷",
			"∞",
			"∑",
			"π",
			"√",
			"≈",
			"≠",
			"≤",
			"≥",
			"1",
			"2",
			"3",
			"4",
			"5",
			"7",
			"8",
			"9",
			"0",
		];

		function glitchEffect(
			duration = 1000,
			interval = 100,
			glitchProbability = 0.3,
		) {
			const start = Date.now();

			const glitchInterval = setInterval(() => {
				let glitchedText = "";
				for (let i = 0; i < originalText.length; i++) {
					if (Math.random() < glitchProbability) {
						glitchedText +=
							glitchChars[
								Math.floor(Math.random() * glitchChars.length)
							];
					} else {
						glitchedText += originalText[i];
					}
				}
				textElement.textContent = glitchedText;

				// Stop after `duration` milliseconds
				if (Date.now() - start > duration) {
					clearInterval(glitchInterval);
					textElement.textContent = originalText;
				}
			}, interval);
		}

		// // Trigger the glitch effect on page load
		window.addEventListener("DOMContentLoaded", () => glitchEffect());

		// Repeat the glitch Effect each 3 seconds
		setInterval(() => glitchEffect(), 3000);
	}
}

// Vanta Trunk configuration
const VANTA_ENABLED = true;
const VANTA_SELECTOR = "#vanta-header";
const VANTA_CONFIG = {
	mouseControls: true,
	touchControls: true,
	gyroControls: false,
	minHeight: 200.0,
	minWidth: 200.0,
	scale: 1.0,
	scaleMobile: 1.0,
	// backgroundColor: 0x3aa2ff,
	backgroundColor: 0x9cc7ff,
	spacing: 2.0,
	chaos: 4.0,
	color: 0x000000,
};

const VANTA_P5_URL = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js";
const VANTA_TRUNK_URL = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.trunk.min.js";

function loadExternalScriptOnce(src) {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) return resolve();
		const s = document.createElement("script");
		s.src = src;
		s.async = true;
		s.onload = () => resolve();
		s.onerror = () => reject(new Error(`Failed to load ${src}`));
		document.head.appendChild(s);
	});
}

// Load Vanta only on pages that have the target element
window.addEventListener("DOMContentLoaded", async () => {
	if (!VANTA_ENABLED) return;
	const el = document.querySelector(VANTA_SELECTOR);
	if (!el) return; // Do not load libraries if the element isn't present

	try {
		if (!window.p5) await loadExternalScriptOnce(VANTA_P5_URL);
		if (!(window.VANTA && window.VANTA.TRUNK)) {
			await loadExternalScriptOnce(VANTA_TRUNK_URL);
		}
		if (window.__vantaInstance && typeof window.__vantaInstance.destroy === "function") {
			window.__vantaInstance.destroy();
		}
		if (window.VANTA && window.VANTA.TRUNK) {
			window.__vantaInstance = window.VANTA.TRUNK({ el, ...VANTA_CONFIG });
		}
	} catch (err) {
		console.error("Vanta initialization failed:", err);
	}
});
