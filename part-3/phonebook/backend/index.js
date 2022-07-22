const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person.model');
require('dotenv').config();

const app = express();

//middleware
// const errorHandler = require('./middleware/error');

app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3002;

const date = new Date().toString();

app.get('/api/persons', async (req, res) => {
	await Person.find({}).then((people) => {
		res.status(200).json(people);
	});
});

app.get('/info', async (req, res) => {
	const count = await Person.collection.countDocuments({});
	return res
		.status(200)
		.send(`<p>Phone has info for ${count} people</p><p>${date}</p>`);
});

app.get('/api/persons/:id', async (req, res, next) => {
	await Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				return res.status(200).json(person);
			} else {
				return res.status(404).json({
					error: 'person not found',
				});
			}
		})
		.catch((error) => next(error));
});

app.post('/api/persons', async (req, res, next) => {
	const body = req.body;

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then((response) => {
			res.status(201).json(response);
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
// app.use(errorHandler);

const errorHandler = (error, req, res, next) => {
	console.log(error.message);

	if (error.name === 'CastError') {
		return res.status(400).json({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
	console.log('running on port', PORT);
});
