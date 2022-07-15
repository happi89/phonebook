import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import services from './services/phone';
import Notification from './components/Notification';
import './index.css';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [successMessage, setSuccessMessage] = useState(null);

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
			setSuccessMessage(`${phoneObject.name} has been added`);
			setTimeout(() => {
				setSuccessMessage(null);
			}, 3000);
		});
	};

	const deletePerson = (id) => {
		const person = persons.filter((person) => id === person.id);
		if (window.confirm(`Do you want to delete this ${person[0].name}`)) {
			services.deletePerson(id);
			window.location.reload();
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={successMessage} />
			{/* <div className='success'>{successMessage}</div> */}
			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newNumber={newNumber}
			/>
			<h2>Contacts</h2>
			<Persons persons={persons} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
