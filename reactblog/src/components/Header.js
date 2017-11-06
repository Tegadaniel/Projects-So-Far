import React, { Component } from 'react';
//import { div } from 'react-router-dom';


class Header extends Component {
  render() {
    return (
    	<div className='Header'>
   
         <div className='blog-masthead'>
      <div className='container'>
        <nav className='blog-nav'>
          <a className='blog-nav-item' href="#">Home</a>
    
          {/* <div className='blog-nav-item'to="./Features">Features</div>
          <div className='blog-nav-item' to="./Press" >Press</div>

          <div className='blog-nav-item' to="./About" >About</div> */}
        </nav>
      </div>
    </div>

            <div className= "container">
          <div className="blog-header">
					<h1 className="blog-title">Exovle Intern Blog</h1>
					<p className="lead blog-description">Trying to use GraphQL along with React.</p>
					</div>
            </div>

      </div>);

}
}
export default Header;
