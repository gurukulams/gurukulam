---
title: "Question Authoring Instructions"
weight: 1
---

Thank you for contributing to the **Question Builder**. Please follow the instructions below to ensure your questions are valid and consistent.

## Folder & File Naming Conventions

- All **folder names** and **file names** must be in **lowercase** and use **hyphens** to separate words.

  - ✅ `design-pattern`
  - ❌ `DesignPattern`, `Design_Pattern`, `designPattern`

- Markdown files must use the `.md` extension.
- For **localized versions**, add locale suffix before `.md`:
  - Example: `interfaces.md` (default), `interfaces_ta.md` (Tamil)

## File Format

Each file must have:

1. **YAML Frontmatter** (for metadata)
2. **Markdown Body** (the actual question)

## Example – Multiple Choice Question

```md
---
choices:
  - "An interface can have private methods."
  - "An interface can extend multiple interfaces."
  - "A class can extend multiple interfaces."
  - "An interface can have constructors."
answer:
  - "An interface can extend multiple interfaces."
explanation: "In Java, an interface can extend multiple interfaces. Private methods were added in Java 9, but an interface cannot have constructors."
---

## Which of the following statements about Java interfaces is true?
```

## Match the Following

```md
---
choices:
  - "Collection Streams API"
  - "Buffered Reader"
  - "Container"
matches:
  - "Builder"
  - "Decorator"
  - "Composite"
  - "Visitor"
explanation: "Match the components with the design patterns they represent."
---

## Match the following
```

---

## Localization Rules

- Localized files **must** have a corresponding **default (English)** file.

  - ✅ `match.md` and `match_ta.md` → Valid
  - ❌ `match_ta.md` alone → ❌ **Invalid**

- Localized file should contain **all fields** (`choices`, `answer`, `explanation`, `matches`) present in the default file.

## 📂 Folder Structure

```
questions/
└── cse/
    └── languages/
        └── java/
            ├── interfaces.md
            ├── interfaces_ta.md
            ├── oop.md
            └── design-pattern/
                └── match.md
```

---

## Validation Rules

During the build:

- Each question is validated against the schema.
- Missing required fields or invalid structure will **fail the build**.
- Localized files without a default counterpart will also **fail**.

## Contribution Tip

- Keep questions **simple**, **clear**, and **relevant**.
- Markdown syntax (e.g. `##`, `*`, `-`) is allowed and rendered.
- Try to keep options concise (1 line each).

Thank you again for contributing to open educational content!

— Gurukulams Team
