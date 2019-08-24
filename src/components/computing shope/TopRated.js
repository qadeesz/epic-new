import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import QuickOrder from "../cat-cards/quick-order";
import "../css/computing_shop.css";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/actions/cart";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import { deleteProduct } from "../CatCard/deleteProductEpic";
import { baseUrl } from "../../shared";
const imageStyle = {
  width: "90%",
  overFlow: "auto"
};
const card = {
  maxWidth: 345,
  backgroundColor: "#fff5f5",
  padding: "2px",
  borderRadius: "10px"
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});
class TopRated extends React.Component {
  addItemToCart = item => () => {
    let itemClone = JSON.parse(JSON.stringify(item));
    this.props.dispatch(dis => dis(addToCart(itemClone)));
  };
  render() {
    const { classes } = this.props;
    const filterProducts = this.props.products.payload
      ? this.props.products.payload.filter(prod => {
          let sum = 0;
          for (let i = 0; i < prod.rating.length; i++) {
            sum = sum + prod.rating[i];
          }
          return sum / prod.rating.length >= 4;
        })
      : [];
    if (filterProducts.length === 0) {
      return <Empty />;
    }
    return (
      <div
        className={classes.root}
        style={{
          padding: "80px",
          paddingLeft: "120px"
        }}
      >
        <React.Fragment>
          <Grid container spacing={8}>
            <Grid container item xs={12} spacing={24}>
              {filterProducts.map(item => {
                return (
                  <div className="cards">
                    <Card className={"catCardManager"} style={card}>
                      <CardActionArea onClick={this.Click}>
                        <Link to={"/productDetail/" + item._id}>
                          <img style={imageStyle} src={baseUrl + item.imgSrc} />
                        </Link>
                      </CardActionArea>
                      <div className="effects">
                        <span>
                          <QuickOrder />
                        </span>
                        {this.props.Authentication.user && (
                          <span
                            onClick={this.addItemToCart(item)}
                            className="add"
                          >
                            {" "}
                            Add to Cart
                          </span>
                        )}
                        {this.props.Authentication.user &&
                          this.props.Authentication.user.role === "admin" && (
                            <span
                              onClick={() =>
                                this.props.dispatch(deleteProduct(item._id))
                              }
                              className="add"
                            >
                              {" "}
                              Delete Product
                            </span>
                          )}
                      </div>
                      <div>
                        <div
                          style={{
                            marginTop: "5px",
                            marginLeft: "15px",
                            textAlign: "left"
                          }}
                        >
                          <b>{item.title}</b>
                        </div>
                        <div
                          style={{
                            maxHeight: "40px",
                            height: 40,
                            textAlign: "center"
                          }}
                        >
                          <small
                            style={{
                              marginLeft: "15px",
                              textAlign: "center"
                            }}
                          >
                            {item.desc}
                          </small>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            position: "relative",
                            bottom: 0
                          }}
                        >
                          <span className="price_tag">Price:${item.price}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}
TopRated.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = store => ({
  Authentication: store.Authentication,
  products: store.ProductReducer,
  val: store.filterProductReducer
});

export default connect(mapStateToProps)(withStyles(styles)(TopRated));
