/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Input, Button, Flex, Col,
  Row,
  Form,
  Spin ,message } from "antd";
import classes from "./Vital.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Ollama } from 'ollama'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "./Loader";
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'



const ollama = new Ollama({ host: 'http://localhost:11434' })

const Vital = () => {
  const [vital, setVital] = useState("");
  const [userData, setUserData] = useState([]);
  const [newData, setNewData] = useState("");
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()

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
    //hit api

    (async () => {
      try {
      const res = await axios.get("http://localhost:3000/user/vital", {
       headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);


  const clickHandler = async(e) => {
    e.preventDefault();

if(vital === ""){
  return messageApi.open({
    type: "error",
    content: "Please enter vitals!",
  });
}

    setVital("");
    setNewData("");
    setLoading(true);
    const res = await ollama.generate({
      system: "only answer in 100 words. Only give response about medical terms.",
      model: "qwen:1.8b",
      prompt: vital,
      stream: true,
    });
   for await(const i of res){
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
            <FontAwesomeIcon icon={faHeartPulse} size="3x"/>
              <h3 className={classes.font2} style={{ marginLeft: "0.5rem" }}>
                MediConnect
              </h3>
            </div>
            <h2 className={classes.font} style={{ color: "#22c55e" }}>
              Enter your blood pressure or sugar level.
            </h2>
            <Button onClick={backHandler} style={{ background: "#22c55e",marginTop: "1rem" }} type="primary" block >
                      Previous
                    </Button>
                    <Spin spinning={spinning} percent={percent} fullscreen />
          </Card>
        </Col>

        <Col span={15}>
          <div className={classes.card1}>
            
              <h1 className={classes.heading}>BP/suger.</h1>
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
                        setVital(e.target.value);
                      }}
                      value={vital}
                      className={classes.input}
                      placeholder="BP or suger."
                    />
                    <Button style={{ background: "#22c55e" }} type="primary" block onClick={clickHandler}>
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

export default Vital;
