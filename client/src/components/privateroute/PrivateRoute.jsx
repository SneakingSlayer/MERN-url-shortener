import React, { useContext, useState } from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import { Context } from "../../context/Context";
import jwt_decode from "jwt-decode";
import { getJwt } from "../../utils";
export default function PrivateRoute({ children }) {
  const { user, dispatch } = useContext(Context);

  const auth = () => {
    if (user === null) return false;
    if (user !== null) {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const expiresIn = jwt_decode(token).exp * 1000;
      const currentDate = new Date();
      if (expiresIn < currentDate.getTime()) {
        dispatch({ type: "LOGOUT" });
        return false;
      }
    }
    return true;
  };
  return auth() ? children : <Navigate to="/login" />;
}
