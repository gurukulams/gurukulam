const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const { validate } = require("jsonschema");

// === Schema for validation ===
const schema = {
  type: "object",
  required: ["question", "type"],
  properties: {
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
        required: ["label"],
        properties: {
          label: { type: "string" },
          answer: { type: "boolean" },
        },
      },
    },
    matches: {
      type: "array",
      items: {
        type: "object",
        required: ["label"],
        properties: {
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

  const question = {
    question: content.trim(),
    explanation: data.explanation || "",
  };

  if (Array.isArray(data.choices)) {
    question.choices = data.choices.map((label) => ({ label }));
  }

  if (Array.isArray(data.matches)) {
    question.matches = data.matches.map((label) => ({ label }));
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
  const locales = {};
  const pathMap = new Set();

  for (const file of files) {
    const rel = path.relative("questions", file);
    const dir = path.dirname(rel);
    const base = path.basename(file, ".md");

    // Validate name like: match.md, design-pattern_ta.md
    const match = base.match(/^([a-z0-9\-]+)(?:_([a-z]+))?$/);
    if (!match) {
      console.error(`❌ Invalid filename: ${file}`);
      process.exit(1);
    }

    const name = match[1];
    const locale = match[2] || "default";
    const fullKey = path.posix.join(dir, name);
    const outDir = path.join("dist", "data", dir);

    const question = transformMarkdown(file);
    const result = validate(question, schema);

    if (!result.valid) {
      console.error(`❌ Validation failed for: ${file}`);
      for (const err of result.errors) {
        console.error(`  → ${err.property}: ${err.message}`);
      }
      process.exit(1);
    }

    if (!grouped[dir]) grouped[dir] = {};
    if (!locales[dir]) locales[dir] = {};

    if (locale === "default") {
      grouped[dir][name] = question;
    } else {
      // Localized files must have default base
      if (!fs.existsSync(path.join("questions", dir, `${name}.md`))) {
        console.error(`❌ Missing base file for localized: ${file}`);
        process.exit(1);
      }

      if (!locales[dir][locale]) locales[dir][locale] = {};
      locales[dir][locale][name] = question;
    }

    pathMap.add(dir);
  }

  // Write default questions.json
  for (const dir in grouped) {
    const outDir = path.join("dist", "data", dir);
    fs.mkdirSync(outDir, { recursive: true });

    const questions = Object.keys(grouped[dir])
      .sort()
      .map((k) => grouped[dir][k]);

    fs.writeFileSync(
      path.join(outDir, "questions.json"),
      JSON.stringify(questions, null, 0)
    );
    console.log(`✅ Generated: ${path.join(outDir, "questions.json")}`);
  }

  // Write localized questions_<locale>.json
  for (const dir in locales) {
    for (const locale in locales[dir]) {
      const localized = [];
      const base = grouped[dir];
      const trans = locales[dir][locale];

      const names = Object.keys(base).sort();

      for (const name of names) {
        if (trans[name]) {
          // Validate localized fields match base
          const missing = Object.keys(base[name]).filter(
            (k) => !(k in trans[name])
          );
          if (missing.length > 0) {
            console.error(
              `❌ Missing fields in ${name}_${locale}.md: ${missing.join(", ")}`
            );
            process.exit(1);
          }
          localized.push(trans[name]);
        } else {
          localized.push(names.indexOf(name));
        }
      }

      const outDir = path.join("dist", "data", dir);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(
        path.join(outDir, `questions_${locale}.json`),
        JSON.stringify(localized, null, 0)
      );
      console.log(
        `🌐 Generated: ${path.join(outDir, `questions_${locale}.json`)}`
      );
    }
  }

  // Write sub-questions.json
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
