/* eslint-disable no-unused-vars */
import React from "react";
import classes from "./Error.module.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <img src="../../error4.jpg" className={classes.img} />

      <div className={classes.btn}>
        <Button
          onClick={() => {
            navigate("/home");
          }}
          type="primary"
        >
          Go Back
        </Button>
      </div>
    </>
  );
};

export default Error;
