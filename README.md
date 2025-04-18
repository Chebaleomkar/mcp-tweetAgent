
# 🧠 AutoTweet AI Agent

An AI-powered agent built with **Model Context Protocol (MCP)** and **Gemini** that automatically generates and posts tweets using custom tools and the Twitter API.

---

## 🔧 Setup

### 1. Clone this repo
```bash
git clone https://github.com/Chebaleomkar/mcp-tweetAgent
cd mcp-tweetAgent
```

---

## 📦 Install dependencies
```bash
npm install
```

---

## 🔑 Environment Variables

### 📍 In `client/.env` — add your Gemini API key:
```
GEMINI_API_KEY=your-gemini-api-key-here
```

### 📍 In `server/.env` — add your Twitter API credentials:
```
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret
TWITTER_ACCESS_TOKEN=your-access-token
TWITTER_ACCESS_TOKEN_SECRET=your-access-token-secret
```

---

## 🐦 Get Twitter API Keys

1. Go to [developer.x.com → dashboard](https://developer.x.com/en/portal/dashboard)
2. Create an app, **set permissions to "Read and Write"**, save, and regenerate the keys/tokens.

---

## 🚀 Run

### Start the server:
```bash
cd server
node index.js
```

### Start the client:
```bash
cd client
node index.js
```

---

Enjoy your auto-tweeting AI assistant! 🚀