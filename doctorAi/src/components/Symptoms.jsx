/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Input, Button, Flex  } from "antd";
import classes from "./Symptoms.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const { TextArea } = Input;

const Symptoms = () => {
  const [sym, setSym] = useState("");
  const [userData, setUserData] = useState([]);
  const [newData, setNewData] = useState("");

  useEffect(() => {
    //hit api

    (async () => {
      const res = await axios.get("http://localhost:3000/user/symptoms", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      try {
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const sympHandler = async (e) => {
    const res = await axios.post("http://localhost:11434/api/generate", {
      model: "gemma:2b",
      prompt: sym,
      stream: false,
    });
    setNewData(res.data)
    e.preventDefault();
    setSym("");
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
          <span>{userData.name}</span>
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
          title="Input your Symptoms"
          bordered={true}
          style={{
            width: 500,
          }}
        >
          <div className={classes.btn}>
            <Input
              onChange={(e) => {
                setSym(e.target.value);
              }}
              value={sym}
              className={classes.input}
              placeholder="Enter Symptoms"
            />
            <Button type="primary" block onClick={sympHandler}>
              Ask
            </Button>
        
          </div>
        </Card>
      </div>
      
  <div>
  {/* <TextArea className={classes.mode1}  autoSize /> */}
  {newData.response}
  </div>

      {/* <div className={classes.desc}>
        example...
        <br />
        Give symptoms like dizzyness, headache or feeling cold.
      </div> */}
    </>
  );
};

export default Symptoms;
