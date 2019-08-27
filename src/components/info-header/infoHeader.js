import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "../css/infoHeader.css";
import { Link } from "react-router-dom";
// import CustomizedSwitches from './switchicon';

const styles = {
  root: {
    flexGrow: 1
  }
};

function InfoHeader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        {/* <CustomizedSwitches/> */}
        <Toolbar>
          <div>
            <Typography
              variant="h6"
              color="inherit"
              align="left"
              style={{ marginRight: "260px" }}
            >
              <Link to="/aboutus">
                <span style={{ color: "#fff" }} className="span2">
                  About Us
                </span>
              </Link>
              <span className="span">
                Email:
                <a href="mailto:faisalmaxi60@gmail.com">info@epicwoo.com </a>
              </span>
              <span className="span2">Phone:+922074950308</span>
              {/* </Typography>
              <Typography variant="h5" color="inherit" align="right"> */}
              <span className="span">Delivery: Free Home Delivery</span>
              <span className="span2">Cash:Cash on Delivery57px57px</span>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

InfoHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoHeader);
