import React from 'react';
import { Navbar, Nav, NavDropdown, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import * as actions from '../actions/actions'
import { IPlayer } from '../interfaceIPlayer';
// import bootstrap from 'react-bootstrap';


interface IProps { }

interface IPropsGlobal {
    token: string;
    player: IPlayer;
    setToken: (token: string) => void;
}



const NavBar: React.FC<IProps & IPropsGlobal> = props => {
    return (
        <div>
            
            <Navbar collapseOnSelect style={{position:"fixed", width:"100vw"}} expand="lg" bg="dark" variant="dark">
                <Navbar.Brand> <Link to="/">TenisChallenge</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {props.token && (
                        <Nav className="mr-auto">

                            <Link to="/players">Jugadores</Link>
                            <Link to="/">Pistas</Link>

                        </Nav>
                    )}
                    <Nav>
                        {!props.token && (
                            <>
                                <Link to="/auth">LogIn</Link>
                                <Link to="/add">LogUp</Link>
                            </>
                        )}
                        {props.token && (
                            <>  
                                <div >
                                 
                                 <Card.Img className="avatarNavbar" variant="top" 
                                 src={props.player.avatar?"http://localhost:8080/uploads/avatar/" + props.player.avatar:"images/avatar-tenis.png"} alt=""/>
                                </div>
                                
                                <Link to="/"></Link>
                                <NavDropdown title={props.player.username} id="collasible-nav-dropdown">
                                <Link to="/mailTray" >Correo</Link>
                                <br/>
                                <Link to={"/profile/"+ props.player.id_player}>Perfil</Link>
                                   
                                    {/* <NavDropdown.Item href="#action/3.1">>Mail</NavDropdown.Item> */}
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                                <Link to="/" onClick={() => props.setToken("")}>LogOut</Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    player: state.player
});

const mapDispachToProps = {
    setToken: actions.setToken
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(NavBar);
