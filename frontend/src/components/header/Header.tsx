import React, {useState} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVideoSlash} from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header: React.FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleNavLinkClick = () => {
        if (isOpen) {
            toggleMenu();
        }
    };

    return (
        <Navbar className="navbar" bg="dark" variant="dark" expand="lg">
            <Container className="fluid">
                <Navbar.Brand href="/" className="movie-app" style={{color: 'gold'}}>
                    <FontAwesomeIcon icon={faVideoSlash}/>Movie-app
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" onClick={toggleMenu}/>

                <Navbar.Collapse id="navbarScroll" className={`navbar-collapse ${isOpen ? 'open' : ''}`}>
                    <Nav className="me-auto my-2 my-lg-0 navbar-row" navbarScroll>
                        <NavLink className="nav-link" to="/" onClick={handleNavLinkClick}>Home</NavLink>
                        <NavLink className="nav-link" to="/add" onClick={handleNavLinkClick}>Add new Movies</NavLink>
                        <NavLink className="nav-link" to="/movie-list" onClick={handleNavLinkClick}>Movie List</NavLink>
                    </Nav>
                    {/* Weitere Elemente */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header