import React from 'react';
import { HeroText } from '../components';
import { heroImg } from '../assets';

const LandingPage: React.FC = () => {
	console.log(import.meta.env.VITE_APP_API_URL)
	return (
		<section
			className={`w-full flex grow sm:flex-row flex-col justify-evenly items-center`}>
			<HeroText />
			<div
				className={`w-full h-[calc(100vh-59px)] flex flex-col justify-center items-center`}>
				<div className="max-w-xl h-[460px] md:h-[700px] m-2">
					<img
						src={heroImg}
						alt="hero img"
						className="h-full relative rounded-[10%] shadow-2xl"
					/>
				</div>
				<p className="text-dark dark:text-light">
					<small>
						<i>
							Photo by{' '}
							<a
								href="https://unsplash.com/@hipcravo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
								className="hover:text-secondary">
								Sushil Ghimire
							</a>{' '}
							on{' '}
							<a
								href="https://unsplash.com/photos/5UbIqV58CW8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
								className="hover:text-secondary">
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
