import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../css/masterHeader.css";
import { loginEpic } from "../../Redux/epics/authentication";
import { connect } from "react-redux";
import ForgetPassword from "./forgetPassword";
class SignIn extends React.Component {
  state = {
    open: false,
    username: "",
    password: "",
    isForgetModalOpen: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    this.props.dispatch(loginEpic({ username, password }));
    this.handleClose();
  };

  onChangeHandler = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  closeForgetModal = () => this.setState({ isForgetModalOpen: false });

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Login</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <h2 className="Title">Login Here</h2>
          <DialogContent>
            <b>Enter username</b>
            <TextField
              onChange={this.onChangeHandler}
              name="username"
              autoFocus
              margin="dense"
              id="username"
              label="username"
              type="text"
              fullWidth
              placeholder="Enter username"
            />
            <br />
            <br />
            <b className="pass">Enter password</b>
            <TextField
              autoFocus
              onChange={this.onChangeHandler}
              margin="dense"
              name="password"
              id="password"
              label="password"
              type="password"
              fullWidth
              placeholder="Enter password"
            />
            <a
              onClick={() => this.setState({ isForgetModalOpen: true })}
              style={{ fontSize: "10px" }}
              href="JavaScript:Void(0);"
            >
              Forget Password
            </a>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
        <ForgetPassword
          closeForgetModal={this.closeForgetModal}
          isOpen={this.state.isForgetModalOpen}
        />
      </div>
    );
  }
}
export default connect()(SignIn);
