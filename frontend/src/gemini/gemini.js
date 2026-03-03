import axios from "axios";

export async function gemini(input, setError) {
  try {
    const response = await axios.post("http://localhost:5000/api/chat", {
      message: input,
    });

    return response.data.reply;
  } catch (error) {
    setError(error.response?.data?.error || error.message);
  }
}
