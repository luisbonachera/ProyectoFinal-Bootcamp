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
    // const [error, setError] = React.useState("");

    const id = props.match.params.id_player;
    console.log(id);

    console.log(props.players);
    let player = props.players.find(p => p.id_player === +id);

    React.useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        player = props.players.find(p => p.id_player === +id);
        console.log(player);
    }, [props.player]);

    // if(!player){
    //     return null;
    // }


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
                                avatar: "",
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
                console.log("El token no se pudo decodificar");
            }
        }
        else {
            console.log("El token no existe");
        }
    };

    return (
        <div>

            {player !== null && player !== undefined && (
                <CardDeck className="cardHorizont cardProfileViewPlayer">

                    <Card className="cardProfile" style={{ display: 'flex', flexDirection: 'row' }}>
                        <Card.Img className="avatarListProfile" variant="top"
                            src={player.avatar ? "http://localhost:8080/uploads/avatar/" + player.avatar + "?" + (new Date()).valueOf() :
                                "../../images/avatar-tenis.png"} alt="" />
                        <Card.Body>
                            <Card.Title>{player.username}</Card.Title>
                            <Card.Text>
                                {player.email}
                            </Card.Text>
                            <Card.Text>
                                {player.city}
                            </Card.Text>
                            <Card.Text>
                                <img src={player.genre === "HOMBRE" ? "../../images/hombre30.png" : "../../images/mujer.png"} width="15" height="15" alt="" />
                                <span className="text-capitalize">{player.genre.toLowerCase()}</span>
                            </Card.Text>
                            <Card.Text>
                                {player.rating > 0 &&
                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                }
                                {player.rating > 1 &&
                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                }
                                {player.rating > 2 &&
                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                }
                                {player.rating > 3 &&
                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                }
                                {player.rating > 4 &&
                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                }
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <div className="container-fluid">
                                <div className="row">
                                    <Link to={"/players/edit/" + player.id_player}>
                                        <Button className="buttonForm" variant="primary">Editar</Button>
                                    </Link>
                                </div>
                                <br/><br/>
                                <div className="row">
                                    <Button className="buttonForm" variant="primary" onClick={borrar}>Borrar</Button>
                                </div>
                            </div>

                            {/* <br />
                            <br /> */}

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