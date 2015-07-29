var React = require('react');
var Router = require('react-router');
var UserProfile = require('./Github/UserProfile');
var Repos = require('./Github/Repos');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({
	//Router.State mixin allows query url param (in this case, to get :username)
	mixins: [Router.State, ReactFireMixin], 
	getInitialState: function() {
		return {
			notes: [],
			bio: {name: 'Tyler'},
			repos: [1,2,3]
		};
	},

	init: function() {
		var childRef = this.ref.child(this.getParams().username);
		this.bindAsArray(childRef, 'notes');
	},

	//setup ajax requeset, firebase listeners
	componentDidMount: function() {
		console.log('didmount!');
		this.ref = new Firebase('https://blistering-torch-1634.firebaseio.com/');
		this.init();
	},

	componentWillUnmount: function() {
		this.unbind('notes');
	},

	componentWillReceiveProps: function() {
		this.unbind('notes');
		this.init();
	},

	handleAddNote: function(newNote) {
		this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
	},
	
	render: function() {
		var username = this.getParams().username;
		return (
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
						addNote={this.handleAddNote} />
				</div>
			</div>
		)
	}
});

module.exports = Profile;