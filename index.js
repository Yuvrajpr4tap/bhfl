// A simple Node.js REST API using Express.
// This file can be named server.js or index.js.

// Step 1: Import the Express library.
// Express is a minimalist web framework for Node.js.
// You need to run `npm install express` to use it.
const express = require('express');

// Step 2: Create a new Express application.
const app = express();
const PORT = process.env.PORT || 3000;

// Step 3: Use middleware to parse JSON request bodies.
// This is necessary to handle the JSON input from the POST request.
app.use(express.json());

// Step 4: Define the `user_id`, `email`, and `roll_number` constants.
// You can modify these to match your personal details.
const USER_ID = "john_doe_28082025";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// Step 5: Define the POST route for the "/bfhl" endpoint.
// This is the core logic of the application.
app.post('/bfhl', (req, res) => {
    // We wrap the entire logic in a try-catch block for graceful exception handling.
    try {
        // Step 6: Extract the 'data' array from the request body.
        const { data } = req.body;

        // Step 7: Validate the input.
        // If 'data' is missing or not an array, return an error.
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input. Request body must contain a 'data' array."
            });
        }

        // Step 8: Initialize arrays and variables to store the processed data.
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        let concatString = "";

        // Step 9: Iterate through the input array to classify each element.
        data.forEach(item => {
            // Check if the item is a string. All input is expected to be strings.
            if (typeof item === 'string') {
                // Check if the string represents a number.
                const numberValue = Number(item);
                if (!isNaN(numberValue) && isFinite(numberValue)) {
                    // Check if the number is even or odd.
                    if (numberValue % 2 === 0) {
                        evenNumbers.push(item);
                    } else {
                        oddNumbers.push(item);
                    }
                    // Add the number to the running sum.
                    sum += numberValue;
                } else if (item.length === 1 && /[a-zA-Z]/.test(item)) {
                    // Check if the string is a single alphabet character.
                    // Convert it to uppercase and add to the alphabets array.
                    alphabets.push(item.toUpperCase());
                } else if (item.length === 1 && /[^a-zA-Z0-9]/.test(item)) {
                    // Check if it's a single special character.
                    specialCharacters.push(item);
                }
            }
        });

        // Step 10: Implement the logic for `concat_string`.
        // Reverse the alphabets array and alternate the case.
        if (alphabets.length > 0) {
            const reversedAlphabets = [...alphabets].reverse();
            for (let i = 0; i < reversedAlphabets.length; i++) {
                if (i % 2 === 0) {
                    concatString += reversedAlphabets[i].toLowerCase();
                } else {
                    concatString += reversedAlphabets[i].toUpperCase();
                }
            }
        }
        
        // The instructions ask for reverse order in alternating caps.
        // Example "a", "R" -> reversed is "R", "a". Alternating caps -> "Ra" (R is uppercase, a is lowercase).
        // Let's re-implement this to be precise: "Ra" -> R is 0-index, a is 1-index.
        // The first character of the reversed string should be uppercased.
        concatString = ""; // Reset for the correct logic
        if (alphabets.length > 0) {
            const reversedAlphabets = [...alphabets].reverse();
            for (let i = 0; i < reversedAlphabets.length; i++) {
                if (i % 2 === 0) {
                    // First character (index 0) becomes uppercase
                    concatString += reversedAlphabets[i].toUpperCase();
                } else {
                    // Second character (index 1) becomes lowercase, and so on
                    concatString += reversedAlphabets[i].toLowerCase();
                }
            }
        }


        // Step 11: Construct the final successful JSON response.
        res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sum), // Sum must be returned as a string
            concat_string: concatString
        });
    } catch (error) {
        // Step 12: Handle any unexpected errors.
        console.error("An error occurred:", error);
        res.status(500).json({
            is_success: false,
            message: "An internal server error occurred."
        });
    }
});

// Step 13: Define a root route for testing and sanity check.
app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API! Use the /bfhl endpoint with a POST request.');
});

// Step 14: Start the server and listen on the specified port.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
