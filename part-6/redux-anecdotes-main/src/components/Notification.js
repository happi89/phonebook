import { useSelector } from 'react-redux';

const Notification = () => {
	const notification = useSelector((state) => state.notifications);

	const style = {
		border: 'solid',
		padding: 15,
		margin: 10,
		borderWidth: 1,
	};
	if (notification === null) {
		return null;
	} else {
		return <div style={style}>{notification}</div>;
	}
};

export default Notification;
