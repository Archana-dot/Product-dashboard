import React , {useState} from 'react';
import '../../assets/css/registration.css'
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGoogle,faFacebook,faTwitter,faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { Link, Redirect } from "react-router-dom";
import Hoc from './Hoc'
import { validateUsername, validateEmail, validatePassword } from '../../validator';



function Registration(props) {

  const[username , setUsername] = useState('');
  const[email , setEmail] = useState('');
  const[password , setPassword] = useState('');
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [usernameError, setUserNameError] = useState(false)
  const [emailErrorMsg, setEmailErrorMsg] = useState("")
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
  const [usernameErrorMsg, setUserNameErrorMsg] = useState("")
  const [showLogin, setShowLogin] = useState(false)


  const storeToLocal=(e)=>{
    e.preventDefault();
    console.log("inside registartion ")
    if(username.length !==0 && email.length !==0 && password.length !== 0){
      // if(localStorage.getItem("USER_DETAILS") == null){
      //   localStorage.setItem("USER_DETAILS",'[]')
      // }else{
        var errors = validateUsername(username)
        let validateUsernameError = errors[0]
        let validateUsernameErrorMsg = errors[1];
        setUserNameError(errors[0])
        setUserNameErrorMsg(errors[1])
         errors = validateEmail(email)
        let validateEmailError = errors[0];
        let validateEmailErrorMsg = errors[1];
        setEmailError(errors[0])
        setEmailErrorMsg(errors[1])
         errors = validatePassword(password)
        let validatePasswordError = errors[0];
        let validatePasswordErrorMsg = errors[1];
        setPasswordError(errors[0])
        setPasswordErrorMsg(errors[1])
        if ((validateUsernameError === false) && (validateEmailError === false) && (validatePasswordError === false)) {
          let details = { UserName: username, Email: email, Password: password }
          if(localStorage.getItem("USER_DETAILS") == null){
              localStorage.setItem("USER_DETAILS",'[]')
          }
          var user = JSON.parse(localStorage.getItem('USER_DETAILS'))
          user.push(details);
          window.localStorage.setItem('USER_DETAILS', JSON.stringify(user))
          setUsername("")
          setEmail("")
          setPassword("")
          alert("Registered succesfully")
          setShowLogin(true)
        }
      //}
    }else if(username.length === 0 && email.length === 0 && password.length === 0){
      setUserNameError(true);
      setUserNameErrorMsg("User name field is Empty");
      setEmailError(true)
      setEmailErrorMsg("Email field is empty")
      setPasswordError(true)
      setPasswordErrorMsg("Password field is empty")
    }else if (email.length === 0){
        setEmailError(true)
        setEmailErrorMsg("Email field is empty")
    }else if(password.length === 0){
        setPasswordError(true)
        setPasswordErrorMsg("Password field is empty")
    }else if(username.length ===0){
      setUserNameError(true);
      setUserNameErrorMsg("User name field is Empty");
    }
  }

  if(showLogin === true){
    return <Redirect to ="/"></Redirect>
  }else{
    return (
      <div className="registartion">
        <h3>WELCOME TO</h3>
        <div className="image">
          <img src={props.image} alt="logo" />
        </div>
        <p>Log in to get in the moment updates on the things</p>
        <p1>that interest you</p1><br /><br />
        
        <input type="text" placeholder="&#xF007; Username" name="username" onChange={(e)=>setUsername(e.target.value)}/>
        {usernameErrorMsg === "" ? <br /> : ""}
        <div id="error"></div>
        <input type="text" placeholder= "&#xf084; Email Address" name="email"  onChange={(e) =>setEmail(e.target.value)}/>
        {emailErrorMsg === "" ? <br /> : ""}
        <div id="error"></div>
        <input type="password" placeholder= "&#xf084; Password" name="password"  onChange={(e)=>setPassword(e.target.value)}/>
        <br /> 
        <div id="error2"></div><br />
  
        <button type="submit" onClick={storeToLocal}> SIGN UP </button><br />
        <p2>If you already have an account ?<Link to ="/"> SignIn Now</Link></p2><br /><br />
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
export default Hoc(Registration);
