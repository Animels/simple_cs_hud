import { createSignal, For, useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./index.css";

export default function ScoreOption() {
  const { themeState, set_key } = useContext(ThemeContext);
  const [inputStateScore, setInputStateScore] = createSignal(
    themeState().score
  );

  const onChangeScore = (event: Event & { currentTarget: HTMLInputElement, target: HTMLInputElement }, key: string) => {
    setInputStateScore(() => ({ ...themeState().score, [key]: event.target.value }));
    set_key("score", inputStateScore());
  };

  return <div class={"theme_option_container"}>
    <span>score</span>
    <span>Here you should write score for teams if type of match is not bo1</span>
    <For each={Object.keys(themeState().score)}>
      {(key) => (
        <div class={"team_score_input_container"}>
          <span>{key}: {themeState().score[key as keyof typeof themeState]}</span>
          <input type={"number"} value={themeState().score[key as keyof typeof themeState]}
                 onChange={(event) => onChangeScore(event, key)} />

        </div>
      )}
    </For>
  </div>;
}
