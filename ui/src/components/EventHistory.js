import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from "../services/authService";

const EventHistory = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const options = {
      headers: { Authorization: `bearer ${authService.getAuthData()?.token}` },
    };
    axios.get("/admin/eventHistory", options).then(
      (res) => setEvents(res.data),
      (error) => console.log(error)
    );
  }, []);

  return (
    <>
      <h2>Event History</h2>
      {!events.length ? (
        <div className="align-center-horizontal">
          <div className="loader"></div>
        </div>
      ) : (
        <table className="history-table">
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
            {events.map((e) => (
              <tr key={e._id}>
                <td>{e.type}</td>
                <td>{new Date(e.eventTime).toLocaleDateString()}</td>
                <td>{new Date(e.eventTime).toLocaleTimeString()}</td>
                <td>{e._id}</td>
                <td>{e.socket}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default EventHistory;
