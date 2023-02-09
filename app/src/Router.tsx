import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Quiz from "./routes/Quiz";
import Allquiz from "./routes/All";
import Stepquiz from "./routes/Unique";
import Typequiz from "./routes/Hard";
import MemberInfo from "./routes/Popular";
import Codesubmit from "./routes/Codesubmit";
import Result from "./routes/Result";
import Manager from "./routes/Manager";
import JoinForm from "./routes/SignUpForm";
import LoginForm from "./routes/LoginForm";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/manager">
          <Manager></Manager>
        </Route>
        <Route path="/all/:quizId/result">
          <Result></Result>
        </Route>
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
        <Route path='/signup'>
          <JoinForm />
        </Route>
        <Route path='/loginForm'>
          <LoginForm />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
