import React from 'react';

class Login extends React.Component{
  render(){
    console.log("in LOGIN")
    return(
      <div id="login">
        {JSON.stringify(this.state)}
        <h1>This is an example of the Authorization Code flow</h1>
        <a href="/login" className="btn btn-primary">Log in with Spotify</a>
      </div>
    )
  }
}

export default Login;
