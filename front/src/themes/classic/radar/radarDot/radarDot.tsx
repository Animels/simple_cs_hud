import { createEffect, createSignal, Ref, useContext } from "solid-js";
import { MatchContext } from "~/context/matchContext";
import { IPlayer } from "~/context/playersContext";
import RadarAlive from "~/themes/classic/radar/radarDot/components/radarAlive";
import RadarDead from "~/themes/classic/radar/radarDot/components/radarDead";
import calculatePositions from "~/helpers/calculatePositions";
import "./index.css";

export default function RadarDot(props: { player: IPlayer | undefined }) {
  const [isAlive, setIsAlive] = createSignal(true);
  const { mapConfigState } = useContext(MatchContext);
  let containerElementRef: Ref<any>;

  const calculateAngle = () => {
    const [x, y] = props.player?.forward.split(",") ?? [0, 0];

    const radians = Math.atan2(Number(x), Number(y));
    const degrees = (180 * radians) / Math.PI;

    return (360 + Math.round(degrees) + 45) % 360;
  };

  createEffect(() => {
    if (props.player?.state === undefined) return;
    setIsAlive(props?.player.state.health > 0);
    if (!isAlive()) {
      return;
    }

    const [transformedX, transformedY, z] = calculatePositions(
      props.player.position,
      mapConfigState().map.pos_x,
      mapConfigState().map.pos_y,
      mapConfigState().map.scale,
    ) ?? [0, 0, 0];
    containerElementRef.style.top = `${transformedY}%`;
    containerElementRef.style.left = `${transformedX}%`;
    containerElementRef.style.zIndex = `${z}`;
  });

  return (
    <div class="radar_dot_container" ref={containerElementRef}>
      {isAlive() ? (
        <RadarAlive
          playerObserverSlot={props.player?.observer_slot}
          playerTeam={props.player?.team}
          a={calculateAngle()}
        />
      ) : (
        <RadarDead
          playerObserverSlot={props.player?.observer_slot}
          playerTeam={props.player?.team}
        />
      )}
    </div>
  );
}
