import React, {useEffect, useState} from 'react'
import {Image, Dropdown, Icon, Menu, Header} from 'semantic-ui-react'

interface MenuModel {
    logged: boolean,
    handler: (status: boolean) => void;
}

const Navbar:React.FC<MenuModel> = (props) => {
    const [logged, setLogged] = useState(props.logged);
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        console.log("Navbar as: ", props.logged)
        setLogged(props.logged);
        setVisible(props.logged);
    }, [props.logged])

    return (
        <Menu attached='top'>
            <Header style={{"margin": "1em", "color": "#008080"}} textAlign={"left"}>Teal</Header>
            {logged ? (
                    <Dropdown item simple icon={
                        <>
                            <Image
                                src='https://fomantic-ui.com/images/avatar2/large/kristy.png'
                                avatar
                            />
                            <Icon name={"dropdown"}/>
                        </>
                        }
                        className={"right aligned"}
                    >
                        <Dropdown.Menu>
                            <Dropdown.Header>Options</Dropdown.Header>
                            <Dropdown.Item onClick={() => {props.handler(false)}}>
                                <Icon name={"log out"}/>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            ) : (
                <></>
            )}
        </Menu>
    )
}

export default Navbar