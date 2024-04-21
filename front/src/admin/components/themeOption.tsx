import { createSignal, useContext } from "solid-js";
import { ThemeContext } from "~/context/themeContext";
import "./index.css"
export default function ThemeOption(props: {
  key: string;
  tip: string;
  type: string;
}) {
  const { themeState, set_key } = useContext(ThemeContext);
  const [inputState, setInputState] = createSignal(
    themeState()[props.key as keyof typeof themeState],
  );

  const onChange = (event: any) => {
    setInputState(event.srcElement.value);
    set_key(props.key, inputState());
  };


  return (
    <div
      class={
        "theme_option_container"
      }
    >
      <span>{props.key}</span>
      <span>{props.tip}</span>
      <div class={"theme_option_input_container"}>
        <input
          type={props.type}
          value={inputState()}
          onChange={(event) => onChange(event)}
        />
      </div>
    </div>
  );
}
