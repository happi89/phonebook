import Part from './Part';

const Content = ({ parts }) => (
	<div>
		{parts.map(({ name, exercises }) => {
			return <Part part={name} exercises={exercises} />;
		})}
	</div>
);

export default Content;
