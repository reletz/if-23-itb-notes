# materials-to-cornell-notes - Gemini CLI Extension

Turn a folder of course materials — .pptx slide decks, .pdf documents, or .docx files — into Cornell-format Obsidian/Quartz notes (Bahasa Indonesia) that match this vault's template, grouped into "payung" topic folders, with mermaid diagrams where helpful, and wired into the course index/MOC. Use when the user points at a folder of lecture materials for a course (e.g. "baca folder X, buat markdown materinya untuk tiap ppt/pdf") and wants notes generated. Fans out one subagent per topic folder for speed.

## Quick Start

After installation, you can use this extension by asking questions or giving commands naturally.


# Course materials → Cornell notes

This vault (a Quartz digital garden of ITB course notes) has a strict, repeated
note format. This skill turns lecture materials (PowerPoint decks, PDFs, or Word
docs) into notes that match it exactly, then registers them in the course index.
Follow the steps in order.

## 1. Vault conventions (learn these first)

- **Course notes** live in `content/02. Catatan/<COURSE>/`, split into **numbered
  subfolders** (`1`, `2`, `3`, …). Each numbered folder is one **payung** (topic
  group / lecture theme) and holds several focused Cornell notes.
- **The index / MOC** lives at `content/01. Matkul/Semester <N>/<COURSE>.md`. It
  has `cssclasses: [dashboard]`, and lists notes as `## Section` headings with
  `- [[Note Title]]` bullets. Sections may be grouped under top-level `# UTS` /
  `# UAS` headings (pre/post-midterm). New payung → new `## Section` here.
- **Note filenames** are the human-readable title + `.md` (spaces and commas are
  fine; avoid `/` and parentheses — use ` - ` for subtitles, e.g.
  `Ready-made Solutions - COTS and Open Source.md`).
- Every note's title (in the callout) and its `[[wikilink]]` in the index must
  match the filename stem exactly.

## 2. The Cornell note template (replicate byte-for-byte)

Before writing anything, **read 1–2 existing notes** to anchor the format — e.g.
`content/02. Catatan/<COURSE>/3/Feasibility Study in SDLC.md` and
`.../3/Core SDLC Execution Phases.md`. The structure is:

```markdown
---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[<COURSE index note name>]]

> [!cornell] <Note Title>
>
> > ## Questions/Cues
> >
> > - <4–5 guiding questions in Indonesian>
> >
> > ## Reference Points
> >
> > - <COURSE> (<source locator>)
>
> > ### <Heading>
> >
> > <substantial Indonesian paragraphs, concrete examples/analogies, **bold** key terms>
> >
> > ### <Heading>
> >
> > <...>

> [!cornell] #### Summary
>
> <one dense Indonesian paragraph, bolding key terms>

> [!ad-libitum]- Additional Information
>
> #### <Deeper technique / tools / case study>
> <...>
>
> #### Proyek Eksplorasi Mandiri
> 1. <...>
>
> #### Bacaan Lanjutan
> - <...>
```

Rules:
- Prose in **Bahasa Indonesia**; technical terms may stay in English.
- The `> [!cornell]` body is quoted at **two levels** (`> >`). Summary and
  ad-libitum callouts are at **one level** (`>`).
- `_Back to_` points at the course index note name (e.g. `[[IF3141 Sistem Informasi]]`).
- **Reference Points `<source locator>`** depends on the source format:
  `(Slides X-Y)` for a .pptx deck, `(Pages X-Y)` for a .pdf, `(Bab/Section …)`
  for a .docx. When several materials feed one payung, name the source too, e.g.
  `<COURSE> — Quality & Testing (Slides 2-6)`.
- The ad-libitum block enriches **beyond** the source (extra tools, frameworks,
  self-study projects, further reading) — keep it accurate.

## 3. Mermaid diagrams (where they add value)

Quartz renders mermaid. Add a diagram to a note when it clarifies a flow,
hierarchy, comparison, lifecycle, or taxonomy — **don't force one** onto purely
definitional notes.

**Critical quoting rule:** inside the `> [!cornell]` body, every line of the
fenced block must be prefixed with `> > ` (two levels, same as the surrounding
content) — **NOT** `> > >`. A third level renders as a stray nested quote box.
Real precedent in this vault: `content/02. Catatan/IF3250 Proyek Perangkat
Lunak/5/Software Quality and ISO IEC 25010.md`.

```
> > ```mermaid
> > flowchart LR
> >     Q["System/Software<br/>Product Quality"]
> >     Q --> FS["Functional Suitability"]
> > ```
```

Use quoted node labels `["..."]`, `<br/>` for line breaks, and HTML entities
(`&amp;`) inside labels that contain `&`. Put a blank `> >` line before and after
the block, right after the paragraph it illustrates.

## 4. Workflow

1. **Inventory** the source folder: `ls` the materials (`.pptx`, `.pdf`, `.docx`).
2. **Extract source text** with the bundled extractor (stdlib for pptx/docx;
   PDF uses poppler's `pdftotext`):
   ```bash
   python3 "<skill-dir>/scripts/extract.py" "path/to/Minggu-9-....pptx"
   python3 "<skill-dir>/scripts/extract.py" "path/to/reading.pdf"
   python3 "<skill-dir>/scripts/extract.py" "path/to/handout.docx"
   ```
   Output markers per format: `===== SLIDE N =====` (pptx), `===== PAGE N =====`
   (pdf), Markdown `#` heading markers (docx). Run it per file and read the output
   to understand each source's structure.
   - **Scanned / image-only PDF:** `pdftotext` returns little and the script warns
     you. In that case **read the PDF with the harness Read tool** (`pages=...`),
     which reads pages visually. Same fallback if `pdftotext` isn't installed.
3. **Read the index** (`content/01. Matkul/Semester <N>/<COURSE>.md`) and a couple
   of sample notes to confirm folder numbering and the exact template.
4. **Plan the grouping (payung)** and present it for approval:
   - One payung (numbered folder) per source, **combining materials with similar
     content** under one payung (e.g. a "Quality & Testing" deck + a "System
     Testing" deck).
   - Within a payung, split into **one focused Cornell note per coherent
     sub-topic** — match the vault's granularity (look at an existing folder:
     a single source is typically 4–7 notes). Map each note to a slide/page/section
     range.
   - Fold tiny singletons into a neighbouring note rather than leaving 1-unit notes.
5. **Ask the two decisions** (use AskUserQuestion) before generating:
   - **Granularity**: as-planned vs slightly coarser.
   - **Execution**: fan out subagents (parallel, faster) vs write directly.
6. **Create the folders** (`mkdir -p`) — continue the existing numeric sequence.
7. **Generate the notes.** Preferred: **fan out one subagent per payung folder**
   in a single message (independent folders → no write conflicts). Give each
   agent the prompt in §5. Then the orchestrator reviews + updates the index.
8. **Verify** (see §6).
9. **Update the index**: add a `## Section` per new payung (under `# UAS` if the
   user groups post-midterm material that way), listing each note as `[[wikilink]]`.
   Match filenames exactly.
10. **Don't commit** unless asked. Mention the notes are uncommitted.

## 5. Subagent prompt template (one per payung folder)

Give each `general-purpose` subagent:

- The format anchor: "Read `<two sample note paths>` and replicate the structure
  exactly" + the template from §2.
- How to get its source text: the `extract.py` command for its file(s) — or, for a
  scanned PDF, "read pages X–Y of `<pdf>` with the Read tool."
- The **exact list of files to create**, each with absolute path, callout title,
  source locator for Reference Points (Slides/Pages/Section range), and the
  sub-topics to cover.
- The mermaid rule from §3 (with the `> >`-prefix example) and which diagram(s)
  to add.
- Guardrails: "Write all prose in Bahasa Indonesia; faithfully cover the assigned
  source range, enrich the ad-libitum block; **do NOT touch the index file**; return
  the list of files created."

For a consolidation/merge agent, also tell it which existing notes to read+merge,
to produce ~100–140 line coherent (not concatenated) notes, and which obsolete
source files to `rm`.

## 6. Verification checklist (run after generation)

- **File count** per folder matches the plan.
- **Structural markers** present in every note — one per line:
  `grep -c` for `^---` (frontmatter), `_Back to_ [[<index>]]`, `> \[!cornell\]`
  (should be 2: body + Summary), `## Questions/Cues`, `## Reference Points`,
  `#### Summary`, `!ad-libitum\]- Additional Information`.
- **Mermaid sanity** (the #1 bug source):
  - Every `mermaid` fence inside a callout is `> > `-prefixed, **never** `> > >`:
    `grep -rn '^> > >' <folders>` must return nothing.
  - Code fences balanced: each file's count of ```` ``` ```` lines is even.
- **Index**: new sections added, old/renamed entries removed, all wikilinks resolve
  to real filenames.

## 7. Notes / gotchas

- **Supported sources:** `.pptx`, `.pdf`, `.docx`. `pdftotext` (poppler) is present;
  there is no pandoc/libreoffice/python-docx, so the extractor is stdlib-only for
  pptx/docx and shells out to `pdftotext` for pdf. Image-only PDFs → use the Read tool.
- The shell here is **fish**, but the Bash tool runs bash. Avoid unescaped
  parentheses inside double-quoted `echo` strings (they error). Paths contain
  spaces — always quote them.
- A bulk blockquote-level fix across many files is the one place `sed -i` beats
  dozens of Edits: `sed -i -e 's/^> > > /> > /' -e 's/^> > >$/> >/' file.md`.
- Subagents writing to **distinct folders** never conflict, so no worktree
  isolation is needed; send them all in one message to run concurrently.
- This is a documentation/notes vault, not code — there's no build/test to run;
  verification is the structural + mermaid grep above.


---

*This extension was converted from a Claude Code skill using [skill-porter](https://github.com/jduncan-rva/skill-porter)*
