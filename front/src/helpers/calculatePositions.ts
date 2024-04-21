export default function calculatePositions(
  positions: string | undefined,
  pos_x: number,
  pos_y: number,
  scale: number,
  isMoly?: boolean,
) {
  if (positions === undefined) return;
  const concatPositions = positions.split(",");
  let [x, y, z] = concatPositions || [0, 0, 0];
  // BUG: CS2 has the coords doubled for some reason
  if (isMoly) {
    // @ts-ignore
    x = x / 2;
    // @ts-ignore
    y = y / 2;
  }
  const transformedX = ((Number(x) - pos_x - 100) / scale / 1024) * 100;
  const transformedY = ((Number(y) - pos_y + 100) / -scale / 1024) * 100;
  return [transformedX, transformedY, z];
}
