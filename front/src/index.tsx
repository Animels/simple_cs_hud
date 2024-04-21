import { render } from "solid-js/web";
import { Route,  Router } from "@solidjs/router";
import Admin from "~/routes/admin";
import Layout from "~/routes/hud";
import wsInit from "~/helpers/wsInit";
import "./app.css";
import NotFound from "~/routes/[...404]";

const root = document.getElementById("root");

wsInit();

const App = (props: any) => {
  return (
    <>
      {props.children}
    </>
  );
}
render(
  () => (
    <Router root={App}>
      <Route path="/admin" component={Admin} />
      <Route path="/hud" component={Layout} />
      <Route path="*404" component={NotFound} />
    </Router>
  ),
  root!
);
