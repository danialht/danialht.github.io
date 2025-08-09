const N_IMAGES = 10;
const SLIDER_MAX = N_IMAGES - 1;
const SLIDER_MIN = 0;
const SLIDER_INIT_VALUE = 100;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const noiseSlider = document.getElementById("noiseRange");

const img = new Image();
img.crossOrigin = "anonymous"; // in case you're using a remote image
img.src =
	"https://media.licdn.com/dms/image/v2/D4D03AQHrVdOahFnBXg/profile-displayphoto-scale_400_400/B4DZepzzHFHMAg-/0/1750900618376?e=1756944000&v=beta&t=GUL6H4M7iRGmNaus2JUvLmu-WJY1KFamgOOTNctx1EQ";

let originalImageData;
let noiseData;
const images = [];
const beta_schedule = [];

function fill_beta_schedule(schedule_name) {
	switch (schedule_name) {
		case "linear":
			const begin = 0.0;
			const end = 0.85;
			for (let i = 0; i < N_IMAGES; i++)
				beta_schedule.push(
					begin + (i * (end - begin)) / (N_IMAGES - 1),
				);
			break;
		default:
			throw new Error(
				`Invalid schedule name: ${schedule_name}. Please provide a valid name.`,
			);
	}
}

// Box–Muller transform
function gaussianRandom(mean = 0, stdev = 1) {
	const u = 1 - Math.random(); // Converting [0,1) to (0,1]
	const v = Math.random();
	const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	// Transform to the desired mean and standard deviation:
	return z * stdev + mean;
}

function fill_noise_arr() {
	for (let j = 1; j < N_IMAGES; j++) {
		const prevImage = images[j - 1];
		const data = prevImage.data;
		const result = new Uint8ClampedArray(data.length);
		for (let i = 0; i < data.length; i += 4) {
			// Generate pure noise pixel
			const noiseR = (255 / 2) * gaussianRandom();
			const noiseG = (255 / 2) * gaussianRandom();
			const noiseB = (255 / 2) * gaussianRandom();

			const beta = beta_schedule[j];

			// Linearly interpolate between original and noise

			result[i] =
				255 / 2 +
				(data[i] - 255 / 2) * Math.sqrt(1 - beta) +
				beta * noiseR; // R
			result[i + 1] =
				255 / 2 +
				(data[i + 1] - 255 / 2) * Math.sqrt(1 - beta) +
				beta * noiseG; // G
			result[i + 2] =
				255 / 2 +
				(data[i + 2] - 255 / 2) * Math.sqrt(1 - beta) +
				beta * noiseB; // B

			result[i + 3] = data[i + 3]; // keep alpha
		}
		images.push(
			new ImageData(
				result,
				originalImageData.width,
				originalImageData.height,
			),
		);
	}
}

function update_image() {
	if (!originalImageData) return;
	const strength = Math.round(
		(parseFloat(noiseSlider.value) / SLIDER_MAX) * (N_IMAGES - 1),
	); // 0 to N_IMAGES - 1 inclusive

	console.log(strength);
	const noisyImage = interpolateNoise(originalImageData, strength);
	ctx.putImageData(noisyImage, 0, 0);
}

img.onload = () => {
	// set slider values
	noiseSlider.value = SLIDER_INIT_VALUE;
	noiseSlider.max = SLIDER_MAX;
	noiseSlider.min = SLIDER_MIN;
	noiseSlider.step = 1;
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	images.push(originalImageData);
	fill_beta_schedule("linear");
	fill_noise_arr();
	update_image();
	noiseSlider.addEventListener("input", () => update_image());
};

function interpolateNoise(imageData, strength) {
	return images[strength];
}
