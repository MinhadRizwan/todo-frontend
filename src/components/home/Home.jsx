import React from 'react'
import "./Home.css";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <h1 className='text-center'>
                Organize your <br /> work and life. 
            </h1>
            <p  className='text-center'>
                Become focused, organized, and calm with <br /> todo app.
                The World's #1 task manager app.
            </p>
            <a href='todo'>
            <button className="home-btn p-2">Let's start scheduling</button>
            </a>
        </div>
    </div>
  )
}

export default Home