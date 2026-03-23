import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {

  // Destructure the details passed from the Getproducts components
  // The useLocation hook allows us to get/destructure the properties passed from the previous component
  const {product} = useLocation().state || {}

  // Declare the navigate hook
  const navigate = useNavigate()

  // console.log("The details passed from getProducts are: ", product)

  // Below we specify the image base url
  const img_url = "https://frostyghost23.alwaysdata.net/static/images/"

  // Initialize hooks to manage the state of your application
  const [number, setNumber] = useState("")

  // Create a function that will handle the submit action
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Create a function that will handle the submit action
  const hanldesubmit = async (e) =>{
    // prevent the site from reloading
    e.preventDefault()

    // Update the loading hook
    setLoading(true)

    try{
      // Create form data object
      const formdata = new FormData()

      // append the data to the form data
      formdata.append("phone", number)
      formdata.append("amount", product.product_cost)

      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata)

      // set loading back to default
      setLoading(false)

      // update the sucess hook with a message
      setSuccess(response.data.message)
    }
    catch(error){
      // If there is an error respond to the error
      setLoading(false)

      // 
      setError(error.message)
    }
  }

  return (
    <div 
      className='container-fluid d-flex justify-content-center align-items-center'
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      }}
    >
      
      <div className="col-md-8">

        {/* Back Button */}
        <button 
          className="btn mb-3"
          style={{
            background: "transparent",
            border: "1px solid #00f2ff",
            color: "#00f2ff",
            boxShadow: "0 0 10px #00f2ff"
          }}
          onClick={() => navigate("/products")}>
          ← Back
        </button>

        <div 
          className="card border-0 p-3"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)"
          }}
        >

          {/* Product Image */}
          <img 
            src={img_url + product.product_photo} 
            alt="Product Name" 
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0 0 15px rgba(0,255,255,0.3)"
            }}
          />

          <div className="card-body text-light">

            <h3 style={{ color: "#00f2ff" }}>
              {product.product_name}
            </h3>

            <p style={{ color: "#ccc" }}>
              {product.product_description}
            </p>

            <h4 style={{ color: "#00ff9f" }}>
              KES {product.product_cost}
            </h4>

            <hr style={{ borderColor: "#00f2ff" }} />

            <h5 className="text-center" style={{ color: "#00f2ff" }}>
              💳 Lipa Na M-PESA
            </h5>

            <form onSubmit={hanldesubmit}>

              {/* Bind the loading hook */}
              {loading && <Loader />}

              <p className="text-success text-center"> {success} </p>

              <p className="text-danger text-center"> {error} </p>

              <input 
                type="number"
                className='form-control mb-3'
                placeholder='Enter Phone Number 254XXXXXXXX'
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                style={{
                  background: "transparent",
                  border: "1px solid #00f2ff",
                  color: "#fff",
                  boxShadow: "0 0 10px rgba(0,255,255,0.2)"
                }}
              />

              {/* {number} */}

              <div className="d-grid">
                <input 
                  type="submit"
                  value="Make Payment"
                  className='btn'
                  style={{
                    background: "linear-gradient(45deg, #00f2ff, #00ff9f)",
                    border: "none",
                    color: "#000",
                    fontWeight: "bold",
                    boxShadow: "0 0 15px #00f2ff",
                    transition: "0.3s"
                  }}
                />
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Makepayment;