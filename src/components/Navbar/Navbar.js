import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, } from 'react-bootstrap';
import { logoutUser } from '../../store/actions'
import { useDispatch } from 'react-redux';
import './Navbar.css'
const Header = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const location = useLocation()
    const dispatch = useDispatch()
    const navigation = useNavigate()
    return (
        <Navbar className='header-part' collapseOnSelect expand="lg">
            <Container fluid>
                <Navbar.Brand className="justify-content-start" href="/dashboard">Time Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className={user?.role ? 'admin' : ''}>
                        {
                            user?.role === 'employee' &&

                            <Nav className="inner-nav">
                                <NavLink className="nav-link" to="/manual-entry" active={location.pathname === '/manual-entry'}>Manual Entry</NavLink>
                                <NavLink className="nav-link" to="/view-entry" active={location.pathname === '/view-entry'}>View Entries</NavLink>
                            </Nav>
                        }
                        <Nav.Link className='logout-link' onClick={() => {
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