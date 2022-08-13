import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	const dispatch = useDispatch();

	const vote = (id, content) => {
		dispatch(addVote(id));
		dispatch(createNotification(`You liked '${content}'`, 5));
	};

	const sortedAnecdotes = anecdotes
		.map((anecdote) => anecdote)
		.sort((a, b) => b.votes - a.votes);

	return (
		<>
			{sortedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id, anecdote.content)}>
							vote
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
