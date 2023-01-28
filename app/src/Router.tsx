import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Makefile from "./routes/Makefile";
import Allquiz from "./routes/All";
import Stepquiz from "./routes/Unique";
import Typequiz from "./routes/Hard";
import MemberInfo from "./routes/Popular";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/all/:quizId">
          <Makefile />
        </Route>
        <Route path="/all">
          <Allquiz />
        </Route>
        <Route path="/popular">
          <Stepquiz />
        </Route>
        <Route path="/hard">
          <Typequiz />
        </Route>
        <Route path="/unique">
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
