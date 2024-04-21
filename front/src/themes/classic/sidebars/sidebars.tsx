import { For, useContext } from "solid-js";
import { PlayersContext } from "~/context/playersContext";
import SidebarPlayer from "~/themes/classic/sidebars/components/sidebarPlayer/sidebarPlayer";
import FocusedPlayer from "~/themes/classic/sidebars/components/focusedPlayer";
import "./index.css";

export default function Sidebars() {
  const { teamLeft, teamRight, players } = useContext(PlayersContext);

  const getPlayer = (key: string) => {
    return players().get(key);
  };

  return (
    <div class={"sidebars_container"}>
      <div class={"sidebars_players_container"}>
        <For each={teamLeft()}>
          {(key) => {
            if (getPlayer(key)) {
              return <SidebarPlayer player={getPlayer(key)!} right={false} />;
            }
          }}
        </For>
      </div>
      {players().size > 0 && <FocusedPlayer />}
      <div class={"sidebars_players_container right"}>
        <For each={teamRight()}>
          {(key) => {
            if (getPlayer(key)) {
              return <SidebarPlayer player={getPlayer(key)!} right={true} />;
            }
          }}
        </For>
      </div>
    </div>
  );
}
