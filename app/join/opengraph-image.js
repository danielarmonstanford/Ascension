import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ASCENSION pathway discovery above the Da Nang coastline";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

function toArrayBuffer(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

export default async function OpenGraphImage() {
  const [photoBuffer, displayBuffer] = await Promise.all([
    readFile(join(process.cwd(), "public/assets/profile/pathway-desktop.jpg")),
    readFile(join(process.cwd(), "public/assets/fonts/lovine.woff")),
  ]);
  const photo = toArrayBuffer(photoBuffer);
  const display = toArrayBuffer(displayBuffer);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#173744" }}>
      <img src={photo} width="1200" height="630" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "58%", padding: "64px 68px", backgroundColor: "rgba(10, 35, 48, 0.72)" }}>
        <div style={{ display: "flex", color: "#F9F0E3", fontSize: 22, letterSpacing: 5, textTransform: "uppercase" }}>ASCENSION · DA NANG 2027</div>
        <div style={{ display: "flex", flexDirection: "column", color: "#F9F0E3", fontFamily: "Lovine", fontSize: 70, lineHeight: .9, letterSpacing: -3 }}>
          <span>What does your body</span><span>need more of?</span>
        </div>
        <div style={{ display: "flex", color: "#FFD45F", fontSize: 21, letterSpacing: 3, textTransform: "uppercase" }}>Discover your pathway · Complimentary guide</div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Lovine", data: display, weight: 400, style: "normal" }] },
  );
}
