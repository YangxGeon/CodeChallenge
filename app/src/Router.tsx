import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Makefile from "./routes/Makefile";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/code">
          <Makefile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
