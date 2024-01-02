import React, { useEffect, useState } from 'react';
import axios from 'axios';
import mongoose from 'mongoose';
import { useParams } from 'react-router-dom';
import { useGetAccessToken } from '../hooks';
import { trashIcon } from '../assets';
import { SavedWorkouts, FlashMessageType } from '../types';
import { Flash } from '../components';

const WorkoutDetails: React.FC = () => {
	const { workoutId } = useParams();
	const token = useGetAccessToken();
	const [workout, setworkout] = useState<SavedWorkouts>();
	const [toggleFlash, setToggleFlash] = useState(false);
	const [flashMessage, setflashMessage] = useState<FlashMessageType>({
		type: 'success',
		message: '',
	});

	const handleClick = async (exerciseId: mongoose.ObjectId | string) => {
		const deleteExercise = await axios.post(
			`${import.meta.env.VITE_APP_API_URL}/auth/deleteExerciseFromWorkout`,
			{ exerciseId, workoutId: workout?._id },
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		const { data } = await axios.get('http://localhost:4500/auth/getWorkout', {
			params: { workoutId },
			headers: { Authorization: `Bearer ${token}` },
		});
		setToggleFlash(true);
		setflashMessage({ type: 'success', message: deleteExercise.data.message });
		setworkout(data.workout);
	};

	const deleteWorkout = async () => {
		const { data } = await axios.post(
			`${import.meta.env.VITE_APP_API_URL}/auth/deleteSavedWorkout`,
			{ workoutId: workout?._id },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		setToggleFlash(true);
		setflashMessage({
			type: 'success',
			message: data.message,
			sendTo: '/profile',
		});
	};
	useEffect(() => {
		const getWorkout = async () => {
			try {
				const { data } = await axios.get(
					`${import.meta.env.VITE_APP_API_URL}/auth/getWorkout`,
					{
						params: { workoutId },
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setworkout(data.workout);
			} catch (error) {
				console.log(error);
			}
		};
		getWorkout();
	}, [token, workoutId]);

	const exerciseItems = workout?.workout.map((exercise, index) => {
		return (
			<li
				key={index}
				className="bg-secondary w-[90%] min-h-fit grid grid-cols-3 items-center place-content-center rounded-lg text-white">
				<div className="flex-wrap px-2 text-center">
					<h3> {exercise.name}</h3>
				</div>
				<div className="flex justify-center items-center gap-2">
					<p>Reps: {exercise.reps}</p>
					<p>sets: {exercise.sets}</p>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="bg-white p-0.5 m-2 rounded text-black text-sm flex justify-center items-center"
						onClick={() => handleClick(exercise._id)}>
						<img src={trashIcon} alt="delete exercise from workout" />
					</button>
				</div>
			</li>
		);
	});
	return (
		<section className="w-full h-screen flex flex-col items-center justify-center">
			{toggleFlash && <Flash {...flashMessage} setToggle={setToggleFlash} />}
			<div className="w-[350px] h-[400px] md:h-[573px] md:w-[647px] my-5 bg-dark dark:bg-extraDark text-light rounded-[45px] shadow-xl text-center ">
				<div className="overflow-auto">
					<h1 className="font-bold leading-7 text-2xl mb-3 py-5">
						{workout?.workoutTitle}
					</h1>
					<div className="mb-8">
						<ul className="flex flex-col gap-5 items-center justify-center ">
							{exerciseItems}
						</ul>
					</div>
				</div>
				<div>
					<button
						className="bg-secondary text-white p-2 rounded-xl"
						onClick={deleteWorkout}>
						Delete Workout
					</button>
				</div>
			</div>
		</section>
	);
};

export default WorkoutDetails;
