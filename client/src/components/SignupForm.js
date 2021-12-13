import Axios from 'axios';
import { useState } from 'react';
// Signup form

function SignupForm() {
    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    return(
        <form className="SignupForm">
            <label>Create a Username: </label>
            <input type="text" required id="user" onInput={e=> setUser(e.target.value)}/>
            <label>Create a Password: </label>
            <input type="text" required id="password" onInput={e=> setPassword(e.target.value)}/>
            <button onClick={ function() {
                sendData(user, password);
            }}>Submit</button>
        </form>
        
    );
}

function sendData(user, pass) {
    Axios.post('/createAccount', {
        username: user,
        password: pass
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}
export default SignupForm;