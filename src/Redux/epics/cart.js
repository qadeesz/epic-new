import { baseUrl } from "../../shared";
import { toast } from "react-toastify";

export const sendOrder = (cart, cb) => {
  const token = localStorage.getItem("token");
  const authorization = "Bearer " + token;
  fetch(baseUrl + "orderConfirmation", {
    method: "POST",
    body: JSON.stringify(cart),
    headers: {
      "content-type": "application/json",
      Authorization: authorization
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      const err = new Error(res.status + " : " + res.statusText);
      throw err;
    })
    .then(res => {
      cb();
      toast.success(res.message);
    })
    .catch(err => toast.error(err.message));
};
