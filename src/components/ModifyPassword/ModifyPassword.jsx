import React, {useState} from 'react'
import { toast } from 'react-toastify';
import db from '../../services/db.js'
import { animation } from '../../services/animation.js';

export default function ModifyPassword() {

    //input state
    const [password, setPassword] = useState('');
    const _id = localStorage.getItem("userId");

    //regex
    const strongPasswordRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    //input change state
    const handleInputChange = (event) => {
        setPassword(event.target.value) 
    }

    const modifyPassword = () =>{
        if(password === ""){ 
            return toast.error('Please fill the field !')
        }
        if(strongPasswordRegex.test(password) === false){ 
            return toast.error('Please enter a password that contains at least one upper case letter, one lower case letter, one number, one special character and is at least 8 characters long.')
        }
        db.post('users/modify-password',{ _id,password },{
            headers: {
                    'Content-Type': 'application/json',
                }
        }) 
		.then((res) => {
            toast.success('Password changed, You can now Sign in !')
            localStorage.removeItem("userId");
            return animation(document.querySelector("#flex-authentification"), {animationType:"transform",animationValue: "translate3d(0, 0, 0)"})
		})
		.catch((error) => {
			return toast.error("Server error !")
		})
    }
    return (
        <div id="modify-password">

            <p>Modify password</p>

            <p>Please enter your new password</p>

            <input type="password" value={password} onChange={handleInputChange} placeholder="Enter your new password" id="modify-password-new" />

            <button id="modify-button" onClick={modifyPassword}>Next</button>
                    
        </div>
  )
}
