# GitHub 프로필 README 맨 위 「신문 1면」 배너 — 이력서 사이트(sihhub.github.io)의 에디토리얼 + 스위스 그리드와 같은 조판.
#   머리띠 → 마스트헤드(이름, 오른쪽 연락처) → 굵은 괘선 → 리드문(첫 글자 딥레드) → 지표 밴드 4칸
# README 속 SVG는 웹 글꼴을 못 불러오므로, 글자를 글꼴 윤곽선(path)으로 바꿔 넣는다 — 어디서 열어도 같은 글꼴.
# 실행: cd tools && python3 make_masthead.py   (fontTools 필요: pip install fonttools)
# 글꼴(저장소엔 안 넣음 — 없으면 자동으로 받는다): Noto Serif KR · JetBrains Mono · Pretendard — 모두 OFL.
import os, re
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "fonts")

FONT_URLS = {
    "NotoSerifKR-Bold.otf": "https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Serif/SubsetOTF/KR/NotoSerifKR-Bold.otf",
    "NotoSerifKR-Medium.otf": "https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Serif/SubsetOTF/KR/NotoSerifKR-Medium.otf",
    "JetBrainsMono-Bold.ttf": "https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@master/fonts/ttf/JetBrainsMono-Bold.ttf",
    "JetBrainsMono-Medium.ttf": "https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono@master/fonts/ttf/JetBrainsMono-Medium.ttf",
    "Pretendard-SemiBold.otf": "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-SemiBold.otf",
    "Pretendard-Regular.otf": "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Regular.otf",
}
os.makedirs(FONTS, exist_ok=True)
for _name, _url in FONT_URLS.items():
    if not os.path.exists(os.path.join(FONTS, _name)):
        import urllib.request
        urllib.request.urlretrieve(_url, os.path.join(FONTS, _name))
OUT_DIR = os.path.join(HERE, "..", "assets") if os.path.basename(HERE) == "tools" else HERE

# 색 — light는 사이트 globals.css 토큰과 같다. dark는 GitHub 어두운 테마용 반전(사이트엔 다크 모드가 없다)
PALETTES = {
    "light": dict(PAPER="#FAF9F6", INK="#17171A", MUTED="#6E6E66", RULE="#DEDBD2", ACCENT="#A42A1E"),
    "dark": dict(PAPER="#17171A", INK="#F2F0EA", MUTED="#A3A199", RULE="#34343A", ACCENT="#E0645A"),
}

class Font:
    def __init__(self, name, fallback=None):
        self.f = TTFont(os.path.join(FONTS, name))
        self.gs = self.f.getGlyphSet(); self.cmap = self.f.getBestCmap()
        self.upm = self.f["head"].unitsPerEm; self.hmtx = self.f["hmtx"]; self.fb = fallback
    def _glyph(self, ch):
        g = self.cmap.get(ord(ch))
        if g is not None: return self, g
        if self.fb: return self.fb._glyph(ch)
        raise KeyError(f"글리프 없음: {ch!r}")
    def width(self, text, size, tracking=0.0):
        w = 0.0
        for ch in text:
            font, g = self._glyph(ch); w += font.hmtx[g][0] * size / font.upm + tracking
        return w - (tracking if text else 0)
    def path(self, text, x, y, size, tracking=0.0):
        cmds, cx = [], x
        for ch in text:
            font, g = self._glyph(ch); s = size / font.upm
            pen = SVGPathPen(font.gs); font.gs[g].draw(TransformPen(pen, (s, 0, 0, -s, cx, y)))
            c = pen.getCommands()
            if c: cmds.append(re.sub(r"-?\d+\.\d+", lambda m: f"{float(m.group()):.1f}".rstrip("0").rstrip("."), c))
            cx += font.hmtx[g][0] * s + tracking
        return " ".join(cmds), cx - x

PRET_R = Font("Pretendard-Regular.otf"); PRET_SB = Font("Pretendard-SemiBold.otf")
SERIF_B = Font("NotoSerifKR-Bold.otf"); SERIF_M = Font("NotoSerifKR-Medium.otf")
MONO_M = Font("JetBrainsMono-Medium.ttf", fallback=PRET_SB); MONO_B = Font("JetBrainsMono-Bold.ttf", fallback=PRET_SB)

def text(font, s, x, y, size, fill, tracking=0.0, anchor="start"):
    w = font.width(s, size, tracking)
    if anchor == "end": x -= w
    elif anchor == "middle": x -= w / 2
    d, _ = font.path(s, x, y, size, tracking)
    return f'<path d="{d}" fill="{fill}"/>', w

def wrap(font, s, size, maxw):
    lines, cur = [], ""
    for word in s.split(" "):
        t = (cur + " " + word).strip()
        if font.width(t, size) <= maxw or not cur: cur = t
        else: lines.append(cur); cur = word
    if cur: lines.append(cur)
    return lines

# ── 내용 — 사이트 data/resume.ts와 같은 문장·수치 ──
NAME = "홍성인"
TAGLINE = "번역 SaaS·앱 웹뷰 채팅·멀티플랫폼 SDK·디자인 시스템까지, 초기 아키텍처 설계부터 서비스 운영·리팩토링까지 경험한 6년차 웹 프론트엔드 개발자입니다."
STATS = [("6", "년차", "웹 프론트엔드 개발", None),
         ("4", "개", "플랫폼 SDK 단독 설계·공개", "노베라챗 SDK"),
         ("~474", "", "리팩토링 커밋 주도 (496 중)", "패밀리타운"),
         ("100", "%", "실시간 협업 계층 직접 구축", "레터웍스")]
STRIP = ("FRONTEND DEVELOPER", "GITHUB · SIHHUB", "SEOUL, KOREA")
CONTACT = ("hongsungin92@gmail.com", "sihhub.github.io")

def build(mode):
    PAPER, INK, MUTED, RULE, ACCENT = (PALETTES[mode][k] for k in ("PAPER", "INK", "MUTED", "RULE", "ACCENT"))
    W, PX = 1200, 56
    p = []
    y = 30
    # 머리띠
    p.append(f'<rect x="{PX}" y="{y}" width="{W - 2 * PX}" height="1.5" fill="{RULE}"/>')
    for s, a, x in zip(STRIP, ("start", "middle", "end"), (PX, W / 2, W - PX)):
        p.append(text(MONO_M, s, x, y + 31, 15, MUTED, tracking=2.1, anchor=a)[0])
    y += 48
    p.append(f'<rect x="{PX}" y="{y}" width="{W - 2 * PX}" height="1.5" fill="{RULE}"/>')
    # 마스트헤드
    name_base = y + 150
    p.append(text(SERIF_B, NAME, PX - 4, name_base, 124, INK, tracking=-2.5)[0])
    p.append(text(MONO_M, CONTACT[0], W - PX, name_base - 34, 17, MUTED, anchor="end")[0])
    p.append(text(MONO_M, CONTACT[1], W - PX, name_base - 6, 17, MUTED, anchor="end")[0])
    y = name_base + 26
    p.append(f'<rect x="{PX}" y="{y}" width="{W - 2 * PX}" height="3" fill="{INK}"/>')
    # 리드문 — 첫 글자만 딥레드로 1.5배
    LS, LH, MAXW = 29, 48, 860
    first, rest = TAGLINE[0], TAGLINE[1:]
    fw = SERIF_B.width(first, LS * 1.5)
    lines = wrap(SERIF_M, rest, LS, MAXW - fw)
    y += 66
    p.append(text(SERIF_B, first, PX, y, LS * 1.5, ACCENT)[0])
    for i, line in enumerate(lines):
        lx = PX + fw + 2 if i == 0 else PX
        if i > 0:
            # 둘째 줄부터는 첫 글자 폭만큼 들여 쓰지 않고 왼쪽 끝에서 — 남은 문장을 다시 감싼다
            pass
        p.append(text(SERIF_M, line, lx, y + i * LH, LS, INK, tracking=-0.3)[0])
    y += (len(lines) - 1) * LH + 52
    # 지표 밴드
    band_top = y
    col = (W - 2 * PX) / 4
    cells = []
    max_h = 0
    for i, (num, unit, label, proj) in enumerate(STATS):
        x0 = PX + i * col + (0 if i == 0 else 24)
        yy = band_top + 72
        nd, nw = text(MONO_B, num, x0, yy, 58, INK, tracking=-1.2)
        cells.append(nd)
        if unit: cells.append(text(PRET_SB, unit, x0 + nw + 6, yy, 21, INK)[0])
        ly = yy + 40
        for j, l in enumerate(wrap(PRET_R, label, 18, col - 44)):
            cells.append(text(PRET_R, l, x0, ly + j * 28, 18, MUTED)[0]); last = ly + j * 28
        if proj:
            ty = last + 38
            td, tw = text(MONO_M, proj.upper(), x0, ty, 16, ACCENT, tracking=1.6)
            cells.append(td)
            cells.append(f'<rect x="{x0}" y="{ty + 7}" width="{tw:.1f}" height="1.5" fill="{ACCENT}" opacity=".4"/>')
            last = ty
        max_h = max(max_h, last - band_top + 30)
    band_h = max_h + 10
    p.append(f'<rect x="{PX}" y="{band_top}" width="{W - 2 * PX}" height="1.5" fill="{RULE}"/>')
    for i in range(1, 4):
        p.append(f'<rect x="{PX + i * col:.1f}" y="{band_top}" width="1.5" height="{band_h}" fill="{RULE}"/>')
    p.extend(cells)
    p.append(f'<rect x="{PX}" y="{band_top + band_h}" width="{W - 2 * PX}" height="1.5" fill="{RULE}"/>')
    H = int(band_top + band_h + 34)

    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-labelledby="t">'
           f'<title id="t">홍성인 · Frontend Developer — {TAGLINE}</title>'
           f'<rect width="{W}" height="{H}" fill="{PAPER}"/>' + "".join(p) + "</svg>")
    out = os.path.join(OUT_DIR, f"masthead-{mode}.svg")
    open(out, "w").write(svg)
    print("written", out, len(svg), "bytes", W, "x", H)


for m in PALETTES:
    build(m)
