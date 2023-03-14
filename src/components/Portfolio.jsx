import React from "react";
import quizzy from "../assets/portfolio/quizzy.jpg";
import weatherly from "../assets/portfolio/weatherly.jpg";
import dailydose from "../assets/portfolio/dailydose.jpg";

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src: quizzy,
      title: "Quizzy",
      demo: "https://quizzy-neeravgg.vercel.app/ ",
      code: "https://github.com/neeravgg/Quizzy-app ",
    },
    {
      id: 2,
      src: weatherly,
      title: "Weatherly",
      demo: "https://quizzy-neeravgg.vercel.app/ ",
      code: "https://quizzy-neeravgg.vercel.app/ ",
    },
    {
      id: 3,
      src: dailydose,
      title: "Daily Dose",
      demo: "https://quizzy-neeravgg.vercel.app/ ",
      code: "https://quizzy-neeravgg.vercel.app/ ",
    },
  ];

  return (
    <div
      name='portfolio'
      className='bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen'
    >
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
            Portfolio
          </p>
          <p className='py-6'>Check out some of my work right here</p>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0'>
          {portfolios.map(({ id, src, title, demo, code }) => (
            <div
              key={id}
              className='shadow-md shadow-gray-600 rounded-lg text-center'
            >
              <img
                src={src}
                alt={title}
                className='rounded-md duration-200 hover:scale-105 mb-2'
              />
              <span className=' font-bold text-lg '>{title}</span>
              <div className='flex items-center justify-center'>
                <a
                  href={demo}
                  target='_blank'
                  className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105'
                >
                  Demo
                </a>
                <a
                  href={code}
                  target='_blank'
                  className='w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105'
                >
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
