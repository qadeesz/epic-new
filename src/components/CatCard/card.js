import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import QuickOrder from "../cat-cards/quick-order";
import "../css/computing_shop.css";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/actions/cart";
// import ProductActionCreator from "../../Redux/epics/product";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import { deleteProduct } from "./deleteProductEpic";
import { baseUrl } from "../../shared";
const imageStyle = {
  width: "90%",
  height: "260px",
  marginLeft: "1px"
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
class CardContainer extends React.Component {
  constructor() {
    super();
  }

  // componentDidMount() {
  //   fetch(baseUrl + "products/get_all_products")
  //     .then(resp => {
  //       return resp.json();
  //     })
  //     .then(res => {
  //       this.props.dispatch(ProductActionCreator.GetAll(res));
  //     });
  // }

  addItemToCart = item => () => {
    let itemClone = JSON.parse(JSON.stringify(item));
    this.props.dispatch(dis => dis(addToCart(itemClone)));
  };
  render() {
    let items = false;
    const { classes } = this.props;
    const filterProducts = this.props.products.payload
      ? this.props.products.payload.filter(el => {
          return el.title.toLowerCase().includes(this.props.val.val);
        })
      : [];
    return (
      <div
        className={classes.root}
        style={{ padding: "80px", paddingLeft: "120px", minHeight: "365px" }}
      >
        <React.Fragment>
          <Grid container spacing={8}>
            <Grid container item xs={12} spacing={24}>
              {filterProducts.map(item => {
                if (
                  item.category.toLowerCase() == this.props.cat.toLowerCase() ||
                  (this.props.cat.toLowerCase() == "best_selling" &&
                    item.sales > 5)
                ) {
                  items = true;
                  return (
                    <div className="cards">
                      <Card className={"catCardManager"} style={card}>
                        <CardActionArea onClick={this.Click}>
                          <Link to={"/productDetail/" + item._id}>
                            <img
                              style={imageStyle}
                              // className="image-list"
                              src={baseUrl + item.imgSrc}
                            />
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
                              // textJustify:'center'
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
                              // marginTop
                            }}
                          >
                            <span className="price_tag">
                              Price:${item.price}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                }
              })}
            </Grid>
          </Grid>
        </React.Fragment>
        {items ? null : <Empty />}
      </div>
    );
  }
}
CardContainer.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = store => ({
  Authentication: store.Authentication,
  products: store.ProductReducer,
  val: store.filterProductReducer
});

export default connect(mapStateToProps)(withStyles(styles)(CardContainer));
