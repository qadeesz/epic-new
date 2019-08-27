import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { removeFromCart, updateQuantity } from "../../Redux/actions/cart";
import { baseUrl } from "../../shared";
import Rating from "react-rating";
import { addRating } from "../../Redux/actions/cart";
const styles = theme => ({
  root: {
    width: 400,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

class CartItems extends React.Component {
  quantityChangeHandler = item => evt => {
    this.props.dispatch(updateQuantity(item, parseInt(evt.target.value)));
  };
  ratingHandler = item => rating => {
    this.props.dispatch(dis => dis(addRating({ _id: item._id, rating })));
  };
  removeItem = item => () =>
    this.props.dispatch(dis => dis(removeFromCart(item)));
  render() {
    const { classes } = this.props;
    console.log("test", this.props.Cart.cart);
    return (
      <List className={classes.root}>
        {this.props.Cart.cart.map(item => (
          <ListItem key={item.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={item.name} src={baseUrl + item.imgSrc} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <div>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                  <span>
                    Item Price: {item.price} -- Quantity:{" "}
                    <input
                      onChange={this.quantityChangeHandler(item)}
                      type="number"
                      value={item.quantity}
                      min="1"
                      max="100"
                    />
                  </span>
                  <div>
                    <Rating
                      onClick={this.ratingHandler(item)}
                      initialRating={item.rating}
                      emptySymbol={
                        <img
                          style={{ width: "20px" }}
                          src={require("../../assets/star-empty.png")}
                          className="icon"
                        />
                      }
                      fullSymbol={
                        <img
                          style={{ width: "20px" }}
                          src={require("../../assets/star-full.png")}
                          className="icon"
                        />
                      }
                    />
                  </div>
                </div>
              }
            />
            <ListItemSecondaryAction>
              <IconButton onClick={this.removeItem(item)} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

CartItems.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  Cart: store.Cart
});

export default connect(mapStateToProps)(withStyles(styles)(CartItems));
