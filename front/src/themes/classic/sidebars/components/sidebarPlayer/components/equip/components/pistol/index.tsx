import "./index.css";

export default function Pistol(props: { image: string }) {
  return (
    <div class={"pistol_container"}>
      <img src={props.image} alt={""} />
    </div>
  );
}
