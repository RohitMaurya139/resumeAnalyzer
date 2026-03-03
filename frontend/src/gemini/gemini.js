import axios from "axios";

export async function gemini(input, setError) {
  try {
    const response = await axios.post("http://localhost:5000/api/chat", {
      message: input,
    });

    const raw = response.data.reply;

    // Strip markdown code fences if the model wraps JSON in ```json ... ```
    const clean = raw.replace(/```json|```/g, "").trim();

    return JSON.parse(clean);
  } catch (error) {
    setError(
      error.response?.data?.error ||
        error.message ||
        "Failed to parse response",
    );
    return null;
  }
}
