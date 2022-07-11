const StatisticsLine = ({ text, value, sign }) => {
	return (
		<tr>
			<td>{text}:</td>
			<td>
				{value}
				{sign}
			</td>
		</tr>
	);
};

export default StatisticsLine;
