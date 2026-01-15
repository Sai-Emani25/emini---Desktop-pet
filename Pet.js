/**
 * Pet Class - Represents the emini digital pet with personality and needs
 */
class Pet {
  constructor(name = "emini") {
    this.name = name;
    this.hunger = 50; // 0 = not hungry, 100 = very hungry
    this.happiness = 75; // 0 = sad, 100 = very happy
    this.energy = 80; // 0 = tired, 100 = energetic
    this.health = 90; // 0 = sick, 100 = healthy
    this.lastFedTime = Date.now();
    this.lastPlayedTime = Date.now();
    this.age = 0; // in minutes
    this.mood = "happy"; // happy, sad, tired, hungry, sick
  }

  /**
   * Feed the pet - reduces hunger and costs happiness if overfed
   * @param {number} amount - Amount to reduce hunger (default 30)
   */
  feed(amount = 30) {
    this.hunger = Math.max(0, this.hunger - amount);
    this.lastFedTime = Date.now();
    
    // Overfed pet gets unhappy
    if (this.hunger < 10) {
      this.happiness = Math.max(0, this.happiness - 15);
      this.health = Math.max(0, this.health - 10);
    } else {
      // Well-fed pet is happier
      this.happiness = Math.min(100, this.happiness + 5);
      this.health = Math.min(100, this.health + 5);
    }
    
    return `${this.name} nom nom! 😋`;
  }

  /**
   * Play with the pet - increases happiness but increases hunger
   * @param {number} duration - Duration of play in seconds (default 30)
   */
  play(duration = 30) {
    if (this.energy < 20) {
      return `${this.name} is too tired to play! 😴`;
    }

    this.happiness = Math.min(100, this.happiness + 20);
    this.hunger = Math.min(100, this.hunger + 25);
    this.energy = Math.max(0, this.energy - 20);
    this.lastPlayedTime = Date.now();

    return `${this.name} had fun playing! 🎮`;
  }

  /**
   * Put the pet to sleep to restore energy
   */
  sleep() {
    if (this.energy > 80) {
      return `${this.name} is not tired! 😴`;
    }

    this.energy = Math.min(100, this.energy + 50);
    this.health = Math.min(100, this.health + 10);
    this.hunger = Math.min(100, this.hunger + 20);

    return `${this.name} had a good nap! 🛌`;
  }

  /**
   * Pet the pet - increases happiness slightly
   */
  pet() {
    this.happiness = Math.min(100, this.happiness + 10);
    
    return `${this.name} purrs happily! 🐱`;
  }

  /**
   * Heal the pet - improves health
   */
  heal() {
    this.health = Math.min(100, this.health + 40);
    this.happiness = Math.max(0, this.happiness - 5);
    
    return `${this.name} took medicine! 💊`;
  }

  /**
   * Update pet status over time - called periodically
   * @param {number} deltaTime - Time passed in seconds
   */
  update(deltaTime = 1) {
    // Hunger increases over time
    this.hunger = Math.min(100, this.hunger + (deltaTime / 120)); // increases slowly

    // Happiness decreases over time if hungry or tired
    if (this.hunger > 70) {
      this.happiness = Math.max(0, this.happiness - (deltaTime / 60));
    }

    if (this.energy < 30) {
      this.happiness = Math.max(0, this.happiness - (deltaTime / 60));
    }

    // Energy decreases slowly
    this.energy = Math.max(0, this.energy - (deltaTime / 180));

    // Health decreases if not cared for
    if (this.hunger > 80 || this.happiness < 30) {
      this.health = Math.max(0, this.health - (deltaTime / 120));
    }

    this.age += deltaTime / 60; // age in minutes

    this.updateMood();
  }

  /**
   * Determine mood based on current state
   */
  updateMood() {
    if (this.health < 30) {
      this.mood = "sick";
    } else if (this.energy < 30) {
      this.mood = "tired";
    } else if (this.hunger > 75) {
      this.mood = "hungry";
    } else if (this.happiness < 40) {
      this.mood = "sad";
    } else {
      this.mood = "happy";
    }
  }

  /**
   * Get the current status of the pet
   * @returns {Object} Pet status object
   */
  getStatus() {
    return {
      name: this.name,
      hunger: Math.round(this.hunger),
      happiness: Math.round(this.happiness),
      energy: Math.round(this.energy),
      health: Math.round(this.health),
      mood: this.mood,
      age: Math.round(this.age),
      statusMessage: this.getStatusMessage()
    };
  }

  /**
   * Get a message describing the pet's current state
   */
  getStatusMessage() {
    if (this.health < 30) {
      return `${this.name} is feeling sick and needs care! 🤒`;
    }
    if (this.energy < 30) {
      return `${this.name} is very tired and needs rest! 😴`;
    }
    if (this.hunger > 80) {
      return `${this.name} is starving! Feed me please! 🍖`;
    }
    if (this.happiness < 40) {
      return `${this.name} is sad... play with me? 😢`;
    }
    if (this.happiness > 90) {
      return `${this.name} is over the moon! 🌙✨`;
    }

    return `${this.name} is doing fine! 😊`;
  }

  /**
   * Get a recommended action for the pet
   */
  getRecommendedAction() {
    if (this.hunger > 75) return "feed";
    if (this.energy < 30) return "sleep";
    if (this.health < 30) return "heal";
    if (this.happiness < 40) return "play";
    return "pet";
  }

  /**
   * Get emoji representation of mood
   */
  getMoodEmoji() {
    const moodMap = {
      happy: "😊",
      sad: "😢",
      tired: "😴",
      hungry: "😋",
      sick: "🤒"
    };
    return moodMap[this.mood] || "😊";
  }
}

// Export for use in Node.js or bundlers
if (typeof module !== "undefined" && module.exports) {
  module.exports = Pet;
}
