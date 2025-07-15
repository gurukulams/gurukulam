const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const { validate } = require("jsonschema");

// === Schema for validation ===
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

// === Transform one file ===
function transformMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const relativePath = path
    .relative("questions", filePath)
    .replace(/\.md$/, "");
  const questionId = relativePath.replace(/\\/g, "/").replace(/\//g, "-");

  const question = {
    id: questionId,
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
  } else if (Array.isArray(data.answer) && question.choices) {
    const answerSet = new Set(data.answer);
    let correctCount = 0;
    question.choices = question.choices.map((choice) => {
      const isCorrect = answerSet.has(choice.label);
      if (isCorrect) correctCount++;
      return { ...choice, answer: isCorrect };
    });

    question.type = correctCount > 1 ? "MULTI_CHOICE" : "CHOOSE_THE_BEST";
  }

  return question;
}

// === Main logic ===
function buildAll() {
  const files = glob.sync("questions/**/*.md");
  const grouped = {};
  const pathMap = new Set();

  for (const file of files) {
    const relativeDir = path.dirname(file).replace(/^questions[\/\\]?/, "");
    const json = transformMarkdown(file);
    const result = validate(json, schema);

    if (!result.valid) {
      console.error(`❌ Validation failed for: ${file}`);
      for (const err of result.errors) {
        console.error(`  → ${err.property}: ${err.message}`);
      }
      process.exit(1);
    }

    const outDir = path.join("dist", "data", relativeDir);
    if (!grouped[outDir]) grouped[outDir] = [];
    grouped[outDir].push(json);

    pathMap.add(relativeDir);
  }

  // Write questions.json files
  for (const dir in grouped) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "questions.json"),
      JSON.stringify(grouped[dir], null, 0)
    );
    console.log(`✅ Generated: ${path.join(dir, "questions.json")}`);
  }

  // Write sub-questions.json files
  for (const base of pathMap) {
    const fullPath = path.join("questions", base);
    const subdirs = fs.existsSync(fullPath)
      ? fs
          .readdirSync(fullPath, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name)
          .filter((name) => pathMap.has(path.posix.join(base, name)))
      : [];

    if (subdirs.length > 0) {
      const targetDir = path.join("dist", "data", base);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(
        path.join(targetDir, "sub-questions.json"),
        JSON.stringify(subdirs, null, 0)
      );
      console.log(`📁 Indexed: ${path.join(targetDir, "sub-questions.json")}`);
    }
  }
}

buildAll();
