import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
import * as actions from '../actions/actions';
// import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import { IPlayer } from '../interfaceIPlayer';
import jwt from 'jsonwebtoken';


interface IProps { }

interface IPropsGlobal {
    player: IPlayer;
    updatePlayer: (player: IPlayer) => void;
    updatePlayers: (player: IPlayer) => void;

    players: IPlayer[];
    token: string;
}

const EditPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player: string }>> = props => {

    const [error, setError] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");
    const [city, setCity] = React.useState("");
    const [genre, setGenre] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    
    const [image, setImage] = React.useState();

    const updateUsername = (event: any) => {
        setUsername(event.currentTarget.value);
        // setError("");
    };

    const updateEmail = (event: any) => {
        setEmail(event.currentTarget.value);
        // setError("");
    };

    // const updatePassword = (event: any) => {
    //     setPassword(event.currentTarget.value);
    //     // setError("");
    // };
    const updateCity = (event: any) => {
        setCity(event.currentTarget.value);
        // setError("");
    };

    const updateGenre = (event: any) => {
        setGenre(event.currentTarget.value);
        // setError("");
    };

    const updateRating = (event: any) => {
        setRating(event.currentTarget.value);
        // setError("");
    };

    const updateIsAdmin = (event: any)=>{
        setIsAdmin(s=> !s);
        // setIsAdmin(event.target.checked);
        console.log("isAdmin en updatedIsAdmin: " + isAdmin);
        // setError("");
    };

    const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.files![0]);
    };


    let id_player: number = +props.match.params.id_player;
    let player = props.players.find(p => p.id_player === id_player);
    // if (player){
    //     setIsAdmin(player.isAdmin);
    // }
    console.log("player:");
    console.log(player);

    const edit = () => {
        if (props.token) {
            let decoded: any = jwt.decode(props.token);
            const id: number = +props.match.params.id_player;
            if (decoded !== null && (id === decoded.id_player || props.player.isAdmin === true)) {
                console.log(decoded);

                console.log("entra al fetch");
                console.log(isAdmin);

                const formData = new FormData();
                // esto es para poder cambiarle la foto y pnerle el nombre de su id.extension 
                // a otra persona que no sea yo si soy Admin
                formData.append("id_player", ""+id);
                
                formData.append("file", image);
                formData.append("username", username);
                formData.append("email", email);
                formData.append("city", city);
                formData.append("genre", genre);
                formData.append("rating", rating);
                let administador = isAdmin ? "1" : "0";
                formData.append("isAdmin", administador);

                // formData.append("isAdmin", isAdmin ? "1" : "0");
                console.log(isAdmin);

                console.log(administador);
                fetch("http://localhost:8080/api/players/" + id, {
                    method: "PUT",
                    headers: {
                        // "Content-Type": "application/json"
                        Authorization: "Bearer " + props.token
                    },
                    body: formData
                })
                    // fetch("http://localhost:8080/api/players/" + id, {
                    //     method: "PUT",
                    //     headers: {
                    //         "Content-Type": "application/json",
                    //         Authorization: "Bearer " + props.token
                    //     },
                    //     body: JSON.stringify({
                    //         ...(username && { username: username }),
                    //         ...(email && { email: email }),
                    //         // password: password,
                    //         ...(city && { city: city }),
                    //         ...(genre && { genre: genre }),
                    //         ...(rating && { rating: rating }),
                    //         ...(isAdmin && { isAdmin: isAdmin })
                    //     })
                    // })
                    .then(response => {
                        if (response.ok) {
                            response
                                .json()
                                .then((lista: any) => {
                                    console.log(lista);
                                    if (lista.length === 1) {
                                        console.log("usuario modificado y listado");
                                        console.log(lista);
                                        props.updatePlayers(lista[0]);
                                        if (id === decoded.id_player) {
                                            props.updatePlayer(lista[0]);
                                        }

                                        props.history.push("/profile/" + id);
                                    } else if (lista.length > 1) {
                                        console.log("viene mas de 1 player");
                                    } else {
                                        console.log("no viene ningun usuario.")
                                    }
                                    ;
                                })
                                .catch(err => {
                                    setError("Error en el json.");
                                });
                            // console.log("usuario creado")
                            // const us: IPlayer = {
                            //     ...props.player,
                            //     //hay que traerte primero el nombre y luego lo guardas aqui
                            //     // ...(avatar && { avatar: image }),
                            //     ...(username && { username: username }),
                            //     ...(email && { email: email }),
                            //     // password: password,
                            //     ...(city && { city: city }),
                            //     ...(genre && { genre: genre }),
                            //     ...(rating && { rating: +rating }),
                            //     ...(isAdmin && { isAdmin: isAdmin })
                            // }
                            // console.log(us);

                            // props.history.push("/");
                            // fetch("http://localhost:8080/api/auth", {
                            //     method: "post",
                            //     headers: {
                            //         "Content-Type": "application/json"
                            //     },
                            //     body: JSON.stringify({
                            //         username: username,
                            //         password: props.player.password
                            //     })
                            // })
                            //     .then(response => {
                            //         if (response.ok) {
                            //             response
                            //                 .text()
                            //                 .then((token: string) => {
                            //                     props.setToken(token);
                            //                     // const token_decoded: any = jwt.decode(token);
                            //                     // console.log(token_decoded);
                            //                     // if (token_decoded !== null && typeof token_decoded !== "string") {
                            //                     //     props.setUser(token_decoded);

                            //                     // }
                            //                     props.history.push("/")

                            //                 })

                            //         } else {
                            //             setError("Usuario o Contraseña incorrectos ," + error );
                            //             console.log(error);
                            //         }
                            //     })
                            //     .catch(error => {
                            //         setError("Usuario o Contraseña incorrectos ,"+ error );
                            //         console.log(error);
                            //     });
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
            {player && id_player && (player.id_player === id_player || props.player.isAdmin) && (
                <Form>
                    <Form.Row>
                        <img className="avatarListProfile"
                            src={player.avatar ? "http://localhost:8080/uploads/avatar/" + player.avatar : "../../../images/avatar-tenis.png"} alt="" />
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formGridUsername">
                            <input type="file" className="btn btn-info" placeholder="Enter username" onChange={updateImage} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username" onChange={updateUsername} defaultValue={player.username} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={updateEmail} defaultValue={player.email} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        {/* <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={updatePassword} />
                    </Form.Group> */}


                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="Enter city" onChange={updateCity} defaultValue={player.city} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" placeholder="Enter genre" onChange={updateGenre} defaultValue={player.genre} />
                        </Form.Group>

                        {/* <Form.Group as={Col} controlId="formGridRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" placeholder="Enter rating" onChange={updateRating} />
                    </Form.Group> */}
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as="select" defaultValue={player.rating + ""} onChange={updateRating}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Form.Control>
                        </Form.Group>


                    </Form.Row>
                    {/* <Form.Row>
                    <Form.Group as={Col} controlId="formGridDay">
                        <Form.Label>Day</Form.Label>
                        <Form.Control type="text" placeholder="Enter day" onChange={updateGenre} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMonth">
                        <Form.Label>Month</Form.Label>
                        <Form.Control type="number" placeholder="Enter month" onChange={updateRating} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" placeholder="Enter year" onChange={updateRating} />
                    </Form.Group>


                </Form.Row> */}
                    {props.player.isAdmin &&
                    <>
                        <Form.Group id="formGridCheckbox">
                            <Form.Check  id="admin" className="Administrador" type="checkbox" label="Administrador" name="Administrador" onChange={updateIsAdmin} defaultChecked={player.isAdmin} />
                        </Form.Group>

                        <Form.Group id="formGridCheckbox2">
                            <Form.Check type="checkbox" label="PrebaAdmin" onChange={updateIsAdmin}  checked={isAdmin} />
                        </Form.Group>
                        </>
                    }
                    <Button variant="primary" type="button" onClick={edit}>
                        Save
                </Button>
                </Form>
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
    updatePlayer: actions.updatePlayer,
    updatePlayers: actions.updatePlayers
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(EditPlayer);