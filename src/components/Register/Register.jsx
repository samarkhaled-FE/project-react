import React, { useState } from "react";
import axios from "axios";
import joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [errorsList, setErrorsList] = useState([]);

  const navigate = useNavigate();

  // إرسال البيانات عند الضغط على الزر
  const submitFormData = async (e) => {
    e.preventDefault();
    const validationResponse = validateFormData();

    if (validationResponse.error) {
      setErrorsList(validationResponse.error.details);
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:3001/signup",
          user
        );

        if (data.message === "success") {
          navigate("/login");
        } else {
          setErrorMsg(data.message);
        }
      } catch (error) {
        setErrorMsg("Something went wrong. Please try again later.");
      }
    }
  };

  const validateFormData = () => {
    const schema = joi.object({
      firstName: joi.string().alphanum().required().min(2).max(10),
      lastName: joi.string().alphanum().required().min(2).max(10),
      age: joi.number().required().min(20).max(80),
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .required()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/
          )
        )
        .messages({
          "string.pattern.base":
            "Password must be 6-12 characters long, include uppercase, lowercase, number, and special character.",
        }),
    });
    return schema.validate(user, { abortEarly: false });
  };

  const getInputValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-75 m-auto py-5">
      <h2>Registration Form</h2>
      {errorsList.map((error, index) => (
        <div key={index} className="alert alert-danger p-2">
          {error.message}
        </div>
      ))}

      {errorMsg && <div className="alert alert-danger p-2">{errorMsg}</div>}

      <form onSubmit={submitFormData}>
        <div className="input-data my-2">
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={getInputValue}
            type="text"
            className="form-control my-2"
            name="firstName"
          />
        </div>

        <div className="input-data my-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            onChange={getInputValue}
            type="text"
            className="form-control my-2"
            name="lastName"
          />
        </div>

        <div className="input-data my-2">
          <label htmlFor="age">Age</label>
          <input
            onChange={getInputValue}
            type="number"
            className="form-control my-2"
            name="age"
          />
        </div>

        {/* Email */}
        <div className="input-data my-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={getInputValue}
            type="email"
            className="form-control my-2"
            name="email"
          />
        </div>

        <div className="input-data my-2">
          <label htmlFor="password">Password</label>
          <input
            onChange={getInputValue}
            type="password"
            className="form-control my-2"
            name="password"
          />
        </div>

        <button className="btn btn-warning my-3 float-end">Register</button>
      </form>
    </div>
  );
}
