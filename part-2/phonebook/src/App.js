import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import services from './services/phone';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	useEffect(() => {
		services.getAll().then((response) => {
			setPersons(response.data);
		});
	}, []);

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
			alert(`${newName} has already been added to the phonebook.`);
		} else {
			addPerson();
		}
	};

	const addPerson = () => {
		const phoneObject = {
			name: newName,
			number: newNumber,
			date: new Date().toISOString,
			id: Math.random * 10000,
		};

		services.create(phoneObject).then((response) => {
			setPersons(persons.concat(response.data));
			setNewName('');
			setNewNumber('');
		});
	};

	const deletePerson = (id) => {
		console.log('delete');
		if (window.confirm('Do you want to delete this persons?')) {
			services.deletePerson(id);
			window.location.reload();
		}
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
			<Persons persons={persons} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
