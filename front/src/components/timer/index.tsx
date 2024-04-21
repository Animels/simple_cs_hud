import secondsToTime from "./seconsToTime";
import { useContext } from "solid-js";
import { MatchContext } from "~/context/matchContext";
import { ThemeContext } from "~/context/themeContext";
import "./index.css";

export default function Timer() {
  const { phaseState } = useContext(MatchContext);
  const { getTextColor } = useContext(ThemeContext);

  const time = () => secondsToTime(Number(phaseState().phase_ends_in));

  return (
    <div
      class={"time_container"}
      style={{
        color: getTextColor(),
      }}
    >
      {time()}
    </div>
  );
}
