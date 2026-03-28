# 📡 Pre-Ring AI — Call Intent Predictor

> AI call aane se pehle predict karta hai — kyu aa raha hai call.

**Live Demo:** [your-app.vercel.app](https://your-app.vercel.app)

---

## 🚀 Deploy Karne ke Steps (Beginner Friendly)

### Step 1 — Groq API Key lo (FREE)

1. Jao: https://console.groq.com
2. Sign up karo (Google se login kar sakte ho)
3. Left sidebar: **API Keys** → **Create API Key**
4. Key copy karo (`gsk_...` se shuru hogi)

---

### Step 2 — GitHub pe Upload karo

1. GitHub.com pe jao → **New Repository**
2. Naam do: `prering-ai`
3. Public rakho → **Create Repository**
4. Is folder ke saare files upload karo:
   ```
   prering-ai/
   ├── api/
   │   └── predict.js
   ├── public/
   │   └── index.html
   ├── vercel.json
   ├── package.json
   └── README.md
   ```
5. Commit karo → **"Initial commit"**

---

### Step 3 — Vercel pe Deploy karo

1. Jao: https://vercel.com
2. **Sign up with GitHub** (same account)
3. Dashboard pe: **"Add New Project"**
4. Apna `prering-ai` repo select karo
5. **"Import"** karo
6. **"Deploy"** dabao — default settings theek hain

---

### Step 4 — API Key Add karo (IMPORTANT)

Deploy hone ke baad:

1. Vercel dashboard → Apna project → **Settings**
2. Left sidebar: **Environment Variables**
3. Click: **"Add New"**
4. **Name:** `GROQ_API_KEY`
5. **Value:** Apni key paste karo (`gsk_...`)
6. **"Save"** karo
7. **Redeploy karo:** Deployments tab → Latest deployment → **"Redeploy"**

---

### Step 5 — Live! 🎉

Tumhe milega:
```
https://prering-ai.vercel.app
```

Yeh link WhatsApp pe share karo — log directly use kar sakte hain!

---

## 🛡️ Privacy & Security

- **API key kabhi bhi frontend mein mat daalo** — hamesha Vercel Environment Variables use karo
- Groq API free tier: **14,400 requests/day** — beta ke liye kaafi hai
- Sab data in-memory hai — kuch store nahi hota

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML/CSS/JS |
| Backend | Vercel Serverless Functions |
| AI Model | Groq (LLaMA 3.3 70B) |
| Hosting | Vercel (Free tier) |

---

## 📱 Features

- ✅ 6 pre-built scenarios (Delivery, Emergency, Spam, etc.)
- ✅ Real AI prediction via Groq API
- ✅ Live phone mockup with result
- ✅ Confidence score + urgency level
- ✅ Recommended action (Answer / Block / Ignore)
- ✅ Mobile responsive

---

## 🗺️ Roadmap

- [ ] Android app (NotificationListenerService)
- [ ] WhatsApp context auto-read (on-device)
- [ ] Spam number database integration
- [ ] B2B dashboard for sales teams

---

**Built for PreRing.AI Startup — Bhopal, India 🇮🇳**
