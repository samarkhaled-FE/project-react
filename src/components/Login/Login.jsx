import React, { useState } from "react";
import axios from "axios";
import joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  let navigate = useNavigate();
  let goToHome = () => {
    navigate("/");
  };

  let submitFormData = async (e) => {
    e.preventDefault();
    let validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorsList(validationResponse.error.details);
    } else {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );
      if (data.message === "success") {
        goToHome();
      } else {
        setErrorMsg(data.message);
      }
    }
  };
  let validateFormData = () => {
    const schema = joi.object({
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .required()
        .pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return schema.validate(user, { abortEarly: false });
  };
  let getInputValue = (e) => {
    let myUser = { ...user }; //1  deep copy
    myUser[e.target.name] = e.target.value; //nadia
    setUser(myUser);
  };
  return (
    <div className="w-75 m-auto py-5">
    <h2>Login Form</h2>
    {errorsList.map((error, index) => (
      <div key={index} className="alert alert-danger p-2">
        {error.message}
      </div>
    ))}

    {errorMsg ? (
      <div className="alert alert-danger p-2">{errorMsg}</div>
    ) : (
      ""
    )}
    <form onSubmit={submitFormData}>
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

      <button className="btn btn-info my-3 float-end">login</button>
      <div className="clear-fix"></div>
    </form>
  </div>
  )
}
