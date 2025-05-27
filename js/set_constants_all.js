/**
 * Setting the constants here instead of hardcoding them
 * into the HTML file for readability.
 */

/**
 * Constants
 */

NAME = "Danial"
FAMILY_NAME = "Hosseintabar"
AFFILIATION = "Computer Science and Mathematics Student at MIT"
GLITCH_EFFECT = true // Adds a glitch effect on anything having in the `glitchText` class

NAVIGATION_BAR_LINKS = {
    "About": "index.html",
    "Projects": "projects.html",
    "Coursework": "coursework.html",
    "Reading list": "reading_list.html",
    "Contact": "contact.html",
    "Publications": "publications.html",
    "Experiences": "experiences.html"
};

/**
 * Code
 */

// Setting the name, family name, affiliation
document.getElementById("nameAndFamilyName").innerHTML = NAME + ' ' + FAMILY_NAME
document.getElementById("affiliation").innerHTML = AFFILIATION


// Setting the links for the navigation bar on top
navigationArr = document.getElementsByClassName("navigation")[0].children;

for(const child of navigationArr){
    const liElement = child.querySelector("a");
    const insideText = liElement.innerHTML;
    liElement.setAttribute("href", NAVIGATION_BAR_LINKS[insideText])
}

// Setting the glitch effect for the name on top
if(GLITCH_EFFECT){
    const textElements = document.getElementsByClassName("glitchText");
    for(textElement of textElements){
        const originalText = textElement.textContent;
        const glitchChars = ['#', '%', '&', '@', '*', '+', '=', '§', '?', '/', '\\', '1', '2', '3', '4', '5', '7', '8', '9', '0'];

        function glitchEffect(duration = 1000, interval = 100, glitchProbability = 0.3) {
        const start = Date.now();

        const glitchInterval = setInterval(() => {
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < glitchProbability) {
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
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
        window.addEventListener('DOMContentLoaded', () => glitchEffect());

        // Repeat the glitch Effect each 3 seconds
        setInterval(() => glitchEffect(), 3000);
    }
}