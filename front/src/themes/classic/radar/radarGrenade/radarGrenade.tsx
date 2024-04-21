import { IGrenade } from "~/context/playersContext";
import { createEffect, createMemo, Ref, useContext } from "solid-js";
import { MatchContext } from "~/context/matchContext";
import InfernoRadar from "~/themes/classic/radar/radarGrenade/components/infernoRadar";
import SmokeRadar from "~/themes/classic/radar/radarGrenade/components/smokeRadar";
import ProjectileRadar from "~/themes/classic/radar/radarGrenade/components/projectileRadar";
import calculatePositions from "~/helpers/calculatePositions";
import "./index.css";

export default function RadarGrenade(props: {
  grenade: IGrenade | undefined;
  key: string;
}) {
  let containerElementRefGrenade: Ref<any>;
  const { mapConfigState } = useContext(MatchContext);

  createEffect(() => {
    if (props.grenade?.position === undefined) return;
    const [transformedX, transformedY, z] = calculatePositions(
      props.grenade.position,
      mapConfigState().map.pos_x,
      mapConfigState().map.pos_y,
      mapConfigState().map.scale,
    ) ?? [0, 0, 0];
    containerElementRefGrenade.style.top = `${transformedY}%`;
    containerElementRefGrenade.style.left = `${transformedX}%`;
    containerElementRefGrenade.style.zIndex = `${z}`;
  });

  const getInferno = createMemo(() => {
    return props.grenade?.type === "inferno";
  }, [props.grenade?.type]);

  return (
    <>
      <div
        ref={containerElementRefGrenade}
        class={"radar_grenade_projectile_container"}
      >
        {props.grenade?.type === "smoke" && <SmokeRadar />}
        {props.grenade?.type === "frag" ||
          (props.grenade?.type === "flashbang" && (
            <ProjectileRadar grenade={props.grenade} />
          ))}
      </div>

      {getInferno() && (
        <InfernoRadar infernoPositions={props.grenade!.flames} />
      )}
    </>
  );
}
