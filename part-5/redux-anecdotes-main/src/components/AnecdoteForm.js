import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

export function AnecdoteForm() {
	const dispatch = useDispatch();

	const newAnecdote = async (event) => {
		event.preventDefault();
		if (event.target.anecdote.value === '') return;
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(createAnecdote(content));
		dispatch(createNotification(`you added '${content}'`, 5));
	};

	return (
		<form onSubmit={(event) => newAnecdote(event)}>
			<div>
				<input name='anecdote' />
			</div>
			<button type='submit'>create</button>
		</form>
	);
}
