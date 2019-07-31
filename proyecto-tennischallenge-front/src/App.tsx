import React, { Props } from 'react';
import './App.css';
import NavBar from './components/navbar';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './components/home';
import AddPlayer from './components/addplayer';
import Login from './components/login';
import { connect } from 'react-redux';
import { IGlobalState } from './reducers/reducers';

interface IProps {}

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
            { !props.token && (
            <Route path="/auth" exact component={Login} />
            )}
            <Route path="/add" exact component={AddPlayer} />
            <Route path="/" exact component={Home} />
          </header>
          <Redirect to="/" />
        </Switch>
        
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

