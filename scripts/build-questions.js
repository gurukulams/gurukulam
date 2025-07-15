const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const { validate } = require("jsonschema");

// JSON Schema definition
const schema = {
  type: "object",
  required: ["id", "question", "type"],
  properties: {
    id: { type: "string" },
    question: { type: "string" },
    explanation: { type: "string" },
    type: {
      type: "string",
      enum: ["CHOOSE_THE_BEST", "MULTI_CHOICE", "MATCH_THE_FOLLOWING"],
    },
    choices: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "label"],
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          answer: { type: "boolean" },
        },
      },
    },
    matches: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "label"],
        properties: {
          id: { type: "string" },
          label: { type: "string" },
        },
      },
    },
  },
  additionalProperties: false,
};

// Transform a Markdown file into JSON question object
function transformMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fileName = path.basename(filePath, ".md");

  const question = {
    id: fileName,
    question: content.trim(),
    explanation: data.explanation || "",
  };

  let idCounter = 1;

  if (Array.isArray(data.choices)) {
    question.choices = data.choices.map((label) => ({
      id: String(idCounter++),
      label,
    }));
  }

  if (Array.isArray(data.matches)) {
    question.matches = data.matches.map((label) => ({
      id: String(idCounter++),
      label,
    }));
    question.type = "MATCH_THE_FOLLOWING";
  } else if (Array.isArray(data.answer) && Array.isArray(question.choices)) {
    const answerSet = new Set(data.answer);
    let trueCount = 0;
    question.choices = question.choices.map((choice) => {
      const isCorrect = answerSet.has(choice.label);
      if (isCorrect) trueCount++;
      return { ...choice, answer: isCorrect };
    });

    question.type =
      trueCount === 1
        ? "CHOOSE_THE_BEST"
        : trueCount > 1
        ? "MULTI_CHOICE"
        : undefined;
  }

  return question;
}

// Recursively walk all markdown files and build JSON per folder
function buildAll() {
  const files = glob.sync("questions/**/*.md");
  const grouped = {};

  for (const file of files) {
    const json = transformMarkdown(file);
    const result = validate(json, schema);

    if (!result.valid) {
      console.error(`❌ Validation failed for file: ${file}`);
      for (const err of result.errors) {
        console.error(`  → ${err.property}: ${err.message}`);
      }
      process.exit(1); // Stop build
    }

    const relativePath = path.dirname(file).replace(/^questions/, "dist/data");
    if (!grouped[relativePath]) grouped[relativePath] = [];
    grouped[relativePath].push(json);
  }

  for (const dir in grouped) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "questions.json"),
      JSON.stringify(grouped[dir], null, 0) // minified
    );
    console.log(`✅ Generated: ${path.join(dir, "questions.json")}`);
  }
}

buildAll();
