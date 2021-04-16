import React, { Component } from 'react'
import classes from "./SignIn.module.css"

import { signInWithGoogle } from "../Firebase/Firebase"

class SignIn extends Component {


    handleSubmitForm = (e) => {
        e.preventDefault()
    }
    render() {
        return (
            <div className={classes.SignIn}>

                <form onSubmit={this.handleSubmitForm}>
                    <input type="email" />
                    <input type="password" />

                    <input type="submit" value="SignIn" />
                    <button onClick={signInWithGoogle}>Signin with the google</button>
                </form>

            </div>
        )
    }
}

export default SignIn
