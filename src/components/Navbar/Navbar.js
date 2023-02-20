import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, } from 'react-bootstrap';
import { logoutUser } from '../../store/actions'
import { useDispatch } from 'react-redux';

const Header = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigation = useNavigate()
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="justify-content-start" href="/dashboard">Time Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav>
                        <Nav className="me-auto">
                            <Nav.Link href="/manual-entry" active={location.pathname === '/manual-entry'}>Manual Entry</Nav.Link>
                            <Nav.Link href="/view-entry" active={location.pathname === '/view-entry'}>View Entries</Nav.Link>
                        </Nav>
                        <Nav.Link onClick={() => {
                            localStorage.clear()
                            dispatch(logoutUser())
                            navigation('/login')
                        }}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header