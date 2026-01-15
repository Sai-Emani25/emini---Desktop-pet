# 🏗️ Project Architecture - emini AI Co-Pilot

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    EMINI AI CO-PILOT                         │
│                  (Browser Application)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
            ┌───────▼───────┐   ┌──────▼──────┐
            │  Digital Pet  │   │ AI Assistant │
            │   Component   │   │  Component   │
            └───────┬───────┘   └──────┬───────┘
                    │                  │
                    └────────┬─────────┘
                             │
                    ┌────────▼────────┐
                    │  User Interface │
                    └─────────────────┘
```

## Component Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Frontend Layer                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  index.html  │  │  styles.css  │  │   app.js     │       │
│  │              │  │              │  │              │       │
│  │ • Structure  │  │ • Styling    │  │ • Main Logic │       │
│  │ • UI Layout  │  │ • Animations │  │ • Event Loop │       │
│  │ • Elements   │  │ • Responsive │  │ • Integration│       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                     │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐              ┌──────────────┐             │
│  │   Pet.js     │              │ AIHelper.js  │             │
│  │              │              │              │             │
│  │ • Pet Class  │              │ • AI Class   │             │
│  │ • Stats      │              │ • API Calls  │             │
│  │ • Actions    │              │ • Prompts    │             │
│  │ • Mood       │              │ • Context    │             │
│  └──────────────┘              └──────────────┘             │
│                                                               │
│  ┌──────────────┐                                            │
│  │ PetAssets.js │                                            │
│  │              │                                            │
│  │ • SVG Data   │                                            │
│  │ • Animations │                                            │
│  └──────────────┘                                            │
│                                                               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                      External Services                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐              ┌──────────────┐             │
│  │ localStorage │              │Google Gemini │             │
│  │              │              │     API      │             │
│  │ • API Keys   │              │              │             │
│  │ • Pet State  │              │ • AI Model   │             │
│  │ • Settings   │              │ • Responses  │             │
│  └──────────────┘              └──────────────┘             │
│                                                               │
│  ┌──────────────┐                                            │
│  │  Clipboard   │                                            │
│  │              │                                            │
│  │ • Read/Write │                                            │
│  │ • Text Data  │                                            │
│  └──────────────┘                                            │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
User Interaction Flow:
┌──────┐
│ User │
└──┬───┘
   │ 1. Clicks button / Types question
   ▼
┌──────────────────┐
│   UI Events      │
│  (app.js)        │
└──────┬───────────┘
       │ 2. Event handler triggered
       ▼
┌──────────────────┐
│ Feature Handler  │
│ (handleAskAI,    │
│  handleMealPlan) │
└──────┬───────────┘
       │ 3. Call AIHelper
       ▼
┌──────────────────┐
│  AIHelper.js     │
│ • Build prompt   │
│ • Add context    │
└──────┬───────────┘
       │ 4. HTTP Request
       ▼
┌──────────────────┐
│ Google Gemini    │
│     API          │
└──────┬───────────┘
       │ 5. AI Response
       ▼
┌──────────────────┐
│  AIHelper.js     │
│ • Parse response │
│ • Format data    │
└──────┬───────────┘
       │ 6. Return result
       ▼
┌──────────────────┐
│   app.js         │
│ • Update UI      │
│ • Show bubble    │
└──────┬───────────┘
       │ 7. Display
       ▼
┌──────────────────┐
│   User sees      │
│   suggestion     │
└──────────────────┘
```

## Pet System Flow

```
Game Loop (Every 1 second):
┌──────────────┐
│ setInterval  │
│  (1000ms)    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Pet.update() │
│ • hunger++   │
│ • mood calc  │
│ • age++      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  updateUI()  │
│ • Stats bars │
│ • Mood emoji │
│ • Messages   │
└──────────────┘

User Actions:
┌──────┐
│ User │─── Clicks "Feed" ──┐
└──────┘                     │
                             ▼
┌────────────┐        ┌─────────────┐
│ Pet.feed() │◄───────│handleFeed() │
│ • hunger-- │        └─────────────┘
│ • health++ │
└─────┬──────┘
      │
      ▼
┌─────────────┐
│  updateUI() │
└─────────────┘
```

## AI Context Building

```
Context Assembly:
┌─────────────────┐
│ User Question   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────┐
│ buildPrompt()   │◄────│ Time of Day  │
│                 │     └──────────────┘
│ Combines:       │
│ • User input    │     ┌──────────────┐
│ • Time context  │◄────│  Pet Mood    │
│ • Pet status    │     └──────────────┘
│ • Task type     │
└────────┬────────┘     ┌──────────────┐
         │              │  Clipboard   │
         │◄─────────────│   Content    │
         │              └──────────────┘
         ▼
┌─────────────────┐
│ Complete Prompt │
│ "You are emini, │
│  a helpful AI.  │
│  Time: morning  │
│  Pet: happy     │
│  User asked:... │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Gemini API     │
└─────────────────┘
```

## File Dependencies

```
index.html
├── requires: styles.css
├── requires: Pet.js
├── requires: PetAssets.js
├── requires: AIHelper.js
└── requires: app.js

app.js
├── uses: Pet class (from Pet.js)
├── uses: AIHelper class (from AIHelper.js)
└── calls: loadPetAsset() (from PetAssets.js)

AIHelper.js
├── calls: fetch() (browser API)
├── uses: localStorage (browser API)
└── calls: navigator.clipboard (browser API)

Pet.js
└── standalone (no dependencies)

PetAssets.js
└── standalone (provides SVG data)
```

## State Management

```
Application State:
┌─────────────────────────────────────┐
│          Global Variables            │
├─────────────────────────────────────┤
│ myPet      → Pet instance            │
│ aiHelper   → AIHelper instance       │
│ gameLoopId → Interval timer          │
└─────────────────────────────────────┘
         │
         ├────► localStorage
         │      ├── gemini_api_key
         │      └── eminiPetState
         │
         └────► sessionState
                ├── conversationHistory
                ├── lastSuggestionTime
                └── uiStates

Pet State:
┌─────────────────────────────────────┐
│        Pet Object Properties         │
├─────────────────────────────────────┤
│ name        → string                 │
│ hunger      → 0-100                  │
│ happiness   → 0-100                  │
│ energy      → 0-100                  │
│ health      → 0-100                  │
│ mood        → string (happy/sad...)  │
│ age         → number (minutes)       │
└─────────────────────────────────────┘

AI State:
┌─────────────────────────────────────┐
│     AIHelper Object Properties       │
├─────────────────────────────────────┤
│ apiKey              → string         │
│ isEnabled           → boolean        │
│ lastSuggestionTime  → timestamp      │
│ conversationHistory → array          │
└─────────────────────────────────────┘
```

## API Communication

```
Request Flow:
┌──────────────┐
│ AIHelper.js  │
└──────┬───────┘
       │ 1. Build request
       ▼
┌────────────────────────────────────────┐
│   Request Object                        │
├────────────────────────────────────────┤
│ URL: gemini API + ?key=xxx             │
│ Method: POST                           │
│ Headers: {'Content-Type': 'json'}      │
│ Body: {                                │
│   contents: [{                         │
│     parts: [{text: "prompt"}]          │
│   }],                                  │
│   generationConfig: {                  │
│     temperature: 0.7,                  │
│     maxOutputTokens: 200               │
│   }                                    │
│ }                                      │
└────────┬───────────────────────────────┘
         │ 2. Send via fetch()
         ▼
┌────────────────────────────────────────┐
│   Google Gemini API                     │
│   (Remote Server)                       │
└────────┬───────────────────────────────┘
         │ 3. AI Processing
         ▼
┌────────────────────────────────────────┐
│   Response Object                       │
├────────────────────────────────────────┤
│ {                                      │
│   candidates: [{                       │
│     content: {                         │
│       parts: [{                        │
│         text: "AI response here"       │
│       }]                               │
│     }                                  │
│   }]                                   │
│ }                                      │
└────────┬───────────────────────────────┘
         │ 4. Return to app
         ▼
┌──────────────┐
│ AIHelper.js  │
│ Parse & show │
└──────────────┘
```

## Security Model

```
┌─────────────────────────────────────────────┐
│           Security Layers                    │
├─────────────────────────────────────────────┤
│                                              │
│  Browser Sandbox                             │
│  ├── No file system access                  │
│  ├── Same-origin policy                     │
│  └── HTTPS encryption                       │
│                                              │
│  localStorage Security                       │
│  ├── Domain-specific                        │
│  ├── Not accessible cross-domain            │
│  └── Cleared on logout/reset                │
│                                              │
│  API Key Protection                          │
│  ├── Stored locally only                    │
│  ├── Never in source code                   │
│  ├── Password input type                    │
│  └── Only sent to Google                    │
│                                              │
│  Data Minimization                           │
│  ├── No personal data collected             │
│  ├── No server storage                      │
│  ├── Ephemeral conversations                │
│  └── User controls all data                 │
│                                              │
└─────────────────────────────────────────────┘
```

## Performance Optimization

```
Optimization Strategies:
┌──────────────────────────────────────┐
│ 1. No External Dependencies          │
│    • Vanilla JS (no framework load)  │
│    • No npm packages                 │
│    • Fast initial load               │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 2. Efficient Updates                 │
│    • 1-second game loop interval     │
│    • Pause when tab hidden           │
│    • Only update changed elements    │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 3. API Rate Limiting                 │
│    • 30-second cooldown              │
│    • Prevents excessive calls        │
│    • Respects free tier limits       │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 4. Smart Caching                     │
│    • localStorage for persistence    │
│    • Session state in memory         │
│    • No redundant API calls          │
└──────────────────────────────────────┘
```

## Error Handling Strategy

```
Error Flow:
┌──────────────┐
│ User Action  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Try Block    │
│ • Operation  │
└──────┬───────┘
       │
       ├─ Success ──► Update UI ──► Show Result
       │
       └─ Error ──┐
                  ▼
          ┌───────────────┐
          │ Catch Block   │
          │ • Log error   │
          │ • Parse type  │
          └───────┬───────┘
                  │
                  ├─ API Error ──► Show message
                  ├─ Network ────► Retry option
                  └─ Invalid ────► Guide user
```

## Future Architecture Considerations

```
Potential Additions:
┌──────────────────────────────────────┐
│ Backend Layer (Future)                │
├──────────────────────────────────────┤
│ • Cloud function for API proxy       │
│ • Rate limiting server-side          │
│ • Analytics collection               │
│ • User accounts (optional)           │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Database Layer (Future)               │
├──────────────────────────────────────┤
│ • Cloud save for pet state           │
│ • Conversation history               │
│ • User preferences                   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Enhanced AI (Future)                  │
├──────────────────────────────────────┤
│ • Gemini Vision (image analysis)     │
│ • Voice input/output                 │
│ • Multi-language support             │
│ • Learning from interactions         │
└──────────────────────────────────────┘
```

---

## Key Takeaways

**✅ Simple Architecture**: Easy to understand and modify
**✅ Modular Design**: Each component has clear responsibility
**✅ Privacy First**: No backend, data stays local
**✅ Scalable**: Can add features without major refactor
**✅ Maintainable**: Well-documented and organized

---

**Made with 💚 | Architecture designed for simplicity and growth**
