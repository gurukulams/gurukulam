/**
 * Build Questions from materials.
 * It will load questions markdown files (*.md) from questions folder.
 *
 * For Each Folders, It generats below file
 * 1. questions.json - JSON Array of all the questions in the folder
 * 2. questions-<<LANGUAGE_CODE>>.json - Localized JSON Array of all the questions in the folder.
 *    For the questions that doesn ot have language specific content, it uses the corresponding index from questions.json
 * 3. sub-questions.json - JSON Array of all the subfolders that have questions.json
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const glob = require("glob");
const chokidar = require("chokidar");
const { validate } = require("jsonschema");

// === Configurable questions folder ===
const QUESTIONS_DIR = process.env.QUESTIONS_FOLDER
  ? path.resolve(process.env.QUESTIONS_FOLDER)
  : "questions";

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

function transformMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const question = {
    question: content.trim(),
    explanation: data.explanation || "",
  };

  if (Array.isArray(data.matches)) {
    question.type = "MATCH_THE_FOLLOWING";
    if (Array.isArray(data.choices)) {
      question.choices = data.choices.map((label) => ({ label }));
    }
    question.matches = data.matches.map((label) => ({ label }));
    return question;
  }

  const answerSet = new Set(data.answer || []);
  const rawChoices = new Set([...(data.choices || []), ...(data.answer || [])]);

  if (rawChoices.size > 0) {
    question.choices = [...rawChoices].map((label) => ({
      label,
      answer: answerSet.has(label),
    }));

    const correctCount = question.choices.filter((c) => c.answer).length;
    question.type = correctCount > 1 ? "MULTI_CHOICE" : "CHOOSE_THE_BEST";
  }

  return question;
}

function buildAll() {
  const files = glob.sync("**/*.md", { cwd: QUESTIONS_DIR, absolute: true });
  const grouped = {};
  const locales = {};
  const pathMap = new Set();

  for (const file of files) {
    const rel = path.relative(QUESTIONS_DIR, file);
    const dir = path.dirname(rel);
    const base = path.basename(file, ".md");

    const match = base.match(/^([a-z0-9\-]+)(?:_([a-z]+))?$/);
    if (!match) {
      console.error(`❌ Invalid filename: ${file}`);
      process.exit(1);
    }

    const name = match[1];
    const locale = match[2] || "default";
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
      const basePath = path.join(QUESTIONS_DIR, dir, `${name}.md`);
      if (!fs.existsSync(basePath)) {
        console.error(`❌ Missing base file for localized: ${file}`);
        process.exit(1);
      }

      if (!locales[dir][locale]) locales[dir][locale] = {};
      locales[dir][locale][name] = question;
    }

    pathMap.add(dir.split(path.sep).join(path.posix.sep));
  }

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

  for (const dir in locales) {
    for (const locale in locales[dir]) {
      const localized = [];
      const base = grouped[dir];
      const trans = locales[dir][locale];

      const names = Object.keys(base).sort();

      for (const name of names) {
        if (trans[name]) {
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
        `✅ Generated: ${path.join(outDir, `questions_${locale}.json`)}`
      );
    }
  }

  // Generate Sub Questions.
  const subQMap = {};
  for (const dir of Object.keys(grouped)) {
    const tokens = dir.split(path.sep);
    if (tokens.length > 3) {
      const dirName = tokens[tokens.length - 1];
      const parentDir = path.join(
        "dist",
        "data",
        dir.replace(path.sep + dirName, "")
      );
      if (parentDir in subQMap) {
        subQMap[parentDir].push(dirName);
      } else {
        subQMap[parentDir] = [dirName];
      }
    }
  }

  for (const dir of Object.keys(subQMap)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, `sub-questions.json`),
      JSON.stringify(subQMap[dir], null, 0)
    );
    console.log(`✅ Generated: ${path.join(dir, `sub-questions.json`)}`);
  }
}

// === CLI flag check ===
const isWatchMode = process.argv.includes("--watch");

// === Watch mode setup ===
const startWatching = () => {
  chokidar
    .watch(QUESTIONS_DIR, {
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: true,
    })
    .on("all", (event, filePath) => {
      console.log(`📌 Detected ${event} in ${filePath}`);
      try {
        buildAll();
      } catch (err) {
        console.error("❌ Rebuild failed:", err);
      }
    });

  console.log(`👀 Watching for changes in: ${QUESTIONS_DIR}`);
};

// === Execution ===
buildAll();

if (isWatchMode) {
  startWatching();
}
