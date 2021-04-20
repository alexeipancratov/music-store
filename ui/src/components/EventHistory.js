import React from "react";
import axios from "axios";
import Navigation from "./Navigation";

class EventHistory extends React.Component {
  state = {
    events: []
  };

  componentDidMount() {
    axios.get('http://localhost:3001/eventHistory')
      .then(
        (res) => this.setState({ events: res.data }),
        (error) => console.log(error));
  }

  render() {
    return (
      <div>
        <Navigation />
        <table id="historyTable">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Event ID</th>
              <th>Socket ID</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map(e =>
              <tr key={e._id}>
                <td>{e.type}</td>
                <td>{new Date(e.eventTime).toLocaleDateString()}</td>
                <td>{new Date(e.eventTime).toLocaleTimeString()}</td>
                <td>{e._id}</td>
                <td>{e.socket}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EventHistory;
