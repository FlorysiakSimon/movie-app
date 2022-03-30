import React, {useState} from 'react'
import { toast } from 'react-toastify';
import db from '../../services/db.js'
import { animation } from '../../services/animation.js';

export default function ForgottenPassword() {
    //input state
    const [email, setEmail] = useState('');
    
    //regex
    const mailFormatRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
 
    //input change state
    const handleInputChange = (event) => {
        setEmail(event.target.value) 
    }

    //animation
    const signIn = () =>{
        return animation(document.querySelector("#flex-authentification"), {animationType:"transform",animationValue: "translate3d(0, 0, 0)"})
    }

    const forgotPassword = () =>{
        if([email].includes("") === true){
            return toast.error('Please fill the field.')
        }

        if(mailFormatRegex.test(email) === false){
            return toast.error('Please Enter a valid email address.')
        }

        db.post('users/forgot-password',{ email },{
            headers: {
                    'Content-Type': 'application/json',
                }
        }) 
		.then((res) => {
            toast.success('Email sent to your email address !')
            return animation(document.querySelector("#flex-authentification"), {animationType:"transform",animationValue: "translate3d(-300%, 0, 0)"})
		})
		.catch((error) => {
			return toast.error("Unable to connect, you have entered the wrong access !")
		})
    }

    return (
        <div id="forgotten-password">

            <p>Forgotten Password</p>

            <p>Have you forgotten your password ? Please enter your email address</p>

            <input type="email" value={email} onChange={handleInputChange} placeholder="Enter your email" id="forgotten-password-email" />

            <button id="email-button" onClick={forgotPassword}>Next</button>

            <p>Do you remember your password ? <span id="forgotten-password-sign-in" onClick={signIn}>Sign in</span></p>

        </div>
  )
}
