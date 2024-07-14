/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Button, Form, Col, Row, Input, Spin, message } from "antd";
import classes from "./Yes.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Ollama } from "ollama";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import Footer from "./Footer";

const ollama = new Ollama({ host: "http://localhost:11434" });

const Yes = () => {
  const [userData, setUserData] = useState([]);
  const [newData, setNewData] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerNo, setAnswerNo] = useState("");
  const [headache, setHeadache] = useState("");
  const [noHeadache, setNoHeadache] = useState("");
  const [body, setBody] = useState("");
  const [noBody, setNoBody] = useState("");
  const [temp, setTemp] = useState("");
  const [bp, setBp] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [disable1, setDisable1] = useState(false);
  const [disable2, setDisable2] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    //hit api

    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/third", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const yesHandler = () => {
    setAnswer("i have cough and ");
    setDisable(true);
    console.log(answer);
  };
  const yesHandlerNo = () => {
    setAnswerNo("i am not feeling cold but ");
    setDisable(true);
  };
  const headacheHandler = () => {
    setHeadache(" i am feeling headache and ");
    setDisable1(true);
  };
  const noHeadHandler = () => {
    setNoHeadache(" i am not feeling headache but ");
    setDisable1(true);
  };
  const bodyHandler = () => {
    setBody(" i am feeling bodyache and ")
    setDisable2(true)
  }

  const noBodyHandler = () => {
    setNoBody(" i am not feeling bodyache and ")
    setDisable2(true)
  }
  const tempHandler = (e) => {
   setTemp(e.target.value)
  };
const tem = temp
const perature = temp === "" ? ""  : `my body temperature is ${temp} °F `


  const bpHandler = (e) => {
    setBp(e.target.value);
  };

const blood = bp 
const pressure = blood === "" ? "" :  `my blood pressure is ${blood} mmHg `

  const clickHandler = async (e) => {
    e.preventDefault();

    if (
      answer === "" &&
      answerNo === "" &&
      headache === "" &&
      noHeadache === "" &&
      body === "" &&
      noBody === "" &&
      temp === "" && 
      bp === ""
    ) {
      return messageApi.open({
        type: "error",
        content: "Please answer any question!",
      });
    }
    setAnswer("");
    setAnswerNo("");
    setHeadache("");
    setNoHeadache("");
    setBody("")
    setNoBody("")
    setTemp("");
    setBp("");
    setDisable(false);
    setDisable1(false);
    setDisable2(false);
    setNewData("");
    setLoading(true);
    setToggle(false);

    const res = await ollama.generate({
      system: "Do not answer more than 150 words.",
      model: "gemma:2b",
      prompt:
        answer +
        answerNo +
        headache +
        noHeadache +
        body +
        noBody + 
        perature +
        pressure +
        " What could be the possible disese?" +
        " also give me precautions about it.",
      stream: true,
    });
    for await (const i of res) {
      setNewData((prev) => prev + i.response);
      setLoading(false);
    }
  };

  const backClickHandler = () => {
    setToggle(true)
  }

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
              <FontAwesomeIcon icon={faClipboardList} size="3x" />
              <h3 className={classes.font2} style={{ marginLeft: "0.5rem" }}>
                MediConnect
              </h3>
            </div>
            <h2 className={classes.font} style={{ color: "#22c55e" }}>
              Answer the questions and know about your health.
            </h2>
            <Button
              onClick={backHandler}
              style={{ background: "#22c55e", marginTop: "1rem", width: "50%" }}
              type="primary"
              block
            >
              Previous
            </Button>
          </Card>
        </Col>

        <Col span={15}>
          {toggle && (
            <div className={classes.card1}>
              <h1 className={classes.heading}>Qusetions.</h1>
              <div className={classes.button1}>
                <h4>1 : Do you have cough ?</h4>

                {!disable && (
                  <Button
                    style={{ marginRight: "1rem", width: "7%" }}
                    type="primary"
                    ghost
                    danger
                    onClick={yesHandler}
                  >
                    Yes
                  </Button>
                )}
                {!disable && (
                  <Button
                    style={{ width: "7%" }}
                    ghost
                    type="primary"
                    onClick={yesHandlerNo}
                  >
                    No
                  </Button>
                )}
              </div>
              <div className={classes.button1}>
                <h4 style={{ marginLeft: "2.8rem" }}>
                  2 : Are you feeling headache ?
                </h4>

                {!disable1 && (
                  <Button
                    style={{ marginRight: "1rem", width: "7%" }}
                    type="primary"
                    ghost
                    danger
                    onClick={headacheHandler}
                  >
                    Yes
                  </Button>
                )}
                {!disable1 && (
                  <Button
                    style={{ width: "7%" }}
                    ghost
                    type="primary"
                    onClick={noHeadHandler}
                  >
                    No
                  </Button>
                )}
              </div>


              <div className={classes.button1}>
                <h4 style={{ marginLeft: "2.8rem" }}>
                  3 : Are you feeling bodyache ?
                </h4>

                {!disable2 && (
                  <Button
                    style={{ marginRight: "1rem", width: "7%" }}
                    type="primary"
                    ghost
                    danger
                    onClick={bodyHandler}
                  >
                    Yes
                  </Button>
                )}
                {!disable2 && (
                  <Button
                    style={{ width: "7%" }}
                    ghost
                    type="primary"
                    onClick={noBodyHandler}
                  >
                    No
                  </Button>
                )}
              </div>

              <div className={classes.button1}>
                <h4 style={{ marginRight: "-5.7rem", marginLeft: "0" }}>
                  4 : What is your body temperature ?
                </h4>

                <Input
                  onChange={tempHandler}
                  style={{ marginLeft: "11rem", width: "30%" }}
                  className={classes.input}
                  placeholder="Enter you body temerature"
                  value={temp}
                />

                <h4 style={{ marginLeft: "4.5rem" }}>
                  5 : What is your Blood pressure ?
                </h4>
                <Input
                  onChange={bpHandler}
                  style={{ marginLeft: "11rem", width: "30%" }}
                  className={classes.input}
                  placeholder="Enter you blood pressure"
                  value={bp}
                />
              </div>
              <Button
                style={{
                  marginTop: "4rem",
                  width: "30%",
                  marginLeft: "27rem",
                  background: "#22c55e",
                }}
                type="primary"
                block
                onClick={clickHandler}
              >
                Ask
              </Button>
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
                onClick={backClickHandler}
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

export default Yes;
