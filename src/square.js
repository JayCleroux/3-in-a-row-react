import React from 'react';

class Square extends React.Component {
    render() {
      const className = `square ${this.props.isWinningSquare ? 'winning-square' : ''}`;
      return (
        <button className={className} onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }

export default Square

