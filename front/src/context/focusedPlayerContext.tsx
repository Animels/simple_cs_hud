import { wsConnection } from "~/helpers/wsInit";
import { createContext, createSignal } from "solid-js";
import { IFocusedPlayer } from "~/context/playersContext";

interface IFocusedPlayerContext {
  focusedPlayerState: () => IFocusedPlayer;
}

const initFocusedPlayer: IFocusedPlayer = {
  steamid: "100",
  name: "init",
  observer_slot: 0,
  team: "init",
  activity: "init",
};

export const FocusedPlayerContext = createContext<IFocusedPlayerContext>({
  focusedPlayerState: () => initFocusedPlayer,
});

function FocusedPlayerProvider(props: { children: any }) {
  const [focusedPlayerState, setFocusedPlayer] =
    createSignal<IFocusedPlayer>(initFocusedPlayer);

  wsConnection.addEventListener(
    "message",
    function (event: MessageEvent<string>) {
      const focusedPlayerData: IFocusedPlayer = JSON.parse(event.data).player;
      if (
        focusedPlayerData === undefined ||
        focusedPlayerData.activity === "menu"
      ) {
        setFocusedPlayer(initFocusedPlayer);
        return;
      }
      setFocusedPlayer(() => focusedPlayerData);
    },
  );

  return (
    <FocusedPlayerContext.Provider
      value={{
        focusedPlayerState,
      }}
    >
      {props.children}
    </FocusedPlayerContext.Provider>
  );
}

export default FocusedPlayerProvider;
