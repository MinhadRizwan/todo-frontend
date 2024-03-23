import React from 'react'
import "./Navbar.css";
import { GiWhiteBook } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const disptach = useDispatch();
    const history = useNavigate();

    const logout = () => {
        sessionStorage.clear('id');
        disptach(authAction.logout());
        history('/')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container">
                    <Link className="navbar-brand" to="/"><b><GiWhiteBook /> &nbsp; TODO</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2 my-2 ">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-2 my-2 ">
                                <Link className="nav-link active" aria-current="page" to="/about">About us</Link>
                            </li>
                            <li className="nav-item mx-2 my-2 ">
                                <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
                            </li>

                            {!isLoggedIn && (
                                <>
                                    <li className="nav-item mx-2 my-2 ">
                                        <Link className="nav-link active btn-nav" aria-current="page" to="/signin">Sign in</Link>
                                    </li>
                                    <li className="nav-item mx-2 my-2 ">
                                        <Link className="nav-link active btn-nav" aria-current="page" to="/signup">Sign up</Link>
                                    </li>
                                </>
                            )}

                            {isLoggedIn && (
                                <li className="nav-item mx-2 my-2" onClick={logout}>
                                    <Link className="nav-link active btn-nav" aria-current="page" to="#">Log out</Link>
                                </li>
                            )}

                            <li className='mx-2'>
                                <Link className="navbar-brand" aria-current="page" to="#"><FaRegUserCircle /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar