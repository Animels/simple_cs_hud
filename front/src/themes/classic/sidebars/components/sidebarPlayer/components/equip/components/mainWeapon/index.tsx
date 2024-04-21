import { createMemo } from "solid-js";
import "./index.css";

interface IWeaponProps {
  image: string;
}

export default function MainWeapon(props: IWeaponProps) {
  const value = createMemo(() => props.image);
  return (
    <div class={"main_weapon_container"}>
      <img src={value()} alt={""} />
    </div>
  );
}
