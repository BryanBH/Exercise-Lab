import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExerciseInformation } from '../types';
import { useParams } from 'react-router-dom';
import { ExerciseDetails } from '../components';
const ExerciseDetailsPage: React.FC = () => {
	const { exerciseId } = useParams();
	const [exercise, setexercise] = useState<ExerciseInformation>({
		name: '',
		force: '',
		level: '',
		mechanic: '',
		equipment: '',
		primaryMuscles: [''],
		secondaryMuscles: [''],
		instructions: [''],
		category: '',
		images: [''],
		id: '',
		_id: '',
	});

	useEffect(() => {
		const getExercise = async () => {
			const { data } = await axios.get(
				'http://localhost:4500/exercises/getExerciseById',
				{
					params: { exerciseId },
				}
			);
			setexercise(data);
		};
		getExercise();
	}, [exerciseId]);

	return (
		<>
			<ExerciseDetails {...exercise} />
			{/* <WorkoutVideos exerciseName={exercise.name} /> */}
		</>
	);
};

export default ExerciseDetailsPage;
