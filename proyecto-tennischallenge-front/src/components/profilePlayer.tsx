import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IPlayer } from '../interfaceIPlayer';
import { CardDeck, Card, Button } from 'react-bootstrap';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';

interface IPRopsGlobal {
    players: IPlayer[];
    player: IPlayer;
    token: string;
    setToken: (token: string) => void;
    deletePlayer: (id_player: number) => void;
    setPlayer: (player: IPlayer) => void;
}

const ProfilePlayer: React.FC<IPRopsGlobal & RouteComponentProps<{ id_player: string }>> = props => {
    const [error, setError] = React.useState("");

    const id = props.match.params.id_player;
    console.log(id);

    console.log(props.players);


    const player = props.players.find(p => p.id_player === +id);
    console.log(player);



    // esta funcion no es borrar, es editar campo del player de borrado a true
    const borrar = () => {

        if (props.token) {
            let decoded: any = jwt.decode(props.token);
            const id: number = +props.match.params.id_player;
            if (decoded !== null && (id === decoded.id_player || props.player.isAdmin)) {
                console.log(decoded);

                console.log("entra al fetch");
                console.log("Soy admin: " + props.player.isAdmin);
                fetch("http://localhost:8080/api/players/erased/" + id, {
                    method: "PUT",
                    // fetch("http://localhost:8080/api/players/" + id, {
                    //     method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("usuario borrado")
                            props.setToken("");
                            props.history.push("/");
                            props.deletePlayer(id);
                            const playerNull: IPlayer = {
                                id_player: 0,
                                username: "",
                                email: "",
                                city: "",
                                genre: "",
                                rating: 0,
                                isAdmin: false
                            };
                            props.setPlayer(playerNull);

                        } else {
                            console.log("error en el response.ok");
                        }
                    })
                    .catch(err => {
                        console.log("Error," + err)
                    })
            }
            else {
                setError("El token no se pudo decodificar");
            }
        }
        else {
            setError("El token no existe");
        }
    };

    return (
        <div>

            {props.player !== null && props.player !== undefined && (
                <CardDeck >

                    <Card style={{ display: 'flex', flexDirection: 'row' }}>
                        <Card.Img className="avatarFrofile" variant="top"
                            src={props.player.avatar ? "http://localhost:8080/uploads/avatar/" + props.player.avatar : "images/avatar-tenis.png"} alt="" />
                        <Card.Body>
                            <Card.Title>{props.player.username}</Card.Title>
                            <Card.Text>
                                {props.player.email}
                            </Card.Text>
                            <Card.Text>
                                {props.player.city}
                            </Card.Text>
                            <Card.Text>
                                {props.player.genre}
                            </Card.Text>
                            <Card.Text>
                                {props.player.rating}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer >
                            <small className="text-muted">Last updated 3 mins ago</small>
                            <Link to={"/players/edit/" + props.player.id_player}>
                                <Button variant="primary">Editar</Button>
                            </Link>
                            <Button variant="primary" onClick={borrar}>Borrar</Button>
                        </Card.Footer>
                    </Card>

                </CardDeck>
            )}

        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    players: state.players,
    player: state.player

});

const mapDispachToProps = {
    setToken: actions.setToken,
    deletePlayer: actions.deletePlayer
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ProfilePlayer);