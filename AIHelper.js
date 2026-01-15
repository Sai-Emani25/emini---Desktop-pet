/**
 * AIHelper.js - AI-powered assistant using Google Gemini API
 * Provides contextual suggestions and help like Clippy
 */

class AIHelper {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    this.conversationHistory = [];
    this.lastSuggestionTime = 0;
    this.suggestionCooldown = 30000; // 30 seconds between auto-suggestions
    this.isEnabled = false;
  }

  /**
   * Set API key for Gemini
   */
  setApiKey(key) {
    this.apiKey = key;
    this.isEnabled = !!key;
    localStorage.setItem('gemini_api_key', key);
  }

  /**
   * Load API key from storage
   */
  loadApiKey() {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      this.setApiKey(savedKey);
    }
    return this.isEnabled;
  }

  /**
   * Get suggestion based on user context
   */
  async getSuggestion(context = {}) {
    if (!this.isEnabled || !this.apiKey) {
      return {
        success: false,
        message: "AI helper is not configured. Please add your Gemini API key."
      };
    }

    try {
      const prompt = this.buildPrompt(context);
      const response = await this.callGeminiAPI(prompt);
      
      this.lastSuggestionTime = Date.now();
      
      return {
        success: true,
        suggestion: response,
        context: context
      };
    } catch (error) {
      console.error("AI Helper Error:", error);
      return {
        success: false,
        message: error.message || "Failed to get suggestion"
      };
    }
  }

  /**
   * Build prompt based on context
   */
  buildPrompt(context) {
    const { 
      userInput = "", 
      petStatus = {}, 
      taskType = "general",
      clipboardContent = "",
      timeOfDay = this.getTimeOfDay()
    } = context;

    let prompt = `You are emini, a helpful AI assistant like Clippy. Be friendly, concise, and helpful.
Context:
- Time: ${timeOfDay}
- Pet mood: ${petStatus.mood || 'happy'}
`;

    if (userInput) {
      prompt += `\nUser asked: "${userInput}"\n`;
      prompt += `Provide a helpful, actionable suggestion in 2-3 sentences.`;
    } else if (taskType === "productivity") {
      prompt += `\nThe user seems to be working. Provide a quick productivity tip or reminder about breaks.`;
    } else if (taskType === "analyze_text" && clipboardContent) {
      prompt += `\nAnalyze this text and provide helpful insights:\n"${clipboardContent.substring(0, 500)}"`;
    } else {
      prompt += `\nProvide a helpful daily life tip based on the current time.`;
    }

    return prompt;
  }

  /**
   * Call Google Gemini API
   */
  async callGeminiAPI(prompt) {
    const url = `${this.baseURL}?key=${this.apiKey}`;
    
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 200,
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid API response format');
    }

    return data.candidates[0].content.parts[0].text;
  }

  /**
   * Get current time of day
   */
  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  }

  /**
   * Analyze clipboard content
   */
  async analyzeClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        return { success: false, message: "Clipboard is empty" };
      }

      return await this.getSuggestion({
        taskType: "analyze_text",
        clipboardContent: text
      });
    } catch (error) {
      return { 
        success: false, 
        message: "Could not access clipboard. Please grant permission." 
      };
    }
  }

  /**
   * Generate recipe from fridge photo (placeholder for future vision API integration)
   */
  async analyzeImage(imageData) {
    // Future enhancement: Use Gemini Vision API
    return {
      success: false,
      message: "Image analysis coming soon! For now, describe what you have and I'll help."
    };
  }

  /**
   * Smart task suggestions based on time and context
   */
  async getSmartSuggestion(petStatus) {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    let taskType = "general";
    
    // Determine context
    if (hour >= 9 && hour < 12) {
      taskType = "morning_routine";
    } else if (hour >= 12 && hour < 14) {
      taskType = "lunch_break";
    } else if (hour >= 14 && hour < 18) {
      taskType = "productivity";
    } else if (hour >= 18 && hour < 22) {
      taskType = "evening_routine";
    } else {
      taskType = "rest_time";
    }

    return await this.getSuggestion({
      taskType,
      petStatus,
      timeOfDay: this.getTimeOfDay()
    });
  }

  /**
   * Check if suggestion cooldown has passed
   */
  canSuggest() {
    return Date.now() - this.lastSuggestionTime > this.suggestionCooldown;
  }

  /**
   * Parse calendar text and extract deadlines
   */
  parseDeadlines(syllabusText) {
    // Simple deadline extraction (can be enhanced with AI)
    const deadlinePatterns = [
      /due\s+(?:on\s+)?(\w+\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/gi,
      /deadline[:\s]+(\w+\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/gi,
      /(\w+\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?)\s+-\s+.+(?:due|assignment|exam)/gi
    ];

    const deadlines = [];
    deadlinePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(syllabusText)) !== null) {
        deadlines.push(match[1]);
      }
    });

    return deadlines;
  }

  /**
   * Generate study schedule from syllabus
   */
  async generateStudySchedule(syllabusText) {
    return await this.getSuggestion({
      userInput: `Create a study schedule from this syllabus: ${syllabusText.substring(0, 1000)}`,
      taskType: "study_planning"
    });
  }

  /**
   * Generate meal plan from ingredients
   */
  async generateMealPlan(ingredients) {
    return await this.getSuggestion({
      userInput: `Create 3 meal recipes using these ingredients: ${ingredients}`,
      taskType: "meal_planning"
    });
  }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIHelper;
}
