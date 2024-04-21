import { wsConnection } from "~/helpers/wsInit";
import { createContext, createMemo, createSignal, useContext } from "solid-js";
import { IMap, IPhase, IRound } from "~/context/playersContext";
import maps from "~/assets/maps/maps_coordinates.json";
import { ThemeContext } from "~/context/themeContext";

interface IMatchContext {
  mapState: () => IMap;
  roundState: () => IRound;
  phaseState: () => IPhase;
  mapConfigState: () => IMapConfig;
}

type IMapJSON = {
  pos_x: number;
  pos_y: number;
  scale: number;
  zoom: number;

  CTSpawn_x: number;
  CTSpawn_y: number;
  TSpawn_x: number;
  TSpawn_y: number;
};

interface IMapConfig {
  map: IMapJSON;
  imagePath: string;
}

const initMapState: IMap = {
  round_wins: "0",
  mode: "init",
  name: "de_vertigo",
  phase: "init",
  round: 0,
  team_ct: {
    score: 0,
    name: "init",
    consecutive_round_losses: 0,
    timeouts_remaining: 0,
    matches_won_this_series: 0,
  },
  team_t: {
    score: 0,
    name: "init",
    consecutive_round_losses: 0,
    timeouts_remaining: 0,
    matches_won_this_series: 0,
  },
  num_matches_to_win_series: 0,
};

const initRoundState: IRound = {
  phase: "init",
};

const initPhaseState: IPhase = {
  phase: "init",
  phase_ends_in: "100",
};

const initMapConfigState: IMapConfig = {
  imagePath: "",
  map: {
    pos_x: 0,
    pos_y: 0,
    scale: 0,
    zoom: 0,
    CTSpawn_x: 0,
    CTSpawn_y: 0,
    TSpawn_x: 0,
    TSpawn_y: 0,
  },
};

export const MatchContext = createContext<IMatchContext>({
  mapState: () => initMapState,
  roundState: () => initRoundState,
  phaseState: () => initPhaseState,
  mapConfigState: () => initMapConfigState,
});

function MatchProvider(props: { children: any }) {
  const [mapState, setMapState] = createSignal<IMap>(initMapState);
  const [mapConfigState, setMapConfigState] =
    createSignal<IMapConfig>(initMapConfigState);
  const [roundState, setRoundState] = createSignal<IRound>(initRoundState);
  const [phaseState, setPhaseState] = createSignal<IPhase>(initPhaseState);
  const { getRadarImagesPath } = useContext(ThemeContext);

  const getMapConfig = createMemo(() => {
    return maps[mapState().name as keyof typeof maps] as IMapJSON;
  }, [mapState().name]);

  wsConnection.addEventListener(
    "message",
    function (event: MessageEvent<string>) {
      const phaseData: IPhase = JSON.parse(event.data).phase_countdowns;
      const roundData: IRound = JSON.parse(event.data).round;
      const mapData: IMap = JSON.parse(event.data).map;
      if (!phaseData) {
        setPhaseState(initPhaseState);
        return;
      }
      if (!roundData) {
        setRoundState(initRoundState);
        return;
      }
      if (!mapData) {
        setMapState(initMapState);
        return;
      }

      setPhaseState(() => phaseData);
      setRoundState(() => roundData);
      setMapState(() => mapData);
      setMapConfigState(() => {
        return {
          map: getMapConfig(),
          imagePath: `../assets/maps/${getRadarImagesPath()}/${mapData.name}.webp`,
        };
      });
    },
  );

  return (
    <MatchContext.Provider
      value={{
        mapState,
        roundState,
        phaseState,
        mapConfigState,
      }}
    >
      {props.children}
    </MatchContext.Provider>
  );
}

export default MatchProvider;
