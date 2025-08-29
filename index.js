import express from "express";

const app = express();
app.use(express.json());

// User details
const fullName = "john_doe";
const dob = "17091999"; // ddmmyyyy
const email = "john@xyz.com";
const rollNumber = "ABCD123";

function processData(data) {
  let even_numbers = [];
  let odd_numbers = [];
  let alphabets = [];
  let special_characters = [];
  let sum = 0;

  data.forEach((item) => {
    if (/^-?\d+$/.test(item)) {
      let num = parseInt(item);
      if (num % 2 === 0) {
        even_numbers.push(item);
      } else {
        odd_numbers.push(item);
      }
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
    } else {
      special_characters.push(item);
    }
  });

  // concat string = reverse alphabets + alternating caps
  let allAlpha = alphabets.join("");
  let reversed = allAlpha.split("").reverse().join("");
  let concat_string = reversed
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  return {
    is_success: true,
    user_id: `${fullName.toLowerCase()}_${dob}`,
    email,
    roll_number: rollNumber,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string,
  };
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }
    const result = processData(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
