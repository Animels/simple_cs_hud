import { wsConnection } from "~/helpers/wsInit";
import { createContext, createEffect, createSignal } from "solid-js";
import { IGrenade, IPlayer } from "~/context/playersContext";

interface IGrenadesContext {
  grenadeState: () => Map<string, IGrenade>;
  removeGrenade: (key: string) => void;
  grenadeList: () => string[];
}

export const GrenadesContext = createContext<IGrenadesContext>({
  grenadeState: () => new Map(),
  removeGrenade: () => {},
  grenadeList: () => [],
});

function GrenadesProvider(props: { children: any }) {
  const [grenadeState, setGrenadesState] = createSignal<Map<string, IGrenade>>(
    new Map(),
    { equals: false },
  );
  const [grenadeList, setGrenadeList] = createSignal<string[]>([]);

  wsConnection.addEventListener(
    "message",
    function (event: MessageEvent<string>) {
      const grenadesData = JSON.parse(event.data).grenades;
      if (grenadesData === undefined) {
        setGrenadesState(new Map());
        return;
      }
      setGrenadesState((state) => {
        if (grenadesData === undefined) return state;
        Object.keys(grenadesData).forEach((key) => {
          state.set(key, grenadesData[key]);
        });
        grenadeState().forEach((value, key) => {
          if (!grenadesData[key]) {
            state.delete(key);
          }
        });
        return new Map(state);
      });
    },
  );

  createEffect(() => {
    if (grenadeState().size === 0) {
      return;
    }
    const keys = Array.from(grenadeState().keys());
    setGrenadeList(keys);
  });

  const removeGrenade = (key: string) => {
    setGrenadesState((state) => {
      state.delete(key);
      return state;
    });
    setGrenadeList((state) => {
      state.splice(state.indexOf(key), 1);
      return state;
    });
  };

  return (
    <GrenadesContext.Provider
      value={{
        grenadeState,
        removeGrenade,
        grenadeList,
      }}
    >
      {props.children}
    </GrenadesContext.Provider>
  );
}

export default GrenadesProvider;
