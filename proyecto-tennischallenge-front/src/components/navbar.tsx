import React, { Fragment } from 'react';
import { Navbar, Card, Badge, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import * as actions from '../actions/actions'
import { IPlayer } from '../interfaceIPlayer';
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
    setPlayer: (player: IPlayer) => void;
    setPlayers: (players: IPlayer[]) => void;
    setFriendships: (friendships: IFriendship[]) => void;
    setMessages: (msgs: IMsg[]) => void;

}

const NavBar: React.FC<IProps & IPropsGlobal> = props => {

    const UpdateOcultar = () => {
        const aux: any = document.getElementById((props.notifications.numbers_messages > 0 ||
            props.notifications.numbers_requestFriend > 0 ||
            props.notifications.numbers_acceptedFriend > 0) ? "dropdwnMenuShowNavbarNotifications" : "dropdwnMenuShowNavbar");
        aux.classList.remove("show");
    }

    const logout = () => {
        const initialStateNotifications: INotifications = {
            numbers_messages: 0,
            numbers_requestFriend: 0,
            numbers_acceptedFriend: 0
        };

        const initialStatePlayer: IPlayer = {
            id_player: 0,
            avatar: "",
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
        sessionStorage.clear();
        props.setToken("")
    }

    return (
        <div>
            <Navbar collapseOnSelect style={{ position: "fixed", width: "100vw" }} expand="lg" variant="light">
                <Navbar.Brand>
                    <Link to="/">
                        <img src={logo} className="logo" alt="imagen de logo de mi pagina" />
                        <span className="span-logo span-title">Tennis Challenge</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {props.token && (
                        <Link className="span-logo" to="/players">Jugadores</Link>
                    )}
                    <>
                        {!props.token && (
                            <>
                                <Link className="span-logo" to="/auth">Iniciar Sesion</Link>
                                <Link className="span-logo" to="/add">Registrarse</Link>
                            </>
                        )}
                        {props.token && (
                            <Dropdown className="span-logo" >
                                <Dropdown.Toggle id="dropdown-basic" className="DropdownNavbar"  >
                                    {(props.notifications.numbers_messages > 0 ||
                                        props.notifications.numbers_requestFriend > 0 ||
                                        props.notifications.numbers_acceptedFriend > 0) &&
                                        <div className="animated infinite bounce delay-1s">
                                            <Badge className="notifications"
                                                variant="light">{props.notifications.numbers_messages + props.notifications.numbers_requestFriend + props.notifications.numbers_acceptedFriend > 0 ?
                                                    props.notifications.numbers_messages + props.notifications.numbers_acceptedFriend + props.notifications.numbers_requestFriend : ""}
                                            </Badge>
                                            <img className="animated" src="/images/pelota-tenis.png" alt="" width="35px" height="35px"></img>
                                        </div>
                                    }
                                    <Card.Img className="avatarNavbar botonsNavbar" variant="top"
                                        src={props.player.avatar ? "http://localhost:8080/uploads/avatar/" + props.player.avatar + "?" + (new Date()).valueOf() :
                                            "images/avatar-tenis.png"} alt="" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu id={props.notifications.numbers_messages > 0 ||
                                    props.notifications.numbers_requestFriend > 0 ||
                                    props.notifications.numbers_acceptedFriend > 0 ? "dropdwnMenuShowNavbarNotifications" : "dropdwnMenuShowNavbar"}>
                                    {/* <Link className="span-logo span-logo-dropdown" to="/mailTray" onClick={()=>unmountDropdown('dropdown-content','myDropdown','show','.dropbtn')}> */}
                                    <Link className="span-logo span-logo-dropdown" to={"/profile/" + props.player.id_player} onClick={UpdateOcultar}>
                                        <i className="material-icons iconDropdown md-48">person</i>
                                        <span className="span-Dropdown text-capitalize" style={{ display: 'inline-table' }}>{props.player.username.toLocaleLowerCase()}</span>
                                    </Link>
                                    <br />
                                    <Link className="span-logo span-logo-dropdown" to="/mailTray" onClick={UpdateOcultar}>
                                        <i className="material-icons iconDropdown md-48">mail</i>
                                        <span className="span-Dropdown">Correo</span>
                                        {props.notifications.numbers_messages > 0 &&
                                            <Fragment>
                                                <Badge className="notifications" variant="light">{props.notifications.numbers_messages > 0 ? props.notifications.numbers_messages : ""}</Badge>
                                                <img src="/images/pelota-tenis.png" alt="" width="35px" height="35px"></img>
                                            </Fragment>
                                        }
                                    </Link>
                                    <br />
                                    <Link className="span-logo span-logo-dropdown" to={"/friends"} onClick={UpdateOcultar}>
                                        <i className="material-icons iconDropdown md-48">group</i>
                                        <span className="span-Dropdown">Amigos</span>
                                        {props.notifications.numbers_acceptedFriend > 0 &&
                                            <Fragment>
                                                <Badge className="notifications" variant="light">{props.notifications.numbers_acceptedFriend > 0 ? props.notifications.numbers_acceptedFriend : ""}</Badge>
                                                <img src="/images/pelota-tenis.png" alt="" width="35px" height="35px"></img>
                                            </Fragment>
                                        }
                                    </Link>
                                    <br />
                                    <Link className="span-logo span-logo-dropdown" to={"/friendRequests"} onClick={UpdateOcultar}>
                                        <i className="material-icons iconDropdown md-48">group_add</i>
                                        <span className="span-Dropdown">Peticiones</span>
                                        {props.notifications.numbers_requestFriend > 0 &&
                                            <Fragment>
                                                <Badge className="notifications" variant="light">{props.notifications.numbers_requestFriend > 0 ? props.notifications.numbers_requestFriend : ""}</Badge>
                                                <img src="/images/pelota-tenis.png" alt="" width="35px" height="35px"></img>
                                            </Fragment>
                                        }
                                    </Link>
                                    <br />
                                    <Link className="span-logo span-logo-dropdown" to="/" onClick={() => logout()}>
                                        <i className="material-icons iconDropdown md-48">power_settings_new</i>
                                        <span className="span-Dropdown">Cerrar Sesión</span>
                                    </Link>
                                </Dropdown.Menu>
                            </Dropdown>
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
