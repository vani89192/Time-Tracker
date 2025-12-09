// 1️⃣ Firebase + Auth Setup
import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Protect page: redirect if not logged in
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

// 2️⃣ DOM Elements
const activityDate = document.getElementById('activityDate');
const activityTitle = document.getElementById('activityTitle');
const activityDuration = document.getElementById('activityDuration');
const activityCategory = document.getElementById('activityCategory');
const addActivityBtn = document.getElementById('addActivity');
const activitiesList = document.getElementById('activitiesList');
const remainingTimeEl = document.getElementById('remainingTime');
const analyseBtn = document.getElementById('analyseBtn');

let currentActivities = []; // local cache
let totalMinutes = 0;
// 3️⃣ Add Activity
addActivityBtn.onclick = async () => {
  const title = activityTitle.value.trim();
  const duration = parseInt(activityDuration.value);
  const category = activityCategory.value;
  const date = activityDate.value;

  if (!title || !duration || !date) {
    alert("Please fill all fields!");
    return;
  }

  if (totalMinutes + duration > 1440) {
    alert("Total minutes cannot exceed 1440!");
    return;
  }

  const user = auth.currentUser;
  const activityRef = collection(db, "users", user.uid, "days", date, "activities");

  try {
    await addDoc(activityRef, { title, duration, category });
    activityTitle.value = "";
    activityDuration.value = "";
    loadActivities(date); // reload activities
  } catch (err) {
    console.error("Error adding activity:", err);
  }
};
// 4️⃣ Load Activities
async function loadActivities(date) {
  if (!date) return;
  const user = auth.currentUser;
  const activityRef = collection(db, "users", user.uid, "days", date, "activities");
  const snapshot = await getDocs(activityRef);

  currentActivities = [];
  totalMinutes = 0;
  activitiesList.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = { id: docSnap.id, ...docSnap.data() };
    currentActivities.push(data);
    totalMinutes += data.duration;

    const card = document.createElement('div');
    card.classList.add('activity-card');
    card.innerHTML = `
      <span><strong>${data.title}</strong> (${data.duration} min) - ${data.category}</span>
      <div>
        <button onclick="deleteActivity('${docSnap.id}', '${date}')">Delete</button>
      </div>
    `;
    activitiesList.appendChild(card);
  });

  remainingTimeEl.innerText = `Remaining minutes: ${1440 - totalMinutes}`;
  analyseBtn.disabled = totalMinutes < 1440;
}
// 5️⃣ Delete Activity
window.deleteActivity = async (id, date) => {
  const user = auth.currentUser;
  await deleteDoc(doc(db, "users", user.uid, "days", date, "activities", id));
  loadActivities(date);
};
// 6️⃣ Analyse Button Click
analyseBtn.onclick = () => {
  const date = activityDate.value;
  if (!date) return;
  // redirect to dashboard with date as query
  window.location.href = `dashboard.html?date=${date}`;
};

// 7️⃣ Update activities on date change
activityDate.onchange = () => {
  loadActivities(activityDate.value);
};
