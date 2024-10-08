/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Card, Col, Row } from "antd";
import classes from "./PreCautions.module.css";
import { useNavigate } from "react-router-dom";

const PreCautions = () => {
  const navigate = useNavigate();

  return ( 
    <>
      <div className={classes.new}>
        <Row gutter={16}>
          <Col span={8}>
            <Card className={classes.card} >
            <h1 style={{ marginBottom: "-0.5rem", color: "#22c55e"}}>Fever.</h1><br/>
              Here are some precautions you can take to treat a fever at home:{" "}
              <br />
              <b style={{ color: "#22c55e"}}> Drink fluids:</b> Drink lots of water, broth, and juices to
              stay hydrated and help cool your body.
              <br />
              <b style={{ color: "#22c55e"}}>Dress in light clothing:</b> Wear lightweight clothing and use
              a light blanket if you feel chilled.
              <br />
              <b style={{ color: "#22c55e"}}>Take a lukewarm bath:</b> Sponge your skin with tepid water or
              take a lukewarm bath, but avoid cold water or alcohol.
              <br />
              <b style={{ color: "#22c55e"}}>Get rest:</b> Try to get plenty of rest.
              <br />
              <b style={{ color: "#22c55e"}}>Eat light foods:</b> Eat easy-to-digest foods.
              <br />
            </Card>
          </Col>
          <Col span={8}>
            <Card className={classes.card} >
            <h1 style={{ marginBottom: "-0.5rem", color: "#22c55e"}}>headache.</h1><br/>
              Here are some precautions you can take to help with a headache:
              <br />
              <b style={{ color: "#22c55e"}}>Rest:</b> Lie down in a quiet, dark, and cool room and close
              your eyes.
              <br />
              <b style={{ color: "#22c55e"}}>Temperature therapy:</b> Apply a cold, moist cloth or ice pack
              to the painful area for 10–20 minutes at a time. You can also try
              a warm, moist towel or heating pad on low to relax neck and
              shoulder muscles.
              <br />
              <b style={{ color: "#22c55e"}}>Massage:</b> Gently massage your head and neck muscles.
              <br />
              <b style={{ color: "#22c55e"}}>Caffeine:</b> In small amounts, caffeine can relieve migraine
              pain in the early stages.
              <br />
            </Card>
          </Col>
          <Col span={8}>
            <Card className={classes.card}  >
            <h1 style={{ marginBottom: "-0.5rem", color: "#22c55e"}}>Flu.</h1><br/>
              <b style={{ color: "#22c55e"}}>Avoid close contact with sick people.</b>
              <br />
              People with one or more of the following symptoms: fever, cough,
              sore throat, body aches, headache, chills and fatigue may be
              infected with influenza or another respiratory or other virus.
              Avoid crowded settings, particularly if indoors.
              <br />
              <b style={{ color: "#22c55e"}}>Cover your mouth and nose:</b> Cover your mouth and nose when
              you cough or sneeze, and cough and sneeze into the bend of your
              arm.
              <br />
              <b style={{ color: "#22c55e"}}>Avoid touching your face:</b> Avoid touching your eyes, nose,
              or mouth with unwashed hands.
              <br />
            </Card>
          </Col>
        </Row>

        <Button
          type="primary"
          style={{ background: "#22c55e", marginLeft: "1.5rem", marginTop: "2rem", width: "7rem" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Previous.
        </Button>
      </div>
    </>
  );
};

export default PreCautions;
