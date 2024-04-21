import "./index.css";

export default function Grandes(props: { grenades: Map<string, string> }) {
  return (
    <div class={"grenades_container"}>
      {[...props.grenades].map((grenade) => {
        return <img src={grenade[1]} alt={""} />;
      })}
    </div>
  );
}
