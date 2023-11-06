import React, { useEffect } from "react";
import quizzy from "../assets/portfolio/quizzy.jpg";
import weatherly from "../assets/portfolio/weatherly.jpg";
import dailydose from "../assets/portfolio/dailydose.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../redux/actions/getActions";

const Portfolio = () => {
  const dispatch = useDispatch();
  const { projectData } = useSelector((state) => state.projectReducer);

  useEffect(() => {
		if (projectData?.length === 0) dispatch(getProject());
	}, []);
  console.log(projectData)

  return (
    <div
      name='portfolio'
      className='bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen'
    >
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
            Projects
          </p>
          <p className='py-6'>Check out some of my work right here</p>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0'>
          {projectData.map(({ _id: id, src, title, description, demo_link: demo, code_link: code }) => (
            <div
              key={id}
              className='shadow-md shadow-gray-600 rounded-lg text-center'
            >
              {/* <img
                src={src}
                alt={title}
                className='rounded-md duration-200 hover:scale-105 mb-2'
              /> */}
              <span className=' font-bold text-lg capitalize'>{title}</span>
              <div className=" mt-4 flex items-start pl-4"> {description} </div>
              <div className='flex items-center justify-center'>
                <button
                  href={demo}
                  target='_blank'
                  className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 cursor-pointer rounded-md'
                >
                  Demo
                </button>
                <button
                  href={code}
                  target='_blank'
                  className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 cursor-pointer rounded-md'
                >
                  Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
