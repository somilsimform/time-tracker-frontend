
import React, { useState, useEffect } from 'react'
import { Form, Button, Table, Modal } from 'react-bootstrap'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux'
import {
    getAllLogs
} from '../../store/actions'
const ManualEntry = () => {

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        dispatch(getAllLogs('pending'))
    }, [])

    const { logs, } = useSelector(
        (state) => state.project
    )

    const updateStatus = (e, statusValue) => {

    }
    return (
        <>
            <h1 className='d-flex justify-content-center'>View Entries</h1>

            <div className='table-logs d-block'>

                <Table striped bordered hover variant="dark">
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
                        {
                            logs && logs.map((log, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{log?.Task?.name}</td>
                                    <td>{log?.Project?.name}</td>
                                    <td>{log?.date}</td>
                                    <td>{log?.time}</td>
                                    <td>{log?.status}</td>
                                    <td>
                                        <Button onClick={(e) => updateStatus('accepted')} variant="success">Accept</Button>
                                        <Button onClick={(e) => updateStatus('rejected')} variant="danger" className='ml-5'>Reject</Button>
                                    </td>
                                </tr>
                            ))
                        }
                        {logs.length === 0 &&
                            <tr>
                                <td colSpan={7}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }} >No records found</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default ManualEntry