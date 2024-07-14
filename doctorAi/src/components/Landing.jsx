// eslint-disable-next-line no-unused-vars
import React from 'react'
import classes from './Landing.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons'
import { Button, ConfigProvider, Space } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { useNavigate } from 'react-router-dom';


const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const Landing = () => {
const navigate = useNavigate()

  return (
    <>

    <div className={classes.img}>
 <div className={classes.card}>
    <div className={classes.icon}>
        <FontAwesomeIcon style={{ color : "#e11d48"}} icon={faLaptopMedical}  size="3x"  />
        <h3 className={classes.font2} style={{ marginLeft: "0.5rem" }}>MediConnect </h3>
        </div>
 
 <div className={classes.card1}>
       
  <div className={classes.p}>
    <h1 style={{marginTop: '10rem', fontWeight: "400"}}>Smart Doctor Website.</h1>
    <p style={{fontSize: "larger", marginTop: '-0.4rem', fontWeight: "200"}}>AI based smart doctor website for getting the information of diseases and to know about personal health.</p>
    <p style={{fontSize: "larger", marginTop: '-0.4rem', fontWeight: "200"}}>Get the information about your health with Artificial Intelligence.</p>
    <Space>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large" style={{marginLeft: "25rem", marginTop: "2rem"}} onClick={() => {navigate("/login")}}>
        Get Started
      </Button>
    </ConfigProvider>
    </Space>
    </div>
  </div>
</div>
    </div>
    </>
  )
}

export default Landing