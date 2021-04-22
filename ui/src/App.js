import { useState } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import DownloadHistory from "./components/DownloadHistory";
import EventHistory from "./components/EventHistory";
import Login from "./components/Login";
import history from "./History";

function App() {
  const [token, setToken] = useState();

  const onSuccessfullLogin = (token) => {
    history.push('/eventhistory');
    setToken(token);
  };

  if (!token) {
    return <Login onLogin={onSuccessfullLogin} />;
  }

  return (
    <BrowserRouter history={history}>
      <div className="container">
        <div className="row">
          <Switch>
            <Route path="/eventhistory" component={EventHistory} />
            <Route path="/downloadhistory" component={DownloadHistory} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
