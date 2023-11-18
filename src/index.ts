import { Telegraf } from "telegraf";
import { assertExists } from "./utils";

const telegraf = new Telegraf(assertExists(process.env.TELEGRAM_BOT_TOKEN));
