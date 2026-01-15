/**
 * app.js - Main application logic for emini pet
 */

// Global pet instance
let myPet = new Pet("emini");

// Game settings
const UPDATE_INTERVAL = 1000; // Update pet status every 1 second
let gameLoopId = null;

/**
 * Initialize the application
 */
function init() {
  loadPetAsset(myPet.mood);
  attachEventListeners();
  startGameLoop();
  updateUI();
}

/**
 * Attach event listeners to action buttons
 */
function attachEventListeners() {
  document.getElementById("feedBtn").addEventListener("click", handleFeed);
  document.getElementById("playBtn").addEventListener("click", handlePlay);
  document.getElementById("sleepBtn").addEventListener("click", handleSleep);
  document.getElementById("petBtn").addEventListener("click", handlePet);
  document.getElementById("healBtn").addEventListener("click", handleHeal);
}

/**
 * Handle feed action
 */
function handleFeed() {
  const message = myPet.feed();
  showFeedback(message);
  animatePet("feed");
  updateUI();
}

/**
 * Handle play action
 */
function handlePlay() {
  const message = myPet.play();
  showFeedback(message);
  animatePet("play");
  updateUI();
}

/**
 * Handle sleep action
 */
function handleSleep() {
  const message = myPet.sleep();
  showFeedback(message);
  animatePet("sleep");
  updateUI();
}

/**
 * Handle pet action
 */
function handlePet() {
  const message = myPet.pet();
  showFeedback(message);
  animatePet("pet");
  updateUI();
}

/**
 * Handle heal action
 */
function handleHeal() {
  const message = myPet.heal();
  showFeedback(message);
  animatePet("heal");
  updateUI();
}

/**
 * Show feedback message
 */
function showFeedback(message) {
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.textContent = message;
  feedbackElement.classList.add("show");

  setTimeout(() => {
    feedbackElement.classList.remove("show");
  }, 2000);
}

/**
 * Update UI with current pet status
 */
function updateUI() {
  const status = myPet.getStatus();

  // Update name and status
  document.getElementById("petName").textContent = status.name;
  document.getElementById("statusMessage").textContent = status.statusMessage;
  document.getElementById("petAge").textContent = status.age;

  // Update mood emoji and pet sprite
  document.getElementById("moodEmoji").textContent = myPet.getMoodEmoji();
  loadPetAsset(status.mood);

  // Update status bars
  updateBar("hungerBar", status.hunger);
  updateBar("happinessBar", status.happiness);
  updateBar("energyBar", status.energy);
  updateBar("healthBar", status.health);

  // Update stat values
  document.getElementById("hungerValue").textContent = status.hunger;
  document.getElementById("happinessValue").textContent = status.happiness;
  document.getElementById("energyValue").textContent = status.energy;
  document.getElementById("healthValue").textContent = status.health;

  // Update detailed stats
  document.getElementById("detailedHunger").textContent = status.hunger;
  document.getElementById("detailedHappiness").textContent = status.happiness;
  document.getElementById("detailedEnergy").textContent = status.energy;
  document.getElementById("detailedHealth").textContent = status.health;
  document.getElementById("detailedMood").textContent = status.mood;
  document.getElementById("detailedAge").textContent = `${status.age} min`;

  // Update button states based on pet condition
  updateButtonStates(status);
}

/**
 * Update a status bar width
 */
function updateBar(barId, value) {
  const bar = document.getElementById(barId);
  if (bar) {
    bar.style.width = value + "%";
  }
}

/**
 * Update button states based on pet condition
 */
function updateButtonStates(status) {
  const feedBtn = document.getElementById("feedBtn");
  const playBtn = document.getElementById("playBtn");
  const sleepBtn = document.getElementById("sleepBtn");
  const healBtn = document.getElementById("healBtn");

  // Disable play if too tired or hungry
  playBtn.disabled = status.energy < 20;
  if (playBtn.disabled) {
    playBtn.style.opacity = "0.5";
  } else {
    playBtn.style.opacity = "1";
  }

  // Disable sleep if not tired
  sleepBtn.disabled = status.energy > 80;
  if (sleepBtn.disabled) {
    sleepBtn.style.opacity = "0.5";
  } else {
    sleepBtn.style.opacity = "1";
  }

  // Suggest feeding
  feedBtn.style.fontWeight = status.hunger > 70 ? "bold" : "normal";
  feedBtn.style.transform = status.hunger > 70 ? "scale(1.05)" : "scale(1)";
}

/**
 * Game loop - updates pet status over time
 */
function gameLoop() {
  // Update pet state (time passed: 1 second)
  myPet.update(1);

  // Update UI
  updateUI();

  // Check if pet needs attention
  checkPetNeeds();
}

/**
 * Check if pet needs attention and notify
 */
function checkPetNeeds() {
  const status = myPet.getStatus();

  if (status.hunger > 85 && Math.random() < 0.1) {
    console.log("Pet is very hungry!");
  }

  if (status.happiness < 40 && Math.random() < 0.1) {
    console.log("Pet is sad!");
  }

  if (status.energy < 30 && Math.random() < 0.1) {
    console.log("Pet is very tired!");
  }

  if (status.health < 30 && Math.random() < 0.1) {
    console.log("Pet is sick!");
  }
}

/**
 * Start the game loop
 */
function startGameLoop() {
  if (!gameLoopId) {
    gameLoopId = setInterval(gameLoop, UPDATE_INTERVAL);
  }
}

/**
 * Stop the game loop
 */
function stopGameLoop() {
  if (gameLoopId) {
    clearInterval(gameLoopId);
    gameLoopId = null;
  }
}

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Handle page visibility - pause game when tab is not visible
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    stopGameLoop();
  } else {
    startGameLoop();
  }
});

// Save pet state before leaving page
window.addEventListener("beforeunload", function () {
  localStorage.setItem("eminiPetState", JSON.stringify({
    hunger: myPet.hunger,
    happiness: myPet.happiness,
    energy: myPet.energy,
    health: myPet.health,
    age: myPet.age
  }));
});

// Load pet state on page load
window.addEventListener("load", function () {
  const savedState = localStorage.getItem("eminiPetState");
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      myPet.hunger = state.hunger;
      myPet.happiness = state.happiness;
      myPet.energy = state.energy;
      myPet.health = state.health;
      myPet.age = state.age;
      updateUI();
    } catch (e) {
      console.error("Failed to load pet state:", e);
    }
  }
});
