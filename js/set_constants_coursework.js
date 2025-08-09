// TODO: Delete from the HTML and fill in the page from here

id2description = {
	tensor: "I took a course on Tensor Decompositions during university and found it to be an incredibly enjoyable and enriching experience. The first half of the class focused on foundational algorithms for matrices, such as LU decomposition, SVD, and eigen decomposition, with Matrix Computations by Gene H. Golub serving as the primary textbook. This part of the course solidified my understanding of linear algebraic techniques and their computational aspects. The second half delved deeper into tensor calculus and high-dimensional decompositions, covering methods like Canonical Polyadic Decomposition (CPD), Higher-Order Singular Value Decomposition (HOSVD), and Tucker decomposition. We studied both the theoretical foundations and the practical algorithms behind these techniques, along with their applications in machine learning, data science and signal processing. The blend of rigorous mathematics and real-world relevance made the class especially engaging and intellectually rewarding.",
	optimization:
		"I took a course in optimization and found it to be one of the most enjoyable and intellectually stimulating subjects I’ve studied. I particularly appreciated the depth and clarity of the textbooks Convex Optimization by Boyd and Convex Optimization Theory by Bertsekas, both of which provided me with a strong theoretical foundation and practical insights. These resources not only deepened my understanding of convex analysis and duality but also proved to be incredibly helpful during my research, where optimization techniques played a central role. As a result, optimization has become one of my favorite topics, and I continue to explore its applications with great interest.",
	stochprocess:
		"In Spring 2025, I took the graduate-level mathematics course 18.619: Discrete Probability and Stochastic Processes, which turned out to be one of the most enjoyable and thought-provoking classes I've taken. The course covered a wide range of fascinating topics, including the Galton-Watson Process, Broadcast Process, the Lovász Local Lemma, various concentration bounds, martingales, stopping times, and many new insights into random graphs, especially Erdős–Rényi graphs. We also explored graphical models, Markov chains, MCMC methods, and mixing times, all of which significantly expanded my understanding of probabilistic methods and stochastic processes. I had a great time solving numerous challenging and fun problems related to these concepts, and the final project was a highlight—working in a team on an open problem made the learning experience collaborative and deeply engaging.",
	18656: "I took the course 18.656: Mathematical Statistics II: A Non-Asymptotic Approach in Spring 2025, which was an incredibly enriching experience. The course delved into advanced topics in statistical theory, focusing on non-asymptotic methods and their applications. We explored various statistical models, estimation techniques, and hypothesis testing frameworks that do not rely on asymptotic approximations. The rigorous approach to statistical inference provided me with a solid foundation in both theoretical and practical aspects of statistics. The course also emphasized the importance of understanding the limitations of asymptotic methods and the relevance of non-asymptotic approaches in real-world applications.",
};

// Mapping from IDs to display titles
id2title = {
	tensor: "Tensor Decompositions",
	optimization: "Optimization",
	stochprocess: "Discrete Probability and Stochastic Processes",
	18656: "Mathematical Statistics II: A Non-Asymptotic Approach",
};

// Function to toggle course content
function toggleCourse(courseId) {
	const courseItem = document.getElementById(courseId);
	const content = courseItem.querySelector(".course-content");
	const icon = courseItem.querySelector(".toggle-icon");

	if (content.style.maxHeight) {
		content.style.maxHeight = null;
		icon.textContent = "▶";
		courseItem.classList.remove("expanded");
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
		icon.textContent = "▼";
		courseItem.classList.add("expanded");
	}
}

// Generate coursework elements
function generateCourseworkElements() {
	const courseworkSection = document.getElementById("coursework");
	if (!courseworkSection) return;

	const container = courseworkSection.querySelector(".container");
	if (!container) return;

	// Clear existing content except the h2 and h1
	// const h2 = container.querySelector('h2');
	// const h1 = container.querySelector('h1');
	// container.innerHTML = '';
	// if (h2) container.appendChild(h2);
	// if (h1) container.appendChild(h1);

	// Generate course items
	for (const courseId in id2description) {
		const courseItem = document.createElement("div");
		courseItem.className = "course-item";
		courseItem.id = courseId;

		courseItem.innerHTML = `
            <div class="course-header" onclick="toggleCourse('${courseId}')">
                <div class="toggle-icon">▶</div>
                <div class="course-title">${id2title[courseId] || courseId}</div>
            </div>
            <div class="course-content">
                <div class="course-description">${id2description[courseId]}</div>
            </div>
        `;

		container.appendChild(courseItem);
	}

	// Add spacing div
	const spacingDiv = document.createElement("div");
	spacingDiv.style.height = "50px";
	container.appendChild(spacingDiv);
}

// Generate elements when DOM is loaded
document.addEventListener("DOMContentLoaded", generateCourseworkElements);
