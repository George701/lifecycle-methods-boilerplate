import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";


const showToast = (text, isError= false, duration = 3000) => {
  Toastify({
    text: text,
    duration: duration,
    gravity: "bottom",
    position: "right",
    stopOnFocus: false,
    offset: {
      x: 20,
    },
    style: {
      background: "#fff",
      color: isError ? "red" : "#000",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      borderRadius: "4px",
    },
  }).showToast();
};

export default showToast;