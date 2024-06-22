/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Card } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./LogIn.module.css";
import axios from "axios";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        email,
        pass,
      });
      const token = res.data.auth;
      localStorage.setItem("token", token);
      console.log(token);
      if (pass !== res.data.userExists.pass  ){
        alert("wrong password")
      }else{
        navigate("/home")
      }
    } catch (error) {
      console.log(error);
      alert("user not found!!")
      navigate("/create");
    }

  }
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  
  };

  const passChangeHandler = (e) => {
    setPass(e.target.value);
    setDisable(false)
  
  };

  return (
    <>
      <div className={classes.heading}>
        <h1>Smart Doctor</h1>
      </div>

      <div className={classes.card}>
        <Card
          className={classes.new}
          title="Enter Email and password"
          bordered={true}
          style={{
            width: 500,
          }}
        >
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
              label="Email"
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
              label="Password"
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

            <Form.Item
              name="remember"
              valuePropName="unchecked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                style={{ marginRight: "1rem" }}
                type="primary"
                htmlType="submit"
                onClick={submitHandler}
                disabled={disable}
              >
                
                LogIn
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  navigate("/create");
                }}
              >
                Create Acoount
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

  
    </>
  );
};

export default LogIn;
