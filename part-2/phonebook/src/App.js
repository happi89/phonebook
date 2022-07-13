import { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const names = persons.map((person) => person.name);
		if (names.includes(newName)) {
			alert(`${newName} has already been added`);
		} else {
			addPerson();
		}
	};

	const addPerson = () => {
		const phoneObject = {
			name: newName,
			number: newNumber,
			date: new Date().toISOString,
			id: persons.length + 1,
		};
		setPersons(persons.concat(phoneObject));
		setNewName(' ');
		setNewNumber(' ');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newNumber={newNumber}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} />
		</div>
	);
};

export default App;
