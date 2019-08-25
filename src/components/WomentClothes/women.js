import React, { Component } from "react";
import "../css//women.css";
import posed, { PoseGroup } from "react-pose";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import Button from '@material-ui/core/Button';
import CardActionArea from "@material-ui/core/CardActionArea";
import Slider from "./womenSlider";
import NaveBar from "./navebara";
import path from "path";
import { baseUrl } from "../../shared";
import { Link } from "react-router-dom";

class WomenCart extends Component {
  filterProducts = () => {
    if (this.props.selectedFilter === "1") {
      return this.props.products.filter((prod, index) => {
        return (
          prod.price <= 1000 &&
          prod.category.toLowerCase() === this.props.cat.toLowerCase() &&
          index < 8
        );
      });
    } else if (this.props.selectedFilter === "2") {
      return this.props.products.filter((prod, index) => {
        return (
          prod.price > 1000 &&
          prod.category.toLowerCase() == this.props.cat.toLowerCase() &&
          prod.price <= 10000 &&
          index < 8
        );
      });
    } else if (this.props.selectedFilter === "3") {
      return this.props.products.filter((prod, index) => {
        return (
          prod.price > 10000 &&
          prod.category.toLowerCase() === this.props.cat.toLowerCase() &&
          prod.price <= 100000 &&
          index < 8
        );
      });
    } else {
      return this.props.products.filter((prod, index) => {
        return (
          prod.category.toLowerCase() === this.props.cat.toLowerCase() &&
          index < 8
        );
      });
    }
  };
  render() {
    let i = 0;
    return (
      <div className="images">
        {this.filterProducts().map(item => {
          return (
            <Card className="cardBox">
              <div>
                <Link to={"/productDetail/" + item._id}>
                  <img
                    className="imageItem"
                    style={{ width: "100%" }}
                    src={baseUrl + item.imgSrc}
                  />
                </Link>
                <div className="WedDress">{item.title}</div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default WomenCart;
