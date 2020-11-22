import React from 'react';

class Btnsubmit extends React.Component {
    render() {
        return (
            <div className="container-score">
                <button onClick={this.props.data} >Guess</button>
                <button onClick={this.props.reset}>Reset</button>
            </div>
        )
    }
}

export default Btnsubmit;