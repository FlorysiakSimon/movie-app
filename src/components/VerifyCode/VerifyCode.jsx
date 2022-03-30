import React,{useState} from 'react'
import { toast } from 'react-toastify';
import db from '../../services/db.js'
import { animation } from '../../services/animation.js';


export default function VerifyCode() {

    //state
    const [resetPasswordNumber,setresetPasswordNumber] = useState('') 

    //input change state
    const handleInputChange = (event) => {
        setresetPasswordNumber(event.target.value) 
    }

    //verify code function
    const verifyNumber = () =>{
        // We need to verify if the input is not empty
        if(resetPasswordNumber === "" || resetPasswordNumber.length !== 6){
            return toast.error('Please enter your 6 numbers secret code !')
        }
        db.post('users/reset-password',{ resetPasswordNumber },{
            headers: {
                    'Content-Type': 'application/json',
                }
        }) 
		.then((res) => {
            // We store user id
            console.log(res)
            localStorage.setItem("userId", res.data._id);
            toast.success(res.data.message)
            return animation(document.querySelector("#flex-authentification"), {animationType:"transform",animationValue: "translate3d(-400%, 0, 0)"})
		})
		.catch((error) => {
			return toast.error("Unable to connect, you have entered the wrong access !")
		})
        
    }

    return (
        <div id="verify-code">

            <p>Verify code</p>

            <p>Please enter your 6 numbers verification code to modify your password</p>

            <input type="number" value={resetPasswordNumber} onChange={handleInputChange} placeholder="Enter your secret code" id="verify-code-numbers" />

            <button id="verify-button" onClick={verifyNumber}>Next</button>
            
        </div>
  )
}
