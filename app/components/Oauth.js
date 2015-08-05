import React from 'react';

class Oauth extends React.Component{
  render() {
    var { accessToken, refreshToken } = this.props;
    return(
      <div>
        <h2>oAuth info</h2>
        <dl className="dl-horizontal">
          <dt>Access token</dt><dd className="text-overflow">{accessToken}</dd>
          <dt>Refresh token</dt><dd className="text-overflow">{refreshToken}></dd>
        </dl>
      </div>
    )
  }
}

export default Oauth;
