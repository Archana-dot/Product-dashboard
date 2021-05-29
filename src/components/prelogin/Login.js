import React , {useState} from 'react';
import '../../assets/css/login.css'
import 'font-awesome/css/font-awesome.min.css';
import home from '../postlogin/Home';
import { validateUsername, validateEmail, validatePassword } from '../../validator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGoogle,faFacebook,faTwitter,faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { Link, Redirect } from "react-router-dom";
import Hoc from './Hoc'

function Login(props) {

  const [usernameOrEmail, setusernameOrEmail] = useState('')
  const[password , setPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [error , setError] = useState(false);
  const [passwordErrorMsg,setPasswordErrorMsg] = useState("");
  const [showHome, setShowHome] = useState(false)


  const check=(e)=>{
    e.preventDefault();
      console.log("inside first if condition")
      var errors = validatePassword(password)
      let validatePasswordError = errors[0];
      console.log("validatePasswordError",validatePasswordError)
      let validatePasswordErrorMsg = errors[1];
      setPasswordError(validatePasswordError)
      setPasswordErrorMsg(validatePasswordErrorMsg)
    if(usernameOrEmail.length === 0 && password.length === 0){
      setError(true)
      setErrorMsg("UserName field is empty")
      setPasswordError(true);
      setPasswordErrorMsg("password field empty")
    }else if (usernameOrEmail.length ===0){
      setError(true)
      setErrorMsg("UserName field is empty")
    }else if(password.length === 0){
      setPasswordError(true);
      setPasswordErrorMsg("password field empty")
    }
    else if (validatePasswordError === false){
      console.log("inside secoond if condition")
      var user = JSON.parse(localStorage.getItem('USER_DETAILS'))
      console.log(">>>>",user)
      for (let i=0; i< user.length; i+=1) {
        if(user[i].Email === usernameOrEmail || user[i].UserName === usernameOrEmail){
          if(user[i].Password === password){
            console.log("User name and password are correct , validate the password and empty validation also")
            console.log("Current login acciunt : ",user[i])
            window.localStorage.setItem('token', true);
            localStorage.setItem("currentUsername",user[i].Email)
            setShowHome(true)
            setusernameOrEmail('')
            setPassword('')
          }
        }
      }
      if(usernameOrEmail !== '' && password !== ''){
        setError(true)
        setErrorMsg("Invalid UserName OR Password")
      }
    }else{
      setError(true)
      setErrorMsg("Invalid UserName OR Password")
    }
  }
   
    if (localStorage.getItem("token") === "true") {
        return <Redirect to ='/Home'></Redirect>
    }else{
        return (
          <div className='login'>
            <h3>WELCOME TO</h3>
            <div className="image">
                  <img src={props.image} alt="logo" />
            </div>
            <p>Log in to get in the moment updates on the things</p>
            <p1>that interest you</p1><br /><br />

            <input type="text" className="user" placeholder="&#xF007;Enter username/email" name="username" value={usernameOrEmail} onChange={(e)=>setusernameOrEmail(e.target.value)} />
            {errorMsg === "" ? <br/> : ""}
            <div id="error">{errorMsg} </div><br />
            <input type="password" className="pswd" placeholder="&#xf084;Enter password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br />
            {passwordErrorMsg === "" ? <br/> : ""}
            <div id="error2" >{passwordErrorMsg}</div><br />

            <button type="submit" onClick={check}> SIGN IN </button><br />
            <p2>Don't have an account ?<Link to ="/registration"> SignUp Now</Link></p2><br /><br />
            <p3>_______________Or_______________</p3><br /><br />
              <p4>Continue with social media</p4><br /><br /> 

          <span>
              <div><FontAwesomeIcon class=" fa-facebook" icon={faFacebook} /></div>
              <div><FontAwesomeIcon class=" fa-twitter" icon={faTwitter} /></div>
              <div><FontAwesomeIcon class=" fa-google" icon={faGoogle} /></div>
              <div><FontAwesomeIcon class=" fa-linkedin-in" icon={faLinkedin} /></div>
          </span>
          </div>
        );
    }

  
}

export default Hoc(Login);
