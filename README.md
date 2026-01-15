# 🐱 emini - AI-Powered Daily Life Co-Pilot 🤖

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/emini?style=social)](https://github.com/yourusername/emini)

A charming digital pet companion transformed into an intelligent AI assistant like Clippy! Built with vanilla JavaScript and powered by **Google Gemini API** to help with daily tasks - from meal planning to study schedules.

## 🎮 Features

### Digital Pet Features
- **Virtual Pet with Personality**: emini has dynamic moods (happy, sad, tired, hungry, sick)
- **Real-time Stat Management**: Track hunger, happiness, energy, and health
- **Interactive Animations**: Watch emini react to your actions
- **Beautiful UI**: Responsive design with gradient backgrounds
- **Persistent State**: Your pet's state is saved automatically

### 🚀 NEW: AI Co-Pilot Features
- **Smart Suggestions** 💡 - Context-aware tips based on time of day
- **Clipboard Analysis** 📋 - Analyze copied text for insights
- **Meal Planning** 🍽️ - Generate recipe ideas from ingredients
- **Study Helper** 📚 - Create study schedules from syllabus
- **General Q&A** - Ask anything and get helpful responses
- **Clippy-Style Interface** - Friendly speech bubble suggestions

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.)
- A **Google Gemini API key** (free tier available)

### Getting Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (keep it secure!)

### Running the Project

1. **Download or Clone**
```bash
git clone https://github.com/yourusername/emini.git
cd emini
```

2. **Open `index.html` in your browser**
   - Double-click the file, or
   - Use Live Server in VS Code

3. **Configure AI Helper**
   - Paste your Gemini API key in the setup section
   - Click "Save"
   - Wait for status to show "Online" 🟢

4. **Start using AI features!**

## 🎯 How to Use the AI Co-Pilot

### Ask Questions
Type any question in the input field:
- "What should I eat for lunch?"
- "Give me a productivity tip"
- "How do I organize my day?"

### Smart Tip 💡
Get contextual suggestions based on:
- Current time of day (morning, afternoon, evening)
- Your pet's mood
- General productivity advice

### Analyze Clipboard 📋
1. Copy any text (email, article, notes)
2. Click "Analyze Clipboard"
3. Get insights and actionable suggestions

### Meal Ideas 🍽️
1. Click "Meal Ideas"
2. Enter ingredients you have (e.g., "chicken, rice, broccoli")
3. Receive 3 creative meal recipe suggestions

### Study Help 📚
1. Click "Study Help"
2. Paste your syllabus or course materials
3. Get an organized study schedule with deadlines

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

## �️ Technical Details

### File Structure
```
emini/
├── index.html         # Main HTML structure
├── styles.css         # Styling including AI components
├── app.js            # Main application logic + AI integration
├── Pet.js            # Pet class and behavior
├── PetAssets.js      # SVG assets for pet animations
├── AIHelper.js       # NEW: Gemini API integration
├── package.json      # Project metadata
└── README.md         # Documentation
```

### AI Integration
The project uses **Google Gemini Pro API** with:
- **Temperature**: 0.7 (balanced creativity)
- **Max tokens**: 200 (concise responses)
- **Context-aware prompts** (includes pet status, time of day)

### Privacy & Security
- API keys stored in browser's localStorage
- No data sent to external servers (except Gemini API)
- Clipboard access requires user permission
- No personal data collected

## 🎯 Use Cases

### Morning Routine
```
Smart Tip → "Good morning! Consider:
1. Drink water to hydrate
2. Plan your top 3 priorities
3. Take 5 minutes for stretching"
```

### Meal Planning
```
Input: "chicken, rice, broccoli, soy sauce"
Output: "3 Meal Ideas:
1. Teriyaki Chicken Bowl
2. Stir-Fry Chicken
3. Chicken Rice Soup"
```

### Study Planning
```
Input: [Syllabus text]
Output: "Study Schedule:
Week 1: Focus on chapters 1-3...
Week 2: Complete assignment due Feb 15..."
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

### AIHelper Class Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `setApiKey(key)` | void | Configure Gemini API key |
| `getSuggestion(context)` | Promise | Get AI suggestion with context |
| `analyzeClipboard()` | Promise | Analyze clipboard content |
| `generateMealPlan(ingredients)` | Promise | Create meal recipes |
| `generateStudySchedule(syllabus)` | Promise | Create study plan |
| `getSmartSuggestion(petStatus)` | Promise | Context-aware tip |

## 🐛 Troubleshooting

### "AI helper is not configured"
→ Make sure you've entered a valid Gemini API key

### "Could not access clipboard"
→ Grant clipboard permission when prompted by browser

### "API request failed"
→ Check your API key is correct and has available quota
→ Verify internet connection

### Pet won't load
- Ensure all files are in the same directory
- Check browser console for errors (F12)
- Verify JavaScript is enabled

### Stats not updating
- Make sure browser tab is active (pauses when hidden)
- Check that app.js and AIHelper.js are loaded

## 🎯 Future Features

### Planned Enhancements
- 🖼️ **Image Analysis** - Upload fridge photo for meal suggestions
- 📅 **Calendar Integration** - Auto-add deadlines to Google Calendar
- 🎤 **Voice Commands** - Talk to emini
- 🧠 **Custom Personality** - Train emini with your preferences
- 🌍 **Multi-language Support** - Help in different languages
- 🔔 **Desktop Notifications** - Proactive suggestions
- ☁️ Cloud save system
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
