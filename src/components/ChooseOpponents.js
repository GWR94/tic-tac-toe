import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChooseOpponents = props => {
	return (
		<div>
			<div className="setup-TTT animated slideInDown">
				<h1 id="title-TTT">Welcome to Tic-Tac-Toe!</h1>
				<h3 className="subtitle-TTT">
					Would you like to try your luck against the computer,
					<br />or play against a friend?
				</h3>
				<h3 className="subtitle-2-TTT">
					There are 3 different difficulties to choose <br />
					when playing a one player game!
				</h3>
				<div className="button-container-TTT">
					<Button className="playerChoice" outline color="secondary" size="lg" onClick={props.onePlayerClick}>
						1 Player
					</Button>
					<Button className="playerChoice" outline color="secondary" size="lg" onClick={props.twoPlayerClick}>
						2 Player
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ChooseOpponents;
