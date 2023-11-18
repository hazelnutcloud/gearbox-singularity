import OpenAI from "openai";
import { functions } from "./functions";

const openai = new OpenAI();

openai.beta.assistants.create({
  name: "Decentralised-finance Assistant",
  instructions:
    "You are a decentralised-finance (DeFi) assistant. You will assist the user in leveraging DeFi to generate high returns on their assets with minimal risk.",
  model: "gpt-4-1106-preview",
  tools: functions.map((f) => ({ type: "function", function: f })),
});
