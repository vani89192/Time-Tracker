⏱️ Time Tracker – Daily Productivity Dashboard

A web-based time tracking application that allows users to log their daily activities and visualize the distribution of their full day (1440 minutes) across categories such as Work, Study, Sleep, Entertainment, and Exercise. Once the user completes the total 1440 minutes, the Analyse feature unlocks and displays visual insights through Pie and Bar charts.

This project demonstrates the use of Firebase Authentication + Firestore, JavaScript (ES Modules), and Chart.js.

🔗 Live Links

Live Demo: Paste your deployed link here

GitHub Repo: Paste your repository link here

Video Walkthrough: YouTube/Drive video link here

🎯 Overview

This Time Tracker app helps users understand how their daily routine is divided into activities. It enforces a complete 24-hour cycle (1440 minutes) before analysis for accurate visualization.

Users can:

Login/Signup using Firebase

Add daily activities with time and category

Track remaining minutes

View analytics once total time = 1440 mins

See graphs and insights in dashboard

🛠️ Tech Stack
Frontend

HTML5

CSS3

JavaScript (ES Modules)

Chart.js

Backend

Firebase Authentication

Firebase Firestore Database

✨ Features
🔐 Authentication

Email/Password login

Firebase Auth session management

Auto redirect:

Logged-in users → Activities Page

Logged-out users → Login Page

📝 Activity Tracking

Add activities with:

Title

Duration (minutes)

Category (Work, Study, Sleep, Entertainment, Exercise)

See remaining minutes (1440 - used mins)

Activities update automatically when date changes

📊 Dashboard Analytics

Activated only when total = 1440 mins:

Pie chart of categories

Bar chart comparison by duration

Clear visualization of time usage

🚫 No Data State

If activities do not reach 1440 mins:

Analyse button disabled

Dashboard shows “No analysis available yet”

🧭 User Flow

User logs in

Selects a date

Adds activities

Total reaches 1440 mins

Clicks Analyse

Dashboard shows charts

📂 Project Structure
📦 Time Tracker
├── index.html
├── activities.html
├── dashboard.html
├── style.css
├── firebase.js
├── index.js
├── script.js
├── dashboard.js
└── README.md

📥 How to Run Locally
1️⃣ Clone the repo
git clone https://github.com/YOUR_USERNAME/REPO.git
cd REPO

2️⃣ Firebase Setup

Go to https://console.firebase.google.com

Create a project

Enable Email/Password Auth

Enable Cloud Firestore

Copy the configuration

Paste config into firebase.js:

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

3️⃣ Run Locally

Open the folder in VS Code

Install Live Server Extension

Right-click index.html → Open with Live Server

🎥 Video Walkthrough (2–5 min)

Your video should include:

Demo Flow

Signup & Login

Adding activities

Remaining time decreasing

Analyse unlocks at 1440 minutes

Dashboard showing Pie & Bar charts

“No Data” state before 1440

Mention AI help in:

Code structure

Debugging errors

UI improvements

🖼️ Screenshots (Optional)

You can add:

Login Page

Activities Page

Remaining Minutes

Analyse Button Enabled

Dashboard Pie Chart

Dashboard Bar Chart

🚀 Future Improvements

Export daily report as PDF

Custom categories

Weekly/monthly analytics

Edit/delete activities

Dark mode UI

Mobile responsive design

🙌 Credits

Built as part of Masai Empower Her program
Firebase + Chart.js used for backend & visualization

Made with ❤️ and curiosity about how daily time is spent.

👩‍💻 Author
Raparthy Srivani
Multidisciplinary Tech Learner
Email:srivanisreedhar05@gmail.com
student ID:emp_hr_s2_001678