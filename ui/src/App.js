import { useState } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import DownloadHistory from "./components/DownloadHistory";
import EventHistory from "./components/EventHistory";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import history from "./History";

function App() {
  const [authData, setAuthData] = useState({});

  const onSuccessfullLogin = (authResult) => {
    history.push("/eventhistory");
    setAuthData(authResult);
  };

  const onLogout = () => setAuthData({});

  if (!authData.token) {
    return <Login onLogin={onSuccessfullLogin} />;
  }

  return (
    <BrowserRouter history={history}>
      <div className="container">
        <div className="row">
          <div className="col-md">
            <Navigation onLogout={onLogout} username={authData.username} />
            <Switch>
              <Route path="/eventhistory" component={EventHistory} />
              <Route path="/downloadhistory" component={DownloadHistory} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
