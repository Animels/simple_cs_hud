import { useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./index.css";

interface ITeamProps {
  score: number;
  name: string;
  consecutive_round_losses: number;
  timeouts_remaining: number;
  matches_won_this_series: number;
}

export default function TeamName(props: ITeamProps) {
  const { getTextColor } = useContext(ThemeContext);

  return (
    <span class={"team_name"} style={{ color: getTextColor() }}>
      {props.name}
    </span>
  );
}
