import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


const FilterPrice = props => {
  return (
    <div>
      <h2>Filter By Price</h2>
      <FormGroup style={{ marginLeft: "50px" }}>
        <FormControlLabel
          control={
            <Switch
              checked={"1" === props.selectedFilter}
              onChange={props.filterChange}
              value="1"
            />
          }
          label="100 to 1000"
        />
        <FormControlLabel
          control={
            <Switch
              checked={"2" === props.selectedFilter}
              onChange={props.filterChange}
              value="2"
            />
          }
          label="1000 to 10000"
        />
        <FormControlLabel
          control={
            <Switch
              checked={"3" === props.selectedFilter}
              onChange={props.filterChange}
              value="3"
            />
          }
          label="10000 to 100000"
        />
      </FormGroup>
      <hr style={{ width: "80%" }} />
    </div>
  );
};

export default FilterPrice;
