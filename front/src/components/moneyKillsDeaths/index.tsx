import Kills from "~/components/kills";
import Deaths from "~/components/deaths";
import Money from "~/components/money";
import { Match, Switch } from "solid-js";
import { IPlayer } from "~/context/playersContext";
import "./index.css";

export default function MoneyKillsDeaths(props: {
  player: IPlayer | undefined;
  right: boolean;
}) {
  return (
    <div class={"money_kills_deaths_container"}>
      <Switch>
        <Match when={props.right}>
          <div class={"money_container right"}>
            <Money money={props.player?.state?.money} />
          </div>
          <div class={"kills_deaths_container right"}>
            <Kills kills={props.player?.match_stats.kills} />
            <Deaths deaths={props.player?.match_stats.deaths} />
          </div>
        </Match>
        <Match when={!props.right}>
          <div class={"money_container"}>
            <Money money={props.player?.state?.money} />
          </div>
          <div class={"kills_deaths_container"}>
            <Kills kills={props.player?.match_stats.kills} />
            <Deaths deaths={props.player?.match_stats.deaths} />
          </div>
        </Match>
      </Switch>
    </div>
  );
}
