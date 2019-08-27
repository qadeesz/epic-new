import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "../css/computing_shop.css";
import Latest from "./latest";
import BestSellers from "./best_sellers";
import TopRated from "./TopRated";
// import src from '*.png';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class ComputingShop extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, products } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="LATESET" />
          <Tab label="BEST SELLERS" />
          <Tab label="TOP RATED" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            <Latest  perc={this.props.perc} products={products ? products : []} />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer class="some">
            <BestSellers perc={this.props.perc} products={products ? products : []} />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <TopRated />
          </TabContainer>
        )}
      </div>
    );
  }
}

ComputingShop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComputingShop);
