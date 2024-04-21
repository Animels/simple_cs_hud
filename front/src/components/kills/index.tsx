import iconKill from "~/assets/main/kills.svg";
import { useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./index.css";

export default function Kills(props: { kills: number | undefined }) {
  const { getTextColor } = useContext(ThemeContext);

  return (
    <div class={"kills_info"}>
      <img src={iconKill} alt="" />
      <span style={{ color: getTextColor() }}>{props.kills || 0}</span>
    </div>
  );
}
