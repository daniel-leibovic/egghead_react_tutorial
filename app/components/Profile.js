import React from 'react';
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';
import helpers from '../utils/helpers';
import Rebase from 're-base';

//tell rebase what your base url of project is
var base = Rebase.createClass('https://blistering-torch-1634.firebaseio.com/');

class Profile extends React.Component{

	//in ES6, getInitialState is replaced by constructor() which is run in classes when they are instantiated
	constructor(props){
		//can't call 'this' in constructor unless you call super(props)
		super(props);
		this.state = {
			notes: [],
			bio: {},
			repos: []
		}
	}

	init() {
		//bind property on your component state to an endpoint on firebase
		this.ref = base.bindToState(this.router.getCurrentParams().username, {
			context: this,
			asArray: true,
			state: 'notes' //:: which state prop do we bind to?
		});

		helpers.getGithubInfo(this.router.getCurrentParams().username)
			.then((dataObj) => {
				this.setState({
					bio: dataObj.bio,
					repos: dataObj.repos
				});
			});
	}

	//setup ajax requeset, firebase listeners
	componentDidMount() {
		this.init();
	}

	componentWillMount() {
		this.router = this.context.router;
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	componentWillReceiveProps() {
		base.removeBinding(this.ref);
		this.init();
	}

	handleAddNote(newNote) {
		//rebase comes with .post() method
		base.post(this.router.getCurrentParams().username, {
			data: this.state.notes.concat([newNote])
		});
	}

	render(){
		var username = this.router.getCurrentParams().username;
		return(
			<div className="row">
				<div className="col-md-4">
					<UserProfile username={username} bio={this.state.bio} />
				</div>
				<div className="col-md-4">
					<Repos username={username} repos={this.state.repos} />
				</div>
				<div className="col-md-4">
					<Notes 
						username={username}
						notes={this.state.notes}
						addNote={this.handleAddNote.bind(this)} />
				</div>
			</div>
		)
	}
}

Profile.contextTypes = {
	router: React.PropTypes.func.isRequired
}

export default Profile;