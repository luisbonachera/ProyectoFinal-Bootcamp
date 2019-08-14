import React from 'react';
import { Navbar, Card, Badge, Dropdown } from 'react-bootstrap';
// import { NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import * as actions from '../actions/actions'
import { IPlayer } from '../interfaceIPlayer';
// import bootstrap from 'react-bootstrap';
import logo from '../images/logo-sin-letras.png';
import { INotifications } from '../interfaceINotifications';
import { IFriendship } from '../interfaceIFriendship';
import { IMsg } from '../interfaceIMsg';


interface IProps { }

interface IPropsGlobal {
    token: string;
    player: IPlayer;
    setToken: (token: string) => void;
    notifications: INotifications;
    setNotifications: (notifications: INotifications) => void;
    setPlayer:(player: IPlayer) => void;
    setPlayers:(players: IPlayer[]) => void;
    setFriendships:(friendships: IFriendship[]) => void;
    setMessages: (msgs: IMsg[]) => void;

}


const NavBar: React.FC<IProps & IPropsGlobal> = props => {
    // const [username, setUsername] = React.useState(props.player.username);
    // const [avatar, setAvatar] = React.useState(props.player.avatar);
    // const [id_player, setId_player] = React.useState(props.player.id_player);
    
    // const actualizar = () => {
    //     setUsername(props.player.username)
    //     setAvatar(props.player.avatar);
    //     setId_player(props.player.id_player);
        
    //     console.log("entra el funcion actualizar hooks");
    //     console.log("username dentro de funcion hooks :" + username);
    //     console.log("avatar  dentro de funcion hooks :" + avatar);
    //     console.log("id_player  dentro de funcion hooks :" + id_player);
        
    // }

    // React.useEffect(()=>console.log("se renderiza"),[props.player]);
    console.log(props.player);
    // if (player === ""){
    //     return null;
    // }

    const logout = () => {
        const initialStateNotifications: INotifications = {
            number_messages: 0,
            numbers_requestFriend: 0,
            numbers_acceptedFriend: 0
          };

          const initialStatePlayer: IPlayer = {
            id_player: 0,
            avatar:"",
            username: "",
            email: "",
            city: "",
            genre: "",
            rating: 0,
            isAdmin: false
        };
         props.setPlayer(initialStatePlayer);
         props.setPlayers([]);
         props.setNotifications(initialStateNotifications);
         props.setFriendships([]);
         props.setMessages([]);
         props.setToken("")
    }

    // console.log("username despues del useEffect :" + username);
    // console.log("avatar despues del useEffect :" + avatar);
    // console.log("id_player despues del useEffect :" + id_player);
    return (
        <div>
            
            <Navbar collapseOnSelect style={{position:"fixed", width:"100vw"}} expand="lg"  variant="light">
                <Navbar.Brand>
                    
                     <Link to="/">
                        <img src={logo} className="logo" alt="imagen de logo de mi pagina"/>
                        <span className="span-logo">Tennis Challenge</span>
                     </Link>
                     </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {props.token && (
                        <>
                            <Link className="span-logo"  to="/players">Jugadores</Link>
                            <Link className="span-logo" to="/">Pistas</Link>

                        </>
                    )}
                    <>
                        {!props.token && (
                            <>
                                <Link className="span-logo" to="/auth">Iniciar Sesion</Link>
                                <Link className="span-logo" to="/add">Registrarse</Link>
                            </>
                        )}
                        {props.token && (
                            <>  
                                 
                                 
                                
                               
                                {/* {console.log(props.player.username)} */}
                                {/* <NavDropdown className="span-logo" title={props.player.username} id="collasible-nav-dropdown"> */}
                                <Dropdown className="span-logo" >
                                <Dropdown.Toggle id="dropdown-basic"><Badge variant="light">{props.notifications.number_messages + props.notifications.numbers_requestFriend + props.notifications.numbers_acceptedFriend > 0?
                                     props.notifications.number_messages + props.notifications.numbers_acceptedFriend + props.notifications.numbers_requestFriend:"" }</Badge> {props.player.username}</Dropdown.Toggle>
                                <Dropdown.Menu>

                                <Link className="span-logo" to="/mailTray" ><Badge variant="light">{props.notifications.number_messages > 0?props.notifications.number_messages:""}</Badge> Correo</Link>
                                <br/>
                                <Link className="span-logo" to={"/profile/"+ props.player.id_player}>Perfil</Link>
                                <br/>
                                <Link className="span-logo" to={"/friends"}><Badge variant="light">{props.notifications.numbers_acceptedFriend > 0?props.notifications.numbers_acceptedFriend:""}</Badge>Amigos</Link>
                                <br/>
                                <Link className="span-logo" to={"/friendRequests"}><Badge variant="light">{props.notifications.numbers_requestFriend>0?props.notifications.numbers_requestFriend:""}</Badge> Peticiones</Link>
                                <br/>
                                <Link className="span-logo" to="/" onClick={() => logout()}>Cerrar Sesión</Link>
                                    {/* <NavDropdown.Item href="#action/3.1">>Mail</NavDropdown.Item> */}
                                    {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                </Dropdown.Menu>
                                </Dropdown>
                                <Card.Img className="avatarNavbar" variant="top"  
                                  src={props.player.avatar?"http://localhost:8080/uploads/avatar/" + props.player.avatar:"images/avatar-tenis.png"} alt=""/>
                                
                            </>
                        )}
                    </>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    player: state.player,
    notifications: state.notifications
});

const mapDispachToProps = {
    setToken: actions.setToken,
    setNotifications: actions.setNotifications,
    setPlayer: actions.setPlayer,
    setPlayers: actions.setPlayers,
    setFriendships: actions.setFriendships,
    setMessages: actions.setMessages
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(NavBar);
