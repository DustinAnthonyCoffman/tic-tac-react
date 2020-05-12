import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null), //squares contains an array of 9 nulls to start
        xIsNext: true,  //this is our validator for the first move being x's
      };
    }
    handleClick(i) {
      const squares = this.state.squares.slice();  //calling .slice() with no arguments copies the array
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'; //if current state is true render X if false render O
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
    renderSquare(i) {   //this is our render square method of the parent board component
      //we want it to render the square child component defined above, but with a value that reflects state      
      //modify the boards renderSquare method to read from its state, instead of a hard coded value 
      return (
        <Square 
            value={this.state.squares[i]} //the value of each square corresponds to the value of it's index and state
            onClick={() => this.handleClick(i)}   //pass down a function from the Board to the Square and have square call the function when square is clicked
        />
      );
    }
    //The onClick prop on the <button> component tells React to set up a click event listener.
    // When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
    // This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
    // Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
    // We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like “this.handleClick is not a function”.
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  