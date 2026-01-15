# 🐱 emini - Your Digital Pet Companion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/emini?style=social)](https://github.com/yourusername/emini)

A charming, interactive digital pet application built with vanilla JavaScript. Take care of **emini**, feed them, play with them, and watch their personality shine!

## 🎮 Features

- **Virtual Pet with Personality**: emini has dynamic moods (happy, sad, tired, hungry, sick)
- **Object-Oriented Design**: Well-structured `Pet` class with clean API
- **Real-time Stat Management**: Track hunger, happiness, energy, and health
- **Interactive Animations**: Watch emini react to your actions
- **Beautiful UI**: Responsive design with gradient backgrounds and smooth animations
- **Persistent State**: Your pet's state is saved to localStorage
- **SVG Pet Sprites**: Adorable hand-crafted SVG pet graphics
- **Stat Tracking**: Detailed statistics and mood indicators

## 🚀 Quick Start

### Option 1: Direct Download from GitHub

1. Click the green **"Code"** button at the top of the repository
2. Select **"Download ZIP"**
3. Extract the ZIP file to your desired location
4. Open `index.html` in your web browser

### Option 2: Clone the Repository

```bash
git clone https://github.com/yourusername/emini.git
cd emini
# Open index.html in your browser
```

### Option 3: Use with Live Server

If you have Live Server installed in VS Code:

1. Right-click `index.html`
2. Select "Open with Live Server"
3. The app will open in your default browser

## 📋 Game Mechanics

### Pet Stats

| Stat | Range | Effect |
|------|-------|--------|
| **Hunger** | 0-100 | Increases over time; affects happiness and health |
| **Happiness** | 0-100 | Affected by play and care; decreases if neglected |
| **Energy** | 0-100 | Decreases with play; restored by sleep |
| **Health** | 0-100 | Affected by hunger and care; restored by healing |

### Actions

- 🍖 **Feed** - Reduce hunger (overfed pets become unhappy)
- 🎮 **Play** - Increase happiness (uses energy, increases hunger)
- 😴 **Sleep** - Restore energy and improve health
- 🤚 **Pet** - Quick happiness boost
- 💊 **Heal** - Restore health when emini is sick

### Pet Moods

- 😊 **Happy** - All stats are in good condition
- 😢 **Sad** - Happiness is low (< 40)
- 😴 **Tired** - Energy is low (< 30)
- 😋 **Hungry** - Hunger is high (> 75)
- 🤒 **Sick** - Health is low (< 30)

## 🏗️ Project Structure

```
emini/
├── index.html          # Main HTML file
├── styles.css          # Styling and animations
├── Pet.js              # Pet class (OOP implementation)
├── PetAssets.js        # SVG pet graphics and animations
├── app.js              # Main application logic
├── README.md           # This file
├── LICENSE             # MIT License
└── .gitignore          # Git ignore rules
```

## 💻 Code Example

### Creating a Pet

```javascript
// Create a new pet
const myPet = new Pet("emini");

// Check status
const status = myPet.getStatus();
console.log(status);
// Output: {
//   name: "emini",
//   hunger: 50,
//   happiness: 75,
//   energy: 80,
//   health: 90,
//   mood: "happy",
//   age: 0,
//   statusMessage: "emini is doing fine!"
// }

// Interact with your pet
myPet.feed();        // "emini nom nom! 😋"
myPet.play();        // "emini had fun playing! 🎮"
myPet.sleep();       // "emini had a good nap! 🛌"
myPet.pet();         // "emini purrs happily! 🐱"
myPet.heal();        // "emini took medicine! 💊"

// Get recommended action
console.log(myPet.getRecommendedAction()); // "feed", "sleep", "play", etc.

// Update pet state over time
myPet.update(1); // 1 second passed
```

## 🎨 SVG Pet Design

The pet is rendered using SVG with:
- Gradient fills for a smooth, polished look
- Dynamic mood-based coloring
- Smooth animations and floating effects
- Responsive scaling

## 📱 Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🛠️ Customization

### Change Pet Name

Edit `app.js`:
```javascript
let myPet = new Pet("Your Custom Name");
```

### Adjust Pet Stats

Modify the starting values in `Pet.js` constructor:
```javascript
constructor(name = "emini") {
    this.hunger = 50;      // Change starting hunger
    this.happiness = 75;   // Change starting happiness
    // ... etc
}
```

### Modify Game Speed

In `app.js`, change the `UPDATE_INTERVAL`:
```javascript
const UPDATE_INTERVAL = 500; // Update every 500ms (faster)
```

### Customize Colors

Edit the gradient definitions in `styles.css`:
```css
.hunger-bar {
    background: linear-gradient(90deg, #FF6B6B, #FFD93D);
}
```

## 📚 Object-Oriented Design

### Pet Class Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `feed(amount)` | String | Reduces hunger, increases happiness |
| `play(duration)` | String | Increases happiness, uses energy |
| `sleep()` | String | Restores energy and health |
| `pet()` | String | Quick happiness boost |
| `heal()` | String | Restores health |
| `update(deltaTime)` | void | Updates pet state based on time passed |
| `getStatus()` | Object | Returns current pet stats |
| `getStatusMessage()` | String | Returns descriptive message about pet state |
| `getRecommendedAction()` | String | Returns suggested action for pet |
| `getMoodEmoji()` | String | Returns emoji based on current mood |
| `updateMood()` | void | Updates mood based on current stats |

## 🐛 Troubleshooting

### Pet won't load
- Ensure all files are in the same directory
- Check browser console for errors (F12)
- Verify JavaScript is enabled

### Stats not updating
- Check that app.js is loaded (check Console)
- Ensure browser JavaScript is enabled
- Try clearing browser cache

### localStorage not working
- This app uses localStorage for persistence
- Some browsers restrict this in private/incognito mode
- Disable browser extensions that might block it

## 🎯 Future Features

- 🌍 Cloud save system
- 👥 Multiplayer pet playdates
- 🏪 Pet shop to buy items/decorations
- 🎓 Mini-games to increase specific stats
- 📊 Statistics and pet history
- 🌙 Day/night cycle
- 🎵 Sound effects and background music

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Ideas & Feedback

Have suggestions for emini? Open an issue on GitHub or submit a pull request!

## 👨‍💻 Author

Created with ❤️ as a passion project

## 🙏 Acknowledgments

- SVG pet design inspired by cute digital pet games
- Built with vanilla JavaScript (no dependencies!)
- Designed to be fun, educational, and accessible

---

**Enjoy your time with emini!** 🐱✨

Remember: A happy pet is a well-cared-for pet! 🍖😊
