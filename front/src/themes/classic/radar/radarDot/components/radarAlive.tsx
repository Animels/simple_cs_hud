import { createEffect, createMemo, useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./index.css";

interface IAliveProps {
  playerObserverSlot: number | undefined;
  playerTeam: string | undefined;
  a: number;
}

export default function RadarAlive(props: IAliveProps) {
  let circleElementRef: HTMLDivElement | undefined;
  const { getCTColor, getTColor } = useContext(ThemeContext);

  createEffect(() => {
    if (circleElementRef) {
      circleElementRef.style.transform = `rotate(${props.a}deg)`;
      if (props.playerTeam === "CT") {
        circleElementRef.style.backgroundColor = getCTColor();
      } else {
        circleElementRef.style.backgroundColor = getTColor();
      }
    }
  });

  const getObserverSlot = createMemo(() => {
    if (props?.playerObserverSlot === undefined) return "0";
    return props.playerObserverSlot + 1 === 10 ? "0" : props.playerObserverSlot;
  }, [props.playerObserverSlot]);

  return (
    <>
      <span class="radar_alive_observer_slot_span">{getObserverSlot()}</span>
      <div ref={circleElementRef} class={"radar_alive_circle_container"}>
        <div class={"radar_alive_circle_arrow"} />
      </div>
    </>
  );
}
