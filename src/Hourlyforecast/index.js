import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import {
  WiRain,
  WiSnow,
  WiFog,
  WiDaySunny,
  WiDayFog,
  WiThunderstorm,
  WiSleet,
} from "weather-icons-react";

import styles from "./styles";

export default function Weathercard({ data, ids, calCelsius }) {
  const classes = styles();
  //const time = new Date().toLocaleTimeString().toString().replace(/:[^:]*/, '')

  const getWeatherIcon = (rangeId) => {
    let icon = <WiDayFog size={30} color="#d1d1d1" />;
    if (rangeId >= 200 && rangeId <= 232) {
      icon = <WiThunderstorm size={30} color="#d1d1d1" />;
    } else if (rangeId >= 300 && rangeId <= 321) {
      icon = <WiSleet size={30} color="#d1d1d1" />;
    } else if (rangeId >= 500 && rangeId <= 531) {
      icon = <WiRain size={30} color="#d1d1d1" />;
    } else if (rangeId >= 600 && rangeId <= 622) {
      icon = <WiSnow size={30} color="#d1d1d1" />;
    } else if (rangeId >= 701 && rangeId <= 781) {
      icon = <WiFog size={30} color="#d1d1d1" />;
    } else if (rangeId === 800) {
      icon = <WiDaySunny size={30} color="#d1d1d1" />;
    } else if (rangeId >= 801 && rangeId <= 804) {
      icon = <WiDayFog size={30} color="#d1d1d1" />;
    }
    return icon;
  };

  const icons = ids.map((id) => {
    return getWeatherIcon(id);
  });

  return (
    <>
      <Grid container className={classes.root} spacing={3}>
        <Grid
          className={classes.introduction}
          item
          xs={12}
          sm={7}
          md={7}
          lg={6}
          xl={4}
        >
          {data.daily
            ? data.daily.map((day, index) => {
                return (
                  <Grid
                    className={classes.hour}
                    item
                    xs={12}
                    sm={7}
                    md={7}
                    lg={4}
                    xl={4}
                  >
                    <span>{icons[index]}</span>
                    {data ? (
                      <Typography variant="h6">
                        {" "}
                        {calCelsius(day.temp.min)}&deg;{" "}
                      </Typography>
                    ) : null}
                    {data ? (
                      <Typography variant="h6">
                        {" "}
                        {calCelsius(day.temp.max)}&deg;{" "}
                      </Typography>
                    ) : null}
                    {day.weather[0].description}
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Grid>
    </>
  );
}
