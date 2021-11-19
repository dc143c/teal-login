import React, {useEffect, useState} from 'react'
import {Button, Card, Form, Grid, Icon, Message, Transition} from 'semantic-ui-react'
import axios from "axios";

interface LoginModel {
    logged: boolean,
    handler: (status: boolean) => void;
}

const LoginForm: React.FC<LoginModel> = (props) => {
    const [logged, setLogged] = useState(props.logged);
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(0);

    function sendAllFormData() {
        setLoading(1);
        axios({
            method: "POST",
            url: 'http://localhost:3333/login',
            data : {
                "grant_type": "password",
                "username": username,
                "password": password
            }
        })
        .then(function (response) {
            console.log(response.data)
            setLoading(0);
            if(!response.data.error){
                localStorage.setItem("name", response.data.user_full_name)
                localStorage.setItem("token", response.data.access_token)
                props.handler(true)
                setError("");
                return;
            }
            setError(response.data.message)
        })
        .catch(function (error) {
            setLoading(0);
            setError(error.message);
        })
    }

    useEffect(() => {
        setLogged(props.logged);
        setVisible(true)
    }, [props.logged])

    animationButton()
    function animationButton(){
        if(loading !== 1){
            setTimeout(() => {
                setVisible(!visible);
                animationButton()
            }, 2000)
        } else {
            setTimeout(() => {
                setVisible(true);
                animationButton()
            }, 2000)
        }
    }

    return (
        <Grid centered style={{ height: '95vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Card centered raised>
                <Card.Content>
                    <Card.Header>Login</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <input autoComplete={"off"} placeholder='something@somewhere.com'
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Passowrd</label>
                            <input autoComplete={"off"} type={"password"} onChange={(e) => setPassword(e.target.value)}
                                   placeholder="Shh! Lets keep it a secret"/>
                        </Form.Field>
                        <Transition
                            animation={"pulse"}
                            duration={1000}
                            visible={visible}
                        >
                            {loading === 0 ? (
                                <Button fluid color={"teal"} type='submit' onClick={sendAllFormData}>Submit</Button>
                            ) : (
                                <Button loading fluid color={"teal"} type='submit' onClick={sendAllFormData}>Submit</Button>
                            )}
                        </Transition>
                    </Form>
                </Card.Content>
                {error.length > 0 ? (
                    <Message attached={"bottom"} negative>
                        <Icon name={"times circle"} />
                        {error}
                    </Message>
                ) :
                    (
                    <></>
                    )}
            </Card>
        </Grid.Column>
        </Grid>
    )
}

export default LoginForm;
