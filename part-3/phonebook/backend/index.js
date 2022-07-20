const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

const PORT = 3001;

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

const date = new Date().toString();

app.get('/api/persons', (req, res) => {
	return res.status(200).json(persons);
});

app.get('/info', (req, res) => {
	return res
		.status(200)
		.send(`<p>Phone has info for ${persons.length} people</p><p>${date}</p>`);
});

app.get('/api/persons/:id', (req, res) => {
	const id = +req.params.id;
	const person = persons.find((person) => person.id === id);

	if (!person) {
		return res.status(404).json({
			error: 'person not found',
		});
	}

	return res.status(200).json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = +req.params.id;
	const person = persons.find((person) => person.id === id);

	if (person) {
		persons = persons.filter((person) => person.id !== id);
		return res.status(200).json(persons);
	}

	return res.status(404).json({
		error: 'person not found',
	});
});

app.post('/api/persons', (req, res) => {
	const names = persons.map((person) => person.name);

	const person = {
		id: Math.floor(Math.random() * 1000),
		name: req.body.name,
		number: req.body.number,
	};

	if (!person.name || !person.number) {
		res.status(400).json({
			error: 'please enter name and number',
		});
	}

	const set = new Set(names);
	if (set.has(person.name)) {
		return res.status(400).json({
			error: 'name already exists',
		});
	}

	persons = persons.concat(person);
	return res.status(200).json(persons);
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
	console.log('running on port', PORT);
});
