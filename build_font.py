"""
Build script: dist/alfa-icons.woff2 + dist/alfa-icons.css
Web Fonts + CSS approach (seperti FontAwesome).

Usage:
    python3 build_font.py

Cara embed:
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DavinIntern/assets-library-website@VERSION/dist/alfa-icons.css">
    <i class="alfa mdi-check"></i>
"""

import os
import re

ICONS_DIR = "static/assets/Icons"
OUT_DIR = "dist"
FONT_NAME = "AlfaIcons"
CSS_PREFIX = "alfa"
PUA_START = 0xE000  # Unicode Private Use Area
UPM = 1000
ASCENT = 800
DESCENT = -200


def clean_svg(content):
    content = re.sub(r'<\?xml[^?]*\?>', '', content)
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    return re.sub(r'\s+', ' ', content).strip()


def extract_viewbox(svg):
    m = re.search(r'viewBox=["\']([^"\']+)["\']', svg)
    if m:
        parts = m.group(1).split()
        if len(parts) == 4:
            return [float(x) for x in parts]
    return [0, 0, 24, 24]


def extract_paths(svg):
    return re.findall(r'<path[^>]+\bd=["\']([^"\']+)["\']', svg)


def tokenize_path(d):
    return re.findall(
        r'[MmLlHhVvCcSsQqTtAaZz]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?',
        d
    )


def svg_path_to_glyph(paths, viewBox):
    """Parse SVG paths dan return TTGlyphPen glyph."""
    from fontTools.pens.ttGlyphPen import TTGlyphPen
    from fontTools.pens.pointPen import SegmentToPointPen

    vb_x, vb_y, vb_w, vb_h = viewBox
    scale = UPM / max(vb_w, vb_h)

    def tx(x): return round((x - vb_x) * scale)
    def ty(y): return round(ASCENT - (y - vb_y) * scale)

    pen = TTGlyphPen(None)
    has_contour = False

    for d in paths:
        tokens = tokenize_path(d)
        idx = 0
        cmd = None
        cur = [0, 0]
        start = [0, 0]
        contour = []   # list of (type, point)
        # type: 'move', 'line', 'curve', 'qcurve'

        def read(n):
            nonlocal idx
            vals = []
            while len(vals) < n and idx < len(tokens):
                if tokens[idx] in 'MmLlHhVvCcSsQqTtAaZz':
                    break
                vals.append(float(tokens[idx]))
                idx += 1
            return vals

        def flush_contour():
            nonlocal has_contour
            if len(contour) < 2:
                contour.clear()
                return
            # draw ke pen
            # find first move
            start_pt = contour[0][1]
            pen.moveTo(start_pt)
            for t, pt in contour[1:]:
                if t == 'line':
                    pen.lineTo(pt)
                elif t == 'curve':
                    pen.curveTo(*pt)
                elif t == 'qcurve':
                    pen.qCurveTo(*pt)
            pen.closePath()
            contour.clear()
            has_contour = True

        try:
            while idx < len(tokens):
                t = tokens[idx]
                if t in 'MmLlHhVvCcSsQqTtAaZz':
                    cmd = t
                    idx += 1

                if cmd == 'M':
                    v = read(2)
                    if len(v) < 2: break
                    if contour: flush_contour()
                    cur = [tx(v[0]), ty(v[1])]
                    start = cur[:]
                    contour.append(('move', tuple(cur)))
                    cmd = 'L'

                elif cmd == 'm':
                    v = read(2)
                    if len(v) < 2: break
                    if contour: flush_contour()
                    cur = [cur[0]+round(v[0]*scale), cur[1]-round(v[1]*scale)]
                    start = cur[:]
                    contour.append(('move', tuple(cur)))
                    cmd = 'l'

                elif cmd == 'L':
                    v = read(2)
                    if len(v) < 2: break
                    cur = [tx(v[0]), ty(v[1])]
                    contour.append(('line', tuple(cur)))

                elif cmd == 'l':
                    v = read(2)
                    if len(v) < 2: break
                    cur = [cur[0]+round(v[0]*scale), cur[1]-round(v[1]*scale)]
                    contour.append(('line', tuple(cur)))

                elif cmd == 'H':
                    v = read(1)
                    if not v: break
                    cur[0] = tx(v[0])
                    contour.append(('line', tuple(cur)))

                elif cmd == 'h':
                    v = read(1)
                    if not v: break
                    cur[0] += round(v[0]*scale)
                    contour.append(('line', tuple(cur)))

                elif cmd == 'V':
                    v = read(1)
                    if not v: break
                    cur[1] = ty(v[0])
                    contour.append(('line', tuple(cur)))

                elif cmd == 'v':
                    v = read(1)
                    if not v: break
                    cur[1] -= round(v[0]*scale)
                    contour.append(('line', tuple(cur)))

                elif cmd == 'C':
                    v = read(6)
                    if len(v) < 6: break
                    p1 = (tx(v[0]), ty(v[1]))
                    p2 = (tx(v[2]), ty(v[3]))
                    cur = [tx(v[4]), ty(v[5])]
                    contour.append(('curve', (p1, p2, tuple(cur))))

                elif cmd == 'c':
                    v = read(6)
                    if len(v) < 6: break
                    p1 = (cur[0]+round(v[0]*scale), cur[1]-round(v[1]*scale))
                    p2 = (cur[0]+round(v[2]*scale), cur[1]-round(v[3]*scale))
                    cur = [cur[0]+round(v[4]*scale), cur[1]-round(v[5]*scale)]
                    contour.append(('curve', (p1, p2, tuple(cur))))

                elif cmd == 'S':
                    v = read(4)
                    if len(v) < 4: break
                    p2 = (tx(v[0]), ty(v[1]))
                    cur = [tx(v[2]), ty(v[3])]
                    contour.append(('curve', (p2, p2, tuple(cur))))

                elif cmd == 's':
                    v = read(4)
                    if len(v) < 4: break
                    p2 = (cur[0]+round(v[0]*scale), cur[1]-round(v[1]*scale))
                    cur = [cur[0]+round(v[2]*scale), cur[1]-round(v[3]*scale)]
                    contour.append(('curve', (p2, p2, tuple(cur))))

                elif cmd == 'Q':
                    v = read(4)
                    if len(v) < 4: break
                    p1 = (tx(v[0]), ty(v[1]))
                    cur = [tx(v[2]), ty(v[3])]
                    contour.append(('qcurve', (p1, tuple(cur))))

                elif cmd == 'q':
                    v = read(4)
                    if len(v) < 4: break
                    p1 = (cur[0]+round(v[0]*scale), cur[1]-round(v[1]*scale))
                    cur = [cur[0]+round(v[2]*scale), cur[1]-round(v[3]*scale)]
                    contour.append(('qcurve', (p1, tuple(cur))))

                elif cmd in ('T', 't'):
                    v = read(2)
                    if len(v) < 2: break
                    if cmd == 'T':
                        cur = [tx(v[0]), ty(v[1])]
                    else:
                        cur = [cur[0]+round(v[0]*scale), cur[1]-round(v[1]*scale)]
                    contour.append(('line', tuple(cur)))

                elif cmd in ('A', 'a'):
                    v = read(7)
                    if len(v) < 7: break
                    if cmd == 'A':
                        cur = [tx(v[5]), ty(v[6])]
                    else:
                        cur = [cur[0]+round(v[5]*scale), cur[1]-round(v[6]*scale)]
                    contour.append(('line', tuple(cur)))

                elif cmd in ('Z', 'z'):
                    flush_contour()
                    cur = start[:]

                else:
                    idx += 1

            if contour:
                flush_contour()

        except Exception:
            if contour:
                try: flush_contour()
                except Exception: pass

    if not has_contour:
        return None

    try:
        return pen.glyph()
    except Exception:
        return None


def build():
    from fontTools.fontBuilder import FontBuilder
    from fontTools.ttLib import TTFont
    from fontTools.ttLib.tables import _g_l_y_f
    from fontTools.pens.ttGlyphPen import TTGlyphPen

    os.makedirs(OUT_DIR, exist_ok=True)

    # Load icons
    icons = {}
    for filename in sorted(os.listdir(ICONS_DIR)):
        if not filename.endswith(".svg"):
            continue
        name = filename[:-4]
        with open(os.path.join(ICONS_DIR, filename), "r", encoding="utf-8") as f:
            content = clean_svg(f.read())
        paths = extract_paths(content)
        vb = extract_viewbox(content)
        if paths:
            icons[name] = {"paths": paths, "viewBox": vb}

    print(f"  Processing {len(icons)} icons...")

    icon_names = list(icons.keys())
    all_glyphs = [".notdef"] + icon_names

    fb = FontBuilder(UPM, isTTF=True)
    fb.setupGlyphOrder(all_glyphs)
    fb.setupCharacterMap({PUA_START + i: name for i, name in enumerate(icon_names)})

    # Build glyph table
    glyf_table = _g_l_y_f.table__g_l_y_f()
    glyf_table.glyphOrder = all_glyphs
    glyf_table.glyphs = {}

    # .notdef: empty box
    pen = TTGlyphPen(None)
    pen.moveTo((100, DESCENT))
    pen.lineTo((900, DESCENT))
    pen.lineTo((900, ASCENT))
    pen.lineTo((100, ASCENT))
    pen.closePath()
    try:
        glyf_table.glyphs[".notdef"] = pen.glyph()
    except Exception:
        pass

    metrics = {".notdef": (UPM, 0)}
    ok = 0
    for i, (name, data) in enumerate(icons.items()):
        glyph = svg_path_to_glyph(data["paths"], data["viewBox"])
        if glyph:
            glyf_table.glyphs[name] = glyph
            ok += 1
        metrics[name] = (UPM, 0)

    print(f"  Converted {ok}/{len(icons)} glyphs successfully")

    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=ASCENT, descent=DESCENT)
    fb.setupNameTable({"familyName": FONT_NAME, "styleName": "Regular"})
    fb.setupOS2(
        sTypoAscender=ASCENT, sTypoDescender=DESCENT, sTypoLineGap=0,
        usWinAscent=ASCENT, usWinDescent=abs(DESCENT),
        fsType=0, achVendID="ALFA", fsSelection=0x40
    )
    fb.setupPost()
    fb.setupHead(unitsPerEm=UPM)

    # Convert cubic → quadratic supaya browser-compatible (glyphDataFormat=0)
    from cu2qu.pens import Cu2QuPen
    from fontTools.pens.ttGlyphPen import TTGlyphPen

    converted = {}
    for name, glyph in glyf_table.glyphs.items():
        if glyph is None:
            continue
        try:
            q_pen = TTGlyphPen(None)
            cu_pen = Cu2QuPen(q_pen, max_err=1.0, reverse_direction=False)
            glyph.draw(cu_pen, glyf_table)
            converted[name] = q_pen.glyph()
        except Exception:
            converted[name] = glyph  # fallback: pakai original

    fb.setupGlyf(converted)

    # Save TTF (loca ter-generate otomatis), lalu convert ke woff2
    ttf_path = os.path.join(OUT_DIR, "alfa-icons.ttf")
    fb.font.save(ttf_path)

    font2 = TTFont(ttf_path)
    woff2_path = os.path.join(OUT_DIR, "alfa-icons.woff2")
    font2.flavor = "woff2"
    font2.save(woff2_path)
    os.remove(ttf_path)

    woff2_kb = os.path.getsize(woff2_path) / 1024
    print(f"✓ Built {woff2_path} ({woff2_kb:.1f} KB)")

    # Build CSS
    css_path = os.path.join(OUT_DIR, "alfa-icons.css")
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(f"""/*!
 * Alfamart Icons - Web Font + CSS v1.0.0
 * Usage: <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DavinIntern/assets-library-website@VERSION/dist/alfa-icons.css">
 * <i class="alfa mdi-check"></i>
 */
@font-face {{
  font-family: '{FONT_NAME}';
  src: url('alfa-icons.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}}

.{CSS_PREFIX} {{
  font-family: '{FONT_NAME}' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  display: inline-block;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}}

""")
        for i, name in enumerate(icon_names):
            codepoint = PUA_START + i
            css_name = name.replace("_", "-")
            f.write(f'.{CSS_PREFIX}.{css_name}::before {{ content: "\\{codepoint:x}"; }}\n')

    css_kb = os.path.getsize(css_path) / 1024
    print(f"✓ Built {css_path} ({css_kb:.1f} KB)")
    print(f"\nEmbed via CDN:")
    print(f'  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DavinIntern/assets-library-website@VERSION/dist/alfa-icons.css">')
    print(f"\nUsage:")
    print(f'  <i class="alfa mdi-check"></i>')
    print(f'  <i class="alfa mdi-check" style="font-size: 32px; color: red;"></i>')


if __name__ == "__main__":
    build()
