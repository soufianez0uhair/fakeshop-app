import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusAuth, getErrorAuth, logInUser, resetError, resetStatus } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import {FaUser} from 'react-icons/fa';
import Loader from './Loader';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(resetError());
        dispatch(resetStatus());
    }, []);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setUser({
            ...user,
            [name]: value
        })
    };

    const canSave = [user.email, user.password].every(Boolean);
    
    const isStrongPassword = (password) => {
        const alphabets = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const upperAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        let isAlpha = false;
        let isNum = false;
        let isUpperAlpha = false;
        let isSpecialChar = false;

        let i = 0;

        while(i < password.length && (!isAlpha || !isNum || !isUpperAlpha || !isSpecialChar)) {
            if(alphabets.indexOf(password[i]) !== -1) {
                isAlpha = true;
            } else if(numbers.indexOf(password[i]) !== -1) {
                isNum = true;
            } else if(upperAlphabets.indexOf(password[i]) !== -1) {
                isUpperAlpha = true;
            } else {
                isSpecialChar = true;
            }
            i++;
        }

        if(!isAlpha || !isUpperAlpha || !isNum || !isSpecialChar) {
            return false;
        }

        return true;
    }

    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if(canSave) {
            if(user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                if(isStrongPassword(user.password)) {
                    dispatch(logInUser(user));
                } else {
                    setError("Password isn't strong enough!");
                }
            } else {
                setError('Invalid email!');
            }
        } else {
            setError('Please fill in all the fields!');
        }
    }

    const authStatus = useSelector(getStatusAuth);
    const authError = useSelector(getErrorAuth);

    useEffect(() => {
        setError(authError);
    }, [authError]);

    useEffect(() => {
        if(authStatus === 'succeeded') {
            navigate('/');
        }
    }, [authStatus]);

    return (
        authStatus === 'loading' ? <Loader /> : <form onSubmit={(e) => handleSubmit(e)} className="auth">
            <FaUser className="icon icon--user" />
            <input type="text" placeholder="Email" name="email" value={user.email} onChange={(e) => handleChange(e)} className="auth__input" />
            <input type="password" placeholder="Password" name="password" value={user.password} onChange={(e) => handleChange(e)} className="auth__input" />
            <button className="btn btn--auth">Login</button>
            {error && <span className="auth__error">{error}</span>}
        </form>
    )
}

export default Login;