"""
Build script: menghasilkan dist/assets.js
Bundle semua SVG icons jadi satu JS file yang bisa di-embed sebagai CDN.

Usage:
    python build_cdn.py

Cara pakai setelah di-deploy:
    <script src="https://cdn.jsdelivr.net/gh/username/repo@1.0.0/dist/assets.js"></script>
    <i class="alfa-icon" data-icon="mdi_check"></i>
"""

import os
import json
import re

ICONS_DIR = "static/assets/Icons"
OUT_DIR = "dist"
OUT_FILE = os.path.join(OUT_DIR, "assets.js")

def clean_svg(content):
    """Strip XML declaration dan whitespace berlebih."""
    content = re.sub(r'<\?xml[^?]*\?>', '', content)
    content = re.sub(r'\s+', ' ', content).strip()
    return content

def build():
    os.makedirs(OUT_DIR, exist_ok=True)

    icons = {}
    for filename in sorted(os.listdir(ICONS_DIR)):
        if not filename.endswith(".svg"):
            continue
        name = filename[:-4]  # buang ekstensi .svg
        filepath = os.path.join(ICONS_DIR, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            svg = clean_svg(f.read())
        icons[name] = svg

    icons_json = json.dumps(icons, ensure_ascii=False)

    js = f"""/*!
 * Alfamart Design Assets CDN v1.0.0
 * Usage: <i class="alfa-icon" data-icon="ICON_NAME"></i>
 * Size: via CSS font-size (e.g. style="font-size: 32px")
 * Color: via CSS color (e.g. style="color: red")
 */
(function () {{
  'use strict';

  var icons = {icons_json};

  function injectStyles() {{
    if (document.getElementById('alfa-icon-style')) return;
    var style = document.createElement('style');
    style.id = 'alfa-icon-style';
    style.textContent = [
      '.alfa-icon {{',
      '  display: inline-flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  vertical-align: middle;',
      '  font-size: inherit;',
      '  line-height: 1;',
      '}}',
      '.alfa-icon svg {{',
      '  display: block;',
      '  width: 1em;',
      '  height: 1em;',
      '}}',
      '.alfa-icon svg path, .alfa-icon svg rect, .alfa-icon svg circle, .alfa-icon svg polygon, .alfa-icon svg ellipse {{',
      '  fill: currentColor;',
      '}}'
    ].join('');
    document.head.appendChild(style);
  }}

  function renderIcon(el) {{
    var name = el.getAttribute('data-icon');
    if (!name || !icons[name]) {{
      el.innerHTML = '';
      return;
    }}
    var svg = icons[name];
    // Pakai 1em supaya size inherit dari CSS font-size
    svg = svg.replace(/width="[^"]*"/, 'width="1em"');
    svg = svg.replace(/height="[^"]*"/, 'height="1em"');
    svg = svg.replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"');
    el.innerHTML = svg;
  }}

  function renderAll() {{
    var elements = document.querySelectorAll('.alfa-icon[data-icon]');
    for (var i = 0; i < elements.length; i++) {{
      renderIcon(elements[i]);
    }}
  }}

  function observe() {{
    if (!window.MutationObserver) return;
    var observer = new MutationObserver(function (mutations) {{
      mutations.forEach(function (m) {{
        m.addedNodes.forEach(function (node) {{
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains('alfa-icon') && node.getAttribute('data-icon')) {{
            renderIcon(node);
          }}
          var children = node.querySelectorAll ? node.querySelectorAll('.alfa-icon[data-icon]') : [];
          for (var i = 0; i < children.length; i++) {{
            renderIcon(children[i]);
          }}
        }});
      }});
    }});
    observer.observe(document.body, {{ childList: true, subtree: true }});
  }}

  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', function () {{
      injectStyles();
      renderAll();
      observe();
    }});
  }} else {{
    injectStyles();
    renderAll();
    observe();
  }}

  // Public API
  window.AlfaIcons = {{
    list: function () {{ return Object.keys(icons); }},
    render: renderAll,
    get: function (name) {{ return icons[name] || null; }}
  }};

}})();
"""

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(js)

    # Build assets.css
    css_file = os.path.join(OUT_DIR, "assets.css")
    css = """\
/*!
 * Alfamart Design Assets CDN v1.0.0 - CSS
 * Usage: <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DavinIntern/assets-library-website@1.0.0/dist/assets.css">
 */
.alfa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
}
.alfa-icon svg {
  display: block;
}
.alfa-icon svg path,
.alfa-icon svg rect,
.alfa-icon svg circle,
.alfa-icon svg polygon,
.alfa-icon svg ellipse {
  fill: currentColor;
}
"""
    with open(css_file, "w", encoding="utf-8") as f:
        f.write(css)

    size_kb = os.path.getsize(OUT_FILE) / 1024
    css_kb = os.path.getsize(css_file) / 1024
    print(f"✓ Built {OUT_FILE} ({len(icons)} icons, {size_kb:.1f} KB)")
    print(f"✓ Built {css_file} ({css_kb:.1f} KB)")
    print(f"\nEmbed via CDN:")
    print(f'  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DavinIntern/assets-library-website@1.0.0/dist/assets.css">')
    print(f'  <script src="https://cdn.jsdelivr.net/gh/DavinIntern/assets-library-website@1.0.0/dist/assets.js"></script>')
    print(f"\nUsage:")
    print(f'  <i class="alfa-icon" data-icon="mdi_check"></i>')
    print(f'  <i class="alfa-icon" data-icon="mdi_check" style="font-size: 32px; color: red;"></i>')

if __name__ == "__main__":
    build()
