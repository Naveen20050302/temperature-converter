const temperatureInput = document.getElementById('temperatureInput');
const inputUnit = document.getElementById('inputUnit');
const outputUnit = document.getElementById('outputUnit');
const resultDisplay = document.getElementById('resultDisplay');
const errorMessage = document.getElementById('error-message');
const clearButton = document.getElementById('clearButton');
const darkModeButton = document.getElementById('darkModeButton');

// Real-time conversion on input change
temperatureInput.addEventListener('input', handleConversion);
inputUnit.addEventListener('change', handleConversion);
outputUnit.addEventListener('change', handleConversion);

// Handle the temperature conversion
function handleConversion() {
    const tempValue = temperatureInput.value;

    // Clear any previous error
    errorMessage.textContent = '';
    resultDisplay.textContent = '';

    // Validate input
    if (isNaN(tempValue) || tempValue === '') {
        errorMessage.textContent = 'Please enter a valid number.';
        return;
    }

    const temperature = parseFloat(tempValue);

    // Additional validation for Kelvin (no negative values)
    if (inputUnit.value === 'Kelvin' && temperature < 0) {
        errorMessage.textContent = 'Kelvin cannot be negative.';
        return;
    }

    // Conversion logic
    const convertedTemp = convertTemperature(temperature, inputUnit.value, outputUnit.value);
    resultDisplay.textContent = `${convertedTemp.toFixed(2)} °${outputUnit.value}`;
}

// Conversion function
function convertTemperature(temp, fromUnit, toUnit) {
    let celsiusTemp;

    // Convert the input temperature to Celsius first
    if (fromUnit === 'Celsius') {
        celsiusTemp = temp;
    } else if (fromUnit === 'Fahrenheit') {
        celsiusTemp = (temp - 32) * 5/9;
    } else if (fromUnit === 'Kelvin') {
        celsiusTemp = temp - 273.15;
    }

    // Convert from Celsius to the output unit
    if (toUnit === 'Celsius') {
        return celsiusTemp;
    } else if (toUnit === 'Fahrenheit') {
        return (celsiusTemp * 9/5) + 32;
    } else if (toUnit === 'Kelvin') {
        return celsiusTemp + 273.15;
    }
}

// Clear button functionality
clearButton.addEventListener('click', () => {
    temperatureInput.value = '';
    resultDisplay.textContent = '';
    errorMessage.textContent = '';
});

// Dark mode toggle
darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
});
