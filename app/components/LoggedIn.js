import React from 'react';
import UserProfile from './UserProfile';
import Oauth from './Oauth';
import helpers from '../utils/helpers';

class LoggedIn extends React.Component{
  constructor() {
    super();
    this. _handleClick = this._handleClick.bind(this);
  }

  render(){
    console.log('render this', this)
    var { accessToken, refreshToken } = this.props;

    return(
      <div id="loggedin">
        <UserProfile accessToken={accessToken} />
        <Oauth accessToken={accessToken} refreshToken={refreshToken} />
        <button onClick={this._handleClick} className="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>
      </div>
    )
  }

  _handleClick(){
    console.log('handleClick this', this);
    helpers.getRefreshToken(this.props.refreshToken)
      .then(function(data){
        this.setState(
          { accessToken: data.access_token }
        );
        console.log('getRefreshToken data', data);
      }
      .bind(this))
  }

}

export default LoggedIn;
