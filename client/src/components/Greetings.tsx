import React, {useState} from "react";
import {Card, Grid, Header, Icon, Transition} from "semantic-ui-react";

export default function Greetings(){
    const [visible, setVisible] = useState(true);
    const [name, setName] = useState(localStorage.getItem("name"));

    animationButton()
    function animationButton(){
        setTimeout(() => {
            setVisible(!visible);
            animationButton()
        }, 1500)
    }

    return (
        <Grid centered style={{ height: '95vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Transition
                    animation={"tada"}
                    duration={1000}
                    visible={visible}
                >
                    <Card centered>
                        <Card.Content>
                            <Card.Header textAlign={"center"}>Greetings, {name}!</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='checkmark' className={"green"} />
                                <Header.Content>Successfully Logged!</Header.Content>
                            </Header>
                        </Card.Content>
                    </Card>
                </Transition>
            </Grid.Column>
        </Grid>
    )
}