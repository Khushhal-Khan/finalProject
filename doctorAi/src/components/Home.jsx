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



const Home = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  
  
  const clickHandler = () => {
    // function PrintFirstLetter(word) {
    //   let words = word.match(/\b\w/g);
    //   words.forEach(firstLetter => {
    //       console.log(firstLetter);
    //   });
    // }
    // PrintFirstLetter(userData.name);
    localStorage.clear();
    // navigate("/")
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
      <FontAwesomeIcon style={{ color : "#b91c1c"}} icon={faLaptopMedical}  size="2x"  />
      <h3 className={classes.font2} style={{ marginLeft: "0.5rem" }}>MediConnect </h3>
      </div>
      

        <Breadcrumb
    items={[
     
      {
        title: <NavLink to={"/precautions"} style={{ color: "#4a4d4c", fontSize : "larger", fontWeight: "600"}} >
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
        title: <NavLink to={"/"} style={{ color: "#4a4d4c", fontSize : "larger", fontWeight: "600"}}  onClick={clickHandler}>
            Logout
          </NavLink>,
      },
    ]}
  />

        
      </div>

      <div className={classes.row}>
        <Row gutter={16}>
          <Col span={6}>
            <Card
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
             <b style={{color : "#f87171", fontSize: "25px", fontWeight: "400" }}>Symptoms.</b> <br /> <i> Get the diagnosis for signs, Symptoms and conditions.</i>
             </div>
             </div>
            </Card>
          </Col>
          <Col span={6}>
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
              <b style={{color : "#f87171", fontSize: "25px",  fontWeight: "400" }}>Blood pressure <br/>Sugar level.</b> <br /> <i> Input your Blood pressure and sugar level.</i>
              </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
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
              <b style={{color : "#f87171", fontSize: "25px",  fontWeight: "400" }}>Questions.</b> <br /> <i> By answering yes or no, know about your condition.</i>
              </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      </div>
    </>
  );
};

export default Home;
