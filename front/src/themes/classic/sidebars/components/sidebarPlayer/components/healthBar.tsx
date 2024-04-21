import {
  createEffect,
  createMemo,
  createSignal,
  Match,
  Switch,
  useContext,
} from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import HealthInfo from "~/components/healthInfo";
import UserName from "~/components/playerName";
import Armour from "~/components/armour";
import { IPlayer } from "~/context/playersContext";
import "./index.css";

export default function HealthBar(props: {
  player: IPlayer | undefined;
  right: boolean;
}) {
  const [isAlive, setIsAlive] = createSignal(true);
  const { getCTHPColor, getTHPColor } = useContext(ThemeContext);

  const background = createMemo(() => {
    if (props.player?.team === "T") {
      return getTHPColor();
    } else if (props.player?.team === "CT") {
      return getCTHPColor();
    }
  });

  createEffect(() => {
    if (props.player?.state === undefined) {
      return;
    }
    if (props.player.state?.health <= 0) {
      setIsAlive(false);
    } else {
      setIsAlive(true);
    }
  });

  return (
    <div class={"healthbar_container"}>
      <Switch>
        <Match when={props.right}>
          <div class={"healthbar_bg"} />
          <div
            class={"healthbar_bar right"}
            style={{
              width: `${props.player?.state?.health}%`,
              "background-color": background(),
            }}
          />
        </Match>
        <Match when={!props.right}>
          <div class={"healthbar_bg"} />
          <div
            class={"healthbar_bar"}
            style={{
              width: `${props.player?.state?.health}%`,
              "background-color": background(),
            }}
          />
        </Match>
      </Switch>
      <Switch>
        <Match when={props.right}>
          <div class={"healthbar_info_container"}>
            {isAlive() && <HealthInfo health={props.player?.state?.health} />}
            <UserName name={props.player?.name} />
            {isAlive() && (
              <Armour
                armor={props.player?.state?.armor}
                helmet={props.player?.state?.helmet}
              />
            )}
          </div>
        </Match>
        <Match when={!props.right}>
          <div class={"healthbar_info_container"}>
            {isAlive() && (
              <Armour
                armor={props.player?.state?.armor}
                helmet={props.player?.state?.helmet}
              />
            )}
            <UserName name={props.player?.name} />
            {isAlive() && <HealthInfo health={props.player?.state?.health} />}
          </div>
        </Match>
      </Switch>
    </div>
  );
}
