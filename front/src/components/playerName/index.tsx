import { useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./index.css";

export default function UserName(props: { name: string | undefined }) {
  const { getTextColor } = useContext(ThemeContext);

  return (
    <div class={"user_name"} style={{ color: getTextColor() }}>
      {props.name || "Unknown"}
    </div>
  );
}
