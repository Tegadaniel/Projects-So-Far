import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';



class Post extends Component{
		 	renderPosts(){
		return this.props.data.posts.map(posts =>{

			return(

				<div key={posts.id} className= "container"  >
				<br/> Author Name: {posts.author}  <br/> Title: {posts.title}  <br/> {posts.content} 
				</div>
				)
				
				
		});  
	}


	render(){
		
		if(this.props.data.loading){
			return <div> loading...</div>
			}

		return(
			<p className= "collection">
		{this.renderPosts()}
		</p>



	);
	
	}
}


const query = gql`
{
	posts{
	author
	title
	content
		
	}
}
`;

export default graphql(query) (Post);