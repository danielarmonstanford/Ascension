"""Surgically update the Supporting Partner floor in the approved deck."""

from pathlib import Path
import shutil

import fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "downloads" / "ascension-da-nang-2027-partnership-deck.pdf"
TEMP = ROOT / "tmp" / "pdfs" / "ascension-da-nang-2027-partnership-deck.pdf"
OUTPUT = ROOT / "output" / "pdf" / "ascension-da-nang-2027-partnership-deck.pdf"

TEMP.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(SOURCE, TEMP)

document = fitz.open(TEMP)
page = document[12]
matches = page.search_for("$3,500–7,500")
if len(matches) != 1:
    raise RuntimeError(f"Expected one legacy Supporting Partner price, found {len(matches)}")

price = matches[0]
page.add_redact_annot(price + (-0.2, -0.2, 0.2, 0.2), fill=(250 / 255, 247 / 255, 242 / 255))
page.apply_redactions()
page.insert_text(
    fitz.Point(price.x0, 289.5),
    "$2,500–7,500",
    fontname="F27",
    fontsize=8.625,
    color=(41 / 255, 37 / 255, 33 / 255),
)
document.saveIncr()
document.close()

shutil.copy2(TEMP, SOURCE)
shutil.copy2(TEMP, OUTPUT)

result = fitz.open(OUTPUT)
text = result[12].get_text()
if "$2,500–7,500" not in text or "$3,500–7,500" in text:
    raise RuntimeError("The updated price did not validate after reopening")
if len(result) != 14:
    raise RuntimeError(f"Expected 14 pages, found {len(result)}")
print(f"Updated {OUTPUT} ({OUTPUT.stat().st_size / 1024 / 1024:.2f} MB)")
