import iconDeaths from "~/assets/main/dead.svg";
import { useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./index.css";

export default function Deaths(props: { deaths: number | undefined }) {
  const { getTextColor } = useContext(ThemeContext);

  return (
    <div class={"deaths_counter"}>
      <img src={iconDeaths} alt="" />
      <span
        // class={"flex h-full w-full items-center justify-center"}
        style={{ color: getTextColor() }}
      >
        {props.deaths || 0}
      </span>
    </div>
  );
}
