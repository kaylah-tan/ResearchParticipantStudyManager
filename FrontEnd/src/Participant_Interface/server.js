import express from "express";
import nodemailer from "nodemailer";
import cron from "node-cron";
import { DateTime } from "luxon";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const DEFAULT_PORT = 5174;
const port = process.env.PORT || DEFAULT_PORT; // Try using PORT from .env or default to 5173

// Nodemailer transport: CALL BACKEND! 
// Gmail service 
// .env file contains each individual user information 
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, //insert emails into process.env file
        pass: process.env.EMAIL_PASS, //insert passwords into process.env file
    },
});

// Testing ... 
const appointments = [
    { name: "Kaylah", email: "tank@whitman.edu", appointmentTime: new Date("2025-03-16T11:40:00") }, // March 15, 2:00 PM
];

// Function to send email
async function sendEmail(name, email, appointmentTime) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reminder for Study", //Fill this with subject name
            //Fill this with content in the email
            //Can be a tempalate that doesn't get changed
            text: `Hello ${name},\n\nThis is a reminder that you have an appointment at ${appointmentTime}.\n\nBest,\nResearcher`
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, message: `Email successfully sent to ${email}: ${info.response}` };
    } catch (error) {
        return { success: false, message: `Failed to send email: ${error.message}` };
    }
}

cron.schedule('* * * * *', () => {
    console.log(`[${new Date().toISOString()}] Cron job triggered.`);
/*
// Scheduled Email to run 24 hours before meeting
cron.schedule("0 0 * * *", async () => {
    console.log("Checking for upcoming appointments...");

    // Get the current time in Pacific Time
    const pacificNow = DateTime.now().setZone("America/Los_Angeles");

    for (const participant of appointments) {
        const appointmentTime = DateTime.fromJSDate(participant.appointmentTime).setZone("America/Los_Angeles");
        const reminderTime = appointmentTime.minus({ hours: 24 }); // 24 hours before the appointment

        // Check if it's time to send the reminder (within the hour)
        if (pacificNow >= reminderTime && pacificNow < reminderTime.plus({ hours: 1 })) {
            const response = await sendEmail(participant.name, participant.email, appointmentTime.toISO());
            console.log(response.message);
        }
    }
}, {
    scheduled: true,
    timezone: "America/Los_Angeles", // Ensures the cron job aligns with Pacific Time
*/
});

// Start server with proper error handling
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Root route to handle GET requests to "/"
app.get("/", (req, res) => {
    console.log("Accessing root route");
    res.send("Welcome to the server!");
    //console.log(`Email User: ${emailUser}`);
    //console.log(`Email Pass: ${emailPass}`);
    //console.log(`Port: ${port}`);
});

// API route to manually send an email
app.get("/sendEmail", async (req, res) => {
    const { name, email } = req.query;
    if (!name || !email) {
        return res.status(400).send("Missing name or email!");
    }

    const response = await sendEmail(name, email, "Manual Trigger");
    res.status(response.success ? 200 : 500).send(response.message);
});

//Throws an error in the console depending on the cases I ran through 
//port in use -- sometimes an issue with the specific browser cache
server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Trying a new port...`);
        // Picks a random available port instead
        const newPort = Math.floor(Math.random() * 1000) + 3000;
        
        app.listen(newPort, () => {
            console.log(`Server started on new port: http://localhost:${newPort}`);
        });
    } else {
        console.error("Server error:", err);
        process.exit(1); // Exit if it's a different error
    }
});
