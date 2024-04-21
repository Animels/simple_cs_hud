import { For, useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./admin.css";
import ThemeOption from "~/admin/components/themeOption";
import TypeMatchOption from "~/admin/components/typeMatchOption";
import ScoreOption from "~/admin/components/scoreOption";

export default function AdminPage() {
  const { themeState, resetTheme } = useContext(ThemeContext);

  //TODO СДЕЛАТЬ счет по картам

  return (
    <div class={"admin_main_container"}>
      <div
        class={
          "settings_list_container"
        }
      >
        <For each={Object.keys(themeState())}>
          {(key) => {
            if (key.includes("tip_")) return;
            if (key.includes("score")) return <ScoreOption/>;
            if (key.includes("type_")) return <TypeMatchOption/>
            return (
              <ThemeOption
                key={key}
                tip={themeState()[("tip_" + key) as keyof typeof themeState]}
                type={key.includes("type_") ? key.includes("_color") ? "color" : "selector" : "text"}
              />
            );
          }}
        </For>
      </div>
      <button
        class={"hud_button"}
        onClick={() =>
          window.open("http://" + window.location.host + "/hud", "_blank")
        }
      >
        Open HUD
      </button>
      <button
        class={"hud_button reset"}
        onClick={() => {
          resetTheme();
          window.location.reload();
        }}
      >
        Reset HUD
      </button>
    </div>
  );
}
