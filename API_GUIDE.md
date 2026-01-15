# 🔑 Google Gemini API Setup Guide

## Getting Started with Google Gemini API

### What is Google Gemini?
Google Gemini is Google's most capable AI model, offering:
- 💬 Natural language understanding
- 🧠 Context-aware responses
- ⚡ Fast response times
- 🆓 Generous free tier

### Why Gemini for emini?
- **Free tier**: 60 requests per minute (more than enough for personal use)
- **Smart**: Understands context and nuance
- **Fast**: 2-3 second response times
- **Reliable**: Backed by Google infrastructure

---

## Step-by-Step Setup

### 1. Create Google Account
If you don't have one:
- Go to https://accounts.google.com
- Create a new account
- Verify your email

### 2. Access Google AI Studio
- Visit: https://makersuite.google.com/app/apikey
- Sign in with your Google account
- Accept the terms of service

### 3. Create API Key
1. Click **"Create API Key"** button
2. Select **"Create API key in new project"**
3. Wait a few seconds for generation
4. **Copy** the key (starts with `AIzaSy...`)
5. Store it safely!

### 4. Configure in emini
1. Open `index.html` in your browser
2. Scroll to "AI Co-Pilot" section
3. Paste API key in input field
4. Click **"Save"**
5. Wait for "Online" status 🟢

---

## API Key Management

### Security Best Practices

✅ **DO:**
- Store API keys securely (emini uses localStorage)
- Use different keys for different projects
- Monitor your usage in AI Studio
- Regenerate keys if compromised

❌ **DON'T:**
- Share API keys publicly
- Commit keys to GitHub
- Use production keys for testing
- Share keys in screenshots

### Where is Your Key Stored?
- **Location**: Browser's localStorage
- **Scope**: Only this website, only this browser
- **Security**: Not sent anywhere except Google Gemini API
- **Deletion**: Clear browser data to remove

---

## Understanding the Free Tier

### Quotas (as of 2024)
```
Free Tier Limits:
- 60 requests per minute
- 1,500 requests per day
- No credit card required
```

### What This Means for You
- Average user: **~50-100 requests/day**
- emini usage: **Well within limits**
- Cost: **$0** for normal use

### Typical Usage
```
Morning routine: 3-5 requests
Meal planning: 1-2 requests
Study help: 2-3 requests
Q&A throughout day: 5-10 requests
---
Total: ~15-20 requests/day
```

**You have plenty of headroom!**

---

## API Response Format

### What emini Sends
```javascript
{
  "contents": [{
    "parts": [{
      "text": "Your question or context here"
    }]
  }],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 200
  }
}
```

### What You Get Back
```javascript
{
  "candidates": [{
    "content": {
      "parts": [{
        "text": "AI's response here"
      }]
    }
  }]
}
```

---

## Customizing AI Behavior

### Temperature Setting
**Current**: 0.7 (balanced)

```javascript
// In AIHelper.js, line ~100
temperature: 0.7  // Change this value
```

**Options**:
- `0.0-0.3`: More focused, deterministic
- `0.4-0.7`: Balanced (recommended)
- `0.8-1.0`: More creative, varied

### Max Tokens
**Current**: 200 tokens (~150 words)

```javascript
// In AIHelper.js, line ~104
maxOutputTokens: 200  // Change this value
```

**Options**:
- `50-100`: Very concise
- `200-300`: Standard (recommended)
- `400-500`: Detailed

### Response Style
Edit prompts in `AIHelper.js`:

```javascript
// Example: Make responses more casual
prompt = `You are emini, a friendly casual AI helper.
Keep responses super short and fun! Use emojis.
${userQuestion}`;
```

---

## Monitoring Usage

### Check Your Usage
1. Visit: https://makersuite.google.com/app/apikey
2. Click on your API key
3. View usage statistics
4. See requests per day/minute

### Usage Dashboard Shows
- Total requests today
- Requests per minute
- Error rate
- Response times

### Setting Alerts
Currently not available in free tier, but you can:
- Check usage weekly
- Monitor in browser console
- Track manually if needed

---

## Troubleshooting

### Common Errors & Solutions

#### Error: "API key not valid"
**Cause**: Invalid or expired key
**Solution**: 
1. Get a new key from AI Studio
2. Copy it exactly (no spaces)
3. Save in emini

#### Error: "Resource exhausted"
**Cause**: Exceeded quota
**Solution**:
1. Wait for quota reset (1 minute or 1 day)
2. Reduce request frequency
3. Upgrade to paid tier if needed

#### Error: "Permission denied"
**Cause**: API not enabled
**Solution**:
1. Go to AI Studio
2. Enable Gemini API
3. Try again

#### Error: "Network error"
**Cause**: Internet connection issue
**Solution**:
1. Check internet connection
2. Try again
3. Check if Google services are accessible

---

## Advanced Configuration

### Using Environment Variables (for developers)

If you're deploying emini:

```javascript
// Don't hardcode API keys!
const API_KEY = process.env.GEMINI_API_KEY;
```

### Rate Limiting
Add custom rate limiting:

```javascript
// In AIHelper.js
this.requestCount = 0;
this.resetTime = Date.now() + 60000; // 1 minute

// Before each request
if (this.requestCount >= 60) {
  if (Date.now() < this.resetTime) {
    throw new Error("Rate limit reached");
  }
  this.requestCount = 0;
  this.resetTime = Date.now() + 60000;
}
this.requestCount++;
```

### Caching Responses
Reduce API calls:

```javascript
// In AIHelper.js
this.cache = new Map();

// Before API call
const cacheKey = JSON.stringify(context);
if (this.cache.has(cacheKey)) {
  return this.cache.get(cacheKey);
}

// After API call
this.cache.set(cacheKey, response);
```

---

## Upgrading to Paid Tier

### When to Upgrade?
Consider if you:
- Exceed 60 requests/minute regularly
- Need 1,500+ requests/day
- Want higher quotas
- Building a commercial product

### Pricing (subject to change)
```
Pay-as-you-go:
- $0.00025 per 1K characters input
- $0.0005 per 1K characters output

Example:
100 requests/day × 30 days = 3,000 requests
Estimated cost: ~$0.50-$2/month
```

### How to Upgrade
1. Visit Google Cloud Console
2. Enable billing
3. Set up payment method
4. API key automatically gets higher limits

---

## Privacy & Data

### What Google Sees
- Your questions/prompts
- API usage statistics
- Timestamps of requests

### What Google Doesn't See
- Your API key storage (in your browser)
- Your pet's stats
- Your personal browsing

### Data Retention
- Prompts: Used for training (can opt out)
- Responses: Temporarily cached
- Analytics: Anonymized

### Opting Out of Training
1. Visit Google AI Studio
2. Go to Settings
3. Disable "Use my data for improvements"

---

## Alternative AI APIs

### If Gemini Doesn't Work

**Option 1: OpenAI GPT**
- Similar capability
- Requires credit card
- ~$0.002 per request

**Option 2: Anthropic Claude**
- Great for reasoning
- Free tier available
- API key required

**Option 3: Local AI (Ollama)**
- Completely private
- No API key needed
- Requires powerful computer

### Switching APIs
To use different API, modify `AIHelper.js`:

```javascript
// Change the API endpoint
this.baseURL = 'https://api.openai.com/v1/chat/completions';

// Update request format
// (each API has different format)
```

---

## FAQs

**Q: Will my API key work forever?**
A: Yes, unless you delete it or it's compromised.

**Q: Can I use the same key on multiple devices?**
A: Yes, but be mindful of rate limits.

**Q: What if I lose my API key?**
A: Generate a new one in AI Studio. Old key becomes invalid.

**Q: Is my data encrypted?**
A: Yes, all communication uses HTTPS encryption.

**Q: Can I see my conversation history?**
A: Not currently. emini doesn't store history.

**Q: What happens if I exceed the free tier?**
A: Requests will fail. Wait for quota reset or upgrade.

---

## Support & Resources

### Official Documentation
- **Gemini API Docs**: https://ai.google.dev/docs
- **AI Studio**: https://makersuite.google.com
- **API Reference**: https://ai.google.dev/api

### Community
- **Stack Overflow**: Tag `google-gemini`
- **GitHub Issues**: Report bugs
- **Reddit**: r/GoogleGemini

### Contact Google
- **Support**: Through AI Studio
- **Feature Requests**: Via feedback form
- **Billing Issues**: Google Cloud Support

---

## Quick Reference

### Essential Links
```
Get API Key: https://makersuite.google.com/app/apikey
Documentation: https://ai.google.dev/docs
Usage Dashboard: https://makersuite.google.com
Status Page: https://status.cloud.google.com
```

### Key Limits
```
Free Tier:
✓ 60 requests/minute
✓ 1,500 requests/day
✓ 200 tokens/response (emini config)
```

### Best Practices
```
✓ Keep API key secret
✓ Monitor usage regularly
✓ Handle errors gracefully
✓ Use rate limiting
✓ Cache when possible
```

---

**Ready to get started?** 

1. Get your API key: https://makersuite.google.com/app/apikey
2. Open emini
3. Paste and save
4. Start asking questions!

**Made with 💚 | Powered by Google Gemini**
