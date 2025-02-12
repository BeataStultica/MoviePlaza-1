import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import r from '../Registration.module.css';

const Signup = ({ submitForm }) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );

    return (
        <div className={r['form-content']}>
            <form onSubmit={handleSubmit} className={r.form} noValidate>
                <h1>
                    Get started with us today! Create your account by filling
                    out the information below.
                </h1>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Username</label>
                    <input
                        className={r['form-input']}
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>FirstName</label>
                    <input
                        className={r['form-input']}
                        type="text"
                        name="firstname"
                        placeholder="Enter your firstname"
                        value={values.firstname}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Lastname</label>
                    <input
                        className={r['form-input']}
                        type="text"
                        name="lastname"
                        placeholder="Enter your lastname"
                        value={values.lastname}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Birthday</label>
                    <input
                        className={r['form-input']}
                        type="date"
                        name="bdate"
                        placeholder="Enter your birthday date"
                        value={values.bdate}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Password</label>
                    <input
                        className={r['form-input']}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Confirm Password</label>
                    <input
                        className={r['form-input']}
                        type="password"
                        name="password2"
                        placeholder="Confirm your password"
                        value={values.password2}
                        onChange={handleChange}
                    />
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <button className={r['form-input-btn']} type="submit">
                    Sign up
                </button>
                <span className={r['form-input-login']}>
                    Already have an account? Login <a href="/login">here</a>
                </span>
            </form>
        </div>
    );
};

export default Signup;
