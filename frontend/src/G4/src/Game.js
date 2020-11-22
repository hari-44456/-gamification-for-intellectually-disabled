import React, { Component, useContext } from 'react';
import ImageView from './ImageView';
import MemoryOfImage from './MemoryOfImage';
import './Game.css';

import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

class Game extends Component {
  constructor(props) {
	super(props);
//     bind all the methods
	this.token = props;
    this.onImageClicked = this.onImageClicked.bind(this);
    this.Restart = this.Restart.bind(this);
    this.memoryOfImage= new MemoryOfImage();
}
// start the game
  componentWillMount() {
    this.startGame();
    // [token,setToken]=useContext(TokenContext)
  }
// set the initial state before the game run
  startGame() {
    this.memoryOfImage.generateImageSet();
    this.setState({
      moves : 0,
      pairsMatched : 0,
      numberofClick : 0,
      firstId : undefined,
      secondId : undefined,
      count:0
    });
  }
// set the state for images
  getImageViews() {
    let ImageViews = [];
    let onClick = this.onImageClicked;
    this.memoryOfImage.arrayOfImages.forEach(c => {
      let imageView = <ImageView key={c.id} 
          id={c.id} 
          image={c.image}
          flipped = {c.flipped}
          matched = {c.matched} 
          onClick={onClick}/>;
          ImageViews.push(imageView);
    });
    return ImageViews;
  }
// if image doesn't match, reset it to initial
  ResetImageArray(id1,id2) {
    if (this.state.numberofClick !== 2) {
      return;
    }
    this.memoryOfImage.flipCard(this.state.firstId, false);
    this.memoryOfImage.flipCard(this.state.secondId, false);
    this.setState({
      firstId: undefined,
      secondId: undefined,
      numberofClick: 0,
      moves : this.state.moves+1
    });
  }
// count the matches ,clicks, images matched or not 
  onImageClicked(id,image) {
    if (this.state.numberofClick === 0 || this.state.numberofClick === 2) {
      if (this.state.numberofClick === 2) {
        clearTimeout(this.timeout);
        this.ResetImageArray(this.state.firstId, this.state.secondId);        
      }
      this.memoryOfImage.flipCard(id, true);
      this.setState({
        firstId : id,
        numberofClick : 1
      });
    } else if (this.state.numberofClick === 1) {
      this.memoryOfImage.flipCard(id, true);
      this.setState({
        secondId : id,
        numberofClick : 2
      });

      if (this.memoryOfImage.IdenticalMatchImages(id, this.state.firstId)) {
        this.memoryOfImage.setImageAsMatched(this.state.firstId, true);
        this.memoryOfImage.setImageAsMatched(id, true);
        this.setState({
          pairsMatched: this.state.pairsMatched+1,
          firstId: undefined,
          secondId: undefined,
          moves : this.state.moves+1,
          numberofClick: 0
        });

      } else {
        this.timeout = setTimeout(() => { 
          this.ResetImageArray(this.state.firstId, this.state.secondId);
        },5000); 
      }

    }
  }
// restart the game
  Restart() {
    this.startGame();
  }

  // updateScore=(score)=>{
  //   axios.post('http://localhost:5000/student/score',{g4:score},{headers:{'auth-token':token.tokenValue}})
  //     .then(res=>console.log(res))
  //     .catcj(rr=>console.log(rr))
  // }

  render() {
    let ImageViews = this.getImageViews();
    let gameStatus = <div className='Game-status'>
                      <div >Moves: {this.state.moves}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    
                      <div >Match found: {this.state.pairsMatched}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                      <div class="reset" onClick={this.Restart}>Restart<i className="fab fa-creative-commons-sa"></i></div>
                    </div>;
// once all image pair is found, display the message
    if (this.state.pairsMatched === this.memoryOfImage.total_Images) {
	  // this.updateScore(this.state.moves-1);
		const headers={
			'auth-token':this.token.token.tokenValue
		};
		let g4=this.state.moves-1;
		axios.post('http://localhost:5000/student/score',{g4},{headers})
		.then(res=>console.log(JSON.stringify(res)))
	  	.catch(err=>console.log(JSON.stringify(err)))
  
      gameStatus = <div className='Game-complete'>
                    <div>GAME COMPLETE!&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div>You used {this.state.moves-1} moves &nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div><button onClick={this.Restart}>Try again</button></div>
                   </div>;      
    }

    return (
      <div className='Game'>
        <header className='Game-header'>
          <div className='Game-title'>Memory Game</div>
        </header>
        <div>
          {gameStatus}
        </div>
        <div className='ImageContainer'>
          {ImageViews}
        </div>
      </div>
    );
  }
}

export default Game;
