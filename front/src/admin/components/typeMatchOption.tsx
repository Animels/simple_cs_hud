import { ThemeContext } from "~/context/themeContext";
import { createSignal, For, useContext } from "solid-js";


export default function TypeMatchOption() {
  const { themeState, set_key } = useContext(ThemeContext);
  const [inputStateType, setInputStateType] = createSignal(
    themeState().type_of_match
  );



  const onChangeType = (event: Event & { currentTarget: HTMLInputElement, target: HTMLInputElement }) => {
    setInputStateType(() => {
      const newState = {
        bo1: false,
        bo3: false,
        bo5: false,
        bo7: false
      };
      return {
        ...newState,
        [event.target?.value]: true
      };
    });
    set_key("type_of_match", inputStateType());
  };



  return (
      <div class={"theme_option_container type_and_score_container"}>
        <span>type of match</span>
        <span>Here you can choose type of match</span>
        <div class={"team_type_of_match_input_container"}>
        <For each={Object.keys(themeState().type_of_match)}>
          {(key) => (
            <>
              <input type="radio"
                     id={key}
                     name="match_type"
                     value={key}
                     checked={themeState().type_of_match[key as keyof typeof themeState]}
                     onChange={(event) => onChangeType(event)} />
              <span>{key}</span>
            </>
          )}
        </For>
        </div>
      </div>
  );
}
