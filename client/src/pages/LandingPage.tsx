import React from 'react';
import { heroImg } from '../assets';
import { styles } from '../styles';

const LandingPage: React.FC = () => {
	return (
		<section className={`w-full flex justify-evenly ${styles.borderTest}`}>
			<div className='w-full'>hello world </div>
			<div className={`w-full flex flex-col justify-center items-center ${styles.borderTest}`}>
				<img
					src={heroImg}
					alt="hero img"
					className="max-w-2xl max-h-2xl rounded-lg shadow-red-500/50"
				/>
				<p>
					<small>
						<i>
							Photo by{' '}
							<a href="https://unsplash.com/@hipcravo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
								Sushil Ghimire
							</a>{' '}
							on{' '}
							<a href="https://unsplash.com/photos/5UbIqV58CW8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
								Unsplash
							</a>
						</i>
					</small>
				</p>
			</div>
		</section>
	);
};

export default LandingPage;
