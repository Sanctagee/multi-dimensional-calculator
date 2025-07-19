const operationSelect = document.getElementById('operation');
const calculateButton = document.getElementById('calculate');
const inputsDiv = document.getElementById('inputs');
const resultValue = document.getElementById('result-value');
const resultDiv = document.querySelector('#result')

operationSelect.style.fontWeight = "bold"

//Defining the Operations and their required inputs

const operations ={
    surface_area_rectangle: {formula: (l, w) => 2 * (l * w), inputs: ["Length", "Width"]},
    area_triangle: {formula: (b, h) => 0.5 * (b * h), inputs: ["Base", "Height"]},
    area_square: {formula: (s) => s * s, inputs: ["Side Length"]},
    area_trapezoid: {formula: (a, b, h) => 0.5 * (a + b) * h, inputs: ["Base A", "Base B", "Height"]},
    area_rectangular_prism: {formula: (l, w, h) => 2 * (l* w + l * h + w * h), inputs: ["Length", "Width", "Height"]},
    area_circle: {formula: (r) => Math.PI * r * r, inputs: ["Radius"]},
    area_rhombus: {formula: (d1, d2) => 0.5 * d1  * d2, inputs: ["Diagonal 1", "Diagonal 2"]},
    surface_area_cylinder: {formula: (r, h) => 2 * (Math.PI * r * h) + 2 * (Math.PI * Math.pow(r, 2)), inputs: ["Radius", "Height"]},
    perimeter_rectangle: {formula: (l, w) => 2 * (l + w), inputs: ["Length", "Width"]},
    perimeter_triangle: {formula: (a, b, c) => a + b + c, inputs: ["Side A", "Side B", "Side C"]},
    perimeter_square: {formula: (s) => 4 * s, inputs: ["Side Length"]},
    circumference_circle: {formula: (r) => 2 * Math.PI * r , inputs: ["Radius"]},
    volume_rectangular_prism: {formula: (l, w, h) => l * w * h, inputs: ["Length", "Width", "Height"]},
    volume_cylinder: {formula: (r, h) => Math.PI * Math.pow(r, 2) * h, inputs: ["Radius", "Height"]},
    volume_cone: {formula: (r, h) => (1/3) * Math.PI * Math.pow(r, 2) * h, inputs: ["Radius", "Height"]},
    volume_sphere: {formula: (r) => (4/3) * Math.PI * Math.pow(r, 3), inputs: ["Radius", "Height"]},
    volume_pyramid: {formula: (l, w, h) => (1/3) * l * w * h, inputs: ["Length", "Width", "Height"]},
    pythagorean: {formula: (a, b) => Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)), inputs: ["Side A", "Side B"]},
    mean: {
        formula: (...numbers) => numbers.reduce((a, b) => a + b, 0)/ numbers.length, 
        inputs:["Comma-separated Numbers"]
    },
    median: {
        formula: (...numbers) =>{
            const sorted = numbers.sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 === 0? (sorted[mid -1] + sorted[mid]) / 2: sorted[mid]
        }, inputs: ["Comma-separated Numbers"]
    },
    range: {
        formula: (...numbers) => Math.max(...numbers) - Math.min(...numbers), 
        inputs: ["Comma-separated Numbers"]
    },
    variance: {
        formula: (...numbers) =>{
            const mean = numbers.reduce((a, b) => a + b, 0)/ numbers.length;
            return numbers.reduce((sum, n) => sum + Math.pow(n- mean, 2), 0)/ numbers.length;
        }, inputs: ["Comma-separated Numbers"]
    },
    mean_deviation: {
        formula: (...numbers) =>{
            const mean = numbers.reduce((a, b) => a + b, 0)/ numbers.length;
            return numbers.reduce((sum, n) => sum + Math.abs(n-mean), 0)/ numbers.length;
        }, inputs: ["Comma-separated Numbers"]
    },
    mode: { 
        formula: (...numbers) => {
            const frequency = {};
            numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
            const maxFreq = Math.max(...Object.values(frequency));
            return Object.keys(frequency)
                .filter(key => frequency[key] === maxFreq)
                .map(Number); // Convert keys back to numbers
        }, 
        inputs: ["Comma-separated Numbers"]
    },
    
    standard_deviation: { 
        formula: (...numbers) => {
            const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
            const variance = numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / numbers.length;
            return Math.sqrt(variance); // Square root of variance
        }, 
        inputs: ["Comma-separated Numbers"]
    },
    
};




// Updating the input fields based on the selected operation
operationSelect.addEventListener("change", () =>{
    // to save the value of the selected operation as variable
    const selectedOperation = operationSelect.value;
    inputsDiv.innerHTML = "";
    resultDiv.style.display = "none"
    
    if (selectedOperation && operations[selectedOperation]){
        operations[selectedOperation].inputs.forEach((inputName, index) =>{
           const input = document.createElement('input');
           input.type = 'text'; 
           input.id = `input-${index}`;
           input.placeholder = inputName;
           inputsDiv.appendChild(input)
        });
    }
});

// To perform the calculations
calculateButton.addEventListener('click', () => {
    const selectedOperation = operationSelect.value;
    if (!selectedOperation){
        alert("Dear user, You have not selected any mathematical operation")
        return;
    }
    const inputs = Array.from(inputsDiv.querySelectorAll("input")).map(input => parseFloat(input.value));

    if(inputs.some(value => isNaN(value))){
        alert("You have not added the required figures");
        return;
    }
    if(operations[selectedOperation].inputs.includes("Comma-separated Numbers")){
        const numbers = inputsDiv.querySelector('input').value.split(",").map(num => parseFloat(num.trim()));
        resultValue.textContent = operations[selectedOperation].formula(...numbers);
    } else{
        resultValue.textContent = operations[selectedOperation].formula(...inputs);
    }

    resultDiv.style.display = "block"
    resultDiv.style.fontWeight = "bold"
})
