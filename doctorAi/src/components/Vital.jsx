/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Input, Button, Flex } from "antd";
import classes from "./Vital.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";


const Vital = () => {
  const [vital, setVital] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    //hit api

    (async () => {
      const res = await axios.get("http://localhost:3000/user/vital", {
       headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      try {
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);


  const clickHandler = (e) => {
    e.preventDefault();
    setVital("");
  };

  return (
    <>
      <div className={classes.div}>
        <h3 className={classes.head}>Smart Doctor</h3>
        <div className={classes.home}>
          <span>
            <NavLink to={"/home"} className={classes.link}>
              Home
            </NavLink>
          </span>
          <span>
            <NavLink to={"/precautions"} className={classes.link}>
              Precautions
            </NavLink>
          </span>
          <span>
            {userData.name}
          </span>
        </div>
      </div>

      <Flex
        vertical
        gap="small"
        style={{
          width: "100%",
        }}
      ></Flex>

      <div className={classes.mode}>
        <Card
          className={classes.card}
          title="Input your Vital signs"
          bordered={true}
          style={{
            width: 500,
          }}
        >
          <div className={classes.btn}>
            <Input
              value={vital}
              onChange={(e) => {
                setVital(e.target.value);
              }}
              className={classes.input}
              placeholder="Enter data"
            />
            <Button type="primary" block onClick={clickHandler}>
              Ask
            </Button>
          </div>
        </Card>
      </div>

      <p className={classes.desc}>
        example...
        <br />
        Give vital signs like body temperature, Blood Pressure or Pulse rate,
        respiration rate.
        <br />
        It should be in numbers.
      </p>
    </>
  );
};

export default Vital;
