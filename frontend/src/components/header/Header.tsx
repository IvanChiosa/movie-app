import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
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
                {/*<Navbar.Toggle aria-controls="navbarScroll" />*/}
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0 navbar-row" navbarScroll>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/add">Add new Movies</NavLink>
                        <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
                    </Nav>
                    <div className="ms-auto navbar-row">
                        <Button variant="outline-info" className="me-2, button-add">Login</Button>
                        <Button variant="outline-info" className="button-add">Register</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        // <Navbar bg="dark" variant="dark" expand="lg">
        //     <Container fluid>
        //         <Navbar.Brand href="/" style={{ color: 'gold' }}>
        //             <FontAwesomeIcon icon={faVideoSlash} />Movie-app
        //         </Navbar.Brand>
        //         <Navbar.Toggle aria-controls="navbarScroll" />
        //         <Navbar.Collapse id="navbarScroll">
        //             <Nav className="me-auto my-2 my-lg-0" navbarScroll>
        //                 <NavLink className="nav-link" to="/">Home</NavLink>
        //                 <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
        //             </Nav>
        //             <div className="ms-auto">
        //                 <Button variant="outline-info" className="me-2" style={{ transition: '0.3s' }}>Login</Button>
        //                 <Button variant="outline-info" style={{ transition: '0.3s' }}>Register</Button>
        //             </div>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>







        // <Navbar bg="dark" variant="dark" expand="lg">
        //     <Container fluid>
        //         <Navbar.Brand href="/" style={{"color":'gold'}}>
        //             <FontAwesomeIcon icon ={faVideoSlash}/>Movie-app
        //         </Navbar.Brand>
        //         <Navbar.Toggle aria-controls="navbarScroll" />
        //         <Navbar.Collapse id="navbarScroll">
        //             <Nav
        //                 className="me-auto my-2 my-lg-0"
        //                 style={{maxHeight: '100px'}}
        //                 navbarScroll
        //             >
        //                 <NavLink className ="nav-link" to="/">Home</NavLink>
        //                 <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>
        //             </Nav>
        //             <Button variant="outline-info" className="me-2">Login</Button>
        //             <Button variant="outline-info">Register</Button>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    )
}

export default Header



// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
// import Button  from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container"
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import {NavLink} from "react-router-dom";
//
//
// const Header = () => {
//
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Container fluid>
//                 <Navbar.Brand href="/" style={{"color":'gold'}}>
//                     <FontAwesomeIcon icon ={faVideoSlash}/>Movie-app
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="navbarScroll">
//                     <Nav
//                         className="me-auto my-2 my-lg-0"
//                         style={{maxHeight: '100px'}}
//                         navbarScroll
//                     >
//                         <NavLink className ="nav-link" to="/">Home</NavLink>
//                         <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>
//                     </Nav>
//                     <Button variant="outline-info" className="me-2">Login</Button>
//                     <Button variant="outline-info">Register</Button>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     )
// }
//
// export default Header