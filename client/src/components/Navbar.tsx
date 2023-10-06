import React from 'react';
import { styles } from '../styles';
import { NavLink } from 'react-router-dom';

import { navLinks } from '../data';

const Navbar: React.FC = () => {
	const navItems = navLinks.map((link) => {
		return (
			<li
				key={link.id}
				className="hover:text-black text-[18px] font-medium cursor-pointer">
				<NavLink to={link.id}>{link.title}</NavLink>
			</li>
		);
	});

	const navMenu = (
		<ul className="list-none hidden sm:flex flex-row gap-10 justify-center items-center">
			{navItems}
		</ul>
	);
	return (
		<nav
			className={`${styles.paddingX} w-full flex items-center py-5 sticky top-0  z-10`}>
			<div className="w-full flex justify-start items-center max-w-7xl mx-auto">
				<NavLink to="/" className="flex items-center gap-10 me-5">
					<p>Exercise Lab</p>
				</NavLink>
				{navMenu}

				<ul className="ms-auto flex gap-10">
					<li>login</li>
					<li>sign up</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
