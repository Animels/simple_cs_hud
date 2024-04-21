import {
  createEffect,
  createSignal,
  Match,
  Switch,
  useContext,
} from "solid-js";
import { IPlayer } from "~/context/playersContext";
import { ThemeContext } from "~/context/themeContext";
import HealthBar from "~/themes/classic/sidebars/components/sidebarPlayer/components/healthBar";
import Equip from "~/themes/classic/sidebars/components/sidebarPlayer/components/equip/equip";
import MoneyKillsDeaths from "~/components/moneyKillsDeaths/index";
import "./index.css";

interface ISidebarPlayer {
  player: IPlayer | undefined;
  right: boolean;
}

export default function SidebarPlayer(props: ISidebarPlayer) {
  const [isAlive, setIsAlive] = createSignal(true);
  const { getTextColor, getBackgroundPlayerColor } = useContext(ThemeContext);
  createEffect(() => {
    if (props.player?.state === undefined) return;
    if (props.player.state.health <= 0) {
      setIsAlive(false);
    } else {
      setIsAlive(true);
    }
  }, [props.player]);

  return (
    <div
      class={`${isAlive() ? "animation-grow" : "animation-shrink"} sidebar_player_container`}
      style={{
        "background-color": getBackgroundPlayerColor(),
        width: isAlive() ? "100%" : "50%",
      }}
    >
      <HealthBar {...props} />
      <Switch>
        <Match when={props.right}>
          <div class="sidebar_player_info_container right">
            <MoneyKillsDeaths {...props} />
            {isAlive() && <Equip player={props.player} />}
            {!isAlive() && (
              <span class={"reverse"} style={{ color: getTextColor() }}>
                ADR {props.player?.state?.round_totaldmg}
              </span>
            )}
          </div>
        </Match>
        <Match when={!props.right}>
          <div class={"sidebar_player_info_container"}>
            <MoneyKillsDeaths {...props} />
            {isAlive() && <Equip player={props.player} />}
            {!isAlive() && (
              <span style={{ color: getTextColor() }}>
                ADR {props.player?.state?.round_totaldmg}
              </span>
            )}
          </div>
        </Match>
      </Switch>
    </div>
  );
}
