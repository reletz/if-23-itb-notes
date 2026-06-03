#!/usr/bin/env python3
"""Extract text from a lecture source file (.pptx, .docx, or .pdf).

Usage:
    python3 extract.py "path/to/file.pptx|.docx|.pdf"

Output is grouped so a reader can map content to a location:
  .pptx -> one block per slide   ("===== SLIDE N =====")
  .pdf  -> one block per page     ("===== PAGE N =====") via `pdftotext -layout`
  .docx -> linear text with Markdown heading markers from the doc's heading styles

pptx/docx use only the stdlib (a PPTX/DOCX is a zip of XML; text lives in
<a:t> / <w:t> elements). PDF shells out to `pdftotext` (poppler-utils).

If a PDF has no text layer (scanned/image-only), pdftotext returns little — the
script says so; read that PDF with the harness Read tool (pages=...) instead,
which reads pages visually. Same fallback if pdftotext is not installed.
"""
import os
import re
import subprocess
import sys
import zipfile
from xml.etree import ElementTree as ET

A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"          # pptx drawingml
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"   # docx wordml


def extract_pptx(path):
    z = zipfile.ZipFile(path)
    slides = sorted(
        (n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)),
        key=lambda x: int(re.search(r"(\d+)", x).group()),
    )
    out = []
    for s in slides:
        num = int(re.search(r"(\d+)", s).group())
        root = ET.fromstring(z.read(s))
        texts = [t.text for t in root.iter(A + "t") if t.text]
        out.append(f"===== SLIDE {num} =====\n" + "\n".join(texts))
    return "\n".join(out)


def extract_docx(path):
    z = zipfile.ZipFile(path)
    body = ET.fromstring(z.read("word/document.xml")).find(W + "body")
    lines = []
    for p in body.iter(W + "p"):
        txt = "".join(t.text or "" for t in p.iter(W + "t"))
        if not txt.strip():
            continue
        style = ""
        ppr = p.find(W + "pPr")
        if ppr is not None:
            ps = ppr.find(W + "pStyle")
            if ps is not None:
                style = ps.get(W + "val", "")
        m = re.match(r"(?i)heading\s*(\d+)", style)
        if m:
            lines.append("#" * min(int(m.group(1)), 6) + " " + txt)
        else:
            lines.append(txt)
    return "\n".join(lines)


def extract_pdf(path):
    fallback = (
        "Read this PDF with the harness Read tool (pages=...) instead — it reads "
        "pages visually and handles scanned/image PDFs."
    )
    try:
        raw = subprocess.run(
            ["pdftotext", "-layout", path, "-"],
            capture_output=True, text=True, check=True,
        ).stdout
    except FileNotFoundError:
        return f"[pdftotext not installed]\n{fallback}"
    except subprocess.CalledProcessError as e:
        return f"[pdftotext failed: {e.stderr.strip()}]\n{fallback}"

    pages = raw.split("\f")
    out = []
    for i, pg in enumerate(pages, 1):
        if i == len(pages) and not pg.strip():
            continue  # trailing empty chunk after final form-feed
        out.append(f"===== PAGE {i} =====\n{pg.rstrip()}")
    text = "\n".join(out)
    if len(re.sub(r"[\s=]|PAGE|\d", "", text)) < 20:
        text += f"\n\n[Warning: little/no extractable text — likely a scanned/image PDF. {fallback}]"
    return text


DISPATCH = {".pptx": extract_pptx, ".docx": extract_docx, ".pdf": extract_pdf}


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("usage: python3 extract.py <file.pptx|.docx|.pdf>")
    ext = os.path.splitext(sys.argv[1])[1].lower()
    fn = DISPATCH.get(ext)
    if not fn:
        sys.exit(f"unsupported extension {ext!r} (supported: {', '.join(DISPATCH)})")
    print(fn(sys.argv[1]))
