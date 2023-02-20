import React, { useEffect } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email")
            .required("Email is required"),
        password: Yup.string()
            .required("Passwort is required")
            .min(4, "Password too short! Must be at least 4 characters."),
    });

    const { isSuccess } = useSelector((state) => state.project)
    const handleSubmit = async (
        { email, password },
    ) => {
        if (email && password) {
            await dispatch(loginUser({ email, password }))
        }
    };

    useEffect(() => {

        if (isSuccess) {
            if (user?.role === 'admin') {
                navigate('/admin/view-entry')
            } else {
                navigate('/view-entry')
            }
        }
    }, [isSuccess])

    return (
        <div className='page-header'>
            <div className='container'>
                <Card className='card-form row justify-content-center align-self-center'>
                    <div className="login-header">
                        <h2>Login</h2>
                    </div>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={(values, errors) => {
                            handleSubmit(values, errors);
                        }}
                        validationSchema={validationSchema}
                    >
                        {({ values, errors, handleSubmit, handleChange }) => {
                            return (
                                <Form
                                    className="formWithBg rounded-3 h-100"
                                    onSubmit={handleSubmit}
                                >
                                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control value={values.email}
                                            onChange={handleChange("email")} type="email" placeholder="Enter email" />
                                        {
                                            errors?.email &&
                                            <div className='error-div'>{errors.email}</div>
                                        }
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control value={values.password}
                                            onChange={handleChange("password")} type="password" placeholder="Password" />
                                        {
                                            errors?.password &&
                                            <div className='error-div'>{errors.password}</div>
                                        }
                                    </Form.Group>
                                    <div className='btn-submit'>
                                        <Button variant="primary" type="submit" >
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </Card>
            </div>
        </div>
    )
}

export default Login