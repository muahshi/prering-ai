export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { callerName, callerNumber, context } = req.body;

  if (!callerName || !context) {
    return res.status(400).json({ error: 'callerName and context required' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const systemPrompt = `You are Pre-Ring AI — an intelligent call intent predictor.
Your job: Given a caller's name/number and the user's recent phone context (notifications, calendar, messages), predict WHY this person is calling.

Rules:
- Reply with ONLY a JSON object, nothing else
- JSON format:
{
  "prediction": "one sentence why they are calling (with relevant emoji at start)",
  "confidence": number between 60-98,
  "urgency": "low" | "medium" | "high" | "critical",
  "reason": "short basis for prediction (what context clue triggered this)",
  "action": "answer" | "ignore" | "call_back" | "block"
}
- Be specific, not generic. Use the context clues.
- If spam/telemarketing detected: urgency = critical, action = block
- If emergency signals detected: urgency = critical, action = answer
- Keep prediction under 15 words`;

  const userPrompt = `Caller: ${callerName} (${callerNumber || 'Unknown Number'})

Recent Context on my phone:
${context}

Predict why they are calling right now.`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.4,
        max_tokens: 200,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error('Groq error:', err);
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await groqRes.json();
    const raw = data.choices[0].message.content.trim();

    // Parse JSON safely
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(500).json({ error: 'Invalid AI response' });

    const parsed = JSON.parse(jsonMatch[0]);
    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}

