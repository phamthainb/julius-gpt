import express from 'express';
import {OpenAIPostGenerator} from './build/index.js'

const port = 3100;
const app = express();
app.use(express.json());

app.post("/gen", async (req, res) => {
  try {
    const prompt = {
      topic: "How to generate a great content with GPT-4 ?",
      language: "english", // could be any language supported by GPT-4
      withConclusion: true,
      model: "gpt-4", // "gpt-3.5-turbo"
      tone: "informative", //  "captivating"
      apiKey: " ...", // optional if you use the env var OPENAI_API_KEY
      country: "...", // optional
      intent: "...", // optional
      audience: "...", // optional
      temperature: 0.8, // optional
      frequencyPenalty: 0, // optional
      presencePenalty: 1, // optional
      logitBias: 0, // optional
      debug: true, // optional
      debugapi: true, // optional
      ...req.body
    };
  
    const postGenerator = new OpenAIPostGenerator(prompt);
    const post = await postGenerator.generate();
    // console.log(post);
    res.send(post);
  } catch (error) {
    console.log(error);
    res.send(error)
  }
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
