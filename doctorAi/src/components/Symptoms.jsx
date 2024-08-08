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
import Footer from "./Footer";

const ollama = new Ollama({ host: "http://localhost:11434" });

const Symptoms = () => {
  const [sym, setSym] = useState("");
  const [userData, setUserData] = useState([]);
  const [newData, setNewData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);
  const [toggle, setToggle] = useState(true);
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
    setToggle(false);

    setNewData("");
    setSym("");
    setLoading(true);
    const res = await ollama.generate({
      system: "Do no answer more than 200 words. only answer in medical terms.",
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
              Enter the disease name and get the information of it.
            </h2>
            <Button onClick={backHandler} style={{ background: "#22c55e",marginTop: "1rem", width: "50%", }} type="primary" block >
                      Previous
                    </Button>
                    <Spin spinning={spinning} percent={percent} fullscreen />
          </Card>
        </Col>

        <Col span={15}>
      {toggle && (
        <div>
        <p style={{ fontSize: "medium", textAlign: "center"}}>Enter the disease name and get the information of that disease by just clicking Ask button.</p>
          <div className={classes.card1}>
              <h1 className={classes.heading}>Disease.</h1>
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
                      placeholder="Enter disease name"
                    />
                    <Button style={{ background: "#22c55e" }} type="primary" block onClick={sympHandler}>
                      Ask
                    </Button>
                  </div>
                </Form.Item>

              </Form>
            </div>
            </div>
      )}
            {!toggle && (
              <div>
              <Card className={classes.data}>
                {!loading && newData}
                {loading && <Loader />}
                </Card>
                <Button
                style={{
                  // marginTop: "15rem",
                  position: "fixed",
                  width: "20%",
                  marginLeft: "20rem",
                  background: "#22c55e",
                }}
                type="primary"
                block
                onClick={() => { setToggle(true)}}
              >
                back
              </Button>
              </div>
            )} 
               
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Symptoms;
