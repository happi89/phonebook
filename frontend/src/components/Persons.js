const Persons = ({ persons, deletePerson }) => {
	return (
		<div class='artboard artboard-horizontal phone-4 card-body'>
			<table className='table table-compact table-zebra w-full'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Number</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{persons.map((person) => {
						return (
							<tr key={person.number}>
								{console.log(person)}
								<td>{person.name}</td>
								<td>{person.number}</td>
								<td>
									<button
										className='btn btn-error btn-square btn-sm'
										onClick={() => deletePerson(person.id)}>
										<i className='fa fa-trash-o' aria-hidden='true'></i>
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Persons;
