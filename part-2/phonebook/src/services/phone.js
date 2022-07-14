import axios from 'axios';
const dbURL = 'http://localhost:3001/persons';

const getAll = () => {
	return axios.get(dbURL);
};

const create = (phoneObject) => {
	return axios.post(dbURL, phoneObject);
};

const deletePerson = (id) => {
	return axios.delete(`${dbURL}/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson };
