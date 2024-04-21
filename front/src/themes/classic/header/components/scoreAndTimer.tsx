import { createEffect, createMemo, createSignal, useContext } from "solid-js";
import { MatchContext } from "~/context/matchContext";
import { ThemeContext } from "~/context/themeContext";
import Timer from "~/components/timer";
import { BombContext } from "~/context/bombContext";
import c4Image from "~/assets/main/c4.svg";
import "./index.css";
import MapScore from "~/themes/classic/header/components/mapScore";

export default function ScoreAndTimer() {
  let containerRef;
  const { mapState, phaseState } = useContext(MatchContext);
  const { bombState } = useContext(BombContext);
  const { getTextColor, getCTColor, getTColor, getSecondaryColor } =
    useContext(ThemeContext);
  const [phasePhrase, setPhasePhrase] = createSignal("");

  createEffect(() => {
    switch (phaseState().phase) {
      case "live":
        setPhasePhrase(`Round ${mapState().round}`);
        break;
      case "freezetime":
        setPhasePhrase(`Freezetime`);
        break;
      case "over":
        setPhasePhrase("Round Over");
        break;
      case "timeout":
        setPhasePhrase("timeout");
        break;
      default:
        setPhasePhrase(`Round ${mapState().round}`);
    }
  });

  const getPhase = createMemo(() => {
    return bombState().state === "planted" ? (
      <img class={"header_c4"} src={c4Image} alt={""} />
    ) : (
      phasePhrase()
    );
  });

  return (
    <div class={"score_and_timer_container"}>
      <div class={"teams_scores_and_timer_container"}>
        <div
          class={"team_score"}
          style={{
            "background-color": getCTColor(),
            color: getTextColor(),
          }}
        >
          {mapState().team_ct.score}
        </div>
        <div
          ref={containerRef}
          class={"phase_and_timer_container"}
          style={{
            "background-color": getSecondaryColor(),
          }}
        >
          <div
            class={"phase_container"}
            style={{
              color: getTextColor(),
            }}
          >
            {getPhase()}
          </div>
          <Timer />
        </div>
        <div
          class={"team_score"}
          style={{
            "background-color": getTColor(),
            color: getTextColor(),
          }}
        >
          {mapState().team_t.score}
        </div>
      </div>
      <MapScore />
    </div>


  );
}
