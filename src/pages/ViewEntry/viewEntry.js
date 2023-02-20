
import React, { useState, useEffect } from 'react'
import { Form, Button, Table, Modal } from 'react-bootstrap'
import './viewEntry.css'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {
    getProjects,
    getProjectTasks,
    clearTasks,
    getLogsByProjectId,
    getTasksByUserId,
    getLogsByTaskId,
    getLogsByViewTYPE,
    updateProjectLogs
} from '../../store/actions'
import { Tabs, Tab } from 'react-bootstrap';
import EditIcon from '../../components/EditIcon/EditIcon';
import DatePicker from 'react-datepicker'
const ManualEntry = () => {

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        dispatch(getProjects())
        dispatch(getTasksByUserId(user?.id))
    }, [])

    const { projects, tasks, logs, viewLogs } = useSelector(
        (state) => state.project
    )
    const [selectedLog, setSelectedLog] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedTasks, setSelectedTasks] = useState(null)
    const [unit, setUnit] = useState('')
    const [key, setKey] = useState('project')
    const [date, setDate] = useState(new Date())
    const [comments, setComments] = useState('')

    const UNITS = [
        { value: 'M', label: 'Monthly' },
        { value: 'W', label: 'Weekly' },
    ]

    useEffect(() => {
        if (selectedProject) {
            dispatch(clearTasks())
            dispatch(getLogsByProjectId({ project_id: selectedProject?.value }))
            // setSelectedTasks(null)
            dispatch(getProjectTasks(selectedProject?.value))
        }
    }, [selectedProject])

    useEffect(() => {
        if (selectedTasks) {
            dispatch(getLogsByTaskId({ task_id: selectedTasks?.value }))
            // setSelectedTasks(null)
            // dispatch(getProjectTasks(selectedProject?.value))
        }
    }, [selectedTasks])

    const getNameById = (source, id) => {
        return source.find(project => project.value === id)
    }

    const handleEditIconClick = (e, log) => {
        console.log(log);
        console.log(moment.utc(log?.starttime).toString(), 'ISO');
        console.log(new Date(log?.starttime), new Date(log?.endtime));
        setSelectedLog(log)
        setSelectedProject({ value: log?.project_id, label: getNameById(projects, log?.project_id).label })
        setSelectedTasks({ value: log?.task_id, label: getNameById(tasks, log?.task_id).label })
        setStartDate(new Date(moment.utc(log?.starttime)))
        setEndDate(new Date(moment.utc(log?.endtime)))
        setComments(log.employee_comment)
        handleShow()
    }

    const handleClick = async () => {
        var now = moment(endDate); //todays date
        var end = moment(startDate); // another date
        const user = JSON.parse(localStorage.getItem('user'))
        let payload = {
            "id": selectedLog.id,
            "user_id": user?.id,
            "task_id": selectedTasks?.value,
            "date": date,
            "starttime": end.format('YYYY-MM-DD HH:mm:ss'),
            "endtime": now.format('YYYY-MM-DD HH:mm:ss'),
            "time": moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"),
            "employee_comment": comments,
            "status": "pending",
            "project_id": selectedProject?.value
        }
        await dispatch(updateProjectLogs(payload))
        if (key === 'view') {
            await dispatch(getLogsByViewTYPE({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD'), unit: unit?.value, userId: user?.id }))
        }
        handleClose()
    }
    console.log(key, 'KEY');
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
                            {/* <input name="date" min={new Date()} onChange={(e) => onFieldChange(e)} type="date" placeholder="Work Date" /> */}
                            <DatePicker
                                name="date"
                                className='time-pickers app-input'
                                placeholderText="dd/MM/yyyy"
                                onChange={(date) => setDate(date)}
                                selected={date}
                                maxDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>In time</Form.Label>
                            <DatePicker className='time-pickers' selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={1}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Out Time</Form.Label>
                            <DatePicker className='time-pickers' selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={1}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control name="textarea" value={comments} onChange={(e) => setComments(e?.target?.value)} as="textarea" rows={3} placeholder="Comments" />
                        </Form.Group>


                        <div className='button-submit'>
                            <Button className='button-cancel' type="button" >
                                Cancel
                            </Button>
                            <Button onClick={handleClick} variant="primary" type="button" >
                                Submit
                            </Button>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>
            <h1 className='d-flex justify-content-center'>View Entries</h1>
            <Tabs
                defaultActiveKey="project"
                id="uncontrolled-tab-example"
                className="mb-3"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="project" title="Filter By Project">
                    <div className='mr-3 react-select '>

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
                    <div className='react-select'>
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
                <Tab eventKey="view" title="Filter By Weekly/Month View" >
                    <div className='date-wrapper'>

                        <div className='justify-space-between d-flex mb-4 ml-4 mr-4'>
                            <div>

                                <span className='date-label'>Start Date: </span>
                                <DatePicker
                                    name="date"
                                    className='time-pickers app-input'
                                    placeholderText="dd/MM/yyyy"
                                    onChange={(date) => setStartDate(date)}
                                    selected={startDate}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div>

                                <span className='date-label'>End Date: </span>
                                <DatePicker
                                    name="date"
                                    className='time-pickers app-input'
                                    placeholderText="dd/MM/yyyy"
                                    onChange={(date) => setEndDate(date)}
                                    selected={endDate}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                        <div className='d-flex justify-space-between mr-72'>

                            <div className='react-select'>
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
                            <Button variant="primary" type="button" onClick={() => {
                                dispatch(getLogsByViewTYPE({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD'), unit: unit?.value, userId: user?.id }))
                            }}>
                                Apply
                            </Button>
                        </div>
                    </div>
                </Tab>
            </Tabs>

            <div className='table-logs d-block'>

                {key !== 'view' && <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            {
                                key === 'project' &&
                                <th>Task Name</th>
                            }

                            {
                                key === 'task' &&
                                <th>Project Name</th>
                            }
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            logs && logs.map((log, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    {
                                        key === 'project' &&
                                        <td>{log?.Task?.name}</td>
                                    }
                                    {
                                        key === 'task' &&
                                        <td>{log?.Project?.name}</td>
                                    }
                                    <td>{log?.date}</td>
                                    <td>{log?.time}</td>
                                    <td>{log?.status}</td>
                                    <td onClick={(e) => handleEditIconClick(e, log)}><EditIcon /></td>
                                </tr>
                            ))
                        }
                        {logs.length === 0 &&
                            <tr>
                                <td colSpan={key === 'task' ? 6 : 5}>
                                    < div style={{ display: 'flex', justifyContent: 'center' }} >No records found</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>}

                {
                    key === 'view' && viewLogs && viewLogs?.unitwiseLogs?.map((viewlog) => (
                        <>
                            <div>
                                <div>{`Range: ${moment(viewlog?.starts).format('MMM D, YYYY')} - ${moment(viewlog?.ends).format('MMM D, YYYY')}`}</div>
                                <Table striped bordered hover variant="dark">
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
                                        {
                                            viewlog?.logs?.map((log, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{log?.Task?.name}</td>
                                                    <td>{log?.Project?.name}</td>
                                                    <td>{log?.date}</td>
                                                    <td>{log?.time}</td>
                                                    <td onClick={(e) => handleEditIconClick(e, log)}><EditIcon /></td>
                                                </tr>
                                            ))
                                        }
                                        {viewlog?.logs.length === 0 &&
                                            <tr>
                                                <td colSpan={6}>
                                                    < div style={{ display: 'flex', justifyContent: 'center' }} >No records found</div>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
    {/* <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select Project</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select Task</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>In time</Form.Label>
                <DatePicker className='time-pickers' selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Out Time</Form.Label>
                <DatePicker className='time-pickers' selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
            </Form.Group>
        <div className='button-submit'>
            <Button className='button-cancel' type="button" >
                Cancel
            </Button>
            <Button variant="primary" type="button" onClick={() => {
                var now = moment(endDate); //todays date
                var end = moment(startDate); // another date
                console.log(moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(end, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss"), 'utc');
                console.log(data, selectedProject, selectedTasks, startDate, endDate, "All Fields");
            }}>
                Apply
            </Button>
        </div>

    </Form> */}
    {/* </Card> */ }
}

export default ManualEntry