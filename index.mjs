import { Canvas, loadImage } from "skia-canvas";

const FONT_WIDTH = 8;
const FONT_HEIGHT = 8;
const FONT_HEIGHT_BOTTOM = 2;
const COLOR_DEPTH = 4;
const FONT_MAP_WIDTH = 38;
const FONT_MAP_HEIGHT = 19;

const canvas = new Canvas(
  FONT_WIDTH * FONT_MAP_WIDTH,
  (FONT_HEIGHT + FONT_HEIGHT_BOTTOM) * FONT_MAP_HEIGHT
);
const ctx = canvas.getContext("2d");
const image = await loadImage("BESCII.png");
ctx.drawImage(image, 0, 0);
for (let y = 0; y < FONT_MAP_HEIGHT; y += 1) {
  for (let x = 0; x < FONT_MAP_WIDTH; x += 1) {
    if (x === parseInt(process.argv[3]) && y === parseInt(process.argv[2])) {
      const { data } = ctx.getImageData(
        x * FONT_WIDTH,
        y * (FONT_HEIGHT + FONT_HEIGHT_BOTTOM),
        FONT_WIDTH,
        FONT_HEIGHT
      );
      let n = 0n;
      for (let i = 0; i < data.length; i += COLOR_DEPTH) {
        if (data[i]) {
          const index = i / COLOR_DEPTH;
          n |=
            1n <<
            (BigInt(
              (FONT_WIDTH - (index % FONT_WIDTH) - 1) * FONT_HEIGHT +
                FONT_WIDTH -
                Math.floor(index / FONT_WIDTH)
            ) -
              1n);
        }
      }
      console.log("y:", y, "x:", x, "n:", `0x${n.toString(16)}n`);
    }
  }
}
