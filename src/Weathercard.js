import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid } from "@material-ui/core";
import {
  WiRain,
  WiSnow,
  WiFog,
  WiDaySunny,
  WiDayFog,
  WiThunderstorm,
  WiSleet,
} from "weather-icons-react";
import Hourlyforecast from "./Hourlyforecast";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5px)",
    justifyContent: "center",
    margin: "auto",
  },
  logo: {
    backgroundColor: "white",
    marginLeft: "-13rem",
    height: "25px",
    textAlign: "center",
    color: "#454242",
    fontSize: "40px",
    marginBottom: "-33px",
  },
  introduction: {
    height: "200px",
    textAlign: "center",
    color: "#262323",
    backgroundColor: "#434443",
    marginTop: " 8rem",
    boxShadow: "-21px 0px 43px 1px rgba(0,0,0,0.65)",
  },
  introductions: {
    height: "200px",
    marginTop: " 8rem",
    textAlign: "center",
    color: "#939493",
    backgroundColor: "#1e1e1e",
    border: "1px solid black",
    boxShadow: "2px 7px 40px -2px rgba(41,40,40,0.75) inset",
  },
  textShadow: {
    width: "200px",
    margin: "auto",
    textShadow: "9px 9px 9px rgba(150, 150, 150, 1)",
  },
  box: {
    width: "200px",
    float: "right",
    marginRight: "5rem",
    marginTop: "-6rem",
    [theme.breakpoints.down("sm")]: {
      marginRight: "-1rem",
    },
  },
  span: {
    fontSize: "24px",
    fontWeight: "600",
    top: "39px",
    right: "29px",
    position: "absolute",
    color: "#727272",

    [theme.breakpoints.between("xs", "390")]: {
      marginRight: "43px",
      backgroundColor: "green",
    },
    [theme.breakpoints.between("xs", "330")]: {
      marginRight: "23px",
    },
    [theme.breakpoints.between("410", "sm")]: {
      marginRight: "71px",
    },
    [theme.breakpoints.between("420", "550")]: {
      marginRight: "135px",
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: "20px",
    },
    [theme.breakpoints.only("md")]: {
      marginRight: "25px",
    },
    [theme.breakpoints.only("lg")]: {
      marginRight: "3px",
    },
    [theme.breakpoints.between("xs", "290")]: {
      marginRight: "4px",
    },
  },
  number: {
    position: "relative",
    fontFamily: "Inter",
    fontWeight: 100,
    color: "#cacaca",
    fontSize: "150px",
  },
  currentCity: {
    marginTop: "4rem",
    width: "200px",
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.up("xs")]: {
      marginLeft: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "-2rem",
    },
  },
  text: {
    fontFamily: "Raleway",
    color: "#787878",
  },
  cityText: {
    fontFamily: "Oswald",
    fontWeight: "bold",
    color: "#9b9b9b",
    marginTop: "-11px",
  },
  description: {
    float: "left",
    marginTop: "2rem",
    fontFamily: "Raleway",
    color: "#d1d1d1",
    fontWeight: "600",
  },
  dottedLine: {
    backgroundColor: "white",
  },
}));

export default function Weathercard() {
  const [data, setdata] = useState([]);
  const [id, setId] = useState("");
  const [DailyData, setDailyData] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [dailyIconId, setDailyIconId] = useState([]);
  const [icon, seticon] = useState(null);
  const [description, setDescription] = useState("");
  const classes = useStyles();

  const API_URL = "https://api.openweathermap.org/data/2.5";
  const API_key = "d0ee55907844a5fe51239755697d758f";

  const getWeatherIcons = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        seticon(<WiThunderstorm size={150} color="#d1d1d1" />);
        break;
      case rangeId >= 300 && rangeId <= 321:
        seticon(<WiSleet size={150} color="#d1d1d1" />);
        break;
      case rangeId >= 500 && rangeId <= 531:
        seticon(<WiRain size={150} color="#d1d1d1" />);
        break;
      case rangeId >= 600 && rangeId <= 622:
        seticon(<WiSnow size={150} color="#d1d1d1" />);
        break;
      case rangeId >= 701 && rangeId <= 781:
        seticon(<WiFog size={150} color="#d1d1d1" />);
        break;
      case rangeId === 800:
        seticon(<WiDaySunny size={150} color="#d1d1d1" />);
        break;
      case rangeId >= 801 && rangeId <= 804:
        seticon(<WiDayFog size={150} color="#d1d1d1" />);
        break;
      default:
        seticon(<WiDayFog size={150} color="#d1d1d1" />);
    }
  };

  useEffect(() => {
    const weatherIcons = {
      Thunderstorm: WiThunderstorm,
      Drizzle: WiSleet,
      Rain: WiRain,
      Snow: WiSnow,
      Atmosphere: WiFog,
      Clear: WiDaySunny,
      Clouds: WiDayFog,
    };

    const getWeather = async () => {
      try {
        const api_call = await fetch(
          `${API_URL}/weather?q=Melbourne,AU&APPID=${API_key}`
        );
        const response = await api_call.json();
        setdata(response);
        setId(response.weather[0].id);
        setLat(response.coord.lat);
        setLong(response.coord.lon);
        setDescription(response.weather[0].description);

        const daily_api = await fetch(
          `${API_URL}/onecall?lat=${lat}&lon=${long}&appid=${API_key}`
        );
        const res = await daily_api.json();
        let getId = res.daily;

        let a = getId.map((x, i) => {
          let c = x.weather[0].id;
          return c;
        });

        setDailyIconId(a);
        setDailyData(res);
      } catch (error) {
        console.log(error, "ERROR");
      }
    };

    getWeather();
    getWeatherIcons(weatherIcons, id);
  }, [id, lat, long]);

  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid
          className={classes.introduction}
          item
          xs={12}
          sm={7}
          md={7}
          lg={4}
          xl={4}
        >
          <Box className={classes.currentCity}>
            <Typography variant="h6" className={classes.text}>
              {" "}
              CURRENTLY{" "}
            </Typography>
            <Typography variant="h6" className={classes.cityText}>
              {data.name}{" "}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" className={classes.description}>
              {description.charAt(0).toUpperCase() + description.slice(1)}
            </Typography>
          </Box>
          <Box className={classes.box}>{icon}</Box>
        </Grid>

        <Grid
          className={classes.introductions}
          item
          xs={12}
          sm={5}
          md={4}
          lg={2}
          xl={2}
        >
          <Typography variant="h2" className={classes.number}>
            {" "}
            {data.main ? calCelsius(data.main.temp) : null}
            <span className={classes.span}>&deg;C</span>{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={11} xl={2}>
          <hr className={classes.dottedLine}></hr>
        </Grid>
        <Hourlyforecast
          data={DailyData}
          ids={dailyIconId}
          calCelsius={calCelsius}
        />
      </Grid>
    </>
  );
}
