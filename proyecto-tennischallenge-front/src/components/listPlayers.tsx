import React from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import { IPlayer } from '../interfaceIPlayer';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';


interface Iprops { }

interface IpropsGlobal {
    token: string;
    players: IPlayer[];
    setPlayers: (players: IPlayer[]) => void;
}
const ListPlayers: React.FC<Iprops & IpropsGlobal> = props => {
    const [error, setError] = React.useState("");

    const list = () => {
        if (props.token) {
            let decoded = jwt.decode(props.token);
            if (decoded !== null) {
                console.log(decoded);

                fetch("http://localhost:8080/api/players", {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            response
                                .json()
                                .then((lista: IPlayer[]) => {
                                    console.log(lista);
                                    console.log("va bien");
                                    props.setPlayers(lista);
                                    console.log(lista);
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
    }

    console.log(error);
    React.useEffect(list, []);
    if (props.players.length === 0) {
        return null;
    }

    return (
        <div>

            <CardDeck >
                {props.players.map(u =>
                    <Link key={u.id_player} to={"/players/" + u.id_player} >
                        <Card style={{ display: 'flex', flexDirection: 'row' }}>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>{u.username}</Card.Title>
                                <Card.Text>
                                    {u.city}
                                </Card.Text>
                                <Card.Text>
                                    {u.genre}
                                </Card.Text>
                                <Card.Text>
                                    {u.rating}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    </Link>
                )}
            </CardDeck>

        </div>
    )
};



const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    players: state.players

});

const mapDispachToProps = {
    setPlayers: actions.setPlayers
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ListPlayers);