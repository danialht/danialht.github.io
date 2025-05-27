import { ReadingMaterial } from "./set_constants_utils.js";

/**
 * Constants
 */

const readingList = [
    new ReadingMaterial("Linear Algebra Done Right", "Sheldon Axler", "TODO :)"),
    new ReadingMaterial("Convex Optimization", "Stephan Boyd and Lieven Vandenberghe", "TODO :-)"),
    new ReadingMaterial("Introduction to Electrodynamics", "David J. Griffiths", "TODO :D")
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
