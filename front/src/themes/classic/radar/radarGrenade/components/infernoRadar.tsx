import { For, useContext } from "solid-js";
import { MatchContext } from "~/context/matchContext";
import calculatePositions from "~/helpers/calculatePositions";
import "./index.css";

export default function InfernoRadar(props: {
  infernoPositions: string[] | undefined;
}) {
  const { mapConfigState } = useContext(MatchContext);
  if (!props.infernoPositions) return <></>;
  return (
    <>
      <For each={Object.values(props.infernoPositions)}>
        {(position) => {
          const [transformedX, transformedY, z] = calculatePositions(
            position,
            mapConfigState().map.pos_x,
            mapConfigState().map.pos_y,
            mapConfigState().map.scale,
            true,
          ) ?? [0, 0, 0];

          return (
            <div
              class={"grenade inferno_radar_container"}
              style={{
                top: `${transformedY}%`,
                left: `${transformedX}%`,
              }}
            ></div>
          );
        }}
      </For>
    </>
  );
}
