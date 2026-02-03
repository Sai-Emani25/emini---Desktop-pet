# Design

## Design Principles
- Friendly, playful, and minimal.
- Focus on clarity and low visual noise.
- Micro-animations to enhance delight without distraction.

## Information Architecture
- Desktop Pet (primary visual focus)
- AI Assistant (secondary panel)
- Settings Module (tertiary panel)
- Task Module (tertiary panel)
- Landing/Installer Pages (marketing/onboarding)

## Visual Language
- Rounded corners, soft shadows.
- Subtle gradients for depth.
- Consistent spacing and typography.

## Color Palette (Proposed)
- Primary: #4F7DF3
- Secondary: #A7C5FF
- Accent: #FFB84D
- Background: #0F172A
- Surface: #111827
- Text: #E5E7EB

## Typography (Proposed)
- Headings: Inter / 20–28px
- Body: Inter / 14–16px
- Buttons: Inter / 14–16px, semi-bold

## Components
### Desktop Pet
- Idle animation loop.
- Hover state with subtle bounce.
- Click state with quick reaction animation.

### AI Assistant Panel
- Input field with clear placeholder.
- Response area with scroll.
- Loading indicator (three-dot pulse).

### Settings Module
- Toggle list with labels and short descriptions.
- Save/Reset actions.

### Task Module
- Add task input, list of tasks, completion checkbox.
- Optional priority indicator.

## Interaction Guidelines
- Hover effects within 150–200ms.
- Click feedback (scale down 0.98) for buttons.
- Motion durations between 150–300ms.

## Responsive Behavior
- Desktop-first layout.
- Panels collapse into tabs below 1024px width.
- Touch targets minimum 40px height.

## Accessibility
- Minimum contrast ratio 4.5:1.
- Focus ring visible and consistent.
- Keyboard navigation for all controls.

## Error and Empty States
- AI errors: friendly message with retry action.
- Empty tasks: “No tasks yet. Add one to get started.”

## Assets
- Use optimized SVG for UI icons.
- Pet sprites or vector animations stored locally.
