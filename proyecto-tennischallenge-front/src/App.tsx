import React from 'react';
import './App.css';
// import styles from './App.module.css';
import NavBar from './components/navbar';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './components/home';
import AddPlayer from './components/addplayer';
import Login from './components/login';
import { connect } from 'react-redux';
import { IGlobalState } from './reducers/reducers';
import listPlayers from './components/listPlayers';
import ViewPlayer from './components/ViewPlayer';
import MailTray from './components/mailTray';
import ProfilePlayer from './components/profilePlayer';
import EditPlayer from './components/editPlayer';
import listFriends from './components/listFriends';
import FriendRequests from './components/friendRequests';
import { INotifications } from './interfaceINotifications';
import * as actions from './actions/actions';
import jwt from 'jsonwebtoken';
import { IPlayer } from './interfaceIPlayer';

interface IProps { }

interface IPropsGlobal {
  token: string;
  setNotifications: (notification: INotifications) => void;
  setToken: (token: string) => void;
  setPlayer: (player: IPlayer) => void;
  setPlayers: (player: IPlayer[]) => void;
}

const App: React.FC<IProps & IPropsGlobal> = props => {

  React.useEffect( ()=> {
    const token = sessionStorage.getItem("token");
    if(token){
      const decoded:any = jwt.decode(token);
      if (decoded) {
        let player: IPlayer = {
            id_player: decoded.id_player,
            avatar: decoded.avatar,
            username: decoded.username,
            isAdmin: decoded.isAdmin,
            email: decoded.email,
            city: decoded.city,
            genre: decoded.genre,
            rating: decoded.rating
        }
      
      props.setPlayer(player);
      props.setToken(token);

      fetch("http://localhost:8080/api/players", {
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            if (response.ok) {
                response
                    .json()
                    .then((lista) => {
                        // console.log("va bien");
                        // console.log(lista);
                        // console.log(lista);
                        for (let i = 0; i < lista.length; i++) {
                            lista[i].isAdmin = lista[i].isAdmin === 1 ? true : false;
                            // console.log(lista[i].isAdmin);
                        }
                        props.setPlayer(player);
                        props.setPlayers(lista);
                        // props.history.push("/");
                        sessionStorage.setItem("token", token);
                        props.setToken(token);


                    })
                    .catch(err => {
                        console.log("Error en el json.");
                    });
            } else {
              console.log("responde.ok da error.");
            }
        })
        .catch(err => {
          console.log("Error en response." + err);
        });

    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  React.useEffect(() => {
    if (props.token) {
      const n = setInterval(() => {
        // console.log("token antes del fetch de notifications:");
        // console.log(props.token);
        fetch("http://localhost:8080/api/notifications", {

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token
          },
        })
          .then(response => {
            if (response.ok) {
              response
                .json()
                // .then((notifications: INotifications) => {
                .then((notifications) => {

                  // console.log(notifications);
                  // console.log(notifications[0]);
                  if (notifications[0]) {
                    if (notifications[0].numbers_messages > 0 || 
                      notifications[0].numbers_requestFriend > 0 ||
                      notifications[0].numbers_acceptedFriend > 0) {
                      // console.log("tengo notificaciones");
                      // console.log(notifications);
                      props.setNotifications(notifications[0]);
                      // console.log(notifications);
                    } else {
                      // console.log("no hay notificaciones");
                      props.setNotifications(notifications[0]);
                    }
                    
                  }

                })
                .catch(err => {
                  console.log("Error en el json. " + err);
                });
            } else {
              console.log("responde.ok da error.");
            }
          })
          .catch(err => {
            console.log("Error en response. " + err);
          });


      }, 500);
      return () => { clearInterval(n) }
    } else {
      // console.log("aun no hay token");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.token]);

  return (
    <BrowserRouter>
      <div className="App">

        <NavBar />
        <header className="App-header">
          <Switch>
            {!props.token && (
              <Route path="/auth" exact component={Login} />
            )}
            {/*deberia de poner un layout si {props.token && ()} */}
            {/* y dentro de layout todas las rutas de aabjo excepto home */}

            {props.token && (<Route path="/mailTray" component={MailTray} />)}
            {props.token && (<Route path="/friends" exact component={listFriends} />)}

            {props.token && (<Route path="/friendRequests" exact component={FriendRequests} />)}
            {props.token && (<Route path="/players/edit/:id_player" exact component={EditPlayer} />)}
            {props.token && (<Route path="/profile/:id_player" exact component={ProfilePlayer} />)}
            {props.token && (<Route path="/players/:id_player" exact component={ViewPlayer} />)}
            {props.token && (<Route path="/players" exact component={listPlayers} />)}

            <Route path="/add" exact component={AddPlayer} />
            <Route path="/" exact component={Home} />
            {/* <Route path="/maps" exact component={SimpleMap} /> */}
            {/* <Route component={Notfound} /> */}
            <Redirect to="/" />

          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});

const mapDispachToProps = {
  setNotifications: actions.setNotifications,
  setToken: actions.setToken,
  setPlayer: actions.setPlayer,
  setPlayers: actions.setPlayers
}

export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);

