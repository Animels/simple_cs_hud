export default async function importMapImage(path: string) {
  const image = import(path);
  const res = await image;
  return res.default;
}
