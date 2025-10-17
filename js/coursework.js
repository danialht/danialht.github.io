

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
