import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import DownloadHistory from './components/DownloadHistory';
import EventHistory from './components/EventHistory';
import Login from "./components/Login";
import history from "./History";

function App() {
  return (
    <BrowserRouter history={history}>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/eventhistory" component={EventHistory} />
            <Route path="/downloadhistory" component={DownloadHistory} />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
