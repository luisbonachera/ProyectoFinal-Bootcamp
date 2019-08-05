import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import MenuMail from './menuMail';
import ListMail from './listMail';
import MailDetail from './mailDetail';
import AddMail from './addMail';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { IMsg } from '../interfaceIMsg';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';

interface IPropsGloblal {
    token: string,
    msgs: IMsg[],
    setMessages: (msgs: IMsg[]) => void
}

const MailTray: React.FC<IPropsGloblal> = props => {

    const [error, setError] = React.useState("");
    const [messagesHooks, setMessagesHooks] = React.useState<IMsg[]>([]);

    const listMsgs = () => {
        if (props.token) {
            let decoded = jwt.decode(props.token);
            if (decoded !== null) {
                console.log(decoded);

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
                                        console.log(lista);
                                        console.log("va bien");
                                        console.log(lista);
                                        props.setMessages(lista);
                                        //esto es para recoger los msg received
                                        if (props.token) {
                                            const decoded = jwt.decode(props.token);
                                            if (decoded !== null && typeof decoded !== "string") {
                                                let msgsReceived = props.msgs.filter(m => m.id_player_destiny === decoded.id_player);
                                                if (msgsReceived.length > 0) {
                                                    console.log("hay msg recibidos y los guardo");
                                                    // setMessagesSent([]);
                                                    // setMessagesReceived(msgsReceived);
                                                    setMessagesHooks(msgsReceived);
                                                } else {
                                                    console.log("no hay mensajes recibidos");
                                                }

                                            } else {
                                                console.log("no se ha podido decodificar token")
                                            }
                                        } else {
                                            console.log("no hay token");
                                        }
                                    } else {
                                        console.log("la lista de msg esta vacia");
                                    }

                                })
                                .catch(err => {
                                    setError("Error en el json.");
                                });
                        } else {
                            setError("responde.ok da error.");
                        }
                    })
                    .catch(err => {
                        setError("Error en response.");
                    });
            }
            else {
                setError("El token no se pudo decodificar");
            }
        }
        else {
            setError("El token no existe");
        }
    };

    React.useEffect(listMsgs, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* <MenuMail /> */}

                <div className="col-2">
                    <MenuMail />
                </div>
                <div className="col-8">
                </div>
                <Switch>
                    <Route path="/mailTray/:typeMessage" component={ListMail} />
                    <Route path="/mailTray/add/:id_player_destiny" exact component={AddMail} />
                    <Route path="/mailTray/:typeMessage/:id_message" exact component={MailDetail} />
                    <Redirect to="/mailTray/received" />
                </Switch>

            </div>
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    msgs: state.msgs

});

const mapDispachToProps = {
    setMessages: actions.setMessages
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(MailTray);

