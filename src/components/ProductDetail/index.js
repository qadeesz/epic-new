import React from "react";
import ImageMagnifier from "react-image-magnify";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/actions/cart";
import { baseUrl } from "../../shared";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./styles.css";

const styles = {
  card: {
    backgroundColor: "#eae3e3",
    width: "400px",
    height: "130px"
  },
  card1: {
    backgroundColor: "#eae3e3",
    marginTop: "20px",
    width: "400px",
    height: "180px"
  },
  root: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 120
  }
};

class ProductDetail extends React.Component {
  state = {
    item: null,
    selectedColor: "red",
    size: "md"
  };

  componentDidMount() {
    this.props.products.payload &&
      this.setState({
        item: this.props.products.payload.find(
          item => item._id === this.props.computedMatch.params.id
        )
      });
  }
  colorStyle = {
    marginLeft: "10px",
    height: "80px",
    width: "70px",
    backgroundColor: "red",
    cursor: "pointer"
  };
  sizeChangeHandler = event => this.setState({ size: event.target.value });
  addItemToCart = item => () => {
    this.props.dispatch(dis => dis(addToCart(item)));
  };
  colorSelectHandler = evt => this.setState({ selectedColor: evt.target.id });
  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          marginTop: "50px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "50px"
        }}
      >
        {this.state.item && (
          <div style={{ display: "flex" }}>
            <ImageMagnifier
              isHintEnabled={true}
              {...{
                smallImage: {
                  alt: this.state.item.title,
                  width: 400,
                  height: 450,
                  src: baseUrl + this.state.item.imgSrc
                },
                largeImage: {
                  width: 800,
                  height: 800,
                  src: baseUrl + this.state.item.imgSrc
                }
              }}
            />
            <div style={{ marginLeft: "20px" }} className="card_div">
              <h1 className="desc_div_1">{this.state.item.title}</h1>
              {/* ............................................ */}
              <Card raised className={classes.card}>
                <CardContent>
                  <Typography variant="h4" style={{ color: "#EB4541" }}>
                    Rs {this.state.item.price}
                  </Typography>
                  <ul>
                    <li className="about_product">+ Cash On Delivery</li>
                    <li className="about_product">+ 3 Days Return Policy</li>
                    <li className="about_product">
                      + Flat Rate (All over Pakistan) Rs:150
                    </li>
                  </ul>
                </CardContent>
              </Card>
              {/* ......................................... */}
              <Card raised className={classes.card1}>
                <CardContent>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        marginRight: "2px",
                        width: "20px",
                        height: "20px",
                        backgroundColor: this.state.selectedColor
                      }}
                    />
                    Color
                    <div
                      id="red"
                      onClick={this.colorSelectHandler}
                      onMouseOver={evt =>
                        (evt.target.style.border = "2px solid yellow")
                      }
                      onMouseOut={evt => (evt.target.style.border = "none")}
                      title="Red"
                      role="button"
                      style={{ ...this.colorStyle, backgroundColor: "red" }}
                    />{" "}
                    <div
                      onMouseOver={evt =>
                        (evt.target.style.border = "2px solid yellow")
                      }
                      onMouseOut={evt => (evt.target.style.border = "none")}
                      role="button"
                      title="Green"
                      id="green"
                      onClick={this.colorSelectHandler}
                      style={{ ...this.colorStyle, backgroundColor: "green" }}
                    />
                    <div
                      onMouseOver={evt =>
                        (evt.target.style.border = "2px solid yellow")
                      }
                      onMouseOut={evt => (evt.target.style.border = "none")}
                      role="button"
                      title="Grey"
                      id="grey"
                      onClick={this.colorSelectHandler}
                      style={{ ...this.colorStyle, backgroundColor: "grey" }}
                    />{" "}
                    <div
                      onMouseOver={evt =>
                        (evt.target.style.border = "2px solid yellow")
                      }
                      onMouseOut={evt => (evt.target.style.border = "none")}
                      role="button"
                      title="Blue"
                      id="blue"
                      onClick={this.colorSelectHandler}
                      style={{ ...this.colorStyle, backgroundColor: "blue" }}
                    />
                    <div
                      onMouseOver={evt =>
                        (evt.target.style.border = "2px solid yellow")
                      }
                      onMouseOut={evt => (evt.target.style.border = "none")}
                      role="button"
                      title="Black"
                      id="black"
                      onClick={this.colorSelectHandler}
                      style={{ ...this.colorStyle, backgroundColor: "black" }}
                    />{" "}
                    <div
                      onMouseOver={evt =>
                        (evt.target.style.border = "2px solid yellow")
                      }
                      onClick={this.colorSelectHandler}
                      onMouseOut={evt => (evt.target.style.border = "none")}
                      role="button"
                      title="White"
                      id="white"
                      style={{ ...this.colorStyle, backgroundColor: "white" }}
                    />
                  </div>
                  <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        Size
                      </InputLabel>
                      <Select
                        value={this.state.size}
                        onChange={this.sizeChangeHandler}
                        input={<Input name="size" id="age-label-placeholder" />}
                        displayEmpty
                        name="size"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="md">
                          <em>Medium</em>
                        </MenuItem>
                        <MenuItem value="sm">Small</MenuItem>
                        <MenuItem value="lg">Large</MenuItem>
                        <MenuItem value="xl">Extra Large</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                </CardContent>
              </Card>
              {/* .................................................. */}
              <div>
                {this.props.Authentication.user && (
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={this.addItemToCart(this.state.item)}
                  >
                    Add To Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ProductDetail.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = store => ({
  Authentication: store.Authentication,
  products: store.ProductReducer
});
export default withStyles(styles)(connect(mapStateToProps)(ProductDetail));
