import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import image from './images/interstellar-wallpapers-29645-5416918.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      movieName: "interstellar",
      imdbId: "",
      image : "https://i.pinimg.com/originals/43/d5/66/43d5666f75340bfa4a91fff84953f9d1.jpg",
      type : "movie",
      year : "2018"
    };
  }
  makeAjaxCall(e){
    let text = document.getElementById("text").value
    // let body = document.getElementsByTagName('body') 
    if (text !=="") {
      fetch("http://www.omdbapi.com/?s=" + text + "&apikey=BanMePlz")
        .then(res => res.json())
         
        .then((result) =>{
          this.setState({
            movieName: result.Search[0].Title,
            imdbId: result.Search[0].imdbID, 
            image : result.Search[0].Poster,
            year : result.Search[0].Year,
            type : result.Search[0].Type  
          });
          // body.backgroundImage = result.Search[0].Poster
        },
        (error) => {
          this.setState({
            movieName: "error",
            
          });
        })
        
        
    }
  }
  render() {
    return (
      <div>
      <div className = "searchBox">
        <input type = "text" class = "textBox" id = "text" placeholder = "Search movie title..." ></input>
        <span class = "underLine"></span>
        <button class = "submitButton" onClick = {(e) => this.makeAjaxCall(e)}>submit</button>
      </div>
        <div className = "content">
          <img src={this.state.image} class = "image"/>
          <div class = "text">
            movie name : {this.state.movieName}
            <br></br>
            imdb Id : {this.state.imdbId}
            <br></br>
            Type : {this.state.type}
            <br></br>
            Year : {this.state.year}
          </div>    
          
        </div>
        </div>
        
      );
  }
}

export default App;
