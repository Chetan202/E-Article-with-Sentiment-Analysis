import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import './login.css';

var currentUser = null;

const Login = ({ setLoginUser }) => {
    //var details = null;

    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:8000/login", user)
            .then(res => {

                currentUser = res.data.user.name
                alert(currentUser)
                setLoginUser(res.data.user)
                history.push("/")
            })
        //details=details2
    }

    //var dddd={export {details2}};

    return (
        <div className="main-div">
        <div className="Login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>OR</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
        </div>
    )
}

//let nameOfAuthor=setLoginUser
//for (let value of Object.values(setLoginUser)) {
//nameOfAuthor= value ;
//break;
//}
//var details3=details
//export { details3 };

export { currentUser };
export default Login