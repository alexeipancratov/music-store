import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import DownloadHistory from './components/DownloadHistory';
import EventHistory from './components/EventHistory';
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navigation />
          <Switch>
            <Route path="/" component={EventHistory} exact />
            <Route path="/downloadhistory" component={DownloadHistory} exact />
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
