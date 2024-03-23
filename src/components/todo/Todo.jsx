import React from 'react'
import './Todo.css';
import { useState, useEffect } from 'react';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

let id = sessionStorage.getItem('id');
// let toUpdateArray = [];

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title Or Body Can't Be Empty");
    } else {
      if (id) {
        await axios
          .post(`http:localhost:3000/api/v2/addTask`, {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
      } else {
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your Task Is Added");
        toast.error("Your Task Is Not Saved ! Please SignUp");
      }
    }
  };

  const del = async (Cardid) => {
    if (id) {
      await axios.delete(`https://todo-backend-fpdg.onrender.com/api/v2/deleteTask/${Cardid}`, { data: { id: id }, }).then((response) => { toast.success(response) });
      toast.success("Task has been deleted");
    }
    else {
      toast.error("Please Sign In or Sign Up")
    }
    // Array.splice(id, "1");
    // setArray([...Array]);  before connecting to backenf used as an standalone, jsut for frontend. 
  };

  const dis = (value) => {
    console.log(value);
    document.getElementById('todo-update').style.display = value;
  }

  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // if (isLoggedIn) {
  //   console.log(id);
  // }

  // const update = (value) => {
  //   toUpdateArray = Array[value];
  // }

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios.get(`https://todo-backend-fpdg.onrender.com/api/v2/getTasks/${id}`).then((response) => { setArray(response.data.list) });
      };
      fetch();
    } else {
      toast.error("Please Sign In or Sign Up")
    }
  }, [submit]);


  return (
    <>
      <div className='todo'>
        <ToastContainer />
        <div className='todo-main container d-flex flex-column justify-content-center align-items-center my-4'>
          <div className='d-flex flex-column todo-inputs-div w-50'>
            <input
              type='text'
              placeholder='Title'
              name='title'
              value={Inputs.title}
              className='my-2 p-2 todo-inputs'
              onClick={show}
              onChange={change}
            />
            <textarea
              id='textarea'
              type='text'
              name='body'
              value={Inputs.body}
              placeholder='Body'
              className='p-2 todo-inputs'
              onChange={change}
            />
          </div>
          <div className='w-50 d-flex justify-content-end my-3'>
            <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
          </div>
        </div>
        <div className='todo-body'>
          <div className='container'>
            <div className='row'>
              {Array && Array.map((item, index) => (
                <div className='col-lg-3 col-10 mx-5 my-2'>
                  <TodoCards
                    title={item.title}
                    body={item.body}
                    id={item._id}
                    delid={del}
                    display={dis}
                   
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='todo-update' id='todo-update'>
        <div className='container update'>
          <UpdateTodo display={dis} />
        </div>
      </div> */}
    </>
  )
}

export default Todo
