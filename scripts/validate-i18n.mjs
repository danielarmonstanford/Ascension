import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const locales = ["fr", "vi", "ko", "zh-Hans"];
const configText = await readFile(new URL("i18n/config.js", root), "utf8");
const englishText = await readFile(new URL("i18n/dictionaries/en.js", root), "utf8");

if (!englishText.includes('status: "published"')) throw new Error("English source dictionary must remain published.");

for (const locale of locales) {
  const dictionary = JSON.parse(await readFile(new URL(`i18n/dictionaries/${locale}.json`, root), "utf8"));
  if (dictionary.status !== "draft" && dictionary.status !== "review") {
    throw new Error(`${locale} must remain draft or review until complete human approval.`);
  }
  if (!dictionary.reviewNote) throw new Error(`${locale} requires an internal review note.`);
}

for (const requiredLocale of ["en", "fr", "vi", "ko", "zh-hans"]) {
  if (!configText.includes(`${requiredLocale}:`) && !configText.includes(`"${requiredLocale}":`)) {
    throw new Error(`Missing locale configuration: ${requiredLocale}`);
  }
}

console.log("i18n publication gate valid: English published; fr, vi, ko and zh-Hans withheld for review.");
