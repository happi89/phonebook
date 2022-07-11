import { useState } from 'react';
import Statistics from './Statistics';
import Button from './Button';

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => {
		setGood(good + 1);
	};

	const handleNeutralClick = () => {
		setNeutral(neutral + 1);
	};

	const handleBadClick = () => {
		setBad(bad + 1);
	};

	return (
		<div className='App'>
			<h1>Give Feedback</h1>

			<Button onButtonClick={() => handleGoodClick(1)} text='good' />
			<Button onButtonClick={() => handleNeutralClick(1)} text='neutral' />
			<Button onButtonClick={() => handleBadClick(1)} text='bad' />

			<Statistics neutral={neutral} bad={bad} good={good} />
		</div>
	);
}

export default App;
