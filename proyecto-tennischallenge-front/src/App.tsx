import React, { useEffect } from 'react';
import './App.css';
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

interface IProps { }

interface IPropsGlobal {
  token: string;
  setNotifications: (notification: INotifications) => void;
}

const App: React.FC<IProps & IPropsGlobal> = props => {

  useEffect(() => {


    if (props.token) {
      const n = setInterval(() => {
        console.log("token antes del fetch de notifications:")
        console.log(props.token);
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

                  console.log(notifications);
                  console.log(notifications[0]);
                  if (notifications[0]) {
                    if (notifications[0].numbers_messages > 0 || notifications[0].numbers_friends > 0) {
                      console.log("va bien");
                      console.log(notifications);
                     
                      console.log(notifications);
                    } else {
                      console.log("no hay notificaciones");
                    }
                    props.setNotifications(notifications[0]);
                  }

                })
                .catch(err => {
                  console.log("Error en el json.");
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
    }else{
      console.log("aun no hay token");
    }
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
            {props.token && (
              <>
                <Route path="/mailTray" component={MailTray} />
                <Route path="/friends" exact component={listFriends} />

                <Route path="/friendRequests" exact component={FriendRequests} />
                <Route path="/players/edit/:id_player" exact component={EditPlayer} />
                <Route path="/profile/:id_player" exact component={ProfilePlayer} />
                <Route path="/players/:id_player" exact component={ViewPlayer} />
                <Route path="/players" exact component={listPlayers} />
              </>
            )}
            <Route path="/add" exact component={AddPlayer} />
            <Route path="/" exact component={Home} />
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
  setNotifications: actions.setNotifications
}

export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);

