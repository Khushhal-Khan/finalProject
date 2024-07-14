/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Avatar, Breadcrumb  } from "antd";
import { AntDesignOutlined } from '@ant-design/icons';
import classes from "./Home.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons'
import Footer from "./Footer";



const Home = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  
  
  const clickHandler = () => {
    localStorage.clear();

  };

  useEffect(() => {
    //hit api

    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/me", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(res.data);
      } catch (err) {
        console.log(err);
        // alert("unauthorized")
        // navigate(-1)
      }
    })();
  }, []);

  return (
    <>
    <div className={classes.img}>
      <div className={classes.div}>
      <div className={classes.icon}>
      <FontAwesomeIcon style={{ color : "#e11d48"}} icon={faLaptopMedical}  size="2x"  />
      <h3 className={classes.font2} style={{ marginLeft: "0.5rem" }}>MediConnect </h3>
      </div>
      
<div className={classes.nav}>
        <Breadcrumb
    items={[
     
      {
        title: <NavLink to={"/precautions"} style={{ color: "black", fontSize : "larger", fontWeight: "600"}} >
              Precautions
            </NavLink>,
      },
      {
        title:  <Avatar
    size={{
      md: 40,
    }}
    icon={<span style={{ color: "white", fontSize : "medium"}}>{userData.name}</span>}
  /> ,
      },
    
      {
        title: <NavLink to={"/"} style={{ color: "black", fontSize : "larger", fontWeight: "600"}}  onClick={clickHandler}>
            Logout
          </NavLink>,
      },
    ]}
  />
  </div>

        
      </div>
      {/* <div className={classes.newHead}>
      <h1>"Smart Doctor App"</h1>
      </div> */}
      <div className={classes.row}>
        <Row gutter={16}>
          <Col span={10}>
            <Card
            style={{ marginRight: "1rem"}}
            hoverable
              onClick={() => {
                navigate("/symptoms");
              }}
              className={classes.card}
             
            >
            <div className={classes.center}>
            <Avatar
    size={{
      xs: 24,
      sm: 32,
      md: 40,
      lg: 64,
      xl: 80,
      xxl: 100,
    }}
    icon={<FontAwesomeIcon icon={faHandHoldingDroplet} />}
  />
  <div className={classes.text}>
            <i style={{ fontSize : "larger", color: "#475569", fontWeight: "600"}}> Get the information of various diseases.</i>
             </div>
             </div>
            </Card>
          </Col>
          {/* <Col span={6}>
            <Card
            hoverable
              onClick={() => {
                navigate("/vital");
              }}
              className={classes.card}
              
            >
            <div className={classes.center}>
            <Avatar
    size={{
      xs: 24,
      sm: 32,
      md: 40,
      lg: 64,
      xl: 80,
      xxl: 100,
    }}
    icon={<FontAwesomeIcon icon={faHeartPulse} />}
  />
   <div className={classes.text}>
              <b style={{color : "#475569", fontSize: "25px",  fontWeight: "600" }}>Blood pressure <br/>Sugar level.</b> <br /> <i> Input your Blood pressure and sugar level.</i>
              </div>
              </div>
            </Card>
          </Col> */}
          <Col span={10}>
            <Card
            hoverable
              onClick={() => {
                navigate("/answer");
              }}
              className={classes.card}
            >
             <div className={classes.center}>
            <Avatar
    size={{
      xs: 24,
      sm: 32,
      md: 40,
      lg: 64,
      xl: 80,
      xxl: 100,
    }}
    icon={<FontAwesomeIcon icon={faClipboardList} />}
  />
   <div className={classes.text}>
               <i style={{ fontSize : "larger", color: "#475569", fontWeight: "600"}}>Answer the questions and know about your health.</i>
              </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
  
      </div>
      <Footer />
    </>
  );
};

export default Home;
