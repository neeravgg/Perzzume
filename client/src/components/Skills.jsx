import React, { useEffect } from 'react';

// import html from "../assets/html.png";
// import css from "../assets/css.png";
// import javascript from "../assets/javascript.png";
// import reactImage from "../assets/react.png";
// import nextjs from "../assets/nextjs.png";
// import nodejs from "../assets/nodejs.png";
// import github from "../assets/github.png";
// import tailwind from "../assets/tailwind.png";
import { getSkill } from '../redux/actions/getActions';
import { useDispatch, useSelector } from 'react-redux';

const Skills = () => {
	const dispatch = useDispatch();
	const { skillData } = useSelector((state) => state.skillReducer);

	useEffect(() => {
		if (skillData?.length === 0) dispatch(getSkill());
	}, []);

	return (
		<div
			name='skills'
			className='bg-gradient-to-b from-gray-800 to-black w-full h-screen'
		>
			<div className='max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white'>
				<div>
					<p className='text-4xl font-bold border-b-4 border-gray-500 p-2 inline'>
						Skills
					</p>
					<p className='py-6'>These are the technologies I've worked with</p>
				</div>

				<div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0'>
					{skillData?.map(({ _id: id, src, title, }) => (
						<div
							key={id}
							className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg shadow-gray-500 h-20`}
						>
							{/* <img src={src} alt="" className="w-20 mx-auto" /> */}
							<p className='mt-4 text-2xl capitalize'>{title}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Skills;
