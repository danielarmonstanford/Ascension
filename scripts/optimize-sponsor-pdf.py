"""Create the stable, web-optimized 14-page ASCENSION partner PDF."""

from io import BytesIO
from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Ascension presentation design.pdf"
OUTPUT = ROOT / "public" / "downloads" / "ascension-partnership-invitation.pdf"
MAX_SIZE = (1600, 1000)


def optimized_image(image):
    image = image.copy()
    image.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
    stream = BytesIO()
    if "A" in image.getbands() and image.getchannel("A").getextrema()[0] < 255:
        image.save(stream, format="PNG", optimize=True, compress_level=9)
    else:
        if image.mode != "RGB":
            image = image.convert("RGB")
        image.save(stream, format="JPEG", quality=78, optimize=True, progressive=True, subsampling="4:2:0")
    stream.seek(0)
    return Image.open(stream)


reader = PdfReader(SOURCE)
if len(reader.pages) != 15:
    raise RuntimeError(f"Expected 15 source pages, found {len(reader.pages)}")

writer = PdfWriter()
writer.append(reader, pages=(0, 14))

for page in writer.pages:
    for image_file in list(page.images):
        image_file.replace(optimized_image(image_file.image), quality=78)

for page in writer.pages:
    page.compress_content_streams()

writer.add_metadata({
    "/Title": "ASCENSION Partnership Invitation — Founding Edition",
    "/Author": "Daniel A. Stanford",
    "/Subject": "ASCENSION · Da Nang, Vietnam · January 12–26, 2027",
})

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
with OUTPUT.open("wb") as handle:
    writer.write(handle)

result = PdfReader(OUTPUT)
if len(result.pages) != 14:
    raise RuntimeError(f"Expected 14 output pages, found {len(result.pages)}")
page_ten_text = "".join((result.pages[9].extract_text() or "").split()).lower()
if "coverageiscuratededitorial" not in page_ten_text:
    raise RuntimeError("The page-10 editorial disclaimer is missing")

print(f"Created {OUTPUT} ({OUTPUT.stat().st_size / 1024 / 1024:.2f} MB, {len(result.pages)} pages)")
