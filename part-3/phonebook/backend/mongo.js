const mongoose = require('mongoose');
require('dotenv').config();
const process = require('process');

MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	number: {
		type: Number,
		required: true,
	},
});

const Person = mongoose.model('People', personSchema);

const person = new Person({
	name: process.argv[3],
	number: process.argv[4],
});

console.log(process.argv.length);

if (process.argv.length > 3) {
	person.save().then((result) => {
		console.log(`added ${person.name} number ${person.number} to phonebook`);
		mongoose.connection.close();
	});
} else {
	Person.find({}).then((result) => {
		result.forEach((person) => console.log(person));
		mongoose.connection.close();
	});
}
