import React, {useState} from "react";
import "../Styles/Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  function changeHandle(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  function signIn(e) {
    e.preventDefault()

    auth
    .signInWithEmailAndPassword(email, password)
    .then(auth => history.push('/'))
    .catch(error => alert(error.message))
  }

  function register(e) {
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then(auth => {
      if(auth) {
        history.push('/')
      }
    })
    .catch(error => alert(error.message))

  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="http://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.swg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
          <h1>Sign-in</h1>

          <form>
              <h5>E-mail</h5>
              <input type="text" name="email" value={email} onChange={changeHandle}/>

              <h5>Password</h5>
              <input type="password" name="password" value={password} onChange={changeHandle}/>

              <button type="submit" className="login__signInButton" onClick={signIn}>Sign In</button>
          </form>

          <p>By continuing, you agree to AMAZON FAKE CLONE Conditions of Use and Privacy Notice.</p>

          <button className="login__registerButton" onClick={register}>Create Your Amazon account</button>
      </div>
    </div>
  );
}

export default Login;
