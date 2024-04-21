import { ThemeContext } from "~/context/themeContext";
import { useContext } from "solid-js";
import "./index.css";

export default function Money(props: { money: number | undefined }) {
  const { getMoneyColor } = useContext(ThemeContext);

  return (
    <span class={"money_info"} style={{ color: getMoneyColor() }}>
      ${props.money || 0}
    </span>
  );
}
