import axios from 'axios';
const baseURL = '/api/persons';

const getAll = () => {
	return axios.get(baseURL);
};

const create = (phoneObject) => {
	return axios.post(baseURL, phoneObject);
};

const deletePerson = (id) => {
	return axios.delete(`${baseURL}/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson };
