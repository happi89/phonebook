const Total = ({ parts }) => {
	const total = parts.reduce((total, exercise) => {
		return exercise.exercises + total;
	}, 0);
	return (
		<p>
			<strong>Number of exercises: {total}</strong>
		</p>
	);
};

export default Total;
