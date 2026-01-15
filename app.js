/**
 * app.js - Main application logic for emini pet
 */

// Global pet instance
let myPet = new Pet("emini");

// AI Helper instance
let aiHelper = new AIHelper();

// Game settings
const UPDATE_INTERVAL = 1000; // Update pet status every 1 second
let gameLoopId = null;

/**
 * Initialize the application
 */
function init() {
  loadPetAsset(myPet.mood);
  attachEventListeners();
  initializeAIHelper();
  startGameLoop();
  updateUI();
}

/**
 * Initialize AI Helper
 */
function initializeAIHelper() {
  // Try to load saved API key
  const hasKey = aiHelper.loadApiKey();
  
  if (hasKey) {
    showAIControls();
    updateAIStatus(true);
  } else {
    showAPISetup();
  }
}

/**
 * Attach event listeners to action buttons
 */
function attachEventListeners() {
  // Pet action buttons
  document.getElementById("feedBtn").addEventListener("click", handleFeed);
  document.getElementById("playBtn").addEventListener("click", handlePlay);
  document.getElementById("sleepBtn").addEventListener("click", handleSleep);
  document.getElementById("petBtn").addEventListener("click", handlePet);
  document.getElementById("healBtn").addEventListener("click", handleHeal);

  // AI Helper buttons
  document.getElementById("saveApiKeyBtn").addEventListener("click", handleSaveApiKey);
  document.getElementById("askAIBtn").addEventListener("click", handleAskAI);
  document.getElementById("smartSuggestionBtn").addEventListener("click", handleSmartSuggestion);
  document.getElementById("clipboardAnalyzeBtn").addEventListener("click", handleClipboardAnalysis);
  document.getElementById("mealPlanBtn").addEventListener("click", handleMealPlan);
  document.getElementById("studyPlanBtn").addEventListener("click", handleStudyPlan);
  document.getElementById("dismissSuggestionBtn").addEventListener("click", dismissSuggestion);

  // Enter key for question input
  document.getElementById("userQuestionInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAskAI();
  });
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

/* ==================== AI Helper Functions ==================== */

/**
 * Save API key and enable AI helper
 */
async function handleSaveApiKey() {
  const apiKeyInput = document.getElementById("apiKeyInput");
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    showFeedback("❌ Please enter a valid API key");
    return;
  }

  aiHelper.setApiKey(apiKey);
  
  // Test the API key
  showFeedback("🔄 Testing API key...");
  
  const result = await aiHelper.getSuggestion({
    userInput: "Say hello and introduce yourself as emini, the AI helper!"
  });

  if (result.success) {
    showAIControls();
    updateAIStatus(true);
    showAISuggestion(result.suggestion);
    apiKeyInput.value = "";
    showFeedback("✅ AI Helper activated!");
  } else {
    showFeedback(`❌ ${result.message}`);
    aiHelper.setApiKey(null);
  }
}

/**
 * Handle user question to AI
 */
async function handleAskAI() {
  const questionInput = document.getElementById("userQuestionInput");
  const question = questionInput.value.trim();

  if (!question) {
    showFeedback("❓ Please ask a question");
    return;
  }

  showFeedback("🤔 Thinking...");
  
  const result = await aiHelper.getSuggestion({
    userInput: question,
    petStatus: myPet.getStatus()
  });

  if (result.success) {
    showAISuggestion(result.suggestion);
    questionInput.value = "";
  } else {
    showFeedback(`❌ ${result.message}`);
  }
}

/**
 * Get smart suggestion based on time and context
 */
async function handleSmartSuggestion() {
  showFeedback("💡 Getting smart suggestion...");
  
  const result = await aiHelper.getSmartSuggestion(myPet.getStatus());

  if (result.success) {
    showAISuggestion(result.suggestion);
  } else {
    showFeedback(`❌ ${result.message}`);
  }
}

/**
 * Analyze clipboard content
 */
async function handleClipboardAnalysis() {
  showFeedback("📋 Analyzing clipboard...");
  
  const result = await aiHelper.analyzeClipboard();

  if (result.success) {
    showAISuggestion(result.suggestion);
  } else {
    showFeedback(`❌ ${result.message}`);
  }
}

/**
 * Generate meal plan
 */
async function handleMealPlan() {
  const ingredients = prompt("What ingredients do you have? (e.g., chicken, rice, broccoli)");
  
  if (!ingredients) return;

  showFeedback("🍽️ Creating meal ideas...");
  
  const result = await aiHelper.generateMealPlan(ingredients);

  if (result.success) {
    showAISuggestion(result.suggestion);
  } else {
    showFeedback(`❌ ${result.message}`);
  }
}

/**
 * Generate study plan
 */
async function handleStudyPlan() {
  const syllabus = prompt("Paste your syllabus text or study materials:");
  
  if (!syllabus) return;

  showFeedback("📚 Creating study plan...");
  
  const result = await aiHelper.generateStudySchedule(syllabus);

  if (result.success) {
    showAISuggestion(result.suggestion);
  } else {
    showFeedback(`❌ ${result.message}`);
  }
}

/**
 * Show AI suggestion in speech bubble
 */
function showAISuggestion(suggestion) {
  const container = document.getElementById("aiSuggestionContainer");
  const textElement = document.getElementById("aiSuggestionText");
  
  textElement.textContent = suggestion;
  container.style.display = "block";
  
  // Make pet happy when AI helps
  myPet.happiness = Math.min(100, myPet.happiness + 5);
  updateUI();
}

/**
 * Dismiss AI suggestion
 */
function dismissSuggestion() {
  const container = document.getElementById("aiSuggestionContainer");
  container.style.display = "none";
}

/**
 * Show AI controls
 */
function showAIControls() {
  document.getElementById("apiSetup").style.display = "none";
  document.getElementById("aiActions").style.display = "block";
}

/**
 * Show API setup
 */
function showAPISetup() {
  document.getElementById("apiSetup").style.display = "block";
  document.getElementById("aiActions").style.display = "none";
}

/**
 * Update AI status indicator
 */
function updateAIStatus(online) {
  const statusElement = document.getElementById("aiStatus");
  if (online) {
    statusElement.textContent = "Online";
    statusElement.classList.remove("offline");
    statusElement.classList.add("online");
  } else {
    statusElement.textContent = "Offline";
    statusElement.classList.remove("online");
    statusElement.classList.add("offline");
  }
}
