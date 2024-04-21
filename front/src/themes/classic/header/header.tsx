import { MatchContext } from "~/context/matchContext";
import { useContext } from "solid-js";
import ScoreAndTimer from "~/themes/classic/header/components/scoreAndTimer";
import "./index.css";
import TeamName from "~/components/teamName";
import MapScore from "~/themes/classic/header/components/mapScore";

export default function Header() {
  const { mapState } = useContext(MatchContext);

  return (
    <div class={"header_container"}>
      <TeamName {...mapState().team_ct} />
      <ScoreAndTimer />
      <TeamName {...mapState().team_t} />
    </div>
  );
}
