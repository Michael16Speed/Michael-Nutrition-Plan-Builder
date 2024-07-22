document.getElementById('nutrition-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const bodyfat = parseFloat(document.getElementById('bodyfat').value);
    const traineeLevel = document.getElementById('trainee-level').value;
    const steps = parseInt(document.getElementById('steps').value);
    const foodChoices = document.getElementById('food-choices').value;

    // Basic validation
    if (!height || !weight || !bodyfat || !traineeLevel || !steps || !foodChoices) {
        alert('Please fill in all fields');
        return;
    }

    // Calculate BMR using the Harris-Benedict equation
    // Assuming male for this example; you can extend the form to ask for gender
    const age = 29; // Assuming a fixed age; you can extend the form to ask for age
    const BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);

    // Adjust BMR based on activity level
    let activityFactor;
    switch (traineeLevel) {
        case 'beginner':
            activityFactor = 1.2;
            break;
        case 'intermediate':
            activityFactor = 1.55;
            break;
        case 'advanced':
            activityFactor = 1.725;
            break;
        default:
            activityFactor = 1.2;
    }

    const dailyCalories = BMR * activityFactor;
    
    // Calculate additional calories burned from steps
    const caloriesPerStep = 0.04; // Average calories burned per step
    const stepsCalories = steps * caloriesPerStep;
    const totalDailyCalories = dailyCalories + stepsCalories;

    // Display the results
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.innerHTML = `
        <h2>Your Nutrition Plan</h2>
        <p><strong>Height:</strong> ${height} cm</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Body Fat Percentage:</strong> ${bodyfat} %</p>
        <p><strong>Level of Trainee:</strong> ${traineeLevel}</p>
        <p><strong>Steps Count:</strong> ${steps}</p>
        <p><strong>Food Choices:</strong> ${foodChoices}</p>
        <p><strong>BMR:</strong> ${BMR.toFixed(2)} kcal/day</p>
        <p><strong>Daily Caloric Needs:</strong> ${totalDailyCalories.toFixed(2)} kcal/day</p>
    `;

    document.body.appendChild(resultDiv);
});
