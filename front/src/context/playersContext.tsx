import { createContext, createEffect, createSignal } from "solid-js";
import { wsConnection } from "~/helpers/wsInit";

export interface IServerData {
  grenades: IGrenade[];
  allplayers: Record<string, IPlayer>[];
  bomb: IBomb;
  map: IMap;
  phase_countdowns: IPhase;
  player: IFocusedPlayer;
  round: IRound;
  auth: IAuth;
}

export interface IGrenade {
  owner: string;
  flames?: string[];
  position?: string;
  velocity?: string;
  lifetime: string;
  type: string;
}

export interface IWeapon {
  name: string;
  paintkit: string;
  type: string;
  ammo_clip?: number;
  ammo_clip_max?: number;
  ammo_reserve?: number;
  state: string;
}

export interface IPlayer {
  name: string;
  observer_slot: number;
  team: string;
  match_stats: {
    kills: number;
    assists: number;
    deaths: number;
    mvps: number;
    score: number;
  };
  position: string;
  forward: string;
  state?: {
    health: number;
    armor: number;
    helmet: boolean;
    flashed: number;
    smoked: number;
    burning: number;
    money: number;
    round_kills: number;
    round_killhs: number;
    round_totaldmg: number;
    equip_value: number;
  };
  weapons: IWeapon[];
}

export interface IBomb {
  state: string;
  position: string;
  player: string;
}

export interface IMap {
  round_wins: any;
  mode: string;
  name: string;
  phase: string;
  round: number;
  team_ct: {
    score: number;
    name: string;
    consecutive_round_losses: number;
    timeouts_remaining: number;
    matches_won_this_series: number;
  };
  team_t: {
    score: number;
    name: string;
    consecutive_round_losses: number;
    timeouts_remaining: number;
    matches_won_this_series: number;
  };
  num_matches_to_win_series: number;
}

export interface IPhase {
  phase: string;
  phase_ends_in: string;
}

export interface IFocusedPlayer {
  steamid: string;
  name: string;
  observer_slot?: number;
  team?: string;
  activity: string;
}

export interface IRound {
  phase: string;
}

export interface IAuth {
  token: string;
}

interface IPlayerContext {
  teamLeft: () => string[];
  teamRight: () => string[];
  players: () => Map<string, IPlayer>;
}

export const PlayersContext = createContext<IPlayerContext>({
  teamLeft: () => [],
  teamRight: () => [],
  players: () => new Map(),
});

const PlayerProvider = (props: { children: any }) => {
  const [teamLeft, setTeamLeft] = createSignal<string[]>([]);
  const [teamRight, setTeamRight] = createSignal<string[]>([]);
  const [players, setPlayers] = createSignal(new Map<string, IPlayer>());

  wsConnection.addEventListener(
    "message",
    function (event: MessageEvent<string>) {
      const allPlayersData = JSON.parse(event.data).allplayers;
      if (allPlayersData === undefined) {
        setPlayers(new Map());
        return;
      }
      setPlayers((state) => {
        if (allPlayersData === undefined) return state;
        let sortedKeys = Object.keys(allPlayersData).sort((a, b) => {
          return (
            //@ts-ignore
            allPlayersData[a].observer_slot - allPlayersData[b].observer_slot
          );
        });
        sortedKeys.forEach((key) => {
          //@ts-ignore
          state.set(key, allPlayersData[key]);
        });
        return new Map(state);
      });
      splitTeams();
    },
  );

  createEffect(() => {
    if (players().size === 0) {
      return;
    }
    const keys = Array.from(players().keys());
    setTeamRight(keys.slice(0, 5));
    setTeamLeft(keys.slice(5, 10));
  });

  const splitTeams = () => {
    const keys = [];
    for (const [key, value] of players().entries()) {
      keys.push(key);
    }
    setTeamRight(keys.slice(0, 5));
    setTeamLeft(keys.slice(5, 10));
  };

  return (
    <PlayersContext.Provider
      value={{
        teamLeft,
        teamRight,
        players,
      }}
    >
      {props.children}
    </PlayersContext.Provider>
  );
};

export default PlayerProvider;
