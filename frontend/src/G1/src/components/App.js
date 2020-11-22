import React, { useState,useContext } from 'react';
import levelFactory from './../lib/levels-factory';
import Game from './Game';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {TokenContext} from '../../../context/TokenContext'

const App=(props)=>{
  const [level,setLevel]=useState(levelFactory(4 ** 2));
  const originalLevel=Object.assign({},level);

  const [original,setOriginal]=useState(originalLevel);
  const [token]=useContext(TokenContext);

  const onResetClick=()=>{
    setLevel(original.tileSet)
  }

  const onNewClick=()=>{
    const newLevel=levelFactory(4**2);
    const newOriginalLevel=Object.assign({},newLevel);
    setLevel(newLevel);
    setOriginal(newOriginalLevel)
  }
  const { className }=props;

  return (
    <div className={className}>
      <Game
        gridSize={4}
        tileSize={90}
        numbers={level.tileSet}
        onResetClick={onResetClick}
        onNewClick={onNewClick}
        original={original.tileSet}
        token={token}
      />
    </div>
  );
}

// class App extends Component {
//   constructor(props) {
//     super(props)

//     const level =levelFactory(4 ** 2);
//     const originalLevel = Object.assign({}, level);

//     this.state = {
//       original: originalLevel,
//       level,
//     };
//   }

//   onResetClick = () => {
//     this.setState({
//       level: {
//         tileSet: this.state.original.tileSet,
//       },
//     });
//   };

//   onNewClick = () => {
//     const newLevel = levelFactory(4 ** 2);
//     const newOriginalLevel = Object.assign({}, newLevel);
//     this.setState({
//       level: newLevel,
//       original: newOriginalLevel,
//     });
//   };

//   render() {
//     const { className } = this.props;

//     return (
//       <div className={className}>
//         <Game
//           gridSize={4}
//           tileSize={90}
//           numbers={this.state.level.tileSet}
//           onResetClick={this.onResetClick}
//           onNewClick={this.onNewClick}
//           original={this.state.original.tileSet}
//         />
//       </div>
//     );
//   }
// }

App.propTypes = {
  level: PropTypes.shape({
    tileSet: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

export default styled(App)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
