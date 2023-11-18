import OpenAI from "openai";
import { functions } from "../src/openai/functions.js";
import * as path from "node:path";
import * as fs from "node:fs";
import * as url from "node:url";
import { config } from "dotenv";
config();

const openai = new OpenAI();

const assistant = await openai.beta.assistants.create({
  name: "Decentralised-finance Assistant",
  instructions:
    "You are a DeFi assistant. You will assist the user in leveraging DeFi to generate high returns on their assets with minimal risk.",
  model: "gpt-4-1106-preview",
  tools: functions.map((f) => ({ type: "function", function: f })),
});

fs.mkdirSync(
  path.join(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "../../artifacts"
  ),
  { recursive: true }
);

fs.writeFileSync(
  path.join(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "../../artifacts/assistant.json"
  ),
  JSON.stringify(assistant)
);
