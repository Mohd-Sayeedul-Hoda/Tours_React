import { useState, useEffect } from 'react';
import Tours from './Tours';
import { Loading } from './Loading';
const url = 'https://course-api.com/react-tours-project';
const App = () => {
	const [isLoading, setLoading] = useState(false);
	const [tours, setTours] = useState([]);
	const removeTour = (id) => {
		const newTours = tours.filter((tour) => tour.id !== id);
		setTours(newTours);
	};
	const fetchData = async () => {
		try {
			const data = await fetch(url);
			const tours = await data.json();
			setTours(tours);
			console.log(tours);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		setLoading(true);
		fetchData();
		console.log('i am useEffect');
	}, []);
	if (isLoading) {
		return (
			<main>
				<Loading />
			</main>
		);
	}
	if (tours.length === 0) {
		return (
			<main>
				<div className="title">
					<h2>no tours left</h2>
					<button
						type="button"
						style={{ marginTop: '2rem' }}
						className="btn"
						onClick={() => {
							fetchData();
						}}
					>
						refresh
					</button>
				</div>
			</main>
		);
	}
	return (
		<div>
			<main>
				<Tours
					tours={tours}
					removeTour={removeTour}
				/>
			</main>
		</div>
	);
};
export default App;
