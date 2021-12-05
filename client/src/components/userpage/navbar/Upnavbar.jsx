import React, {useContext} from 'react'
import {Navbar, Container, Nav, Dropdown} from 'react-bootstrap'
import './upnavbar.css'
import {IoChevronDownOutline} from 'react-icons/io5'
import {FaUserCircle} from 'react-icons/fa'
import { Context } from '../../../context/Context'
import {Navigate} from 'react-router-dom'
export default function Upnavbar() {
    const {dispatch} = useContext(Context)
    const {id} = JSON.parse(localStorage.getItem('user'))
    const {firstname} = JSON.parse(localStorage.getItem('user'))
    const handleSignout = () => {
        dispatch({type: "LOGOUT"})
        return <Navigate to="/"/>
    }

    return (
    <Navbar className="up-navbar" collapseOnSelect expand="lg"  variant="dark">
      <Container >
      <Navbar.Brand className="fw-bold hp-navbrand" href="/">gooly.</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-4 ml-auto d-flex align-items-center">
            <Nav.Link className="small" href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link className="small"href="/urls">URLs</Nav.Link>
        </Nav>
        <Nav className="ms-auto d-flex align-items-center">
            <Dropdown>
                <Dropdown.Toggle className="d-flex align-items-center" id="dropdown-basic">
                    <FaUserCircle fontSize={21}/>
                    <span className="small">&nbsp; {firstname} &nbsp;</span> 
                    <IoChevronDownOutline/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item className="small" href={`/profile/${id}`}>Profile</Dropdown.Item>
                    <Dropdown.Item className="small">
                        <button onClick={handleSignout} style={{border: "0px", backgroundColor: "transparent", padding:"0px"}}>Sign out</button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
