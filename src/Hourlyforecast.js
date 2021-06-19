import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from "@material-ui/core";
import { WiRain, WiSnow, WiFog, WiDaySunny, WiDayFog, WiThunderstorm, WiSleet } from "weather-icons-react";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5px)',
    justifyContent: 'center',
    margin: 'auto'

  },
  logo: {

    backgroundColor: 'white',
    marginLeft: '-13rem',
    height: '25px',
    textAlign: 'center',
    color: '#454242',
    fontSize: '40px',
    marginBottom: '-33px',

  },
  introduction: {
    height: '400px',
    textAlign: 'center',
    color: '#262323',
    backgroundColor: '#434443',
    boxShadow: '-21px 0px 43px 1px rgba(0,0,0,0.65)',
    display: 'flex',
  },
  introductions: {
    height: '200px',
    marginTop: ' 8rem',
    textAlign: 'center',
    color: '#939493',
    backgroundColor: '#1e1e1e',
    border: '1px solid black',
    boxShadow: '2px 7px 40px -2px rgba(41,40,40,0.75) inset',
  },
  textShadow: {
    width: '200px',
    margin: 'auto',
    textShadow: '9px 9px 9px rgba(150, 150, 150, 1)',
  },
  box: {
    width: '200px',
    float: 'right',
    marginRight: '5rem',
    marginTop: '-6rem',
    [theme.breakpoints.down('sm')]: {
      marginRight: '-1rem'
    },

  },
  span: {
    fontSize: '24px',
    fontWeight: '600',
    top: '39px',
    right: '29px',
    position: 'absolute',
    color: '#727272',


    [theme.breakpoints.between('xs', '390')]: {
      marginRight: '43px',
      backgroundColor: 'green'
    },
    [theme.breakpoints.between('xs', '330')]: {
      marginRight: '23px',

    },
    [theme.breakpoints.between('410', 'sm')]: {
      marginRight: '71px',


    },
    [theme.breakpoints.between('420', '550')]: {
      marginRight: '135px',


    },
    [theme.breakpoints.up('sm')]: {
      marginRight: '20px',


    },
    [theme.breakpoints.only('md')]: {
      marginRight: '25px',


    },
    [theme.breakpoints.only('lg')]: {
      marginRight: '3px'

    },
    [theme.breakpoints.between('xs', '290')]: {
      marginRight: '4px',

    },
  },
  number: {
    position: 'relative',
    fontFamily: 'Inter',
    fontWeight: 100,
    color: '#cacaca',
    fontSize: '50px',
  },
  currentCity: {
    marginTop: '4rem',
    width: '200px',
    [theme.breakpoints.up('xs')]: {
      marginLeft: '1rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-2rem'
    }
  },
  text: {
    fontFamily: 'Raleway',
    color: '#787878'
  },
  cityText: {
    fontFamily: 'Oswald',
    fontWeight: 'bold',
    color: '#9b9b9b',
    marginTop: '-11px'
  },
  time: {
    float: 'left',
    marginTop: '2rem',
    fontFamily: 'Raleway',
    color: '#787878',
    fontWeight: '600'
  },
  hour: {
    backgroundColor: 'transparent'
  }
}));

export default function Weathercard({ data, ids, calCelsius }) {
 
  
  
  const classes = useStyles();
  //const time = new Date().toLocaleTimeString().toString().replace(/:[^:]*/, '') 

  
  const getWeatherIcon = (rangeId) => {

    const weatherIcons = {
      Thunderstorm: WiThunderstorm,
      Drizzle: WiSleet,
      Rain: WiRain,
      Snow: WiSnow,
      Atmosphere: WiFog,
      Clear: WiDaySunny,
      Clouds: WiDayFog,
    }
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        setIcon(<WiThunderstorm size={30} color="#d1d1d1" />,);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(<WiSleet size={30} color="#d1d1d1" />);
        break;
      case rangeId >= 500 && rangeId <= 531:
        setIcon(<WiRain size={30} color="#d1d1d1" />);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(<WiSnow size={30} color="#d1d1d1" />);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(<WiFog size={30} color="#d1d1d1" />);
        break;
      case rangeId === 800:
        setIcon(<WiDaySunny size={30} color="#d1d1d1" />);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(<WiDayFog size={30} color="#d1d1d1" />);
        break;
      default:
        setIcon(<WiDayFog size={30} color="#d1d1d1" />);
    }
  }



  useEffect(() => { 
      getWeatherIcon(ids)
    }, [ids]) 

  return (
    <>
      <Grid container className={classes.root} spacing={3}>
        <Grid className={classes.introduction} item xs={12} sm={7} md={7} lg={6} xl={4}>
          {
            data.daily ? data.daily.map((day) => {

              return (<Grid className={classes.hour} item xs={12} sm={7} md={7} lg={4} xl={4} >
                <span>{icon}</span>
                {data ? <Typography variant='h6'> {calCelsius(day.temp.min)}&deg; </Typography> : null}
                {data ? <Typography variant='h6'> {calCelsius(day.temp.max)}&deg; </Typography> : null}
                {day.weather[0].description}
              </Grid>)
            }) : null}
        </Grid>

      </Grid>
    </>
  )
}


