"""Generate committed Letter/A4 PDFs from unchanged catalog grids and placements.

Run with the bundled Python runtime (reportlab, pypdf, pypdfium2).
The PDFs are static assets: generation never runs inside the Worker.
"""
import json
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, letter
from pypdf import PdfReader
import pypdfium2 as pdfium
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "printables"
OUT.mkdir(parents=True, exist_ok=True)
PACKS = json.loads((ROOT / "data/printables.json").read_text())
QA = ROOT / "tmp/pdfs"
QA.mkdir(parents=True, exist_ok=True)
thumbs = []
DIRECTIONS = {"E": (0, 1), "S": (1, 0), "SE": (1, 1), "NE": (-1, 1), "W": (0, -1), "N": (-1, 0), "NW": (-1, -1), "SW": (1, -1)}

def page(c, pack, puzzle, number, solution, size):
    width, height = size
    title = pack["name"]
    c.setFillColorRGB(0, 0, 0)
    c.setFont("Helvetica", 12)
    c.drawString(48, height - 42, "WORDS AT REST  /  FREE PRINTABLE WORD SEARCH")
    c.setFont("Helvetica-Bold", 23)
    c.drawString(48, height - 80, title)
    c.setFont("Helvetica", 15)
    c.drawString(48, height - 107, f"Puzzle {number}" + (" - Answer key" if solution else " - Find all eight words"))
    c.setFont("Helvetica", 13)
    c.drawString(48, height - 130, "Words read left to right or top to bottom. No diagonals or backwards words.")
    cell = 35
    n = puzzle["gridSize"]
    left = (width - n * cell) / 2
    top = height - 157
    if solution:
        for p in puzzle["placements"]:
            dr, dc = DIRECTIONS[p["direction"]]
            actual = "".join(puzzle["grid"][p["row"] + dr * i][p["col"] + dc * i] for i in range(len(p["word"])))
            assert actual == p["word"], (puzzle["id"], p["word"])
            x1, y1 = left + (p["col"] + .5) * cell, top - (p["row"] + .5) * cell
            x2, y2 = x1 + dc * (len(p["word"]) - 1) * cell, y1 - dr * (len(p["word"]) - 1) * cell
            c.setStrokeColorRGB(.75, .75, .75)
            c.setLineWidth(21)
            c.setLineCap(1)
            c.line(x1, y1, x2, y2)
    c.setStrokeColorRGB(.75, .75, .75)
    c.setLineWidth(.35)
    for i in range(n + 1):
        c.line(left + i * cell, top, left + i * cell, top - n * cell)
        c.line(left, top - i * cell, left + n * cell, top - i * cell)
    c.setFillColorRGB(0, 0, 0)
    c.setFont("Helvetica-Bold", 24)
    for row, letters in enumerate(puzzle["grid"]):
        for col, value in enumerate(letters):
            c.drawCentredString(left + (col + .5) * cell, top - (row + .5) * cell - 8, value)
    list_top = top - n * cell - 35
    c.setFont("Helvetica-Bold", 15)
    c.drawString(72, list_top, "WORDS TO FIND")
    c.setFont("Helvetica", 18)
    for i, word in enumerate(puzzle["words"]):
        c.drawString(72 + (i // 4) * (width / 2 - 40), list_top - 30 - (i % 4) * 28, word)
    c.setFont("Helvetica", 11)
    c.drawString(48, 62, "Free for personal, classroom and community activity use. Keep this credit when sharing.")
    c.drawString(48, 44, f"wordsatrest.com/printables/{pack['slug']}  |  " + ("Answer key" if solution else "Puzzle sheet"))
    c.showPage()

for pack in PACKS:
    for fmt, size in [("letter", letter), ("a4", A4)]:
        target = OUT / f"{pack['slug']}-{fmt}.pdf"
        c = canvas.Canvas(str(target), pagesize=size, invariant=1, pageCompression=1)
        c.setTitle(f"{pack['name']} Word Search - {fmt.upper()} - Words at Rest")
        c.setAuthor("Words at Rest")
        for i, id_ in enumerate(pack["ids"], 1):
            puzzle = json.loads((ROOT / "data/puzzles" / f"{id_}.json").read_text())
            assert puzzle["largePrint"] and puzzle["gridSize"] == 9
            page(c, pack, puzzle, i, False, size)
            page(c, pack, puzzle, i, True, size)
        c.save()
        reader = PdfReader(target)
        assert len(reader.pages) == 4
        assert all("WORDS TO FIND" in p.extract_text() for p in reader.pages)
        doc = pdfium.PdfDocument(str(target))
        for page_index in range(len(doc)):
            image = doc[page_index].render(scale=1.25).to_pil().convert("RGB")
            image.save(QA / f"{pack['slug']}-{fmt}-{page_index + 1}.png")
            if fmt == "letter" and page_index in (0, 2):
                image.resize((612, 792)).save(OUT / f"{pack['slug']}-{page_index // 2 + 1}.png")
            tile = Image.new("RGB", (310, 430), "#dddddd")
            preview = ImageOps.contain(image, (290, 390))
            tile.paste(preview, ((310-preview.width)//2, 25))
            ImageDraw.Draw(tile).text((8, 6), f"{pack['slug']} {fmt} p{page_index+1}", fill="black")
            thumbs.append(tile)
        doc.close()
        print(target.name, len(reader.pages), "pages", target.stat().st_size, "bytes")
sheet = Image.new("RGB", (310 * 4, 430 * 8), "white")
for i, tile in enumerate(thumbs):
    sheet.paste(tile, ((i % 4) * 310, (i // 4) * 430))
sheet.save(QA / "all-pages.png")
