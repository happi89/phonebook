import { createSlice } from '@reduxjs/toolkit';
import anecdotesServices from '../services/anecdotes';

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
		updateAnecdote(state, action) {
			return state
				.map((anecdote) => {
					return anecdote.id !== action.payload.id ? anecdote : action.payload;
				})
				.sort((a, b) => b.votes - a.votes);
		},
	},
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
	anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdotesServices.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdotesServices.createNew(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const addVote = (id) => {
	return async (dispatch) => {
		const likedAnecdote = await anecdotesServices.addVote(id);
		dispatch(updateAnecdote(likedAnecdote));
	};
};

export default anecdoteSlice.reducer;
