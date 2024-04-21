import { createEffect, createSignal, For, useContext } from "solid-js";
import { PlayersContext } from "~/context/playersContext";
import { MatchContext } from "~/context/matchContext";
import RadarDot from "~/themes/classic/radar/radarDot/radarDot";
import { GrenadesContext } from "~/context/grenadesContext";
import RadarGrenade from "~/themes/classic/radar/radarGrenade/radarGrenade";
import importMapImage from "~/helpers/importMapImage";
import map from "~/assets/maps/simpleradar/de_cache.webp"
import "./index.css";

export default function Radar() {
  const { teamLeft, teamRight, players } = useContext(PlayersContext);
  const { grenadeState, grenadeList } = useContext(GrenadesContext);
  const { mapConfigState } = useContext(MatchContext);
  const [mapImage, setMapImage] = createSignal(null);

  const getPlayer = (key: string) => {
    return players().get(key);
  };

  const getGrenade = (key: string) => {
    return grenadeState().get(key);
  };

  createEffect(() => {
    importMapImage(mapConfigState().imagePath).then((image) => {
      setMapImage(() => {
        return image;
      });
    });
  }, [mapConfigState().imagePath]);

  return (
    <div class={"radar_container"}>
      <img class={"radar_container_img"} src={mapImage() ?? map as string} alt={"Map image"} />
      <For each={[...teamLeft(), ...teamRight()]}>
        {(key) => {
          return <RadarDot player={getPlayer(key)} />;
        }}
      </For>
      <For each={grenadeList()}>
        {(key) => {
          return <RadarGrenade grenade={getGrenade(key)} key={key} />;
        }}
      </For>
    </div>
  );
}
