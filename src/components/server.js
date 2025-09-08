import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import Groq from "groq-sdk";   // npm install groq-sdk

const app = express();
app.use(bodyParser.json());

const API_KEY = "gsk_xxxxxxxxx";  // your Groq API key
const groq = new Groq({ apiKey: API_KEY });

// Example route - wrap your Python predictor here
app.post("/predict/regression", async (req, res) => {
  try {
    const flightInput = req.body;

    // 🔹 Step 1: Call your Python backend that does ML + SHAP
    // Assume you exposed it on http://localhost:5000/predict
    const mlResponse = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flightInput),
    });

    if (!mlResponse.ok) {
      const errorData = await mlResponse.json();
      throw new Error(errorData.detail || "ML service failed");
    }

    const mlResult = await mlResponse.json(); 
    // Example: { predicted_delay_minutes: 20, status: "DELAYED", top_features: [...] }

    // 🔹 Step 2: Create prompt for Groq AI justification
    let explanationText = `The model predicts an arrival delay of ${mlResult.predicted_delay_minutes.toFixed(
      2
    )} minutes.\nFlight Status: ${mlResult.status}\n\nTop influencing features:\n`;

    mlResult.top_features?.forEach((f) => {
      explanationText += `- ${f.feature}: ${f.value} (impact: ${f.impact})\n`;
    });

    const prompt = `You are an expert aviation analyst. 
    Given the following prediction and SHAP explanations, write a clear, user-friendly justification for why this flight is expected to be ${
      mlResult.status.toLowerCase()
    }.\n\n${explanationText}`;

    // 🔹 Step 3: Call Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_tokens: 500,
    });

    const aiMessage = chatCompletion.choices[0].message.content;

    // 🔹 Step 4: Respond with prediction + explanation
    res.json({
      ...mlResult,
      ai_explanation: aiMessage,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("🚀 FlightPredict AI Node server running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
