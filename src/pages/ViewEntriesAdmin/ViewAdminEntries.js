import React, { useState, useEffect } from "react";
import { Form, Button, Table, Container } from "react-bootstrap";
import "./ViewAdminEntries.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllLogs, updateProjectLogStatus } from "../../store/actions";
const ManualEntry = () => {
  const dispatch = useDispatch();
  const [logsData, setLogs] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllLogs());
  }, []);

  const { logs } = useSelector((state) => state.project);

  const updateStatus = (e, statusValue, id) => {
    dispatch(updateProjectLogStatus({ status: statusValue, id }));
    dispatch(getAllLogs());
  };

  useEffect(() => {
    setLogs(logs)
  }, [logs])

  return (
    <Container fluid>
      <div className="page-wrapper">
        <h1 className="d-flex page-title">View Entries</h1>
        <div className="table-logs d-block">
          <Table bordered hover className='white-bg'>
            <thead>
              <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Project Name</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {logs &&
                logs.map((log, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{log?.Task?.name}</td>
                    <td>{log?.Project?.name}</td>
                    <td>{log?.date}</td>
                    <td>{log?.time}</td>
                    <td>{log?.status}</td>

                    <td>
                      <Button
                        disabled={log?.status !== "pending"}
                        onClick={(e) => updateStatus(e, "accepted", log?.id)}
                        variant="success"
                      >
                        Accept
                      </Button>
                      <Button
                        disabled={log?.status !== "pending"}
                        onClick={(e) => updateStatus(e, "rejected", log?.id)}
                        variant="danger"
                        className="ml-1"
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              {logs.length === 0 && (
                <tr className='table-placeholder'>
                  <td colSpan={7}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      No records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default ManualEntry;
