import React from 'react';
import helpers from '../utils/helpers';

class UserProfile extends React.Component{


  componentWillMount(){
    this.setState({});

    helpers.getSpotifyUserInfo(this.props.accessToken)
      .then(function(response){
        this.setState(response.data);
        console.log(this.state);
      }
      .bind(this))
  }

  render(){
    var { display_name, id, email, external_urls, href, images, country, spotify } = this.state;

    return(
        <div>

          {(!images) ?
            null :

            <div>
              <h1>Logged in as {display_name}</h1>
              <div className="media">
                <div className="pull-left">
                  <img className="media-object" width="150" src={images[0].url} />
                </div>
                <div className="media-body">
                  <dl className="dl-horizontal">
                    <dt>Display name</dt><dd className="clearfix">{display_name}</dd>
                    <dt>Id</dt><dd>{id}</dd>
                    <dt>Email</dt><dd>{email}</dd>
                    <dt>Spotify URI</dt><dd><a href="{{external_urls.spotify}}">{external_urls.spotify}</a></dd>
                    <dt>Link</dt><dd><a href={href}>{href}</a></dd>
                    <dt>Profile Image</dt><dd className="clearfix"><a href={images[0].url}>{images[0].url}</a></dd>
                    <dt>Country</dt><dd>{country}</dd>
                  </dl>
                </div>
              </div>
            </div>
          }

        </div>
    )
  }
}

export default UserProfile;

