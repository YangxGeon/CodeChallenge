import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Makefile from "./routes/Makefile";
import Allquiz from "./routes/Allquiz";
import Stepquiz from "./routes/Stepquiz";
import Typequiz from "./routes/Typequiz";
import MemberInfo from "./routes/Memberinfo";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/code">
          <Makefile />
        </Route>
        <Route path="/allquiz">
          <Allquiz />
        </Route>
        <Route path="/stepquiz">
          <Stepquiz />
        </Route>
        <Route path="/typequiz">
          <Typequiz />
        </Route>
        <Route path="/memberinfo">
          <MemberInfo />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
