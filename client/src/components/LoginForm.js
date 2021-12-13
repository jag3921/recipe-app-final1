import Axios from 'axios';
// Login form

function LoginForm() {
    return(
        <form className="LoginForm">
            <label>Username: </label>
            <input type="text" required id="login" />
            <label>Password: </label>
            <input type="text" required id="password" />
            <button >Submit</button>
        </form>
        
    );
}

function sendData() {
    Axios.get('/getUser')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => console.log(error));
}
export default LoginForm;