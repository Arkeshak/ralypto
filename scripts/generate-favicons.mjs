import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const logoSvg = fs.readFileSync(path.join(root, "public", "brand", "ralypto-logo.svg"), "utf8");
const subpaths = logoSvg.match(/M[^Z]+Z/g);
const rSubpath = subpaths[0];

// 512x512 Master SVG
// Background: #0B0F23
// Glyph: off-white #F8F6EC with amber #FFB800 circle
const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#0B0F23"/>
  <g transform="translate(103, 86) scale(1.68)">
    <path fill="#F8F6EC" fill-rule="evenodd" d="${rSubpath}"/>
    <circle cx="33" cy="96" r="25" fill="#FFB800"/>
  </g>
</svg>`.trim();

// Function to combine PNG buffers into a multi-resolution ICO file
function createIco(images) {
  // images: Array<{ width, height, buffer }>
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // number of images

  let offset = 6 + count * 16;
  const entries = [];
  const buffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset

    entries.push(entry);
    buffers.push(img.buffer);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...buffers]);
}

async function main() {
  const brandDir = path.join(root, "public", "brand");
  const publicDir = path.join(root, "public");
  const appDir = path.join(root, "app");

  if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir, { recursive: true });

  // 1. Save master SVG
  fs.writeFileSync(path.join(brandDir, "icon.svg"), masterSvg, "utf8");
  fs.writeFileSync(path.join(appDir, "icon.svg"), masterSvg, "utf8");
  console.log("Created icon.svg in public/brand and app/");

  // 2. Generate PNGs
  const svgBuffer = Buffer.from(masterSvg);

  const pngSizes = [
    { size: 16, name: null },
    { size: 32, name: null },
    { size: 48, name: "icon-48.png" },
    { size: 96, name: "icon-96.png" },
    { size: 180, name: "apple-touch-icon.png" },
    { size: 192, name: "icon-192.png" },
    { size: 512, name: "icon-512.png" },
  ];

  const rendered = {};
  for (const { size, name } of pngSizes) {
    const buf = await sharp(svgBuffer).resize(size, size).png().toBuffer();
    rendered[size] = buf;
    if (name) {
      fs.writeFileSync(path.join(brandDir, name), buf);
      console.log(`Created public/brand/${name} (${size}x${size})`);
    }
  }

  // Apple touch icon in app/ as well
  fs.writeFileSync(path.join(appDir, "apple-icon.png"), rendered[180]);
  console.log("Created app/apple-icon.png (180x180)");

  // 3. Generate multi-resolution favicon.ico (16, 32, 48)
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: rendered[16] },
    { width: 32, height: 32, buffer: rendered[32] },
    { width: 48, height: 48, buffer: rendered[48] },
  ]);

  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(appDir, "favicon.ico"), icoBuffer);
  console.log("Created favicon.ico in public/ and app/ (16, 32, 48px)");

  // Clean up any test preview files if present
  for (const f of ["icon-preview.svg", "icon-preview.png", "test-icon.svg", "test-icon.png"]) {
    const p = path.join(publicDir, f);
    if (fs.existsSync(p)) fs.unlinkSync(p);
    const pb = path.join(brandDir, f);
    if (fs.existsSync(pb)) fs.unlinkSync(pb);
  }

  console.log("All favicons and metadata icons generated successfully!");
}

main().catch(console.error);
