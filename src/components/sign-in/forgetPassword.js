import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { baseUrl, emailPattern } from "../../shared";
import { toast } from "react-toastify";

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isLoading: false
    };
  }
  onChangeHandler = evt => this.setState({ email: evt.target.value });
  sendResetLink = () => {
    if (emailPattern.test(this.state.email)) {
      this.setState({ isLoading: true });
      fetch(baseUrl + "passwordReset/sendLink", {
        method: "POST",
        body: JSON.stringify({ email: this.state.email }),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => {
          this.setState({ isLoading: false });
          if (res.ok) {
            return res.json();
          }
          const err = new Error(res.statusText + " : " + res.status);
          throw err;
        })
        .then(res => {
          this.props.closeForgetModal();
          toast.success("Reset link sent to your Account");
        })
        .catch(err => {
          this.setState({ isLoading: false });
          toast.error(err.message);
        });
    }
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <h2 className="Title">Forget Password</h2>
          <DialogContent>
            <span>Enter username</span>
            <TextField
              value={this.state.email}
              onChange={this.onChangeHandler}
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              placeholder="Enter Email "
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={this.state.isLoading}
              onClick={this.props.closeForgetModal}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.sendResetLink}
              disabled={this.state.isLoading}
              color="primary"
            >
              Send Password
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ForgetPassword;
