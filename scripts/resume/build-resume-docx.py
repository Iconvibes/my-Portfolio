#!/usr/bin/env python3
"""
Builds Ferdinard_Ashonibare_Fullstack_Engineer_v2.docx from
scripts/resume/resume-v2.html — stdlib only, no external packages.

The HTML is the single source of truth: this script parses its structure
(header, section headings, entries, bullets, skill/education lines) and emits
a clean WordprocessingML document (Calibri 10.5pt, A4, same layout intent as
the PDF) so the .docx never drifts from the .pdf.

Usage:
  python scripts/resume/build-resume-docx.py                       # defaults
  python scripts/resume/build-resume-docx.py <input.html> <output.docx>
"""
import io
import sys
import zipfile
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
HTML_PATH = ROOT / "scripts" / "resume" / "resume.html"
OUT_PATH = ROOT / "Ferdinard_Ashonibare_Fullstack_Engineer_v2.docx"

ACCENT = "0F4C5C"
DARK = "111111"
GREY = "555555"
BODY = "21"  # 10.5pt in half-points


def esc(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def run_xml(text, bold=False, italic=False, color=None, size=BODY):
    rpr = f'<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>'
    rpr += f"<w:sz w:val=\"{size}\"/><w:szCs w:val=\"{size}\"/>"
    if bold:
        rpr += "<w:b/><w:bCs/>"
    if italic:
        rpr += "<w:i/>"
    if color:
        rpr += f'<w:color w:val="{color}"/>'
    parts = text.split("\n")
    body = ""
    for i, chunk in enumerate(parts):
        if chunk:
            body += f'<w:t xml:space="preserve">{esc(chunk)}</w:t>'
        if i < len(parts) - 1:
            body += "<w:br/>"
    return f"<w:r><w:rPr>{rpr}</w:rPr>{body}</w:r>"


def para_xml(runs, *, align=None, before=0, after=60, indent=None, hanging=None,
             border_bottom=False, right_tab=None):
    ppr = []
    if align:
        ppr.append(f'<w:jc w:val="{align}"/>')
    if right_tab is not None:
        ppr.append(f'<w:tabs><w:tab w:val="right" w:pos="{right_tab}"/></w:tabs>')
    if indent is not None or hanging is not None:
        attrs = ""
        if indent is not None:
            attrs += f' w:left="{indent}"'
        if hanging is not None:
            attrs += f' w:hanging="{hanging}"'
        ppr.append(f"<w:ind{attrs}/>")
    ppr.append(f'<w:spacing w:before="{before}" w:after="{after}" w:line="240" w:lineRule="auto"/>')
    if border_bottom:
        ppr.append(f'<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="2" w:color="{ACCENT}"/></w:pBdr>')
    return f"<w:p><w:pPr>{''.join(ppr)}</w:pPr>{''.join(runs)}</w:p>"


class ResumeParser(HTMLParser):
    """Renders resume-v2.html into a list of WordprocessingML paragraphs."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.paras = []
        self.pending = []  # (text, bold, italic, color, size)
        self.block = None  # h1 | role | contact | h2 | entry | context | li | skill | edu | None
        self.bold = False
        self.italic = False
        self.color = None
        self.size = BODY
        self.after_br = False

    # -- helpers ---------------------------------------------------------
    def flush(self):
        # Drop leading line-breaks/whitespace and trim a trailing whitespace-only run.
        while self.pending and (not self.pending[0][0].strip() or self.pending[0][0] == "\n"):
            self.pending.pop(0)
        if self.pending and not self.pending[-1][0].strip():
            text = self.pending[-1][0].rstrip()
            if text:
                self.pending[-1] = (text,) + self.pending[-1][1:]
            else:
                self.pending.pop()
        if not self.pending:
            return

        runs = [run_xml(text, bold=b, italic=i, color=c, size=s)
                for text, b, i, c, s in self.pending]
        self.pending = []

        block = self.block
        if block == "h1":
            self.paras.append(para_xml(runs, align="center", after=40))
        elif block == "role":
            self.paras.append(para_xml(runs, align="center", before=20, after=20))
        elif block == "contact":
            self.paras.append(para_xml(runs, align="center", after=80))
        elif block == "h2":
            self.paras.append(para_xml(runs, before=140, after=60, border_bottom=True))
        elif block == "entry":
            self.paras.append(para_xml(runs, after=40, right_tab=10432))
        elif block == "context":
            self.paras.append(para_xml(runs, after=30))
        elif block == "li":
            self.paras.append(para_xml(runs, indent=340, hanging=170, after=30))
        else:  # skill / edu / summary body
            self.paras.append(para_xml(runs, after=30))

    def push(self, text, bold=None, italic=None, color=None, size=None):
        self.pending.append((
            text,
            self.bold if bold is None else bold,
            self.italic if italic is None else italic,
            self.color if color is None else color,
            self.size if size is None else size,
        ))

    def br(self):
        self.push("\n")
        self.after_br = True

    # -- parser hooks ----------------------------------------------------
    def handle_starttag(self, tag, attrs):
        cls = dict(attrs).get("class", "")
        if tag == "br":
            self.br()
            return
        if tag == "h1":
            self.flush(); self.block = "h1"; self.bold = True; self.size = "40"
            return
        if tag == "div" and cls == "role":
            self.flush(); self.block = "role"; self.bold = True; self.size = "22"; self.color = ACCENT
            return
        if tag == "div" and cls == "contact":
            self.flush(); self.block = "contact"; self.bold = False; self.size = "19"; self.color = None
            return
        if tag == "h2":
            self.flush(); self.block = "h2"; self.bold = True; self.size = BODY; self.color = ACCENT
            return
        if tag == "div" and cls == "entry-head":
            self.flush(); self.block = "entry"; self.bold = True; self.size = BODY; self.color = DARK
            return
        if tag == "span" and cls == "title":
            self.bold = True; self.color = DARK; self.size = BODY
            return
        if tag == "span" and cls == "dates":
            self.bold = False; self.color = GREY; self.size = "19"
            return
        if tag == "span" and cls == "label":
            self.bold = True; self.color = ACCENT; self.size = BODY
            return
        if tag == "p" and cls == "context":
            self.flush(); self.block = "context"; self.bold = False; self.italic = True; self.color = "444444"; self.size = "20"
            return
        if tag == "li":
            self.flush(); self.block = "li"; self.bold = False; self.italic = False; self.color = None; self.size = BODY
            self.push("\u2022  ", bold=False)
            return
        if tag == "div" and cls == "skill-line":
            self.flush(); self.block = "skill"; self.bold = False; self.size = BODY; self.color = None
            return
        if tag == "div" and cls == "edu-line":
            self.flush(); self.block = "edu"; self.bold = False; self.size = BODY; self.color = None
            return
        # Inline containers (a, span without class, em) and structural tags
        # (p, ul, section, header) do not change block state.

    def handle_endtag(self, tag):
        if tag == "span":
            if self.block == "entry":
                self.bold = True; self.color = DARK; self.size = BODY
            elif self.block in ("skill", "edu"):
                self.bold = False; self.color = None; self.size = BODY
            return
        if tag == "h1" and self.block == "h1":
            self.flush(); self.block = None
        elif tag == "div" and self.block in ("role", "contact", "entry", "skill", "edu"):
            self.flush(); self.block = None
        elif tag == "h2" and self.block == "h2":
            self.flush(); self.block = None
        elif tag == "p" and self.block == "context":
            self.flush(); self.block = None
        elif tag == "li" and self.block == "li":
            self.flush(); self.block = None

    def handle_data(self, data):
        if not data:
            return
        if not data.strip():
            # Whitespace-only node: meaningful only between inline runs.
            if self.pending and self.block is not None:
                self.push(data)
            return
        text = data.lstrip() if self.after_br else data
        self.after_br = False
        self.push(text)


def build_docx(html_text: str) -> bytes:
    parser = ResumeParser()
    parser.feed(html_text)
    parser.flush()

    body = "".join(parser.paras)
    document = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        "<w:body>"
        + body
        + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
        '<w:pgMar w:top="623" w:right="737" w:bottom="623" w:left="737" '
        'w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>'
        "</w:body></w:document>"
    )

    content_types = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/word/document.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
        '<Override PartName="/docProps/core.xml" '
        'ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
        '<Override PartName="/docProps/app.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>'
        "</Types>"
    )
    root_rels = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
        'Target="word/document.xml"/>'
        '<Relationship Id="rId2" '
        'Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" '
        'Target="docProps/core.xml"/>'
        '<Relationship Id="rId3" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" '
        'Target="docProps/app.xml"/>'
        "</Relationships>"
    )
    core_props = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<cp:coreProperties '
        'xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:dcterms="http://purl.org/dc/terms/" '
        'xmlns:dcmitype="http://purl.org/dc/dcmitype/" '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        "<dc:title>Ferdinard Ashonibare — Fullstack Engineer &amp; SaaS Builder</dc:title>"
        "<dc:creator>Ferdinard Ashonibare</dc:creator>"
        "<cp:lastModifiedBy>Ferdinard Ashonibare</cp:lastModifiedBy>"
        "</cp:coreProperties>"
    )
    app_props = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">'
        "<Application>Microsoft Office Word</Application>"
        "</Properties>"
    )

    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", root_rels)
        zf.writestr("word/document.xml", document)
        zf.writestr("docProps/core.xml", core_props)
        zf.writestr("docProps/app.xml", app_props)
    return buffer.getvalue()


def main():
    html_path = Path(sys.argv[1]) if len(sys.argv) > 1 else HTML_PATH
    out_path = Path(sys.argv[2]) if len(sys.argv) > 2 else OUT_PATH
    if not html_path.is_absolute():
        html_path = ROOT / html_path
    if not out_path.is_absolute():
        out_path = ROOT / out_path

    data = build_docx(html_path.read_text(encoding="utf-8"))
    out_path.write_bytes(data)
    print(f"OK: {out_path} ({len(data) / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
