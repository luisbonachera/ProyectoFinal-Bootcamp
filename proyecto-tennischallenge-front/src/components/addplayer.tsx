import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
// import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';

const AddPlayer = () => {
    return (
        <div>
            <Form>
                <Form.Row>
                    <Form.Group controlId="formGridUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control placeholder="Enter genre" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control placeholder="Enter genre" />
                    </Form.Group>


                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Administrador" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default AddPlayer;