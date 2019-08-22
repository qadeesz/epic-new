import { get_all } from "../actions/product";
import history from "../../history/history";
import { toast } from "react-toastify";
import { baseUrl } from "../../shared";

const Product = {
  SaveProduct: data => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("file", data.img);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("type", data.type);
    formData.append("price", data.price);

    fetch(baseUrl + "products/new", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: formData
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        const err = new Error(resp.statusText + " : " + resp.status);
        throw err;
      })
      .then(res => {
        toast.success("Product Added");
      })
      .catch(err => {
        toast.error(err.message);
      });
  },
  GetAll: data => dispatch => {
    dispatch(get_all(data));
  }
};

export default Product;
