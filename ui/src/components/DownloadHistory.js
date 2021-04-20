import React from 'react';
import axios from 'axios';
import Navigation from './Navigation';

class DownloadHistory extends React.Component {
  state = {
    downloads: []
  };

  componentDidMount() {
    axios.get('http://localhost:3001/downloadHistory')
      .then(
        (res) => this.setState({ downloads: res.data }),
        (error) => console.log(error));
  }

  render() {
    return (
      <div className="col-md">
        <Navigation />
        <h2>Download History</h2>
        <table id="historyTable" className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Song ID</th>
              <th>Socket ID</th>
            </tr>
          </thead>
          <tbody>
            {this.state.downloads.map(d =>
              <tr key={d._id}>
                <td>{d._id}</td>
                <td>{new Date(d.downloadTime).toLocaleDateString()}</td>
                <td>{new Date(d.downloadTime).toLocaleTimeString()}</td>
                <td>{d.songId}</td>
                <td>{d.socket}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DownloadHistory;