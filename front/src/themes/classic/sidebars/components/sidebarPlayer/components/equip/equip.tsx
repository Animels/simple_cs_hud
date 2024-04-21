import { createEffect, createSignal } from "solid-js";
import c4Image from "~/assets/main/c4.svg";
import { IPlayer, IWeapon } from "~/context/playersContext";
import importWeaponImage from "~/helpers/importWeaponImage";
import "./index.css";
import Pistol from "~/themes/classic/sidebars/components/sidebarPlayer/components/equip/components/pistol";
import Grandes from "~/themes/classic/sidebars/components/sidebarPlayer/components/equip/components/grenades";
import MainWeapon from "~/themes/classic/sidebars/components/sidebarPlayer/components/equip/components/mainWeapon";

export default function Equip(props: { player: IPlayer | undefined }) {
  const [equipState, setEquipState] = createSignal({
    pistol: undefined as IWeapon | undefined,
    pistolImage: "",
    mainWeapon: undefined as IWeapon | undefined,
    mainWeaponImage: "",
    grenades: new Map() as Map<string, string>,
    c4: false,
  });

  createEffect(() => {
    if (!props.player) return;
    Object.entries(props.player?.weapons).forEach(([, weapon]) => {
      let image = importWeaponImage(weapon.name);
      image.then((file) => {
        if (weapon.type === "C4") {
          setEquipState((state) => ({ ...state, c4: true }));
        }
        if (weapon.type === "Pistol") {
          setEquipState((state) => ({
            ...state,
            pistol: weapon,
            pistolImage: file,
          }));
        } else if (
          ["Rifle", "Shotgun", "Submachine Gun"].includes(weapon.type)
        ) {
          setEquipState((state) => ({
            ...state,
            mainWeapon: weapon,
            mainWeaponImage: file,
          }));
        }
        if (weapon.type === "Grenade") {
          setEquipState((state) => {
            const check = state.grenades.get(weapon.name);
            if (check) {
              return state;
            }
            state.grenades.set(weapon.name, file);
            return state;
          });
        }
      });
    });
  }, [props.player?.weapons]);

  return (
    <>
      <div class={"equip_container"}>
        {equipState().pistol && <Pistol image={equipState().pistolImage} />}
        {equipState().grenades && <Grandes grenades={equipState().grenades} />}
        {equipState().c4 && <img class={"c4_icon"} src={c4Image} alt={""} />}
        {equipState().mainWeapon && (
          <MainWeapon image={equipState().mainWeaponImage} />
        )}
      </div>
    </>
  );
}
