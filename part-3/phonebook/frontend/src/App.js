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
	}, [successMessage]);

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const updatePerson = (id) => {
		const person = persons.filter((person) => id === person.id);
		const newPerson = { ...person, name: newName, number: newNumber };

		services.updatePerson(id, newPerson)
			.then(returnedPerson => {
				setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
			})
			.catch(error =>{
				setSuccessMessage(`${person.name} has already been removed from the server`)
			})
			setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setPersons(persons.filter(n => n.id !== id))
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const names = persons.map((person) => person.name);
		if (names.includes(newName)) {
			updatePerson();
		} else {
			addPerson();
		}
	};

	const addPerson = () => {
		const phoneObject = {
			name: newName,
			number: newNumber,
		};

		services.create(phoneObject).then((response) => {
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
		}
		setSuccessMessage(`${person[0].name} has been deleted`);
		setTimeout(() => {
			setSuccessMessage(null);
		}, 3000);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={successMessage} />
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
