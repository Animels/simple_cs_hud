export default async function importWeaponImage(path: string) {
  const concat = path.replace("weapon_", "");
  const image = import(`../assets/main/${concat}.svg`);
  const result = await image;
  return result.default;
}
