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
				<label className='label'>
					<span className='label-text'>Name: </span>
				</label>
				<input
					className='input input-bordered w-full  max-w-xs'
					value={newName}
					onChange={handleNameChange}
					required
					type='text'
				/>
				<label className='label'>
					<span className='label-text'>Number: </span>
				</label>
				<input
					className='input input-bordered w-full  max-w-xs'
					value={newNumber}
					onChange={handleNumberChange}
					type='number'
					required
				/>
			</div>
			<button className='btn btn-primary btn-wide my-2' type='submit'>
				add
			</button>
		</form>
	);
};

export default PersonForm;
