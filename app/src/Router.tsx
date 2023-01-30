import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Quiz from "./routes/Quiz";
import Allquiz from "./routes/All";
import Stepquiz from "./routes/Unique";
import Typequiz from "./routes/Hard";
import MemberInfo from "./routes/Popular";
import Codesubmit from "./routes/Codesubmit";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/all/:quizId/">
          <Quiz></Quiz>
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
