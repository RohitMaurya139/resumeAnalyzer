import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const allowedOrigins = [
  "https://resume-analyzer-frontend-five.vercel.app/",
  "http://localhost:5173",
  "http://localhost:5174",
];

// CORS FIX
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());

const client = new OpenAI({
  // eslint-disable-next-line no-undef
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const RESUME_ANALYZER = `You are an 15+ year experienced technical recruiter and senior hiring manager evaluating a candidate's resume.

Analyze the resume carefully and provide a highly detailed, structured evaluation.

Return your response strictly in valid JSON format using the following structure:

{
  "score": number (0-100),
  "positives": [
    "Detailed strength 1 (clear and specific)",
    "Detailed strength 2",
    "Detailed strength 3"
  ],
  "negatives": [
    "Specific weakness 1",
    "Specific weakness 2",
    "Specific weakness 3"
  ],
  "analysis": {
  "summary": "Write a 250–350 word professional paragraph summarizing the overall quality of the resume. Evaluate readiness level (intern/junior/mid/senior), technical depth, clarity, measurable impact, specialization level, and overall hiring confidence.",

  "reasoning_behind_score": [
    "Provide at least 8-10 detailed bullet points explaining why this numerical score was assigned.",
    "Each bullet must reference specific evaluation criteria such as technical skills depth, project complexity, measurable achievements, experience clarity, formatting quality, credibility factors, and ATS optimization.",
    "Each bullet must contain 2–4 sentences of explanation.",
    "Be analytical and justify the score logically."
  ],

  "improvement_area": [
    "Provide at least 8-10 clearly numbered and actionable improvement steps.",
    "Each step must explain what to change, why it matters to recruiters, and include a concrete example improvement.",
    "Examples must include measurable rewrites (e.g., converting generic bullets into quantified results).",
    "Improvements should cover technical presentation, metrics, formatting, credibility, specialization, and professional polish."
  ]
}
}

Scoring Guidelines:
90–100 = Interview-ready, highly competitive
75–89 = Strong but needs refinement
60–74 = Average, improvement needed
Below 60 = Major improvements required

Be honest, critical, and realistic like a real hiring manager.
Do not provide generic feedback.
Focus on measurable impact, clarity, credibility, and professional presentation.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const prompt=RESUME_ANALYZER
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{role:"system",content:prompt},{ role: "user", content: message }],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
