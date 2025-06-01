const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const noiseSlider = document.getElementById('noiseRange');

const img = new Image();
img.crossOrigin = 'anonymous'; // in case you're using a remote image
img.src = 'https://media.licdn.com/dms/image/v2/D4D03AQEZQGF2ZW3gTQ/profile-displayphoto-shrink_400_400/B4DZapGRrNG8Ag-/0/1746593717799?e=1754524800&v=beta&t=lk2Liv2H6-I01a54gZIyusJbnb7A4-gvDRDRpal--KA'; // Replace with your image

let originalImageData;
let noiseData;
const images = [];
const beta_schedule = []

function fill_beta_schedule(schedule_name){
    switch(schedule_name){
        case "linear":
            const begin = 0.00;
            const end = 0.15;
            for(let i = 0; i < 100; i++)
                beta_schedule.push(begin + i * (end - begin) / 99)
            break;
        default:
            throw new Error(`Invalid schedule name: ${schedule_name}. Please provide a valid name.`);

    }
}

// Box–Muller transform
function gaussianRandom(mean=0, stdev=1) {
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

function fill_noise_arr(){
    for(let j = 1 ; j < 100 ; j++){
        const prevImage = images[j-1];
        const data = prevImage.data;
        const result = new Uint8ClampedArray(data.length);
        for (let i = 0; i < data.length; i += 4) {
            // Generate pure noise pixel
            const noiseR = (255 / 2) * gaussianRandom();
            const noiseG = (255 / 2) * gaussianRandom();
            const noiseB = (255 / 2) * gaussianRandom();
            
            const beta = beta_schedule[j];
        
            // Linearly interpolate between original and noise
        
            result[i]     = 255/2 + (data[i]     - 255/2) * Math.sqrt(1 - beta) + beta * noiseR; // R
            result[i + 1] = 255/2 + (data[i + 1] - 255/2) * Math.sqrt(1 - beta) + beta * noiseG; // G
            result[i + 2] = 255/2 + (data[i + 2] - 255/2) * Math.sqrt(1 - beta) + beta * noiseB; // B


            result[i + 3] = data[i + 3]; // keep alpha
        }
        images.push(new ImageData(result, originalImageData.width, originalImageData.height));
    }

}

function update_image(){
    if (!originalImageData) return;
    const strength = parseFloat(noiseSlider.value); // 0 to 100
    const noisyImage = interpolateNoise(originalImageData, strength);
    ctx.putImageData(noisyImage, 0, 0);
}

img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    images.push(originalImageData);
    fill_beta_schedule('linear');
    fill_noise_arr();
    update_image();
    noiseSlider.addEventListener('input', () => update_image());
};

function interpolateNoise(imageData, strength) {
    strength = strength - 1; // 0-index
    return images[strength];
// const data = imageData.data;
// const result = new Uint8ClampedArray(data.length);
// const strengthNormalized = strength / 100;

// for (let i = 0; i < data.length; i += 4) {
//     // console.log(data[i])
//     // Generate pure noise pixel
//     const noiseR = noiseData[i];
//     const noiseG = noiseData[i + 1];
//     const noiseB = noiseData[i + 2];

//     // Linearly interpolate between original and noise
//     result[i] = (1 - strengthNormalized) * data[i] + strengthNormalized * noiseR;     // R
//     result[i + 1] = (1 - strengthNormalized) * data[i + 1] + strengthNormalized * noiseG; // G
//     result[i + 2] = (1 - strengthNormalized) * data[i + 2] + strengthNormalized * noiseB; // B
//     result[i + 3] = data[i + 3]; // keep alpha
// }

// return new ImageData(result, imageData.width, imageData.height);
}

