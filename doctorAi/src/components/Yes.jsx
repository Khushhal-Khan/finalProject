/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Button, Flex, Col, Row, Form, Spin,message, } from "antd";
import classes from "./Yes.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Ollama } from "ollama";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

const ollama = new Ollama({ host: "http://localhost:11434" });

const Yes = () => {
  const [userData, setUserData] = useState([]);
  const [newData, setNewData] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerNo, setAnswerNo] = useState("");
  const [headache, setHeadache] = useState("");
  const [noHeadache, setNoHeadache] = useState("");
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [disable, setDisable] = useState(false);
  const [disable1, setDisable1] = useState(false);
  const [percent, setPercent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

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
    setAnswer("i am feeling cold");
    setDisable(true)
    console.log(answer);
  };
  const yesHandlerNo = () => {
    setAnswerNo("i am not feeling cold ");
    setDisable(true)
  };
  const headacheHandler = () => {
    setHeadache(" i am feeling headache ");
    setDisable1(true)
  };
  const noHeadHandler = () => {
    setNoHeadache(" i am not feeling headache ");
    setDisable1(true)
  };

  
  const clickHandler = async (e) => {
    e.preventDefault();

if(answer === "" && answerNo === "" && headache === "" && noHeadache === ""){
  return messageApi.open({
    type: "error",
    content: "Please answer any question!",
  });
}
   setDisable(false)
   setDisable1(false)
    setNewData("");
    setLoading(true);
    const res = await ollama.generate({
      system: "always give response in medical term.Only answer in 100 words.",
      model: "gemma:2b",
      prompt:
        answer +
        answerNo +
        headache +
        noHeadache ,
      stream: true,
    });
    for await (const i of res) {
      setNewData((prev) => prev + i.response);
      setLoading(false);
    }
    setAnswer("")
    setAnswerNo("")
    setHeadache("")
    setNoHeadache("")
    
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
              <FontAwesomeIcon icon={faClipboardList} size="3x" />
              <h3 className={classes.font2} style={{ marginLeft: "0.5rem" }}>
                MediConnect
              </h3>
            </div>
            <h2 className={classes.font} style={{ color: "#22c55e" }}>
              Answer the questions by just clicking yes or no.
            </h2>
            <Button
              onClick={backHandler}
              style={{ background: "#22c55e", marginTop: "1rem" }}
              type="primary"
              block
            >
              Previous
            </Button>
            <Spin spinning={spinning} percent={percent} fullscreen />
          </Card>
        </Col>

        <Col span={15}>
          <div className={classes.card1}>
            <h1  className={classes.heading}>Qusetions.</h1>
            <div className={classes.button1}>
              <h4>1 : Are you feeling cold ?</h4>

             {!disable &&  <Button
                style={{ marginRight: "1rem", width : "7%"}}
                type="primary"
                ghost
                danger
                onClick={yesHandler}
              >
                Yes
              </Button>
             }
             {!disable && <Button
              style={{ width : "7%"}}
                ghost
                type="primary"
                onClick={yesHandlerNo}
              >
                No
              </Button> }
              
            </div>
<div className={classes.button1}>
              <h4 style={{marginLeft: "2.8rem"}}>2 : Are you feeling headache ?</h4>

             {!disable1 &&  <Button
                style={{ marginRight: "1rem", width : "7%"}}
                type="primary"
                ghost
                danger
                onClick={headacheHandler}
              >
                Yes
              </Button>}
              {!disable1 && <Button
              style={{  width : "7%"}}
                ghost
                type="primary"
                onClick={noHeadHandler}
              >
                No
              </Button>}
</div>
              <Button style={{ marginTop : "2rem", width : "30%", marginLeft : '8.5rem', background: "#22c55e"}} type="primary" block onClick={clickHandler}>
                Ask
              </Button>
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

export default Yes;
