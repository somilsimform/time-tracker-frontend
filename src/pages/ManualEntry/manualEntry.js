import React, { useEffect, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import './manualEntry.css'
import Select from 'react-select'
import { toast } from 'react-toastify'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {
    getProjects,
    getProjectTasks,
    clearTasks,
    addProjectLogs
} from '../../store/actions'

const ManualEntry = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProjects())
    }, [])

    const { projects, tasks, isSuccess, user } = useSelector(
        (state) => state.project
    )
    const [date, setDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [comments, setComments] = useState('')
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedTasks, setSelectedTasks] = useState(null)
    useEffect(() => {
        if (selectedProject) {
            dispatch(clearTasks())
            setSelectedTasks(null)
            dispatch(getProjectTasks(selectedProject?.value))
        }
    }, [selectedProject])

    const handleClick = async () => {
        var now = moment(endDate); //todays date
        var end = moment(startDate); // another date
        const user = JSON.parse(localStorage.getItem('user'))
        let payload = {
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
        if (moment(endDate).isBefore(moment(startDate))) {
            toast.error('Start time should be less than end time')
        } else {
            await dispatch(addProjectLogs(payload))
        }
    }
    return (
        <div>
            <div className='container'>
                <Card className='card-form row justify-content-center align-self-center'>
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
                            <DatePicker className='time-pickers' selected={startDate} onChange={(date) => { setStartDate(date) }} showTimeSelect
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
                            <Form.Control name="textarea" onChange={(e) => setComments(e?.target?.value)} as="textarea" rows={3} placeholder="Comments" />
                        </Form.Group>
                        <div className='button-submit'>
                            <Button variant="primary" type="button" onClick={handleClick}>
                                Submit
                            </Button>
                        </div>

                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default ManualEntry