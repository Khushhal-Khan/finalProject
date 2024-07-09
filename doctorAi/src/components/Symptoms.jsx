/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Flex,
  Avatar,
  Breadcrumb,
  Col,
  Row,
  Form,
  Spin ,message
} from "antd";
import classes from "./Symptoms.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Ollama } from "ollama";
import Loader from "./Loader";
import { faLaptopMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons'

const ollama = new Ollama({ host: "http://localhost:11434" });

const Symptoms = () => {
  const [sym, setSym] = useState("");
  const [userData, setUserData] = useState([]);
  const [newData, setNewData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

const backHandler = () => {
  setSpinning(true);
  let ptg = -10;
  const interval = setInterval(() => {
    ptg += 5;
    setPercent(ptg);
    if (ptg > 120) {
      clearInterval(interval);
      setSpinning(false);
      setPercent(0);
    }
  }, 100);
  navigate(-1)
} 


  useEffect(() => {
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
    e.preventDefault();
   
    if(sym === ""){
      return  messageApi.open({
        type: "error",
        content: "Please enter some symptoms!",
      });
    }

    setNewData("");
    setSym("");
    setLoading(true);
    const res = await ollama.generate({
      system: "Do no answer questions except medical questions. only answer in 100 words.",
      model: "gemma:2b",
      prompt: sym,
      stream: true,
    });
    for await (const i of res) {
      setNewData((prev) => prev + i.response);
      setLoading(false);
    }
  };

  return (
    <>
    {contextHolder}
      <Row>
        <Col span={9} className={classes.first}>
          <Card
            className={classes.back}
            style={{
              width: 400,
              background: "#1e293b",
              border: "none",
            }}
          >
            <div className={classes.icon1}>
            <FontAwesomeIcon icon={faHandHoldingDroplet} size="3x"/>
              <h3 className={classes.font2} style={{ marginLeft: "0.8rem" }}>
                MediConnect
              </h3>
            </div>
            <h2 className={classes.font} style={{ color: "#22c55e" }}>
              Enter your symptoms and get to know about condition.
            </h2>
            <Button onClick={backHandler} style={{ background: "#22c55e",marginTop: "1rem" }} type="primary" block >
                      Previous
                    </Button>
                    <Spin spinning={spinning} percent={percent} fullscreen />
          </Card>
        </Col>

        <Col span={15}>
          <div className={classes.card1}>
            
              <h1 className={classes.heading}>Symptoms.</h1>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
              >
                <Form.Item
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
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
                    <Button style={{ background: "#22c55e" }} type="primary" block onClick={sympHandler}>
                      Ask
                    </Button>
                  </div>
                </Form.Item>

              </Form>
            </div>
            <Card className={classes.data}>
                {!loading && newData}
                {loading && <Loader />}
                </Card>
               
        </Col>
      </Row>
    </>
  );
};

export default Symptoms;
