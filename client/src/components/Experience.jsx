import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExperience } from "../redux/actions/getActions";

const Experience = () => {
  const dispatch = useDispatch();
  const { experienceData } = useSelector((state) => state.experienceReducer);

  useEffect(() => {
		if (experienceData?.length === 0) dispatch(getExperience());
	}, []);

  return (
    <div
      name='experience'
      className='bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen'
    >
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-'>
          <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
            Experience
          </p>
          <p className='py-6'>Here are some of my experiences</p>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0'>
          {experienceData.map(({ _id: id, src, job_title: title, comapny, description }) => (
            <div
              key={id}
              className='shadow-md shadow-yellow-500 rounded-lg text-center p-2'
            >
              {/* <img
                src={src}
                alt={title}
                className='rounded-md duration-200 hover:scale-105 mb-2'
              /> */}
              <span className=' font-bold text-lg capitalize'>{comapny}</span>
              <div className='flex flex-col items-start justify-start p-2'>
                <div> <span className="font-bold"> Designation - </span> {title} </div>
                <div> {description} </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
