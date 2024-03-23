import React from 'react'
import "./Signup.css";

const HeadingComp = ({first,second,third}) => {
  return (
    <div>
        <h1 className=" text-center headingComp">{first}<br/></h1>
        <h1 className="text-center sign-up-heading">
            {second}{third}
        </h1>
    </div>
  )
}

export default HeadingComp;