from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageOps
from pypdf import PdfReader
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
ASSET_ROOT = ROOT / "assets" / "artwork" / "identity-spirituality"
GALLERY_ROOT = ROOT / "assets" / "images" / "exhibition-gallery"
OUTPUT_ROOT = ROOT / "documents" / "artist-application-package"
PDF_ROOT = OUTPUT_ROOT / "pdf"
IMAGE_ROOT = OUTPUT_ROOT / "selected-artworks"

BLUE = HexColor("#173B6C")
BLUE_LIGHT = HexColor("#EAF0F7")
CHARCOAL = HexColor("#22262A")
MUTED = HexColor("#5F6872")
RULE = HexColor("#CCD5DF")

ARTWORKS = [
    {
        "source": "the-ancestral-being.jpg",
        "filename": "01_Thomas-Ogun_The-Ancestral-Being_2026.jpg",
        "title": "The Ancestral Being",
        "medium": "Digital illustration with augmented reality experience",
        "description": (
            "A figure-led work exploring ancestry and spiritual continuity. The physical image is paired with an "
            "augmented reality experience that extends the encounter through movement."
        ),
    },
    {
        "source": "the-gods-eyes.jpg",
        "filename": "02_Thomas-Ogun_The-Gods-Eyes_2026.jpg",
        "title": "The Gods Eyes",
        "medium": "Digital illustration with augmented reality experience",
        "description": (
            "A symbolic composition concerned with observation, belief and unseen presence. The physical image is "
            "paired with an augmented reality experience."
        ),
    },
    {
        "source": "survival.jpg",
        "filename": "03_Thomas-Ogun_Survival_2026.jpg",
        "title": "Survival",
        "medium": "Physical digital illustration",
        "description": (
            "Wooden comb forms signify personal identity, while a boat and reversed sign hold the memory of Igbo "
            "Landing within the composition."
        ),
    },
    {
        "source": "the-void-of-souls.jpg",
        "filename": "04_Thomas-Ogun_The-Void-of-Souls_2026.jpg",
        "title": "The Void of Souls",
        "medium": "Physical digital illustration",
        "description": (
            "Cowrie-derived orange-gold signs turn ideas of identity, exchange and abundance into a dark radial field."
        ),
    },
    {
        "source": "the-heart-of-war.jpg",
        "filename": "05_Thomas-Ogun_The-Heart-of-War_2026.jpg",
        "title": "The Heart of War",
        "medium": "Physical digital illustration",
        "description": (
            "A symbolic composition within the exhibition's wider inquiry into identity, memory and spiritual presence."
        ),
    },
    {
        "source": "human-spirits.jpg",
        "filename": "06_Thomas-Ogun_Human-Spirits_2026.jpg",
        "title": "Human Spirits",
        "medium": "Physical digital illustration",
        "description": (
            "A group portrait developed through simplified form and symbolic detail, holding individual presence within "
            "a shared field."
        ),
    },
    {
        "source": "guardian-of-dreams.jpg",
        "filename": "07_Thomas-Ogun_Guardian-of-Dreams_2026.jpg",
        "title": "Guardian of Dreams",
        "medium": "Physical digital illustration",
        "description": (
            "A portrait-led study in which facial markings and symbolic form connect personal identity with the unseen."
        ),
    },
    {
        "source": "cultural-identity.jpg",
        "filename": "08_Thomas-Ogun_Cultural-Identity_2026.jpg",
        "title": "Cultural Identity",
        "medium": "Physical digital illustration",
        "description": (
            "A memory archive combining manillas, an Ifa chain, a wooden comb, Nok forms, a brass bell and cowries as "
            "carriers of cultural memory."
        ),
    },
]


def ensure_dirs() -> None:
    PDF_ROOT.mkdir(parents=True, exist_ok=True)
    IMAGE_ROOT.mkdir(parents=True, exist_ok=True)


def qr_drawing(url: str, size: float) -> Drawing:
    widget = QrCodeWidget(url)
    x1, y1, x2, y2 = widget.getBounds()
    width = x2 - x1
    height = y2 - y1
    drawing = Drawing(size, size, transform=[size / width, 0, 0, size / height, 0, 0])
    drawing.add(widget)
    return drawing


def draw_qr(c: canvas.Canvas, url: str, x: float, y: float, size: float) -> None:
    renderPDF.draw(qr_drawing(url, size), c, x, y)


def split_lines(text: str, font: str, size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        test = word if not current else f"{current} {word}"
        if stringWidth(test, font, size) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_text(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    font: str = "Helvetica",
    size: float = 8.8,
    leading: float = 11.2,
    color: Color = CHARCOAL,
) -> float:
    c.setFont(font, size)
    c.setFillColor(color)
    for paragraph in text.split("\n"):
        lines = split_lines(paragraph, font, size, width) or [""]
        for line in lines:
            c.drawString(x, y, line)
            y -= leading
        y -= 1.5
    return y


def draw_section_heading(c: canvas.Canvas, label: str, x: float, y: float, width: float) -> float:
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 8.3)
    c.drawString(x, y, label.upper())
    c.setStrokeColor(RULE)
    c.setLineWidth(0.6)
    c.line(x, y - 4, x + width, y - 4)
    return y - 16


def draw_entry(
    c: canvas.Canvas,
    title: str,
    detail: str,
    x: float,
    y: float,
    width: float,
    *,
    compact: bool = False,
) -> float:
    title_size = 8.8 if compact else 9.2
    body_size = 8.0 if compact else 8.3
    c.setFillColor(CHARCOAL)
    c.setFont("Helvetica-Bold", title_size)
    for line in split_lines(title, "Helvetica-Bold", title_size, width):
        c.drawString(x, y, line)
        y -= 10.6
    y -= 1
    y = draw_text(c, detail, x, y, width, size=body_size, leading=10.2, color=MUTED)
    return y - 3


def draw_link(c: canvas.Canvas, label: str, url: str, x: float, y: float, font_size: float = 7.7) -> float:
    c.setFont("Helvetica", font_size)
    c.setFillColor(BLUE)
    c.drawString(x, y, label)
    width = stringWidth(label, "Helvetica", font_size)
    c.linkURL(url, (x, y - 1, x + width, y + font_size + 1), relative=0)
    return y - 10


def draw_image_contain(
    c: canvas.Canvas,
    path: Path,
    x: float,
    y: float,
    width: float,
    height: float,
) -> None:
    with Image.open(path) as opened:
        image_w, image_h = opened.size
    scale = min(width / image_w, height / image_h)
    draw_w = image_w * scale
    draw_h = image_h * scale
    draw_x = x + (width - draw_w) / 2
    draw_y = y + (height - draw_h) / 2
    c.drawImage(ImageReader(str(path)), draw_x, draw_y, draw_w, draw_h, preserveAspectRatio=True, mask="auto")


def draw_image_cover(
    c: canvas.Canvas,
    path: Path,
    x: float,
    y: float,
    width: float,
    height: float,
    *,
    focus_y: float = 0.5,
) -> None:
    with Image.open(path) as opened:
        image_w, image_h = opened.size
    scale = max(width / image_w, height / image_h)
    draw_w = image_w * scale
    draw_h = image_h * scale
    draw_x = x + (width - draw_w) / 2
    draw_y = y + (height - draw_h) * focus_y
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(ImageReader(str(path)), draw_x, draw_y, draw_w, draw_h, preserveAspectRatio=True, mask="auto")
    c.restoreState()


def draw_portfolio_footer(c: canvas.Canvas, page_number: int, page_count: int) -> None:
    page_w, _ = A4
    margin = 18 * mm
    c.setStrokeColor(RULE)
    c.setLineWidth(0.5)
    c.line(margin, 14 * mm, page_w - margin, 14 * mm)
    c.setFont("Helvetica", 7.4)
    c.setFillColor(MUTED)
    c.drawString(margin, 9.5 * mm, "THOMAS OGUN | SELECTED WORKS | 2026")
    c.drawRightString(page_w - margin, 9.5 * mm, f"{page_number:02d} / {page_count:02d}")


def build_cv() -> Path:
    output = PDF_ROOT / "Thomas-Ogun_Short-Artist-CV.pdf"
    c = canvas.Canvas(str(output), pagesize=A4)
    page_w, page_h = A4
    margin = 25 * mm
    content_w = page_w - 2 * margin

    c.setTitle("Thomas Ogun - Short Artist CV")
    c.setAuthor("Thomas Ogun")
    c.setSubject("Artist CV highlighting exhibitions, collaborations and artist publications")

    c.setFillColor(BLUE)
    c.rect(0, page_h - 8 * mm, page_w, 8 * mm, fill=1, stroke=0)
    y = page_h - margin
    c.setFillColor(CHARCOAL)
    c.setFont("Helvetica-Bold", 26)
    c.drawString(margin, y, "Thomas Ogun")
    y -= 18
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(BLUE)
    c.drawString(margin, y, "NIGERIAN VISUAL ARTIST | INTERDISCIPLINARY PRACTICE")
    y -= 15
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.6)
    contact = "Nigerian visual artist  |  thomasogunvisuals.com  |  contact@thomasogunvisuals.com"
    c.drawString(margin, y, contact)
    c.linkURL("https://thomasogunvisuals.com/", (margin + 54, y - 1, margin + 156, y + 9), relative=0)
    c.linkURL("mailto:contact@thomasogunvisuals.com", (margin + 167, y - 1, margin + 314, y + 9), relative=0)
    y -= 18

    y = draw_section_heading(c, "Profile", margin, y, content_w)
    profile = (
        "Thomas Ogun is an interdisciplinary visual artist exploring identity, spirituality, ancestry and cultural memory "
        "through digital illustration, moving image, sound and augmented reality. His practice connects drawing and symbolic "
        "image-making with immersive media, exhibition development and cross-cultural collaboration."
    )
    y = draw_text(c, profile, margin, y, content_w, size=8.7, leading=11.3)
    y -= 6

    gutter = 9 * mm
    left_w = 283
    right_x = margin + left_w + gutter
    right_w = content_w - left_w - gutter
    left_y = y
    right_y = y

    left_y = draw_section_heading(c, "Selected exhibitions and public presentations", margin, left_y, left_w)
    left_y = draw_entry(
        c,
        "Identity & Spirituality - Self-curated Exhibition | 2026",
        "Artist, curator and project lead. Ten works comprising eight physical digital illustrations and two augmented reality installations, examining ancestry, memory, belief and cultural continuity through image, movement and sound.",
        margin,
        left_y,
        left_w,
    )
    left_y = draw_entry(
        c,
        "Voices Uprising - Burgkino, Vienna, Austria | 2024",
        "Film contribution to a public screening and discussion presented in cooperation with the Centre for Translation Studies, University of Vienna, on 6 March 2024.",
        margin,
        left_y,
        left_w,
    )

    left_y = draw_section_heading(c, "Selected collaborations and projects", margin, left_y, left_w)
    left_y = draw_entry(
        c,
        "OMO by Vorstar - Lagos and Cape Town | 2025",
        "Creative Director, Director/Cinematographer and Editor. Led visual treatment, moving-image production, post-production and campaign rollout for a cross-border music and album campaign.",
        margin,
        left_y,
        left_w,
    )
    left_y = draw_entry(
        c,
        "Aura Manager - artist-built creative platform | 2024-Present",
        "Creative direction, visual system, user experience and product development for a platform that turns early ideas into structured prompts, plans and production materials.",
        margin,
        left_y,
        left_w,
    )
    left_y = draw_entry(
        c,
        "Selected cross-media collaborations | Ongoing",
        "Fuiify Your Soul, album artwork for Adewale Ayuba; Bennywise EPK, cinematography and editing; Study of the Eye, graphite drawing.",
        margin,
        left_y,
        left_w,
    )

    left_y = draw_section_heading(c, "Professional experience", margin, left_y, left_w)
    left_y = draw_entry(
        c,
        "Gayatek Nation and Media | 2019-Present",
        "Freelance Illustrator, Graphic Designer and Digital Artist.",
        margin,
        left_y,
        left_w,
        compact=True,
    )
    left_y = draw_entry(
        c,
        "Novemba 15 | 2022-2025",
        "Cinematographer and Editor for music, performance and artist-led projects.",
        margin,
        left_y,
        left_w,
        compact=True,
    )
    left_y = draw_entry(
        c,
        "Joadre Network | 2020-2024",
        "Cinematographer, Video Producer and Editor for documentary and editorial content.",
        margin,
        left_y,
        left_w,
        compact=True,
    )

    right_y = draw_section_heading(c, "Artist publications and documentation", right_x, right_y, right_w)
    right_y = draw_entry(
        c,
        "Identity & Spirituality: Exhibition Catalogue | 2026",
        "Artist-published digital catalogue with artwork entries, process documentation and curatorial context.",
        right_x,
        right_y,
        right_w,
        compact=True,
    )
    right_y = draw_entry(
        c,
        "Thomas Ogun: Selected Works Portfolio | 2026",
        "Artist-published selected-works document.",
        right_x,
        right_y,
        right_w,
        compact=True,
    )
    right_y = draw_entry(
        c,
        "Thomas Ogun Artist Dossier | 2026",
        "Artist-produced practice and exhibition documentation.",
        right_x,
        right_y,
        right_w,
        compact=True,
    )

    right_y = draw_section_heading(c, "Education and training", right_x, right_y, right_w)
    right_y = draw_entry(
        c,
        "BFA, Graphic Design | 2007-2011",
        "Niger Delta University, Nigeria.",
        right_x,
        right_y,
        right_w,
        compact=True,
    )
    right_y = draw_entry(
        c,
        "Cinematography Masterclass | 2020",
        "The Complete Videography Guide, Udemy. Certificate retained in the artist archive.",
        right_x,
        right_y,
        right_w,
        compact=True,
    )

    right_y = draw_section_heading(c, "Media and methods", right_x, right_y, right_w)
    methods = (
        "Creative Direction, Visual Systems, Digital Illustration, Graphite Drawing, Moving Image, Cinematography, "
        "Video Editing, Sound Design, Augmented Reality, Interactive Media, Exhibition Development, Project Development"
    )
    right_y = draw_text(c, methods, right_x, right_y, right_w, size=8.1, leading=10.5, color=MUTED)
    right_y -= 7

    right_y = draw_section_heading(c, "Selected links", right_x, right_y, right_w)
    right_y = draw_link(c, "thomasogunvisuals.com", "https://thomasogunvisuals.com/", right_x, right_y, 7.1)
    right_y = draw_link(c, "thomasogunvisuals.com/exhibition.html", "https://thomasogunvisuals.com/exhibition.html", right_x, right_y, 6.4)
    right_y = draw_link(c, "thomasogunvisuals.com/exhibition-catalogue.html", "https://thomasogunvisuals.com/exhibition-catalogue.html", right_x, right_y, 5.7)
    right_y = draw_link(c, "thomasogunvisuals.com/press.html", "https://thomasogunvisuals.com/press.html", right_x, right_y, 6.7)

    footer_y = 20 * mm
    c.setStrokeColor(RULE)
    c.setLineWidth(0.6)
    c.line(margin, footer_y + 18, page_w - margin, footer_y + 18)
    c.setFont("Helvetica", 7.7)
    c.setFillColor(MUTED)
    c.drawString(margin, footer_y + 4, "Short artist CV | Prepared from documented brand and exhibition resources | 2026")
    qr_size = 17 * mm
    draw_qr(c, "https://thomasogunvisuals.com/exhibition.html", page_w - margin - qr_size, footer_y - 1, qr_size)
    c.linkURL(
        "https://thomasogunvisuals.com/exhibition.html",
        (page_w - margin - qr_size, footer_y - 1, page_w - margin, footer_y - 1 + qr_size),
        relative=0,
    )
    c.save()
    return output


def build_statement() -> Path:
    output = PDF_ROOT / "Thomas-Ogun_One-Page-Artist-Statement.pdf"
    c = canvas.Canvas(str(output), pagesize=A4)
    page_w, page_h = A4
    margin = 27 * mm
    content_w = page_w - 2 * margin

    c.setTitle("Thomas Ogun - Artist Statement")
    c.setAuthor("Thomas Ogun")
    c.setSubject("One-page artist statement")

    c.setFillColor(BLUE)
    c.rect(0, page_h - 52 * mm, page_w, 52 * mm, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(margin, page_h - 22 * mm, "THOMAS OGUN | ARTIST STATEMENT")
    c.setFont("Helvetica-Bold", 25)
    c.drawString(margin, page_h - 35 * mm, "Memory carried across image,")
    c.drawString(margin, page_h - 46 * mm, "sound and space.")

    y = page_h - 68 * mm
    body_style = ParagraphStyle(
        "statement",
        fontName="Helvetica",
        fontSize=10.6,
        leading=15.2,
        textColor=CHARCOAL,
        alignment=TA_LEFT,
        spaceAfter=11,
    )
    paragraphs = [
        (
            "My practice explores how identity is carried through memory, ancestry, spirituality and contemporary African experience. "
            "I begin with research, drawing and repeated pattern studies. These stages allow objects, histories and personal observations "
            "to become a visual language before they enter a finished composition."
        ),
        (
            "In <i>The Void of Souls</i>, the cowrie becomes an orange-gold sign within a dark radial field. I use its documented associations "
            "with identity, exchange and abundance to consider what a person carries between material life and spiritual memory. "
            "In <i>Survival</i>, the wooden comb represents personal identity, while the boat and reversed symbol hold the history of Igbo Landing. "
            "<i>Cultural Identity</i> expands this approach into a memory archive in which manillas, an Ifa chain, a wooden comb, Nok forms, "
            "a brass bell and cowries act as different carriers of cultural memory."
        ),
        (
            "Drawing remains the point where research passes through the hand. Curves, spirals, grids and symbolic fragments are tested, "
            "repeated and revised until they form a coherent visual system. I then translate selected studies through colour, digital illustration, "
            "moving image, sound and augmented reality. Technology extends the encounter with the work, but it does not replace the physical image."
        ),
        (
            "Across exhibitions, film and collaborative projects, I am interested in how images can hold memory without fixing it into a single meaning. "
            "The work invites viewers to move between personal reflection and shared history, and to consider how cultural knowledge survives through "
            "objects, gesture, repetition and presence. Ultimately, my work invites viewers to reconsider how memory, identity and spirituality "
            "continue to shape contemporary African experience."
        ),
    ]
    for text in paragraphs:
        p = Paragraph(text, body_style)
        _, h = p.wrap(content_w, page_h)
        p.drawOn(c, margin, y - h)
        y -= h + 7

    footer_y = 22 * mm
    c.setStrokeColor(RULE)
    c.setLineWidth(0.6)
    c.line(margin, footer_y + 20, page_w - margin, footer_y + 20)
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(margin, footer_y + 7, "DIGITAL ILLUSTRATION | MOVING IMAGE | SOUND | AUGMENTED REALITY")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    website = "thomasogunvisuals.com"
    email = "contact@thomasogunvisuals.com"
    c.drawString(margin, footer_y - 5, f"{website}  |  {email}")
    c.linkURL("https://thomasogunvisuals.com/", (margin, footer_y - 7, margin + 91, footer_y + 3), relative=0)
    c.linkURL("mailto:contact@thomasogunvisuals.com", (margin + 101, footer_y - 7, margin + 250, footer_y + 3), relative=0)
    qr_size = 18 * mm
    draw_qr(c, "https://thomasogunvisuals.com/exhibition.html", page_w - margin - qr_size, footer_y - 8, qr_size)
    c.linkURL(
        "https://thomasogunvisuals.com/exhibition.html",
        (page_w - margin - qr_size, footer_y - 8, page_w - margin, footer_y - 8 + qr_size),
        relative=0,
    )
    c.save()
    return output


def build_portfolio(images: list[Path]) -> Path:
    output = PDF_ROOT / "Thomas-Ogun_Gallery-Portfolio.pdf"
    c = canvas.Canvas(str(output), pagesize=A4)
    page_w, page_h = A4
    margin = 18 * mm
    content_w = page_w - 2 * margin
    page_count = 13

    c.setTitle("Thomas Ogun - Gallery Portfolio")
    c.setAuthor("Thomas Ogun")
    c.setSubject("Selected works, artist statement and exhibition documentation")

    # 01 | Cover
    cover_image = ASSET_ROOT / "the-void-of-souls.jpg"
    draw_image_cover(c, cover_image, 0, page_h * 0.39, page_w, page_h * 0.61, focus_y=0.48)
    c.setFillColor(BLUE)
    c.rect(0, 0, page_w, page_h * 0.39, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 31)
    c.drawString(margin, page_h * 0.29, "Thomas Ogun")
    c.setFont("Helvetica-Bold", 15)
    c.drawString(margin, page_h * 0.23, "SELECTED WORKS | 2026")
    c.setFont("Helvetica", 11)
    c.drawString(margin, page_h * 0.18, "Nigerian visual artist")
    c.setFont("Helvetica", 9.2)
    c.drawString(margin, page_h * 0.09, "Identity, memory and spirituality across image, sound and immersive media")
    c.setFont("Helvetica", 8.5)
    c.drawString(margin, page_h * 0.055, "thomasogunvisuals.com  |  contact@thomasogunvisuals.com")
    c.linkURL("https://thomasogunvisuals.com/", (margin, page_h * 0.05, margin + 101, page_h * 0.07), relative=0)
    c.linkURL("mailto:contact@thomasogunvisuals.com", (margin + 112, page_h * 0.05, margin + 267, page_h * 0.07), relative=0)
    c.showPage()

    # 02 | Biography
    draw_portfolio_footer(c, 2, page_count)
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(margin, page_h - 23 * mm, "BIOGRAPHY")
    c.setFillColor(CHARCOAL)
    c.setFont("Helvetica-Bold", 25)
    c.drawString(margin, page_h - 38 * mm, "An interdisciplinary practice")
    c.drawString(margin, page_h - 49 * mm, "grounded in visual art.")
    body_x = margin
    body_y = page_h - 67 * mm
    text_w = 81 * mm
    bio = (
        "Thomas Ogun is a Nigerian visual artist whose practice explores identity, spirituality, ancestry and cultural memory. "
        "Working through drawing, digital illustration, moving image, sound and augmented reality, he develops visual systems in which "
        "repeated forms and symbolic objects carry personal and shared histories."
        "\n\nHis self-curated independent exhibition, Identity & Spirituality (2026), brings together eight physical digital illustrations and "
        "two augmented reality installations. His wider practice includes film presented at Burgkino in Vienna, cross-border creative direction "
        "between Lagos and Cape Town, and the artist-built Aura Manager platform."
    )
    draw_text(c, bio, body_x, body_y, text_w, size=10.1, leading=14.3)
    portrait = GALLERY_ROOT / "artboard-22.webp"
    draw_image_cover(c, portrait, page_w - margin - 78 * mm, 32 * mm, 78 * mm, 151 * mm, focus_y=0.5)
    c.setFont("Helvetica", 7.5)
    c.setFillColor(MUTED)
    c.drawString(page_w - margin - 78 * mm, 27.5 * mm, "Thomas Ogun during Identity & Spirituality, 2026")
    c.showPage()

    # 03 | Artist statement
    draw_portfolio_footer(c, 3, page_count)
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(margin, page_h - 23 * mm, "ARTIST STATEMENT")
    c.setFillColor(CHARCOAL)
    c.setFont("Helvetica-Bold", 26)
    c.drawString(margin, page_h - 38 * mm, "Memory carried across")
    c.drawString(margin, page_h - 49 * mm, "image, sound and space.")
    statement_text = (
        "My practice explores how identity is carried through memory, ancestry, spirituality and contemporary African experience. I begin with "
        "research, drawing and repeated pattern studies so that objects, histories and personal observations can develop into a visual language."
        "\n\nIn The Void of Souls, the cowrie becomes an orange-gold sign within a dark radial field. Survival joins the wooden comb, a sign of personal "
        "identity, with the boat and reversed symbol that hold the history of Igbo Landing. Cultural Identity expands this method into a memory archive "
        "of manillas, an Ifa chain, a wooden comb, Nok forms, a brass bell and cowries."
        "\n\nDrawing is where research passes through the hand. Curves, spirals, grids and symbolic fragments are tested until a coherent system forms, then "
        "translated through colour, digital illustration, moving image, sound and augmented reality. Technology extends the encounter without replacing "
        "the physical image. Ultimately, my work invites viewers to reconsider how memory, identity and spirituality continue to shape contemporary "
        "African experience."
    )
    draw_text(c, statement_text, margin, page_h - 68 * mm, content_w, size=10.5, leading=15.2)
    c.setStrokeColor(BLUE)
    c.setLineWidth(2.2)
    c.line(margin, 37 * mm, page_w - margin, 37 * mm)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(margin, 29 * mm, "Digital illustration | Moving image | Sound | Augmented reality")
    c.showPage()

    # 04-11 | Selected artworks
    for page_number, (artwork, image_path) in enumerate(zip(ARTWORKS, images), start=4):
        draw_portfolio_footer(c, page_number, page_count)
        image_box_y = 99 * mm
        image_box_h = 174 * mm
        draw_image_contain(c, image_path, margin, image_box_y, content_w, image_box_h)
        text_y = 89 * mm
        c.setFillColor(BLUE)
        c.setFont("Helvetica-Bold", 8.3)
        c.drawString(margin, text_y, f"{page_number - 3:02d} | IDENTITY & SPIRITUALITY")
        c.setFillColor(CHARCOAL)
        c.setFont("Helvetica-Bold", 19)
        c.drawString(margin, text_y - 16, artwork["title"])
        meta = f"2026 | {artwork['medium']} | 30.5 x 30.5 cm (12 x 12 in), matte-framed print"
        meta_y = text_y - 32
        meta_y = draw_text(c, meta, margin, meta_y, content_w, size=8.5, leading=10.5, color=MUTED)
        description_y = draw_text(c, artwork["description"], margin, meta_y - 2, content_w, size=9.2, leading=12.2)
        c.setFillColor(BLUE)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(margin, max(description_y - 4, 21 * mm), "EDITION AND AVAILABILITY: ENQUIRE WITH THE STUDIO")
        c.showPage()

    # 12 | Exhibition context
    draw_portfolio_footer(c, 12, page_count)
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(margin, page_h - 23 * mm, "EXHIBITION CONTEXT")
    c.setFillColor(CHARCOAL)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(margin, page_h - 38 * mm, "Identity & Spirituality")
    c.setFont("Helvetica", 10)
    c.setFillColor(MUTED)
    c.drawString(margin, page_h - 48 * mm, "Self-curated exhibition | 2026")
    context = (
        "The exhibition presents eight physical digital illustrations and two augmented reality installations. Drawing, pattern, sound and image-targeted "
        "AR are brought together around ancestry, memory, belief and cultural continuity. The photographs below document the artist's own exhibition setting, "
        "framed works, interpretation material and visitor encounters."
    )
    draw_text(c, context, margin, page_h - 59 * mm, content_w, size=9.6, leading=13.2)
    gap = 4 * mm
    image_w = (content_w - 2 * gap) / 3
    gallery_images = [
        (GALLERY_ROOT / "artboard-02.webp", "Installation wall"),
        (GALLERY_ROOT / "exhibition-interpretation-2026.jpeg", "Exhibition interpretation"),
        (GALLERY_ROOT / "artboard-17.webp", "Visitor encounter"),
    ]
    for index, (path, caption) in enumerate(gallery_images):
        x = margin + index * (image_w + gap)
        draw_image_cover(c, path, x, 42 * mm, image_w, 122 * mm, focus_y=0.5)
        c.setFont("Helvetica", 7.4)
        c.setFillColor(MUTED)
        c.drawString(x, 37 * mm, caption)
    c.showPage()

    # 13 | Contact
    c.setFillColor(BLUE)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(margin, page_h - 28 * mm, "CONTACT")
    c.setFont("Helvetica-Bold", 30)
    c.drawString(margin, page_h - 49 * mm, "Thomas Ogun")
    c.setFont("Helvetica", 12)
    c.drawString(margin, page_h - 61 * mm, "Nigerian visual artist")
    links = [
        ("Website", "https://thomasogunvisuals.com/", "thomasogunvisuals.com"),
        ("Email", "mailto:contact@thomasogunvisuals.com", "contact@thomasogunvisuals.com"),
        ("Exhibition", "https://thomasogunvisuals.com/exhibition.html", "thomasogunvisuals.com/exhibition.html"),
        ("Catalogue", "https://thomasogunvisuals.com/exhibition-catalogue.html", "thomasogunvisuals.com/exhibition-catalogue.html"),
    ]
    y = page_h - 91 * mm
    for label, url, display in links:
        c.setFont("Helvetica-Bold", 8.3)
        c.setFillColor(BLUE_LIGHT)
        c.drawString(margin, y, label.upper())
        c.setFont("Helvetica", 11)
        c.setFillColor(white)
        c.drawString(margin, y - 16, display)
        c.linkURL(url, (margin, y - 19, margin + stringWidth(display, "Helvetica", 11), y - 3), relative=0)
        y -= 35
    qr_size = 39 * mm
    qr_x = page_w - margin - qr_size
    qr_y = page_h - 137 * mm
    c.setFillColor(white)
    c.roundRect(qr_x - 5, qr_y - 5, qr_size + 10, qr_size + 10, 4, fill=1, stroke=0)
    draw_qr(c, "https://thomasogunvisuals.com/exhibition.html", qr_x, qr_y, qr_size)
    c.linkURL("https://thomasogunvisuals.com/exhibition.html", (qr_x, qr_y, qr_x + qr_size, qr_y + qr_size), relative=0)
    c.setFont("Helvetica", 8)
    c.setFillColor(BLUE_LIGHT)
    c.drawRightString(page_w - margin, qr_y - 12, "View exhibition")
    c.setFont("Helvetica", 8)
    c.drawString(margin, 18 * mm, "Selected works portfolio | Prepared from documented artist and exhibition resources | 2026")
    c.save()
    return output


def optimize_artworks() -> list[Path]:
    for old in IMAGE_ROOT.glob("*.jpg"):
        old.unlink()
    results: list[Path] = []
    max_bytes = 2 * 1024 * 1024
    for artwork in ARTWORKS:
        source = ASSET_ROOT / artwork["source"]
        destination = IMAGE_ROOT / artwork["filename"]
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
            quality = 91
            while True:
                image.save(destination, "JPEG", quality=quality, optimize=True, progressive=True, subsampling=0)
                if destination.stat().st_size < max_bytes or quality <= 72:
                    break
                quality -= 4
        if destination.stat().st_size >= max_bytes:
            raise RuntimeError(f"Could not keep {destination.name} below 2 MB")
        results.append(destination)
    return results


def write_manifest(images: list[Path]) -> Path:
    output = OUTPUT_ROOT / "Selected-Artworks-Metadata.txt"
    lines = [
        "THOMAS OGUN - SELECTED ARTWORKS",
        "Identity & Spirituality, 2026",
        "",
        "GALLERY PRESENTATION",
        "Presentation: 30.5 x 30.5 cm (12 x 12 in), matte-framed print",
        "Edition and availability: Enquire with studio",
        "Application files: Colour-managed JPEG previews supplied below 2 MB each",
        "",
    ]
    for number, (artwork, image) in enumerate(zip(ARTWORKS, images), start=1):
        size = image.stat().st_size
        with Image.open(image) as opened:
            dimensions = f"{opened.width} x {opened.height} px"
        lines.extend(
            [
                f"{number:02d}. {artwork['title']}, 2026",
                f"Medium: {artwork['medium']}",
                "Dimensions: 30.5 x 30.5 cm (12 x 12 in)",
                "Presentation: Matte-framed print",
                "Edition and availability: Enquire with studio",
                f"Application JPEG: {image.name}; {dimensions}; {size / 1024:.0f} KB",
                "",
            ]
        )
    lines.extend(
        [
            "Artist website: https://thomasogunvisuals.com/",
            "Exhibition: https://thomasogunvisuals.com/exhibition.html",
            "Catalogue: https://thomasogunvisuals.com/exhibition-catalogue.html",
            "Contact: contact@thomasogunvisuals.com",
        ]
    )
    output.write_text("\n".join(lines), encoding="utf-8")
    return output


def verify_pdfs(paths: list[tuple[Path, int]]) -> None:
    for path, expected_pages in paths:
        reader = PdfReader(str(path))
        if len(reader.pages) != expected_pages:
            raise RuntimeError(f"{path.name} has {len(reader.pages)} pages, expected {expected_pages}")
        for page_number, page in enumerate(reader.pages, start=1):
            if not (page.extract_text() or "").strip():
                raise RuntimeError(f"{path.name} page {page_number} has no extractable text")


def main() -> None:
    ensure_dirs()
    images = optimize_artworks()
    manifest = write_manifest(images)
    cv = build_cv()
    statement = build_statement()
    portfolio = build_portfolio(images)
    verify_pdfs([(cv, 1), (statement, 1), (portfolio, 13)])
    print(f"Created: {cv}")
    print(f"Created: {statement}")
    print(f"Created: {portfolio}")
    print(f"Created: {manifest}")
    for image in images:
        print(f"Artwork: {image.name} ({image.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
