import { useState } from 'react';

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

			<button onClick={() => handleGoodClick(1)}>good</button>
			<button onClick={() => handleNeutralClick(1)}>neutral</button>
			<button onClick={() => handleBadClick(1)}>bad</button>

			<h1>Statistics</h1>

			<p>good: {good}</p>
			<p>neutral: {neutral}</p>
			<p>bad: {bad}</p>
			<p>total votes: {bad + good + neutral}</p>
			<p>average: {(good - bad) / (good + bad + neutral)}</p>
			<p>positive {(good / (good + bad + neutral)) * 100} %</p>
		</div>
	);
}

export default App;
