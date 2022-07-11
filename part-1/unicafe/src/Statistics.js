import StatisticsLine from './StatisticsLine';

const Statistics = ({ good, bad, neutral }) => {
	if (good + bad + neutral !== 0) {
		return (
			<div>
				<h1>Statistics</h1>
				<table>
					<tbody>
						<StatisticsLine text='good' value={good} />
						<StatisticsLine text='neutral' value={neutral} />
						<StatisticsLine text='bad' value={bad} />
						<StatisticsLine text='total votes' value={bad + good + neutral} />
						<StatisticsLine
							text='average'
							value={Math.floor(((good - bad) / (good + bad + neutral)) * 100)}
							sign='%'
						/>
						<StatisticsLine
							text='positive'
							value={Math.floor((good / (good + bad + neutral)) * 100)}
							sign='%'
						/>
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div>
			<p>No feedback given</p>
		</div>
	);
};

export default Statistics;
