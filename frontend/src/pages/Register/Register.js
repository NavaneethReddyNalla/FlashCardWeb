import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  async function registerUser(data) {
    const res = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/user/register`,
      data
    );

    if (res.data.message === "User registered successfully") {
      setErr("");
      navigate("/login");
    } else {
      setErr(res.data.message);
    }
  }

  function errorResolve() {
    if (errors.username?.type === "required") {
      return "Username is required";
    } else if (errors.password?.type === "required") {
      return "Password is required";
    } else if (errors.password?.type === "minLength") {
      return "Password must be atleast 8 characters long";
    } else {
      return err;
    }
  }

  return (
    <div className="register">
      <form className="w-25 mx-auto mt-5" onSubmit={handleSubmit(registerUser)}>
        <h2 className="mb-4">Registration Form</h2>
        <label className="visually-hidden" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          {...register("username", { required: true })}
          placeholder="Username"
        />

        <label className="visually-hidden" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-control mt-4"
          {...register("password", { required: true, minLength: 8 })}
          placeholder="Password"
        />
        <p className="text-danger lead fs-5">{errorResolve()}</p>
        <button type="submit" className="btn btn-success mt-5">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
