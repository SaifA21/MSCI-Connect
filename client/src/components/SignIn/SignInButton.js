import React from "react"
import { Button } from "@material-ui/core"

export default function SignInButton(props) {

    return (
        <Button variant='contained' onClick={props.onClick}>Sign In</Button>
    )

}