import { createSlice } from '@reduxjs/toolkit';

let timer;

const notificationSlice = createSlice({
	name: 'notifications',
	initialState: null,
	reducers: {
		setNotification(state, action) {
			clearTimeout(timer);
			return action.payload;
		},
		deleteNotification(state, action) {
			return action.payload;
		},
	},
});

export const { setNotification, deleteNotification } =
	notificationSlice.actions;

export const createNotification = (content, time) => {
	return async (dispatch) => {
		dispatch(setNotification(content));
		timer = setTimeout(() => {
			dispatch(deleteNotification(null));
			console.log(null);
		}, time * 1000);
	};
};

export default notificationSlice.reducer;
