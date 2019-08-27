import React from "react";
import { baseUrl } from "../../shared";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import Axios from "axios";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      checkingLink: true,
      isError: false,
      password: "",
      changingPassword: false
    };
  }
  passwordChangeHandler = evt => this.setState({ password: evt.target.value });
  resetHandler = () => {
    if (this.state.password.length <= 4) {
      toast.error("Password shoud be greater than 4 characters");
      return;
    }
    this.setState({ changingPassword: true });
    Axios.post(baseUrl + "passwordReset/setPassword", {
      token: this.state.token,
      password: this.state.password
    })
      .then(res => {
        if (res.status === 200) {
          toast.success("Password Successfully changed");
          this.props.history.push("/");
          return;
        }
        const err = new Error(res.statusText + " : " + res.status);
        throw err;
      })
      .catch(err => {
        this.setState({ changingPassword: false });
        toast.error(err.message);
      });
  };
  componentDidMount() {
    Axios.get(
      baseUrl + "passwordReset/checkToken/" + this.props.match.params.token
    )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            checkingLink: false,
            token: this.props.match.params.token
          });
          return;
        }
        const err = new Error(res.statusText + " : " + res.status);
        throw err;
      })
      .catch(err => {
        this.setState({ checkingLink: false, isError: true });
        toast.error(err.message);
      });
  }
  render() {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.state.checkingLink ? (
          <h2>Loading...</h2>
        ) : this.state.isError ? (
          <h3>Link is Not valid</h3>
        ) : (
          <div>
            <div>
              <TextField
                autoFocus
                onChange={this.passwordChangeHandler}
                margin="dense"
                label="password"
                type="password"
                fullWidth
                value={this.state.password}
                placeholder="Enter password"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px"
                }}
              >
                <Button
                  loading={this.state.changingPassword}
                  variant="raised"
                  color="primary"
                  onClick={this.resetHandler}
                >
                  Save Password
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ResetPassword;
