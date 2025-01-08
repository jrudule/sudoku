import { render, screen, fireEvent } from '@testing-library/react';
import App from './src/App';
import { expect } from 'vitest';

describe('Sudoku', () => {
  it('T_S-1: Start the game', () => {
    render(<App />);

    const startButton = screen.getByText('Start');
    const howToPlay = screen.getByText('HOW TO PLAY');
    const title = screen.getByText('SUDOKU');

    expect(startButton).toBeInTheDocument();
    expect(howToPlay).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    fireEvent.click(startButton);

    expect(screen.getByTestId('gameScreen')).toBeInTheDocument();
    expect(screen.getByTestId('time')).toBeInTheDocument();
    expect(startButton.parentElement).toHaveClass('hidden');
    expect(howToPlay.parentElement).toHaveClass('hidden');
    expect(title.parentElement).toHaveClass('hidden');
  });

 it('T_S-2: Insert a number into a cell', () => {
    render(<App />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    const cell = screen.getAllByText('', { selector: '.cell' })[0];
    fireEvent.click(cell);

    const numberButton = screen.getByTestId(1);
    fireEvent.click(numberButton);

    expect(cell.textContent).toBe('1');
  });

  it('T_S-3: Restart the game', () => {
    render(<App />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    const restartButton = screen.getAllByText('Restart');
    fireEvent.click(restartButton[0]);

    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('HOW TO PLAY')).toBeInTheDocument();
  });

  it('T_S-4: End the game and show the winning screen', () => {
    render(<App />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
 
    // Mock a filled board
    const mockBoard = Array.from({ length: 9 }, () => Array(9).fill(1));

    expect(screen.getByText('You won!')).toBeInTheDocument();
  });

  it('T_S-5: Select a cell', () => {
    render(<App />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    const cell = screen.getAllByText('', { selector: '.cell' })[0];
    fireEvent.click(cell);

    expect(cell).toHaveClass('selected');
  });

  it('T_S-6: Delete a number from a cell', () => {
    render(<App />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    const cell = screen.getAllByText('', { selector: '.cell' })[0];
    fireEvent.click(cell);

    const numberButton = screen.getByTestId(1);
    fireEvent.click(numberButton);

    const deleteButton = screen.getByText('', { selector: '.deleteButton' });
    fireEvent.click(deleteButton);

    expect(cell.textContent).toBe('');
  });

  it('T_S-7: Toggle note mode', () => {
    render(<App />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    const noteButton = screen.getByText('', { selector: '.noteButton' });
    fireEvent.click(noteButton);

    expect(noteButton).toHaveClass('notedButton');
  });

  it('T_S-8: View rules', () => {
    render(<App />);

    const howToPlayButton = screen.getByText('HOW TO PLAY');
    fireEvent.click(howToPlayButton);

    expect(screen.getByText('The Sudoku grid has 9 rows, 9 columns, and 9 smaller 3x3 subgrids.')).toBeInTheDocument();
  });

  it('T_S-9: Hide rules', () => {
    render(<App />);

    const howToPlayButton = screen.getByText('HOW TO PLAY');
    fireEvent.click(howToPlayButton);

    const closeButton = screen.getByText('x');
    fireEvent.click(closeButton);

    expect(closeButton.parentElement).toHaveClass('hidden');
  });
});

