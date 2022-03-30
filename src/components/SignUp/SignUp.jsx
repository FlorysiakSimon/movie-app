import React,{useState} from 'react'
import { toast } from 'react-toastify';
import db from '../../services/db.js'
import { animation } from '../../services/animation.js';
export default function SignUp() {

    //input state
    const [nickname,setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //regex
    const strongPasswordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    const mailFormatRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //input change state
    const handleInputChange = (event) => {
        if(event.target.type === "text"){setNickname(event.target.value) }
        if(event.target.type === "email"){setEmail(event.target.value) }
        if(event.target.type === "password"){setPassword(event.target.value) }
    }

    const success = () =>{
        return animation(document.querySelector("#flex-authentification"), {animationType:"transform",animationValue: "translate3d(0, 0, 0)"})
    }

    //signup function
    const onSignUp = () =>{
        if([nickname,email, password].includes("") === true){
            return toast.error('Please fill all the fields.')
        }

        if(mailFormatRegex.test(email) === false){
            return toast.error('Please Enter a valid email address.')
        }

        if(strongPasswordRegex.test(password) === false){
            return toast.error('Please enter a password that contains at least one upper case letter, one lower case letter, one number, one special character and is at least 8 characters long.')
        }
		
        db.post('users/signup',{nickname, email, password },{
            headers: {
                    'Content-Type': 'application/json',
                }
        }) 
		.then((res) => {
            toast.success(res.data.message)
            return success()
		})
		.catch((error) => {
			return toast.error("Email or Nickname already used !")
		})
	
    }

  return (
    <div id="sign-up">

        <p>Sign Up</p>

        <p>Please fill all the fields to have an account on My Cinema</p>

        <input type="text" value={nickname} onChange={handleInputChange} placeholder="Enter your nickname" id="sign-up-nickname" />

        <input type="email" value={email} onChange={handleInputChange} placeholder="Enter your email" id="sign-up-email" />

        <input type="password" value={password} onChange={handleInputChange} placeholder="Enter your password" id="sign-up-password" />

        <button id="sign-up-button" onClick={onSignUp}>Sign Up</button>

        <p>Already sign-up, <span id="sign-up-sign-in" onClick={success}>Sign in</span></p>

                     
    </div>
  )
}
