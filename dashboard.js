import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Protect page
onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "index.html";
  else window.currentUser = user;
});

// DOM Elements
const dashboardDate = document.getElementById('dashboardDate');
const chartsContainer = document.getElementById('chartsContainer');
const noData = document.getElementById('noData');
const totalHoursP = document.getElementById('totalHours');
const totalActivitiesP = document.getElementById('totalActivities');
const pieCtx = document.getElementById('pieChart').getContext('2d');
const barCtx = document.getElementById('barChart').getContext('2d');

let pieChart, barChart;

// Get date from query param or default to today
const urlParams = new URLSearchParams(window.location.search);
const queryDate = urlParams.get('date') || new Date().toISOString().slice(0,10);
dashboardDate.value = queryDate;

async function loadDashboard(date) {
  const activitiesRef = collection(db, "users", window.currentUser.uid, "days", date, "activities");
  const snapshot = await getDocs(activitiesRef);

  if (snapshot.empty) {
    chartsContainer.style.display = "none";
    noData.style.display = "block";
    return;
  }

  // Prepare data
  let totalMinutes = 0;
  let categoryMap = {}; // { Work: 300, Sleep: 480, ... }
  let activityNames = [];
  let activityDurations = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    totalMinutes += data.duration;

    // Pie chart data
    if(categoryMap[data.category]) categoryMap[data.category] += data.duration;
    else categoryMap[data.category] = data.duration;

    // Bar chart data
    activityNames.push(data.title);
    activityDurations.push(data.duration);
  });

  // Update summary
  totalHoursP.textContent = `Total Hours Spent: ${(totalMinutes / 60).toFixed(2)} hrs`;
  totalActivitiesP.textContent = `Number of Activities: ${snapshot.size}`;

  // Show charts
  chartsContainer.style.display = "block";
  noData.style.display = "none";

  // Pie chart
  if(pieChart) pieChart.destroy();
  pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryMap),
      datasets: [{
        data: Object.values(categoryMap),
        backgroundColor: ['#6c63ff', '#ff6584', '#ffa600', '#00c49f', '#ffbb28'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });

  // Bar chart
  if(barChart) barChart.destroy();
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: activityNames,
      datasets: [{
        label: 'Duration (minutes)',
        data: activityDurations,
        backgroundColor: '#6c63ff'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Load dashboard initially
loadDashboard(dashboardDate.value);

// Update dashboard on date change
dashboardDate.onchange = () => {
  loadDashboard(dashboardDate.value);
};
