/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  Col,
  Row,
  message,
  Spin,
} from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./LogIn.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopMedical } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [disable, setDisable] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();

    setSpinning(true);
    let ptg = -10;
    const interval = setInterval(() => {
      ptg += 5;
      setPercent(ptg);
      if (ptg > 120) {
        clearInterval(interval);
        setSpinning(false);
        setPercent('auto');
      }
    }, 100);
    if (email === "" && pass === "") {
      return messageApi.open({
        type: "error",
        content: "Enter email and password",
      });
    }
    if (email === "") {
      return messageApi.open({
        type: "error",
        content: "Enter email",
      });
    }
    if (pass === "") {
      return messageApi.open({
        type: "error",
        content: "Enter password",
      });
    }

    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        email,
        pass,
      });
      const token = res.data.auth;
      localStorage.setItem("token", token);
      console.log(token);
      if (pass !== res.data.userExists.pass) {
        return messageApi.open({
          type: "error",
          content: "Wrong password!",
        });
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      // alert("user not found!!")

      if (error.response.status === 400) {
        return messageApi.open({
          type: "error",
          content: "User not found. Create your Account!",
        });
      }

      // navigate("/create");
    }
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passChangeHandler = (e) => {
    setPass(e.target.value);
    // setDisable(false)
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
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faLaptopMedical} size="3x" inverse />
              <h3 className={classes.font2} style={{ marginLeft: "0.5rem" }}>
                MediConnect
              </h3>
            </div>
            <h2 className={classes.font} style={{ color: "#22c55e" }}>
              Get more things done with login plateform.
            </h2>
            <p className={classes.p}>
              Access the AI base smart doctor app.
            </p>
          </Card>
        </Col>
        <Col span={15}>
          <div className={classes.card}>
            <h1 className={classes.heading}>Login.</h1>
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
                <Input
                  type="email"
                  placeholder="Enter Email"
                  className={classes.input}
                  onChange={emailChangeHandler}
                  value={email}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter password"
                  className={classes.input}
                  onChange={passChangeHandler}
                  value={pass}
                  autoComplete="off"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="unchecked">
                <Checkbox>Remember</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ marginRight: "1rem" }}
                  type="primary"
                  htmlType="submit"
                  onClick={submitHandler}
                >
                  LogIn
                </Button>
                <Spin spinning={spinning} percent={percent} fullscreen />
                <Button
                  style={{ background: "#22c55e" }}
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    navigate("/create");
                  }}
                >
                  Create New Acoount
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LogIn;
