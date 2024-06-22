/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import classes from "./Home.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);

const clickHandler = () => {
  localStorage.clear();
  // navigate("/")
}

  useEffect(() => {
    //hit api

    (async () => {
      const res = await axios.get("http://localhost:3000/user/me", {
       headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
     
      try {
        setUserData(res.data);
      
      } catch (err) {
        console.log(err);
          alert("Unauthorized")

        }
    })();
  }, []);

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
          <NavLink to={"/"} className={classes.link} onClick={clickHandler}>
              Logout
            </NavLink>
        </div>
      </div>

      <div className={classes.row}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              onClick={() => {
                navigate("/symptoms");
              }}
              style={{ paddingBottom: "1.4rem" }}
              className={classes.card}
              title="Input Symptoms"
              bordered={true}
            >
              Get the diagnosis for signs, Symptoms and conditions.
            </Card>
          </Col>
          <Col span={8}>
            <Card
              onClick={() => {
                navigate("/vital");
              }}
              className={classes.card}
              title="Vital Signs"
              bordered={true}
            >
              Input your Body Temperature, Pulse Rate, Respiration Rate, Blood
              Pressure.
            </Card>
          </Col>
          <Col span={8}>
            <Card
              onClick={() => {
                navigate("/answer");
              }}
              style={{ paddingBottom: "1.4rem" }}
              className={classes.card}
              title="Yes or no"
              bordered={true}
            >
              By answering yes or no, know about your condition.
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
