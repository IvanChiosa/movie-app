import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header : React.FC = () => {
    return (
        <Navbar className={"navbar"}   bg="dark" variant="dark" expand="lg">
            <Container className={"fluid"}>
                <Navbar.Brand href="/" className="movie-app"  style={{ color: 'gold' }}>
                    <FontAwesomeIcon icon={faVideoSlash} />Movie-app
                </Navbar.Brand>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0 navbar-row" navbarScroll>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/add">Add new Movies</NavLink>
                        <NavLink className="nav-link" to="/movie-list">Movie List</NavLink>
                    </Nav>
                    {/*<div className="ms-auto navbar-row">*/}
                    {/*    <Button variant="outline-info" className="me-2, button-add">Login</Button>*/}
                    {/*    <Button variant="outline-info" className="button-add">Register</Button>*/}
                    {/*</div>*/}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header