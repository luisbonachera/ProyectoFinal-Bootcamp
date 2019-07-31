import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import jwt from 'jsonwebtoken';
import * as actions from '../actions/actions'
// import bootstrap from 'react-bootstrap';


interface IProps { }

interface IPropsGlobal {
    token: string;
    setToken: (token: string) => void;
}



const NavBar: React.FC<IProps & IPropsGlobal> = props => {
    // const [username, setUsername] = React.useState("");





    // const decodedToken = ()=> {
    // if(props.token){
    const decoded: any = jwt.decode(props.token);
    //     if(!decoded){
    //         console.log("el token no se pudo decodificar.")
    //         return null;

    //     }
    //     setUsername(decoded.username);
    // }
    // }


    // React.useEffect(()=>decodedToken(),[props.token]);


    return (
        <div>
            
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand> <Link to="/">TenisChallenge</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {props.token && (
                        <Nav className="mr-auto">

                            <Nav ><Link to="/players">Jugadores</Link></Nav>
                            <Nav ><Link to="/">Pistas</Link></Nav>

                        </Nav>
                    )}
                    <Nav>
                        {!props.token && (
                            <>
                                <Nav > <Link to="/auth">LogIn</Link></Nav>
                                <Nav ><Link to="/add">LogUp</Link></Nav>
                            </>
                        )}
                        {props.token && (
                            <>
                                <Nav > <Link to="/">Avatar</Link></Nav>
                                <Nav ><Link to="/"></Link></Nav>
                                <NavDropdown title={decoded.username} id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                                <Nav ><Link to="/" onClick={() => props.setToken("")}>LogOut</Link></Nav>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token
});

const mapDispachToProps = {
    setToken: actions.setToken
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(NavBar);
