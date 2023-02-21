import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Table,
  Modal,
  Container,
  Row,
  Col, 
} from "react-bootstrap";
import "./viewEntry.css";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {
  getProjects,
  getProjectTasks,
  clearTasks,
  getLogsByProjectId,
  getTasksByUserId,
  getLogsByTaskId,
  getLogsByViewTYPE,
  updateProjectLogs,
  clearLogsValues,
} from "../../store/actions";
import { Tabs, Tab } from "react-bootstrap";
import EditIcon from "../../components/EditIcon/EditIcon";
import DatePicker from "react-datepicker";
const ManualEntry = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getProjects());
    dispatch(getTasksByUserId(user?.id));
  }, []);

  const { projects, tasks, logs, viewLogs } = useSelector(
    (state) => state.project
  );

  const [selectedLog, setSelectedLog] = useState({});
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [unit, setUnit] = useState("");
  const [key, setKey] = useState("project");
  const [date, setDate] = useState(new Date());
  const [comments, setComments] = useState("");

  const UNITS = [
    { value: "M", label: "Monthly" },
    { value: "W", label: "Weekly" },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (selectedProject && !show) {
      dispatch(clearTasks());
      dispatch(
        getLogsByProjectId({
          project_id: selectedProject?.value,
          user_id: user?.id,
        })
      );
      if (show) {
        dispatch(getProjectTasks(selectedProject?.value));
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedTasks && !show) {
      dispatch(
        getLogsByTaskId({ task_id: selectedTasks?.value, user_id: user?.id })
      );
    }
  }, [selectedTasks]);

  const getNameById = (source, id) => {
    return source.find((project) => project.value === id);
  };

  const handleEditIconClick = (e, log) => {
    setSelectedLog(log);
    setSelectedProject({
      value: log?.project_id,
      label: getNameById(projects, log?.project_id).label,
    });
    setSelectedTasks({
      value: log?.task_id,
      label: getNameById(tasks, log?.task_id).label,
    });
    setStartDate(new Date(moment.utc(log?.starttime)));
    setEndDate(new Date(moment.utc(log?.endtime)));
    setComments(log.employee_comment);
    handleShow();
  };

  const handleClick = async () => {
    var now = moment(endDate); //todays date
    var end = moment(startDate); // another date
    const user = JSON.parse(localStorage.getItem("user"));
    let payload = {
      id: selectedLog.id,
      user_id: user?.id,
      task_id: selectedTasks?.value,
      date: date,
      starttime: end.format("YYYY-MM-DD HH:mm:ss"),
      endtime: now.format("YYYY-MM-DD HH:mm:ss"),
      time: moment
        .utc(
          moment(now, "DD/MM/YYYY HH:mm:ss").diff(
            moment(end, "DD/MM/YYYY HH:mm:ss")
          )
        )
        .format("HH:mm:ss"),
      employee_comment: comments,
      status: "pending",
      project_id: selectedProject?.value,
    };
    await dispatch(updateProjectLogs(payload));
    if (key === "view") {
      await dispatch(
        getLogsByViewTYPE({
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          unit: unit?.value,
          userId: user?.id,
        })
      );
    }
    handleClose();
  };

  useEffect(() => {
    setSelectedProject(null);
    setSelectedTasks(null);
    dispatch(clearLogsValues());
  }, [key]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Project</Form.Label>
              <Select
                className="react-select react-select-social"
                classNamePrefix="select"
                // defaultValue={time[1]}
                isClearable={false}
                isSearchable={false}
                name="time"
                placeholder="Project"
                options={projects}
                value={selectedProject}
                onChange={(value) => setSelectedProject(value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Task</Form.Label>
              <Select
                className="react-select react-select-social"
                classNamePrefix="select"
                // defaultValue={time[1]}
                isClearable={false}
                isSearchable={false}
                name="time"
                placeholder="Task"
                options={tasks}
                value={selectedTasks}
                onChange={(value) => setSelectedTasks(value)}
              />
            </Form.Group>
            <Form.Label>Select Date</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <DatePicker
                name="date"
                className="time-pickers app-input"
                placeholderText="dd/MM/yyyy"
                onChange={(date) => setDate(date)}
                selected={date}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>In time</Form.Label>
              <DatePicker
                className="time-pickers"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Out Time</Form.Label>
              <DatePicker
                className="time-pickers"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                name="textarea"
                value={comments}
                onChange={(e) => setComments(e?.target?.value)}
                as="textarea"
                rows={3}
                placeholder="Comments"
              />
            </Form.Group>

            <div className="button-submit">
              <Button
                onClick={handleClose}
                className="button-cancel"
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button onClick={handleClick} variant="primary" type="button">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Container fluid>
        <div className="page-wrapper view-entry-page">
          <h1 className="d-flex page-title">View Entries</h1>
          <Tabs
            defaultActiveKey="project"
            id="uncontrolled-tab-example"
            className="mb-3 task-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="project" title="Filter By Project">
              <div className="mr-3 mb-20 react-select ">
                <Select
                  className="react-select-social"
                  classNamePrefix="select"
                  isClearable={false}
                  isSearchable={false}
                  name="time"
                  placeholder="Project"
                  options={projects}
                  value={selectedProject}
                  onChange={(value) => setSelectedProject(value)}
                />
              </div>
            </Tab>
            <Tab eventKey="task" title="Filter By Task">
              <div className="react-select mb-20">
                <Select
                  className=" react-select-social"
                  classNamePrefix="select"
                  isClearable={false}
                  isSearchable={false}
                  name="time"
                  placeholder="Task"
                  options={tasks}
                  value={selectedTasks}
                  onChange={(value) => setSelectedTasks(value)}
                />
              </div>
            </Tab>
            <Tab eventKey="view" title="Filter By Weekly/Month View">
              <div className="date-wrapper">
                <div>
                  <Row>
                    <Col>
                      <div className="d-flex ">
                        <div className="date-pickers mr-2">
                          <span className="date-label">Start Date: </span>
                          <DatePicker
                            name="date"
                            className="time-pickers app-input"
                            placeholderText="dd/MM/yyyy"
                            onChange={(date) => setStartDate(date)}
                            selected={startDate}
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                        <div className="date-pickers">
                          <span className="date-label">End Date: </span>
                          <DatePicker
                            name="date"
                            className="time-pickers app-input"
                            placeholderText="dd/MM/yyyy"
                            onChange={(date) => setEndDate(date)}
                            selected={endDate}
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex justify-flex-end mt-24">
                        <div className="react-select mr-2">
                          <Select
                            className=" react-select-social"
                            classNamePrefix="select"
                            isClearable={false}
                            isSearchable={false}
                            name="time"
                            placeholder="View"
                            options={UNITS}
                            value={unit}
                            onChange={(value) => setUnit(value)}
                          />
                        </div>
                        <Button
                          disabled={!unit}
                          variant="primary"
                          type="button"
                          onClick={() => {
                            dispatch(
                              getLogsByViewTYPE({
                                startDate:
                                  moment(startDate).format("YYYY-MM-DD"),
                                endDate: moment(endDate).format("YYYY-MM-DD"),
                                unit: unit?.value,
                                userId: user?.id,
                              })
                            );
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Tab>
          </Tabs>

          <div className="table-logs d-block">
            {key !== "view" && (
              <Table bordered hover className="white-bg">
                <thead>
                  <tr>
                    <th>#</th>
                    {key === "project" && <th>Task Name</th>}

                    {key === "task" && <th>Project Name</th>}
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
                        {key === "project" && <td>{log?.Task?.name}</td>}
                        {key === "task" && <td>{log?.Project?.name}</td>}
                        <td>{log?.date}</td>
                        <td>{log?.time}</td>
                        <td>{log?.status}</td>
                        {log?.status === "pending" ? (
                          <td onClick={(e) => handleEditIconClick(e, log)}>
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                                >
                               <span> <EditIcon /></span>
                            </OverlayTrigger>
                          </td>
                        ) : (
                          <td onClick={(e) => handleEditIconClick(e, log)}></td>
                        )}
                      </tr>
                    ))}
                  {logs.length === 0 && (
                    <tr className="table-placeholder">
                      <td colSpan={6}>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          No records found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}

            {key === "view" &&
              viewLogs &&
              viewLogs?.unitwiseLogs?.map((viewlog) => (
                <>
                  <div>
                    <div className="range">{`Range: ${moment(
                      viewlog?.starts
                    ).format("MMM D, YYYY")} - ${moment(viewlog?.ends).format(
                      "MMM D, YYYY"
                    )}`}</div>
                    <Table bordered hover className="white-bg">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Task Name</th>
                          <th>Project Name</th>
                          <th>Date</th>
                          <th>Duration</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewlog?.logs?.map((log, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{log?.Task?.name}</td>
                            <td>{log?.Project?.name}</td>
                            <td>{log?.date}</td>
                            <td>{log?.time}</td>
                            <td onClick={(e) => handleEditIconClick(e, log)}>
                               
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                                >
                               <span> <EditIcon /></span>
                            </OverlayTrigger>
                            </td>
                          </tr>
                        ))}
                        {viewlog?.logs.length === 0 && (
                          <tr className="table-placeholder">
                            <td colSpan={6}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                No records found
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </>
              ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ManualEntry;
