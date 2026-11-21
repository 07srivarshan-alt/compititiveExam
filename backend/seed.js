const mongoose = require("mongoose");
require("dotenv").config();

const Question = require("./models/Question");

const questions = [

    // SSC QUESTIONS

    {
        exam: "ssc",
        question: "What is 25% of 400?",
        options: ["50", "75", "100", "125"],
        answer: "100"
    },

    {
        exam: "ssc",
        question: "Find the average of 10, 20, 30 and 40.",
        options: ["20", "25", "30", "35"],
        answer: "25"
    },

    {
        exam: "ssc",
        question: "A product costs Rs. 500 and is sold for Rs. 600. Find the profit percentage.",
        options: ["10%", "15%", "20%", "25%"],
        answer: "20%"
    },

    {
        exam: "ssc",
        question: "Find the value of 15 × 12.",
        options: ["160", "170", "180", "190"],
        answer: "180"
    },

    {
        exam: "ssc",
        question: "If 5 workers complete a work in 10 days, how many worker-days are required?",
        options: ["15", "25", "50", "100"],
        answer: "50"
    },


    // TNPSC QUESTIONS

    {
        exam: "tnpsc",
        question: "What is the HCF of 12 and 18?",
        options: ["3", "6", "9", "12"],
        answer: "6"
    },

    {
        exam: "tnpsc",
        question: "Find the simple interest on Rs. 1000 at 10% per annum for 2 years.",
        options: ["100", "150", "200", "250"],
        answer: "200"
    },

    {
        exam: "tnpsc",
        question: "The ratio of two numbers is 2:3. If their sum is 25, find the smaller number.",
        options: ["5", "10", "15", "20"],
        answer: "10"
    },

    {
        exam: "tnpsc",
        question: "Find the next number: 2, 4, 8, 16, ?",
        options: ["20", "24", "30", "32"],
        answer: "32"
    },

    {
        exam: "tnpsc",
        question: "A person travels 120 km in 3 hours. Find the speed.",
        options: ["30 km/hr", "40 km/hr", "50 km/hr", "60 km/hr"],
        answer: "40 km/hr"
    }

];


async function insertQuestions() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        await Question.deleteMany({});

        await Question.insertMany(questions);

        console.log("10 Questions Inserted Successfully");

        await mongoose.disconnect();

    }

    catch(error) {

        console.log(error);

        process.exit(1);

    }

}

insertQuestions();