const PersonForm = ({
	handleSubmit,
	newName,
	handleNameChange,
	handleNumberChange,
	newNumber,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input value={newName} onChange={handleNameChange} required />
				<br />
				number:
				<input
					value={newNumber}
					onChange={handleNumberChange}
					type='number'
					required
				/>
			</div>
			<button type='submit'>add</button>
		</form>
	);
};

export default PersonForm;
