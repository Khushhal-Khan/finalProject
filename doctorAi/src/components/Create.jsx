/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import classes from "./Create.module.css";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  Col,
  Row,
  message,
  Select,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopMedical } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Create = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [reEnter, setReEnter] = useState("");
  const [age, setAge] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);

  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();

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

    if (
      name === "" ||
      lastName === "" ||
      gender === "" ||
      age === "" ||
      email === "" ||
      pass === "" ||
      reEnter === ""
    ) {
      return messageApi.open({
        type: "error",
        content: "Fill all fields!",
      });
    }
    if (reEnter !== pass || pass !== reEnter) {
      return messageApi.open({
        type: "error",
        content: "password not matched!",
      });
    }
    try {
      await axios.post("http://localhost:3000/user/create", {
        name,
        lastName,
        gender,
        age,
        email,
        pass,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
       messageApi.open({
          type: "error",
          content: "user already preasent!",
        });
      
    }
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
  };

  const genChangeHandler = (e) => {
    setGender(e);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passChangeHandler = (e) => {
    setPass(e.target.value);
  };
  const reEnterChangeHandler = (e) => {
    setReEnter(e.target.value);
  };
  const ageChangeHandler = (e) => {
    setAge(e.target.value);
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
              Create your account and get access.
            </h2>
            <p className={classes.p}>
              Access the AI base smart doctor app.
            </p>
          </Card>
        </Col>
        <Col span={15}>
          <div className={classes.card}>
            <h1 className={classes.heading}>Register.</h1>

            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <div className={classes.one}>
                <div className={classes.name}>
                  <Form.Item
                    name="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input
                      // style={{width : "30%"}}
                      onChange={nameChangeHandler}
                      value={name}
                      placeholder="First name"
                      className={classes.input}
                    />
                  </Form.Item>
                </div>

                <div className={classes.name}>
                  <Form.Item
                    name="last"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input
                      // style={{width : "100%"}}
                      onChange={lastNameChangeHandler}
                      value={lastName}
                      placeholder="Last name"
                      className={classes.input}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={classes.two}>
                <div className={classes.name}>
                  <Form.Item
                    name="Gender"
                    rules={[
                      {
                        required: true,
                        message: "Please input your gender!",
                      },
                    ]}
                  >
                    <Select
                      onSelect={genChangeHandler}
                      value={gender}
                      placeholder="Gender"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={[
                        {
                          value: "Male",
                          label: "Male",
                        },
                        {
                          value: "Female",
                          label: "Female",
                        },
                        {
                          value: "Other",
                          label: "Other",
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className={classes.name}>
                  <Form.Item
                    name="Age"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      value={age}
                      onChange={ageChangeHandler}
                      placeholder="Age"
                      type="number"
                      min={0}
                      className={classes.input}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={classes.email}>
                <Form.Item
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    value={email}
                    onChange={emailChangeHandler}
                    type="email"
                    placeholder="Email"
                    className={classes.input}
                  />
                </Form.Item>
              </div>

              <div className={classes.third}>
                <div className={classes.name}>
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
                      onChange={passChangeHandler}
                      value={pass}
                      placeholder="password"
                      className={classes.input}
                      autoComplete="off"
                    />
                  </Form.Item>
                </div>
                <div className={classes.name}>
                  <Form.Item
                    name="reEnter"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={reEnterChangeHandler}
                      value={reEnter}
                      placeholder="Confirm password"
                      className={classes.input}
                      autoComplete="off"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className={classes.forth}>
                <div className={classes.name1}>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Checkbox>Remember</Checkbox>
                  </Form.Item>
                </div>
                <div className={classes.name2}>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Go Back
                    </Button>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button
                      style={{ background: "#22c55e", color: "white" }}
                      htmlType="submit"
                      onClick={clickHandler}
                    >
                      Create Acoount
                    </Button>
                    <Spin spinning={spinning} percent={percent} fullscreen />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Create;
