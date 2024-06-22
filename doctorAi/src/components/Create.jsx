/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import classes from "./Create.module.css";
import { Button, Checkbox, Form, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [age, setAge] = useState(0);

  // const [validateInput, setValidateInput] = useState({
  //   name: true,
  //   gender: true,
  //   email: true,
  //   pass: true,
  // });

  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/user/create", {
        name,
        gender,
        age,
        email,
        pass,
      });
     
      navigate("/");
    } catch (error) {
      console.log(error);
      if(name === "" || gender === "" || age === "" || email === "" || pass === ""){
        return  alert("please fill all inputs!!")
      }
      alert("user already present");
    }

    
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const genChangeHandler = (e) => {
    setGender(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passChangeHandler = (e) => {
    setPass(e.target.value);
  };
  const ageChangeHandler = (e) => {
    setAge(e.target.value);
  };

  return (
    <>
      <div className={classes.card}>
        <Card
          className={classes.new}
          title="Create Your Account"
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
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                onChange={nameChangeHandler}
                value={name}
                placeholder="Enter Your Name"
                className={classes.input}
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="Gender"
              rules={[
                {
                  required: true,
                  message: "Please input your gender!",
                },
              ]}
            >
              <Input
                onChange={genChangeHandler}
                value={gender}
                placeholder="Enter Your Gender"
                className={classes.input}
              />
            </Form.Item>

            <Form.Item
              label="Age"
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
                placeholder="Enter Your Age"
                type="number"
                min={0}
                className={classes.input}
              />
            </Form.Item>

            <Form.Item
              label="Email"
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
                placeholder="Enter Email"
                className={classes.input}
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
                onChange={passChangeHandler}
                value={pass}
                placeholder="Enter password"
                className={classes.input}
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
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
                type="primary"
                style={{ marginRight: "1rem" }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go Bacck
              </Button>
              <Button type="primary" htmlType="submit" onClick={clickHandler}>
                Create Acoount
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Create;
