import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { TextField } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [humidity, setHumidity] = React.useState([]);
  const [temperature, setTemperature] = React.useState([]);
  const [rain, setRain] = React.useState([]);
  const [contentId, setContentId] = useState(0);
  const [refreshTime, setRefreshTime] = useState(5000);
  const [newRefreshTime, setNewRefreshTime] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewRefreshTime(e.target.value)
  }

  const handleClickInterval = () => {
    setRefreshTime(newRefreshTime*1000);
    setNewRefreshTime();
  }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getUserData();
    }, refreshTime);
    return () => clearInterval(interval);
  }, []);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`http://192.168.0.101/`);
      setTemperature(data.temperature);
      setHumidity(data.humidity);
      setRain(data.rain);
      // console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = () => {
    window.sessionStorage.removeItem("key");
    props.setKey(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button key="Home" onClick={() => setContentId(0)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="Settings" onClick={() => setContentId(1)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button key="Account" onClick={() => setContentId(2)}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button key="Logout" onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {contentId === 0 ? (
          <div className={classes.columns}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Current Temperature
                </Typography>

                <Typography variant="h5" component="div">
                  {temperature.length !== 0
                    ? temperature.map((item, index) => {
                        return (
                          <Typography key={1} variant="h5" component="div">
                            {item + "℃"}
                          </Typography>
                        );
                      })
                    : ""}
                </Typography>
                <ThermostatIcon />
                {temperature[0] > 30 ?<Typography variant="body2">Pretty hot outside</Typography> : null}
                {temperature[0] > 25 && temperature[0] < 30  ?<Typography variant="body2">Nice temperature outside</Typography> : null}
                {temperature[0] < 25 && temperature[0] > 0  ?<Typography variant="body2">Cold outside</Typography> : null}
                {temperature[0] < 0  ?<Typography variant="body2">Freezing outside</Typography> : null}
              </CardContent>
              {/* <CardActions>
                <Button size="small">View More Data</Button>
              </CardActions> */}
            </Card>

            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Current Humidity
                </Typography>
                {humidity.length !== 0
                    ? humidity.map((item, index) => {
                        return (
                          <Typography key={2} variant="h5" component="div">
                            {item + "%"}
                          </Typography>
                        );
                      })
                    : ""}
                <br />
                {humidity[0] < 25 ?<Typography variant="body2">Poor low humidity</Typography> : null}
                {humidity[0] >= 25 && humidity[0] < 30  ?<Typography variant="body2">Fair humidity</Typography> : null}
                {humidity[0] >= 30 && humidity[0] < 60  ?<Typography variant="body2">Healthy level</Typography> : null}
                {humidity[0] >= 60 && humidity[0] < 70  ?<Typography variant="body2">Fair humidity</Typography> : null}
                {humidity[0] >= 70 ?<Typography variant="body2">Poor high humidity</Typography> : null}
              </CardContent>
              {/* <CardActions>
                <Button size="small">View More Data</Button>
              </CardActions> */}
            </Card>

            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Current Rain
                </Typography>
                <Typography variant="h5" component="div">
                {rain.length !== 0
                    ? rain.map((item, index) => {
                        return (
                          <Typography key={3} variant="h5" component="div">
                            {item}
                          </Typography>
                        );
                      })
                    : ""}
                </Typography>
                <br />
                <br />     
              </CardContent>
              {/* <CardActions>
                <Button size="small">View More Data</Button>
              </CardActions> */}
            </Card>
          </div>
        ) : null}

        {contentId === 1 ? (
          <div>
            <div className={classes.columns}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Edit refresh time
                  </Typography>

                  <Typography sx={{ fontSize: 18 }} component="div">
                    Current refresh time: {refreshTime/1000} sec
                  </Typography>
                  <div className={classes.columns2}>
                    <Typography sx={{ fontSize: 18 }} component="div">
                      New refresh time
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="Seconds"
                      variant="outlined"
                      value={newRefreshTime}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleClickInterval}>Change interval</Button>
                </CardActions>
              </Card>

              <div />
              <div />
            </div>
          </div>
        ) : null}

        {contentId === 2 ? (
          <div>
            <div className={classes.columns}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Edit account details
                  </Typography>

                  <div className={classes.columns2}>
                    <Typography sx={{ fontSize: 18 }} component="div">
                      Username
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="New username"
                      variant="outlined"
                    />
                  </div>

                  <div className={classes.columns2}>
                    <Typography sx={{ fontSize: 18 }} component="div">
                      Password
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="New password"
                      variant="outlined"
                    />
                  </div>

                  <div className={classes.columns2}>
                    <Typography sx={{ fontSize: 18 }} component="div">
                      Confirm Password
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="Confirm password"
                      variant="outlined"
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <Button size="small">Update</Button>
                </CardActions>
              </Card>

              <div />
              <div />
            </div>
          </div>
        ) : null}

        {/* {analog.length!==0 ? analog.map((item,index) => {
          return (<div key={index}>
                    <Typography paragraph>
                   {'Analog value'+index+': '+item}
                  </Typography>
                  </div>);
        }) : ''}*/}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  columns: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gridGap: "20px",
    alignItems: "center",
    justifyContent: "center",
  },
  columns2: {
    display: "grid",
    gridTemplateColumns: "0.5fr 0.5fr",
    gridGap: "20px",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10px",
  },
}));
