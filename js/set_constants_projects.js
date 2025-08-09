projectList = document.getElementById("project-list");
projectParagraph = document.getElementById("project-paragraph");

projectParagraph.innerHTML = "Here are some of my older CS projects:";

// adding an li element to the project list
function addProjectToList(name, description, tags) {
	const li = document.createElement("li");
	const colorList = [
		"#c73c1dff",
		"#0e8925ff",
		"#3357FF",
		"#FF33A1",
		"#A133FF",
		"#0140b5ff",
		"#989f03ff",
	];
	const getRandomColor = () => {
		return colorList[Math.floor(Math.random() * colorList.length)];
	};

	const tagsHTML = tags
		.map((tag) => {
			const randomColor = getRandomColor();
			return `<span style="background-color: ${randomColor}; color: #ffffff; padding: 2px 6px; border-radius: 4px; margin-left: 5px; font-size: 0.9em;">${tag}</span>`;
		})
		.join("");
	li.innerHTML = `<strong>${name}</strong>: ${description} ${tagsHTML}`;
	projectList.appendChild(li);
}

// Adding projects to the list
addProjectToList("3D_Graphics", "A web-based 3D rendering engine.", [
	"JavaScript",
	"HTML",
	"CSS",
]);
addProjectToList(
	"Strategic Game",
	"An online 2.5D startegic game, build and develope your base and take over other bases.",
	["Java", "JavaFX"],
);
addProjectToList(
	"Invisible Piano",
	"A computer vision tracking your hand, so you can play the piano on air, the sounds where generated using simple signal processing.",
	["Python", "LibRosa", "OpenCV"],
);
addProjectToList(
	"Chess AI",
	"A Python‑powered chess game with built-in agent to play against you.",
	["Python", "Pygame"],
);
addProjectToList(
	"Lisp Editor",
	"An interpretere for the programing language Lisp, written in Python. It includes a REPL (Read-Eval-Print Loop) for interactive programming.",
	["Python"],
);
addProjectToList("Text Editor", "My own text editor, very similar to vim.", [
	"C",
]);
