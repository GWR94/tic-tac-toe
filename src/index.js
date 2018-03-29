import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Tic-Tac-Toe.css';
import TicTacToe from './components/TicTacToeSetup';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TicTacToe />, document.getElementById('root'));
registerServiceWorker();
