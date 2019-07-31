import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
// import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';
import { connect } from 'react-redux';
import * as actions from '../actions/actions'
import { RouteComponentProps } from 'react-router-dom';

interface IProps {}

interface IPropsGlobal {
    setToken: (token: string) => void;
}

const Login: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {

    const [inputUser, setInputUser] = React.useState("");
    const [inputPass, setInputPass] = React.useState("");
    const [error, setError] = React.useState("");


    const UpdateUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputUser(event.target.value);
        setError("");
    }

    const UpdatePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPass(event.currentTarget.value);
        setError("");
    }



    const log = () => {

        fetch("http://localhost:8080/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: inputUser,
                password: inputPass
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log("ok");
                    response
                        .text() //el text()es una promesa
                        .then((text: string) => {
                            console.log(text);
                            props.setToken(text);
                            props.history.push("/");
                        });
                } else {
                    setError("Usuario o Contraseña incorrectos");
                    console.log(error);
                }
            })
            .catch(err => {
                setError("Usuario o Contraseña incorrectos.");
                console.log(error);
            });
    }

    return (
        <div>
            <Form>
                <Form.Group as={Row} controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <input type="text" placeholder="Enter username" onChange={UpdateUser} />
                </Form.Group>
                <Form.Group as={Row} controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <input type="password" placeholder="Password" onChange={UpdatePass} />
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 6 }}>
                        <Button type="button" onClick={log}>Sign in</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
};

const mapDispachToProps = {
    setToken: actions.setToken
  }
  export default connect(
    null,
    mapDispachToProps
  )(Login);

