import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      movieName: "interstellar",
      imdbId: "tt0816692",
      image : "https://i.pinimg.com/originals/43/d5/66/43d5666f75340bfa4a91fff84953f9d1.jpg",
      type : "movie",
      year : "2018"
    };
  }
  content(props){
    const isError = props
    if (isError){
      return (<div class = "noData" >No data found</div>);  
    }
    else{
      return( 
        <div>
        <img src={this.state.image} class = "image"/>
        <div class = "text">
          <p class = "info" >movie name : {this.state.movieName}</p>
          <p class = "info" >imdb Id : {this.state.imdbId}</p>
          <p class = "info" >Type : {this.state.type}</p>
          <p class = "info" >Year : {this.state.year}</p>
        </div>    
        </div>
    )
    }
  }
  makeAjaxCall(e){
    let text = document.getElementById("text").value
    document.getElementById("text").value = ""
    if (text !=="") {
      fetch("http://www.omdbapi.com/?s=" + text + "&apikey=BanMePlz")
        .then(res => res.json())
        .then((result) =>{
          if (result.Error === undefined){
            this.setState({
              error: false,
              movieName: result.Search[0].Title,
              imdbId: result.Search[0].imdbID, 
              image : result.Search[0].Poster,
              year : result.Search[0].Year,
              type : result.Search[0].Type  
            });
          }
          else{
            this.setState({
              error : true
            })  
          }
        },
       )
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
            {this.content(this.state.error)}
        </div>
      </div>  
      );
  }
}

export default App;
