import { createEffect, useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./index.css";

interface IAliveProps {
  playerObserverSlot: number | undefined;
  playerTeam: string | undefined;
}

export default function RadarDead(props: IAliveProps) {
  let deadElementRef: HTMLDivElement | undefined,
    crossElementRefOne: HTMLDivElement | undefined,
    crossElementRefTwo: HTMLDivElement | undefined;
  const { getCTColor, getTColor } = useContext(ThemeContext);

  createEffect(() => {
    if (deadElementRef && crossElementRefOne && crossElementRefTwo) {
      if (props.playerTeam === "CT") {
        crossElementRefOne.style.backgroundColor = getCTColor();
        crossElementRefTwo.style.backgroundColor = getCTColor();
      } else {
        crossElementRefOne.style.backgroundColor = getTColor();
        crossElementRefTwo.style.backgroundColor = getTColor();
      }
    }
  });

  return (
    <>
      <div ref={deadElementRef}>
        <div ref={crossElementRefOne} class="cross_element"></div>
        <div ref={crossElementRefTwo} class="cross_element second"></div>
      </div>
    </>
  );
}
