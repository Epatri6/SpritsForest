import React from 'react';
import './Tutorial.css';

export default class Tutorial extends React.Component {

  render() {
    return (
      <div className='tutorial'>
        <h2>{`How to Play`}</h2>
        <section>
          <h3>Goal</h3>
          {`
          An evil corruption is spilling into the forest! Lower the corruption before it leaks!
          `}
        </section>
        <section>
          <h3>Basics</h3>
          {`
          The board starts with 3 corruption. The goal is to have 0 or less corruption by the time it reaches the edge of the board.\n\n
          Symbols and meanings:\n
          +1: When passed, adds 1 corruption\n
          -1: When passed, subtracts 1 corruption\n
          \u2191, \u2192, \u2193, \u2190: Changes the direction the corruption travels\n\n
          Game Flow:\n
          The corruption starts at the 'start' square and flows in the direction indicated by the arrow.\n
          The corruption is modified as it travels as listed above.\n
          Arrows only change the direction ONCE. They will be ignored when passed again.\n
          The game ends when the flow reaches any edge of the board.
          `}
        </section>
        <section>
          <h3>Controls</h3>
          {`
          The game's control panel is the right side of the board.\n
          You can left click an arrow to select it, then left click on a square to place it on that square.\n
          Right clicking will deselect arrow.\n
          Redirects are limited! Use them wisely\n
          If you're unhappy with your redirect placement, you can reset the board via the Reset Board button.\n
          You can save and load a saved game via the Save Game and Load Game buttons.\n
          Click the Evaluate Board button to submit your solution to the puzzle
          `}
        </section>
      </div>
    );
  }
}