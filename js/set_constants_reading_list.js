import { ReadingMaterial } from "./set_constants_utils.js";

/**
 * Constants
 */

const readingList = [
    new ReadingMaterial("Linear Algebra Done Right", "Sheldon Axler"),
    new ReadingMaterial("Convex Optimization", "Stephan Boyd and Lieven Vandenberghe"),
    new ReadingMaterial("Introduction to Electrodynamics", "David J. Griffiths"),
    new ReadingMaterial("An Introduction to Mechanics", "Daniel Kleppner, Robert J. Kolenkow"),
    new ReadingMaterial("Introduction To Classical Mechanics With Problems And Solutions", "David Morin"),
];

/**
 * Code
 */

// Adding the reading materials from the array into the HTML
const readingListElement = document.getElementById("readingList").children[0];

for(const readingMaterial of readingList){
    // Creating the HTML elements
    const readingMaterialElement = document.createElement('li');
    const readingMaterialNameElement = document.createElement('strong');
    const readingMaterialAuthorElement = document.createElement('strong');

    // Setting the elements inner HTML
    readingMaterialAuthorElement.innerHTML = readingMaterial.author;
    readingMaterialNameElement.innerHTML = readingMaterial.name;

    // Appending all the child elements to their parents elements
    readingMaterialElement.appendChild(readingMaterialNameElement);
    readingMaterialElement.innerHTML += " by ";
    readingMaterialElement.appendChild(readingMaterialAuthorElement);
    readingListElement.appendChild(readingMaterialElement);
}
