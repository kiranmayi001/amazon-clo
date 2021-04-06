import classes from "./ProductListing.module.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalf,
  faAngleDown,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductListing() {
  const productId = useParams();
  console.log(productId.id);

  const [prodId, setProId] = useState(productId.id);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get(`https://5ff9e67117386d0017b52317.mockapi.io/products/${prodId}`)
      .then((response) => {
        setProducts(response.data.products);
        setBrands(response.data.brand);
        console.log(response.data.products)
      })
      .catch((err) => {
        console.log("Error in fetchng Produt Lsit");
      });
  }, [prodId]);

  return (
    <div className={classes.ProductListing_Section}>
      <div className={classes.ProductListing_Flex_Div}>
        <div className={classes.ProductListing_Left}>
          {/* Brands */}
          <p className={classes.Filter_Heading}>Brands</p>
          {
             brands && brands.map(item=>{
              return ( <div key={item}>
                <input type="checkbox" />
                <span>
                  <label>{item}</label>
                </span>
                </div>)
             })
          }
         
          {/* price Min Max */}
          <p className={classes.Filter_Heading}>Price</p>
          <div className={classes.MinMax_Div}>
            <input type="text" placeholder="Min" className={classes.Min} />
            <input type="text" placeholder="Max" className={classes.Min} />
          </div>
          <button className={classes.Price_Btn}>Go</button>
          {/* slider Bar */}
          <p className={classes.Filter_Heading}>Price Range</p>
          <input type="range" />
          {/* Low to High High to low */}
          <div className={classes.Sort}>
            <p className={classes.Filter_Heading}>Sort Price</p>
            <div className={classes.Sort_Div}>
              <button className={classes.High_Low}>High to Low</button>
              <button className={classes.High_Low}>Low to High</button>
            </div>
          </div>
        </div>
        <div className={classes.ProductListing_Right}>
          <section className={classes.Card_Listing}>
            {
              products && products.map(item=>{
                 return ( <div className={classes.Card} key={item.id+item.product}>
                  <img
                    className={classes.Image}
                    src={item.productUrl}
                    alt="product Image"
                  />
                  <p className={classes.Title}>
                   {item.product}
                  </p>
                  <div className={classes.Review_Div}>
                    <div className={classes.Star_Div}>
                      <FontAwesomeIcon icon={faStar} className={classes.Star} />
                      <FontAwesomeIcon icon={faStar} className={classes.Star} />
                      <FontAwesomeIcon icon={faStar} className={classes.Star} />
                      <FontAwesomeIcon icon={faStar} className={classes.Star} />
                      <FontAwesomeIcon icon={faStarHalf} className={classes.Star} />
                    </div>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={classes.Angle_Down}
                    />
                    <p className={classes.Review}>{item.noOfReviews}</p>
                  </div>
    
                  {/* Price SEction */}
                  <div className={classes.Price_Section}>
                    <FontAwesomeIcon
                      icon={faRupeeSign}
                      className={classes.RupeeSign}
                    />
                    <p className={classes.Price}>{item.price}</p>
                    <img
                      className={classes.Amz_Logo}
                      src="https://www.verticalrail.com/wp-content/uploads/2016/05/FBA-logo.png"
                    />
                  </div>
                  <div>
                    <p className={classes.Delivery_date}>
                      Get Delivered By {item.fullfillmentCenter}
                      <span className={classes.Date}> {item.estimatedDeliveryDate}</span>
                    </p>
                  </div>
                </div>)
              })
            }
           
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
