const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const Question = require("./models/Question");

const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected Successfully");

})

.catch((error) => {

    console.log("MongoDB Connection Error:", error);

});


// Home Route

app.get("/", (req, res) => {

    res.send("Competitive Exam Portal Backend Running");

});


// Get SSC and TNPSC Questions

app.get("/api/questions/:exam", async (req, res) => {

    try {

        const exam = req.params.exam.toLowerCase();

        if (!["ssc", "tnpsc"].includes(exam)) {

            return res.status(400).json({
                message: "Invalid examination"
            });

        }

        const questions = await Question.find({
            exam: exam
        });

        res.json(questions);

    }

    catch(error) {

        res.status(500).json({
            message: "Error fetching questions"
        });

    }

});


// Start Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});