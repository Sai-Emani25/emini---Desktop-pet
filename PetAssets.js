/**
 * PetAssets.js - SVG assets and animations for emini pet
 */

function createPetSVG(mood = "happy") {
  const colors = {
    happyGlow: "#FFD700",
    sadGlow: "#87CEEB",
    tiredGlow: "#DDA0DD",
    hungrySkin: "#FFB6C1",
    normalSkin: "#FF69B4",
    sickGlow: "#90EE90"
  };

  const glowColor = mood === "happy" ? colors.happyGlow :
                    mood === "sad" ? colors.sadGlow :
                    mood === "tired" ? colors.tiredGlow :
                    mood === "hungry" ? colors.hungrySkin :
                    mood === "sick" ? colors.sickGlow :
                    colors.normalSkin;

  const svg = `
    <!-- Glow effect -->
    <defs>
      <radialGradient id="bodyGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:${colors.normalSkin};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#FF1493;stop-opacity:1" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="shadow">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
      </filter>
    </defs>

    <!-- Shadow -->
    <ellipse cx="100" cy="210" rx="45" ry="8" fill="rgba(0,0,0,0.1)"/>

    <!-- Body -->
    <circle cx="100" cy="100" r="50" fill="url(#bodyGradient)" filter="url(#shadow)"/>
    
    <!-- Head -->
    <circle cx="100" cy="60" r="40" fill="url(#bodyGradient)" filter="url(#shadow)"/>
    
    <!-- Ears -->
    <ellipse cx="75" cy="30" rx="12" ry="18" fill="url(#bodyGradient)" filter="url(#shadow)"/>
    <ellipse cx="125" cy="30" rx="12" ry="18" fill="url(#bodyGradient)" filter="url(#shadow)"/>
    <ellipse cx="75" cy="33" rx="6" ry="10" fill="#FFB6D9"/>
    <ellipse cx="125" cy="33" rx="6" ry="10" fill="#FFB6D9"/>
    
    <!-- Eyes -->
    <circle cx="85" cy="55" r="6" fill="white" filter="url(#shadow)"/>
    <circle cx="115" cy="55" r="6" fill="white" filter="url(#shadow)"/>
    <circle cx="85" cy="55" r="3" fill="black"/>
    <circle cx="115" cy="55" r="3" fill="black"/>
    <circle cx="86" cy="54" r="1.5" fill="white"/>
    <circle cx="116" cy="54" r="1.5" fill="white"/>
    
    <!-- Nose -->
    <ellipse cx="100" cy="65" rx="4" ry="6" fill="#FF69B4"/>
    
    <!-- Mouth -->
    <path d="M 100 65 Q 95 72 90 70" stroke="black" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M 100 65 Q 105 72 110 70" stroke="black" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    
    <!-- Whiskers -->
    <line x1="60" y1="60" x2="40" y2="55" stroke="black" stroke-width="1"/>
    <line x1="60" y1="70" x2="40" y2="75" stroke="black" stroke-width="1"/>
    <line x1="140" y1="60" x2="160" y2="55" stroke="black" stroke-width="1"/>
    <line x1="140" y1="70" x2="160" y2="75" stroke="black" stroke-width="1"/>
    
    <!-- Front paws -->
    <ellipse cx="80" cy="140" rx="10" ry="16" fill="url(#bodyGradient)" filter="url(#shadow)"/>
    <ellipse cx="120" cy="140" rx="10" ry="16" fill="url(#bodyGradient)" filter="url(#shadow)"/>
    <ellipse cx="80" cy="148" rx="8" ry="5" fill="#FFB6D9"/>
    <ellipse cx="120" cy="148" rx="8" ry="5" fill="#FFB6D9"/>
    
    <!-- Tail -->
    <path d="M 135 115 Q 160 110 165 85 Q 168 60 160 50" 
          stroke="url(#bodyGradient)" stroke-width="16" fill="none" stroke-linecap="round" filter="url(#shadow)"/>
    
    <!-- Belly patch -->
    <ellipse cx="100" cy="110" rx="20" ry="25" fill="#FFB6D9" opacity="0.6"/>
    
    <!-- Blush marks -->
    <ellipse cx="65" cy="70" rx="8" ry="6" fill="#FFB6D9" opacity="0.5"/>
    <ellipse cx="135" cy="70" rx="8" ry="6" fill="#FFB6D9" opacity="0.5"/>
  `;

  return svg;
}

function loadPetAsset(mood = "happy") {
  const svgContainer = document.getElementById("petSvg");
  if (svgContainer) {
    svgContainer.innerHTML = createPetSVG(mood);
  }
}

function animatePet(action) {
  const petSvg = document.getElementById("petSvg");
  if (!petSvg) return;

  petSvg.classList.remove("bounce", "spin", "wiggle", "nod");

  // Trigger reflow to restart animation
  void petSvg.offsetWidth;

  switch (action) {
    case "feed":
      petSvg.classList.add("nod");
      break;
    case "play":
      petSvg.classList.add("bounce");
      break;
    case "sleep":
      petSvg.classList.add("wiggle");
      break;
    case "pet":
      petSvg.classList.add("nod");
      break;
    case "heal":
      petSvg.classList.add("spin");
      break;
    default:
      petSvg.classList.add("bounce");
  }
}

// Export functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = { createPetSVG, loadPetAsset, animatePet };
}
