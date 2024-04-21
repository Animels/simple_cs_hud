import healthIcon from "~/assets/main/health.svg";
import { createMemo, useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./index.css";

export default function HealthInfo(props: { health: number | undefined }) {
  const { getTextColor } = useContext(ThemeContext);

  return (
    <div class={"health_info"}>
      <img src={healthIcon} alt={""} />
      <span style={{ color: getTextColor() }}>{props.health || 0}</span>
    </div>
  );
}
