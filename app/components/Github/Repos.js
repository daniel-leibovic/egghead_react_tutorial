var React = require('react');

var Repos = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		repos: React.PropTypes.array.isRequired
	},
	
	render: function() {
		var repos = this.props.repos.map(function(repo, index){
			return (
				//when mapping, react needs keys to optimize remove add to list (will throw error if you don't add)
				<li className="list-group-item" key={index}>
					{repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a></h4>}
					{repo.description && <p> {repo.description}</p>}
				</li>
			);
		});

		return(
			<div>
				<h3> User Repos</h3>
				<ul className="list-group">
					{repos }
				</ul>
			</div>
		)
	}
});

module.exports = Repos;