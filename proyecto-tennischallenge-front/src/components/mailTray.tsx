import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import MenuMail from './menuMail';
import MailDetail from './mailDetail';
import AddMail from './addMail';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { IMsg } from '../interfaceIMsg';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import ListMailReceived from './listMailReceived';
import ListMailSent from './listMailSent';
import { INotifications } from '../interfaceINotifications';

interface IPropsGloblal {
    token: string,
    msgs: IMsg[],
    setMessages: (msgs: IMsg[]) => void,
    notifications: INotifications;
}

const MailTray: React.FC<IPropsGloblal> = props => {

    const listMsgs = () => {
        if (props.token) {
            let decoded = jwt.decode(props.token);
            if (decoded !== null) {
                fetch("http://localhost:8080/api/msgs", {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            response
                                .json()
                                .then((lista: IMsg[]) => {
                                    if (lista.length > 0) {
                                        props.setMessages(lista);
                                    } else {
                                        // console.log("la lista de msg esta vacia");
                                    }
                                })
                                .catch(err => {
                                    // setError("Error en el json.");
                                });
                        } else {
                            // setError("responde.ok da error.");
                        }
                    })
                    .catch(err => {
                        // setError("Error en response.");
                    });
            }
            else {
                // setError("El token no se pudo decodificar");
            }
        }
        else {
            // setError("El token no existe");
        }
    };

    React.useEffect(listMsgs, [props.notifications]);

    return (
        <div className="container">
            <div className="row fondoCorreo">
                <div className="col-sm-12 col-lg-2">
                    <MenuMail />
                </div>
                <Switch>
                    <Route path="/mailTray/add/:id_player_destiny" exact component={AddMail} />
                    <Route path="/mailTray/received" exact component={ListMailReceived} />
                    <Route path="/mailTray/sent" exact component={ListMailSent} />
                    <Route path="/mailTray/:typeMessage/:id_message" exact component={MailDetail} />
                    <Redirect to="/mailTray/received" />
                </Switch>
            </div>
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    msgs: state.msgs,
    notifications: state.notifications

});

const mapDispachToProps = {
    setMessages: actions.setMessages
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(MailTray);

