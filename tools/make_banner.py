# GitHub 프로필 README 도트 배너·구분선 생성기 — assets/*.svg를 만든다.
# 실행: cd tools && python3 make_banner.py   (Pillow 필요, 글꼴은 없으면 자동으로 받는다)
# 이력서 사이트(sihhub.github.io)·블로그와 같은 디자인: 도트 + 하늘·풀·흙(낮) / 밤하늘·달·별·돌(밤).
import os, urllib.request
FONT_PATH = "Galmuri11-Bold.ttf"  # Galmuri (OFL-1.1, © Lee Minseo) — 저장소엔 넣지 않는다
if not os.path.exists(FONT_PATH):
    urllib.request.urlretrieve("https://cdn.jsdelivr.net/npm/galmuri@2.40.3/dist/Galmuri11-Bold.ttf", FONT_PATH)
# 글씨는 Galmuri11 Bold를 12px로 래스터화한 픽셀을 SVG 네모로 찍는다(글꼴 파일 없이 어디서나 같게 보인다).
from PIL import Image, ImageDraw, ImageFont
import random

FONT = ImageFont.truetype(FONT_PATH, 12)
W, H = 1200, 340
GROUND = 286

def glyph_runs(text):
    im = Image.new("1", (16 * len(text) + 20, 20), 0)
    d = ImageDraw.Draw(im); d.fontmode = "1"
    d.text((1, 1), text, font=FONT, fill=1)
    im = im.crop(im.getbbox())
    runs = []
    for y in range(im.height):
        x = 0
        while x < im.width:
            if im.getpixel((x, y)):
                s = x
                while x < im.width and im.getpixel((x, y)): x += 1
                runs.append((s, y, x - s))
            else:
                x += 1
    return runs, im.width, im.height

def text_rects(text, x0, y0, scale, fill, shadow=None):
    runs, w, h = glyph_runs(text)
    out = []
    if shadow:
        out.append(f'<g fill="{shadow}">' + "".join(
            f'<rect x="{x0 + (sx + 1) * scale}" y="{y0 + (sy + 1) * scale}" width="{n * scale}" height="{scale}"/>' for sx, sy, n in runs) + "</g>")
    out.append(f'<g fill="{fill}">' + "".join(
        f'<rect x="{x0 + sx * scale}" y="{y0 + sy * scale}" width="{n * scale}" height="{scale}"/>' for sx, sy, n in runs) + "</g>")
    return "".join(out), w * scale, h * scale

def ground(y0, top, top_light, base, dark, light, seed):
    rnd = random.Random(seed)
    U = 8
    parts = [f'<rect x="0" y="{y0}" width="{W}" height="{H - y0}" fill="{base}"/>']
    # 흙(돌) 알갱이
    for gy in range(y0 + U, H, U):
        for gx in range(0, W, U):
            r = rnd.random()
            if r < 0.16: parts.append(f'<rect x="{gx}" y="{gy}" width="{U}" height="{U}" fill="{dark}"/>')
            elif r < 0.28: parts.append(f'<rect x="{gx}" y="{gy}" width="{U}" height="{U}" fill="{light}"/>')
    # 풀 — 맨 윗줄 꽉, 둘째 줄 듬성듬성
    parts.append(f'<rect x="0" y="{y0}" width="{W}" height="{U}" fill="{top}"/>')
    for gx in range(0, W, U):
        if rnd.random() < 0.55: parts.append(f'<rect x="{gx}" y="{y0 + U}" width="{U}" height="{U}" fill="{top}"/>')
        if rnd.random() < 0.18: parts.append(f'<rect x="{gx}" y="{y0}" width="{U}" height="{U // 2}" fill="{top_light}"/>')
    return "".join(parts)

def block(x, y, s, top, top_l, dirt, dirt_d):
    # 풀 블록 하나 (8×8 칸)
    grid = ["LGGLGGGL", "GgGGgGgG", "GDGGDgDG", "DDdDDDdD", "DdDDdDDD", "dDDdDDDd", "DDDDDdDD", "DdDdDDdD"]
    col = {"G": top, "g": top, "L": top_l, "D": dirt, "d": dirt_d}
    u = s // 8
    return "".join(f'<rect x="{x + cx * u}" y="{y + cy * u}" width="{u}" height="{u}" fill="{col[c]}"/>'
                   for cy, row in enumerate(grid) for cx, c in enumerate(row))

def cloud(cells, u, fill):
    return f'<g fill="{fill}">' + "".join(
        f'<rect x="{x * u}" y="{y * u}" width="{u}" height="{u}"/>' for y, row in enumerate(cells) for x, c in enumerate(row) if c == "X") + "</g>"

def banner(mode):
    day = mode == "day"
    ink = "#2b2118" if day else "#f3eee2"
    sky = ["#7dbfee", "#8ac6f0", "#98cdf2", "#a8d5f5", "#b9ddf7", "#cbe6f9"] if day else \
          ["#0b1128", "#0f1631", "#131c3a", "#172243", "#1b274c", "#1f2c55"]
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" shape-rendering="crispEdges">']
    p.append("""<style>
      .c1{animation:drift 70s linear infinite}
      .c2{animation:drift 95s linear infinite;animation-delay:-40s}
      .c3{animation:drift 120s linear infinite;animation-delay:-85s}
      @keyframes drift{from{transform:translateX(-260px)}to{transform:translateX(1260px)}}
      .tw{animation:tw 3s steps(1,end) infinite}
      .tw2{animation:tw 4.2s steps(1,end) infinite;animation-delay:-1.3s}
      @keyframes tw{50%{opacity:.2}}
      .cur{animation:blink 1s steps(1,end) infinite}
      @keyframes blink{50%{opacity:0}}
      @media (prefers-reduced-motion:reduce){.c1,.c2,.c3,.tw,.tw2,.cur{animation:none}}
    </style>""")
    band = GROUND // len(sky) + 1
    for i, c in enumerate(sky):
        p.append(f'<rect x="0" y="{i * band}" width="{W}" height="{band}" fill="{c}"/>')
    if day:
        # 네모 해 + 후광
        p.append('<rect x="1012" y="28" width="88" height="88" fill="#ffe68a" opacity=".35"/>')
        p.append('<rect x="1028" y="44" width="56" height="56" fill="#ffe68a"/>')
        p.append('<rect x="1036" y="52" width="16" height="16" fill="#fff3c4"/>')
        clouds = [("c1", 40, ["..XXXX......", ".XXXXXXXXX..", "XXXXXXXXXXXX"], 12),
                  ("c2", 110, ["...XXX...", "XXXXXXXX.", ".XXXXXXXX"], 10),
                  ("c3", 170, [".XXXXX....", "XXXXXXXXXX"], 9)]
        for cls, y, cells, u in clouds:
            p.append(f'<g class="{cls}"><g transform="translate(0 {y})">{cloud(cells, u, "#fff")}</g></g>')
    else:
        # 네모 달 + 별
        p.append('<rect x="1020" y="36" width="72" height="72" fill="#f1edd6" opacity=".14"/>')
        p.append('<rect x="1032" y="48" width="48" height="48" fill="#f1edd6"/>')
        p.append('<rect x="1044" y="60" width="8" height="8" fill="#d9d3b6"/><rect x="1064" y="76" width="8" height="8" fill="#d9d3b6"/>')
        rnd = random.Random(7)
        for i in range(34):
            x, y = rnd.randrange(20, W - 20, 4), rnd.randrange(12, 270, 4)
            if 40 < x < 600 and 30 < y < 270: continue  # 글씨 자리는 비운다
            cls = "tw" if i % 3 == 0 else ("tw2" if i % 3 == 1 else "")
            s = 4 if i % 5 else 6
            p.append(f'<rect class="{cls}" x="{x}" y="{y}" width="{s}" height="{s}" fill="#fff"/>')
    # 글씨 — 이름(크게) · 역할(풀색 상자) · 키워드
    name, nw, nh = text_rects("홍성인", 64, 46, 7, ink, shadow=("rgba(0,0,0,.18)" if day else "rgba(0,0,0,.45)"))
    p.append(name)
    p.append(f'<rect class="cur" x="{64 + nw + 14}" y="{46 + nh - 7}" width="35" height="7" fill="{ink}"/>')
    role, rw, rh = text_rects("FRONTEND DEVELOPER", 0, 0, 3, "#fff")
    p.append(f'<g transform="translate(64 {46 + nh + 22})"><rect x="0" y="0" width="{rw + 24}" height="{rh + 18}" fill="#3f7a24"/>'
             f'<rect x="{rw + 24}" y="6" width="6" height="{rh + 18}" fill="rgba(0,0,0,.25)"/><rect x="6" y="{rh + 18}" width="{rw + 24}" height="6" fill="rgba(0,0,0,.25)"/>'
             f'<g transform="translate(12 9)">{role}</g></g>')
    kw, kw_w, kw_h = text_rects("Chat SDK · WebView · Design System", 0, 0, 2, ink)
    p.append(f'<g transform="translate(66 {46 + nh + 22 + rh + 18 + 24})">{kw}</g>')
    # 땅 + 풀 블록 둘
    if day:
        p.append(ground(GROUND, "#4c8c2d", "#6fb043", "#7a5534", "#62432a", "#8c6440", 3))
        p.append(block(884, 238, 48, "#4c8c2d", "#6fb043", "#7a5534", "#62432a"))
        p.append(block(932, 238, 48, "#4c8c2d", "#6fb043", "#7a5534", "#62432a"))
        p.append(block(932, 190, 48, "#4c8c2d", "#6fb043", "#7a5534", "#62432a"))
    else:
        p.append(ground(GROUND, "#2c5418", "#3a6b22", "#3a3632", "#302d2a", "#45403b", 3))
        p.append(block(884, 238, 48, "#2c5418", "#3a6b22", "#4a3a2c", "#3b2e23"))
        p.append(block(932, 238, 48, "#2c5418", "#3a6b22", "#4a3a2c", "#3b2e23"))
        p.append(block(932, 190, 48, "#2c5418", "#3a6b22", "#4a3a2c", "#3b2e23"))
    p.append("</svg>")
    return "".join(p)

# 섹션 사이 풀 띠
def divider(top, light, base, dark, seed, DW=1200, DH=24):
    rnd = random.Random(seed); U = 8
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {DW} {DH}" width="{DW}" height="{DH}" shape-rendering="crispEdges">',
         f'<rect x="0" y="{U}" width="{DW}" height="{DH - U}" fill="{base}"/>']
    for gx in range(0, DW, U):
        if rnd.random() < 0.2: p.append(f'<rect x="{gx}" y="{U * 2}" width="{U}" height="{U}" fill="{dark}"/>')
    p.append(f'<rect x="0" y="0" width="{DW}" height="{U}" fill="{top}"/>')
    for gx in range(0, DW, U):
        if rnd.random() < 0.55: p.append(f'<rect x="{gx}" y="{U}" width="{U}" height="{U}" fill="{top}"/>')
        if rnd.random() < 0.2: p.append(f'<rect x="{gx}" y="0" width="{U}" height="{U // 2}" fill="{light}"/>')
    p.append("</svg>")
    return "".join(p)

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets")
for m in ["day", "night"]:
    open(os.path.join(OUT, f"banner-{m}.svg"), "w").write(banner(m))
open(os.path.join(OUT, "divider-day.svg"), "w").write(divider("#4c8c2d", "#6fb043", "#7a5534", "#62432a", 11))
open(os.path.join(OUT, "divider-night.svg"), "w").write(divider("#2c5418", "#3a6b22", "#3a3632", "#302d2a", 11))
print("assets/ 갱신")
