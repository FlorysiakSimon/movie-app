import React, {useState} from 'react'
import { toast } from 'react-toastify';
import db from '../../services/db.js'
import { animation } from '../../services/animation.js';

export default function SignIn() {

    //input state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //regex
    const strongPasswordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    const mailFormatRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //input change state
    const handleInputChange = (event) => {
        event.target.type === 'email' 
        ? setEmail(event.target.value) 
        : setPassword(event.target.value) 
    }

    //animation
    const success = () =>{
        return animation(document.querySelector("#flex-authentification"), {animationType:"transform",animationValue: "translate3d(-100%, 0, 0)"})
    }

    const forgotPassword = () =>{
        return animation(document.querySelector("#flex-authentification"), {animationType:"transform",animationValue: "translate3d(-200%, 0, 0)"})
    }

    //submit
    const onSignIn = () =>{
        if([email, password].includes("") === true){
            return toast.error('Please fill all the fields.')
        }

        if(mailFormatRegex.test(email) === false){
            return toast.error('Please Enter a valid email address.')
        }

        if(strongPasswordRegex.test(password) === false){
            return toast.error('Please enter a password that contains at least one upper case letter, one lower case letter, one number, one special character and is at least 8 characters long.')
        }
		
        db.post('users/login',{ email, password },{
            headers: {
                    'Content-Type': 'application/json',
                }
        }) 
		.then((res) => {
            // We store the differents user data
            delete res.data.message;
            localStorage.setItem("userInfos", JSON.stringify(res.data));
            // We redirect to the movie page
            window.location.href = "movies";
		})
		.catch((error) => {
			return toast.error("Unable to connect, you have entered the wrong access !")
		})
	
    }

  return (

    <div id="sign-in">
    
        <p>Sign In</p>

        <p>Please fill all the fields to access to all the movies</p>

        <input type="email" value={email} onChange={handleInputChange} placeholder="Enter your email" id="sign-in-email" />

        <input type="password" value={password} onChange={handleInputChange} placeholder="Enter your password" id="sign-in-password" />

        <button id="sign-in-button" onClick={onSignIn}>Sign In</button>

        <p>Not already sign-up, <span id="sign-in-sign-up" onClick={success}>Sign up</span></p>

        <p id="sign-in-forgotten-password" onClick={forgotPassword}>Forgotten password</p>

    </div>
  )
}
