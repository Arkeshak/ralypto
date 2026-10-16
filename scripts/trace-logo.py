"""Trace the primary logo from the supplied brand board into SVG assets.

Usage: python scripts/trace-logo.py path/to/ralyptologo.jpeg
Requires Pillow and NumPy. Only used for asset authoring, not by the website.
"""
from pathlib import Path
import sys
import numpy as np
from PIL import Image


def simplify(points, tolerance=0.8):
    if len(points) < 3:
        return points
    start, end = np.array(points[0]), np.array(points[-1])
    offsets = np.array(points) - start
    line = end - start
    length = np.linalg.norm(line)
    distances = (np.abs(line[0] * offsets[:, 1] - line[1] * offsets[:, 0]) / length
                 if length else np.linalg.norm(offsets, axis=1))
    index = int(np.argmax(distances))
    if distances[index] <= tolerance:
        return [points[0], points[-1]]
    return simplify(points[:index + 1], tolerance)[:-1] + simplify(points[index:], tolerance)


pixels = np.array(Image.open(sys.argv[1]).convert("RGB").crop((210, 150, 900, 350)))
mask = pixels.max(axis=2) < 130
edges = {}
height, width = mask.shape
for y, x in zip(*np.where(mask)):
    for exposed, start, end in [
        (y == 0 or not mask[y - 1, x], (x, y), (x + 1, y)),
        (x == width - 1 or not mask[y, x + 1], (x + 1, y), (x + 1, y + 1)),
        (y == height - 1 or not mask[y + 1, x], (x + 1, y + 1), (x, y + 1)),
        (x == 0 or not mask[y, x - 1], (x, y + 1), (x, y)),
    ]:
        if exposed:
            edges.setdefault(start, []).append(end)

paths = []
while edges:
    start = next(iter(edges))
    points = [start]
    current = start
    while True:
        following = edges[current].pop()
        if not edges[current]:
            del edges[current]
        points.append(following)
        current = following
        if current == start:
            break
    if len(points) > 25:
        points = simplify(points)
        paths.append("M" + "L".join(f"{x},{y}" for x, y in points[:-1]) + "Z")

output = Path(__file__).resolve().parents[1] / "public" / "brand"
output.mkdir(parents=True, exist_ok=True)
for variant, ink in [("", "#0B0F23"), ("-light", "#F8F6EC")]:
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 200">'
           f'<path fill="{ink}" fill-rule="evenodd" d="{"".join(paths)}"/>'
           '<circle cx="33" cy="96" r="25" fill="#FFB800"/></svg>\n')
    (output / f"ralypto-logo{variant}.svg").write_text(svg, encoding="utf-8")
