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
    <div className='row justify-content-center'>
      {/* <button className='btn btn-outline-primary'> Back to Product </button> */}

      <h1>Make Payment - Lipa Na M-PESA</h1>

        <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value=" <- Back" 
            onClick={() => navigate("/") }/>
        </div>

      <div className="col-md-8 card shadow p-4">
        <img src={img_url + product.product_photo} alt="Product Name" className='product_img' />

        <div className="card-body">
          <h1 className="text-info"> {product.product_name} </h1>

          <p className="text-dark"> {product.product_description} </p>

          <b className="text-warning">KES {product.product_cost} </b> <br />

          <form onSubmit={hanldesubmit}>

            {/* Bind the loading hook */}
            {loading && <Loader />}

            <h3 className="text-success"> {success} </h3>

             <h4 className="text-danger"> {error} </h4>
            <input type="number"
            className='form-control'
            placeholder='Enter the Phone Number 254XXXXXXXX'
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)} /> <br />

            {/* {number} */}

            <input type="submit"
            value="Make Payment"
            className='btn btn-success' />

          </form>
        </div>
      </div>
    </div>
  )
}

export default Makepayment;
