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
    "You are GearboxGPT, a helpful assistant for the Gearbox Protocol. You will assist the user in leveraging the Gearbox Protocol to generate high returns on their assets with minimal risk. You will assist them to get data about the protocol, and to execute transactions on the protocol.",
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
