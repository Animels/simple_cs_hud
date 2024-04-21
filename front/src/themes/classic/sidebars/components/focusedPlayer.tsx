import { FocusedPlayerContext } from "~/context/focusedPlayerContext";
import { createEffect, createSignal, useContext } from "solid-js";
import { IWeapon, PlayersContext } from "~/context/playersContext";
import { ThemeContext } from "~/context/themeContext";
import Armour from "~/components/armour";
import "./index.css";

export default function FocusedPlayer() {
  const [activeWeapon, setActiveWeapon] = createSignal<IWeapon>({
    name: "",
    paintkit: "",
    type: "",
    state: "",
  });
  const { focusedPlayerState } = useContext(FocusedPlayerContext);
  const { players } = useContext(PlayersContext);
  const { getTextColor, getBackgroundPlayerColor, getCTColor, getTColor } =
    useContext(ThemeContext);

  const getPlayer = () => {
    return players().get(focusedPlayerState().steamid);
  };

  createEffect(() => {
    if (getPlayer() === undefined) {
      return;
    } else {
      Object.values(getPlayer()!.weapons).forEach((weapon) => {
        if (weapon.state === "active") {
          setActiveWeapon(weapon);
        }
      });
    }
  });

  return (
    <div class={"focused_player_container"}>
      <div
        style={{
          "background-color": getBackgroundPlayerColor(),
          color: getTextColor(),
        }}
      >
        {getPlayer()?.name && <span>{getPlayer()!.name}</span>}
        {getPlayer()?.name && (
          <Armour
            armor={getPlayer()?.state?.armor}
            helmet={getPlayer()?.state?.helmet}
          />
        )}
      </div>
      <div
        style={{
          "background-color":
            getPlayer()?.team === "T" ? getTColor() : getCTColor(),
          color: getTextColor(),
        }}
      >
        <div class={"flex flex-row"}>
          K {getPlayer()?.match_stats.kills} / D{" "}
          {getPlayer()?.match_stats.deaths}
        </div>
        <div class={"flex flex-row"}>
          {activeWeapon().ammo_clip ?? "--"}/
          {activeWeapon().ammo_clip_max ?? "--"}
        </div>
      </div>
    </div>
  );
}
