import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Final pick: "ChatGPA" — Grandma heard her grandchild uses ChatGPT,
// and her brain filed it under the school word she actually knows: GPA.
// One swapped letter, and suddenly the AI is a grade she's worried
// about. It's the whole text she'd send — just the name, fretting.
// (Beats round 1's "Alexis": that could be anyone's name, so the AI
// joke needed a caption. This one lands on its own.)
const word = "ChatGPA";

// Self-check: the gate wants exactly one word, 1–30 characters.
if (/\s/.test(word) || word.length < 1 || word.length > 30) {
  throw new Error(`entry must be one word of 1-30 chars, got: ${word}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", word, "utf8");

// Read-back verification: the grader runs this in separate sandboxes,
// so a silent short write would produce an invalid entry unnoticed.
// Fail loudly instead if what landed on disk differs byte-for-byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== word) {
  console.error(
    `entry verification failed: wrote ${JSON.stringify(word)}, read back ${JSON.stringify(written)}`,
  );
  process.exitCode = 1;
  throw new Error("entry.txt does not match the intended word");
}
