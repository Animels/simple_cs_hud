import { wsConnection } from "~/helpers/wsInit";
import { createContext, createSignal } from "solid-js";
import { IBomb } from "~/context/playersContext";

interface IBombContext {
  bombState: () => IBomb;
}

const initBombState: IBomb = {
  state: "init",
  position: "0",
  player: "init",
};

export const BombContext = createContext<IBombContext>({
  bombState: () => initBombState,
});

function BombProvider(props: { children: any }) {
  const [bombState, setBombState] = createSignal<IBomb>(initBombState);

  wsConnection.addEventListener(
    "message",
    function (event: MessageEvent<string>) {
      const bombData: IBomb = JSON.parse(event.data).bomb;
      if (!bombData) {
        setBombState(initBombState);
        return;
      }
      setBombState(() => bombData);
    },
  );

  return (
    <BombContext.Provider
      value={{
        bombState,
      }}
    >
      {props.children}
    </BombContext.Provider>
  );
}

export default BombProvider;
