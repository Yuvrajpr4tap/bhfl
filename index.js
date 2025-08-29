
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

const USER_ID = "john_doe_28082025";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post('/bfhl', (req, res) => {
   
    try {
       
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input. Request body must contain a 'data' array."
            });
        }
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        let concatString = "";

        data.forEach(item => {
            if (typeof item === 'string') {
]
                const numberValue = Number(item);
                if (!isNaN(numberValue) && isFinite(numberValue)) {
                    if (numberValue % 2 === 0) {
                        evenNumbers.push(item);
                    } else {
                        oddNumbers.push(item);
                    }

                    sum += numberValue;
                } else if (item.length === 1 && /[a-zA-Z]/.test(item)) {
                    alphabets.push(item.toUpperCase());
                } else if (item.length === 1 && /[^a-zA-Z0-9]/.test(item)) {

                    specialCharacters.push(item);
                }
            }
        });
        if (alphabets.length > 0) {
            const reversedAlphabets = [...alphabets].reverse();
            for (let i = 0; i < reversedAlphabets.length; i++) {
                if (i % 2 === 0) {
               
                    concatString += reversedAlphabets[i].toUpperCase();
                } else {
                    concatString += reversedAlphabets[i].toLowerCase();
                }
            }
        }


        res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sum), 
            concat_string: concatString
        });
    } catch (error) {
  
        console.error("An error occurred:", error);
        res.status(500).json({
            is_success: false,
            message: "An internal server error occurred."
        });
    }
});
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        message: 'This endpoint only accepts POST requests. Please send a JSON body with a "data" array.',
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API! Use the /bfhl endpoint with a POST request.');
});

// Step 15: Start the server and listen on the specified port.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
