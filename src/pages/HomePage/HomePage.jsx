import React from 'react'
//components
import SignIn from '../../components/SignIn/SignIn'
import SignUp from '../../components/SignUp/SignUp'
import ForgottenPassword from '../../components/ForgottenPassword/ForgottenPassword'
import VerifyCode from '../../components/VerifyCode/VerifyCode'
import ModifyPassword from '../../components/ModifyPassword/ModifyPassword'
//styles
import './HomePage.scss'




export default function HomePage() {
    return (
        <div id="form-authentification">

            <div id="flex-authentification">
                <SignIn />
                <SignUp />
                <ForgottenPassword />
                <VerifyCode/>
                <ModifyPassword/>
            </div>

        </div>
    )
}



    
 
    
    