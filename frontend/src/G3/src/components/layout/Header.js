import React from 'react';

/**
 * React component for the Header Section.
 */
export const Header = (props) => {
  return (
    <header className="header">
      <h1>
        Sudoku
      </h1>
      <h2 onClick={props.onClick}>
        New Game
      </h2>
    </header>
  )
}
