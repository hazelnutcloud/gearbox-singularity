import "dotenv/config";
import OpenAI from "openai";
import { functions } from "../src/openai/functions.js";
import * as path from "node:path";
import * as fs from "node:fs";
import * as url from "node:url";

const openai = new OpenAI();

const assistant = await openai.beta.assistants.create({
  name: "GearboxGPT",
  instructions:
    "You are GearboxGPT, a helpful assistant for users to use the Gearbox Protocol. You will manage the user's wallet to leverage the Gearbox Protocol to generate profit for them. You will assist them to get data about the protocol, providing answers in a short and concise manner without leaving out any important details like number values.",
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
