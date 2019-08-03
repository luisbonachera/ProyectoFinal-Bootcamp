import React from 'react';
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

interface IProps { }

interface IPropsGlobal {
  token: string;
}

const App: React.FC<IProps & IPropsGlobal> = props => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <header className="App-header">
            {!props.token && (
              <Route path="/auth" exact component={Login} />
            )}
            {/*deberia de poner un layout si {props.token && ()} */}
            {/* y dentro de layout todas las rutas de aabjo excepto home */}
              <Route path="/mailTray" component={MailTray} />
              <Route path="/profile/:id_player" exact component={ProfilePlayer} />
              <Route path="/players/:playerId" exact component={ViewPlayer} />
              <Route path="/players" exact component={listPlayers} />
              <Route path="/add" exact component={AddPlayer} />
            
            <Route path="/" exact component={Home} />
            {/* <Route component={Notfound} /> */}

          </header>

        </Switch>
        <Redirect to="/" />
      </BrowserRouter>



    </div>
  );
}

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});


export default connect(
  mapStateToProps
)(App);

