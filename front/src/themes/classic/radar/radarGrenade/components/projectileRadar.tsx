import fragIcon from "~/assets/radar/frag.svg";
import flashIcon from "~/assets/radar/flashbang.svg";
import { Ref } from "solid-js";
import { IGrenade } from "~/context/playersContext";
import "./index.css";

export default function ProjectileRadar(props: { grenade: IGrenade }) {
  let containerElementRefGrenade: Ref<any>;

  const getIcon = () => {
    if (props.grenade.type === "frag") {
      return fragIcon;
    }
    if (props.grenade.type === "flashbang") {
      return flashIcon;
    }
  };

  return (
    <img
      ref={containerElementRefGrenade}
      class={"grenade"}
      src={getIcon()}
      alt={""}
    />
  );
}
