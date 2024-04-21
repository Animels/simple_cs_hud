import { ThemeContext } from "~/context/themeContext";
import armorImg from "~/assets/main/armor.svg";
import armorHelmetImg from "~/assets/main/armor_helmet.svg";
import { useContext } from "solid-js";
import "./index.css";

export default function Armour(props: {
  armor: number | undefined;
  helmet: boolean | undefined;
}) {
  const { getTextColor } = useContext(ThemeContext);

  return (
    <div class={"armour"}>
      {props.helmet ? (
        <img src={armorHelmetImg} alt={""} />
      ) : (
        <img src={armorImg} alt={""} />
      )}
      <span style={{ color: getTextColor() }}>{props.armor || 0}</span>
    </div>
  );
}
