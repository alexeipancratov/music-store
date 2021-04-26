import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from "../services/authService";

const DownloadHistory = () => {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    const options = {
      headers: { Authorization: `bearer ${authService.getAuthData()?.token}` },
    };
    axios.get("/admin/downloadHistory", options).then(
      (res) => setDownloads(res.data),
      (error) => console.log(error)
    );
  }, []);

  return (
    <>
      <h2>Download History</h2>
      {!downloads.length ? (
        <div className="align-center-horizontal">
          <div className="loader"></div>
        </div>
      ) : (
        <table className="history-table">
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
            {downloads.map((d) => (
              <tr key={d._id}>
                <td>{d._id}</td>
                <td>{new Date(d.downloadTime).toLocaleDateString()}</td>
                <td>{new Date(d.downloadTime).toLocaleTimeString()}</td>
                <td>{d.songId}</td>
                <td>{d.socket}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default DownloadHistory;
