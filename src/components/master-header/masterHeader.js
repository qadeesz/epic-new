import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Exit from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import MoreIcon from "@material-ui/icons/MoreVert";
import SignIn from "../sign-in/sign_in";
import SignUp from "../sign-up/sign-up";
import { Link } from "react-router-dom";
import ShowEmpty from "./cart-snacker";
import { connect } from "react-redux";
import Search from "../../Redux/epics/search";
import { logOut } from "../../Redux/actions/authentication";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class MasterHeader extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    val: ""
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  changeHandler = e => {
    this.setState({ val: e.target.value });
    this.props.dispatch(Search.storeVal(e.target.value));
  };

  // handleMobileMenuOpen = event => {
  //     this.setState({ mobileMoreAnchorEl: event.currentTarget });
  // };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    console.log(this.props);
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <SignUp />
        <SignIn />
      </Menu>
    );

    // const renderMobileMenu = (
    //     <Menu
    //         anchorEl={mobileMoreAnchorEl}
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         open={isMobileMenuOpen}
    //         onClose={this.handleMenuClose}
    //     >
    //         <MenuItem onClick={this.handleMobileMenuClose}>
    //             <IconButton color="inherit">
    //                 <Badge badgeContent={4} color="secondary">
    //                     <MailIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Messages</p>
    //         </MenuItem>
    //         <MenuItem onClick={this.handleMobileMenuClose}>
    //             <IconButton color="inherit">
    //                 <Badge badgeContent={11} color="secondary">
    //                     <NotificationsIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Notifications</p>
    //         </MenuItem>
    //         <MenuItem onClick={this.handleProfileMenuOpen}>
    //             <IconButton color="inherit">
    //                 <AccountCircle />
    //             </IconButton>
    //             <p>Profile</p>
    //         </MenuItem>
    //     </Menu>
    // );

    return (
      <div className={classes.root} className="masterHeader-head">
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton> */}
            <Link to="/">
              <img
                src="https://epicwoo.com/demo/wp-content/uploads/2018/05/logo-small.png"
                width="150px"
                height="auto"
              />
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={this.changeHandler}
                value={this.state.val}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {this.props.Authentication.user &&
                this.props.Authentication.user.role === "admin" && (
                  <Link className="masterHeader-mailLink" to="/inbox">
                    <IconButton color="inherit">
                      <MailIcon />
                    </IconButton>
                  </Link>
                )}
              {this.props.Authentication.user ? (
                <React.Fragment>
                  <IconButton color="inherit">
                    <Badge
                      badgeContent={this.props.Cart.cart.length}
                      color="secondary"
                    >
                      <ShowEmpty />
                    </Badge>
                  </IconButton>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                  >
                    Hello{" "}
                    {this.props.Authentication.user.username.toUpperCase()}
                    <IconButton
                      onClick={() => this.props.dispatch(dis => dis(logOut()))}
                      color="inherit"
                    >
                      <Exit />
                    </IconButton>
                  </div>
                </React.Fragment>
              ) : (
                  <IconButton
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {/* {renderMobileMenu} */}
      </div>
    );
  }
}

MasterHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  Authentication: store.Authentication,
  Cart: store.Cart
});

export default connect(mapStateToProps)(withStyles(styles)(MasterHeader));
