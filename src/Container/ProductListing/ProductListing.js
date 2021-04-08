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
  const [storeData, setStoreData] = useState([])
  const [brands, setBrands] = useState([]);
  const [multipleCheckData, setMultipleCheckData] = useState([])
  const [arr, setArr] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [slidervalue, setSliderValue] = useState(0)

  useEffect(() => {
    axios
      .get(`https://5ff9e67117386d0017b52317.mockapi.io/products/${prodId}`)
      .then((response) => {
        setProducts(response.data.products);
        setBrands(response.data.brand);
        setStoreData(response.data.products)
        console.log(response.data.products)
      })
      .catch((err) => {
        console.log("Error in fetchng Produt Lsit");
      });
  }, [prodId]);

  let checkedBrands = {

  }
  const HandleCheckedBrands = (e) => {
    console.log(e.target.name)
    console.log(e.target.checked)
    checkedBrands[e.target.name] = e.target.checked
    console.log(checkedBrands)


    if (checkedBrands[e.target.name]) {
      let mulcheckedData = storeData.filter(item => {
        return item.brands === e.target.name
      })
      // arr.push(mulcheckedData)
      arr.push(...mulcheckedData)
      console.log(...arr)
      // setArr(arr)
      setProducts([...arr])
    }
    else {
      let mulcheckedDatas = storeData.filter(item => {
        return item.brands !== e.target.name
      })
      setProducts(mulcheckedDatas)
    }


  }


  const HandleMinPrice = (e) => {
    console.log("minPrice", e.target.value)
    setMinPrice(e.target.value)
  }

  const HandleMaxPrice = (e) => {
    console.log("maxPRice", e.target.value)
    setMaxPrice(e.target.value)
  }


  const HandleFindProductsInRange = () => {
    console.log(minPrice, maxPrice)
    if (minPrice !== "" && maxPrice !== "") {

      let FilteredData = storeData.filter(item => {
        return (+item.price >= minPrice && +item.price <= maxPrice)
      })
      console.log(FilteredData)
      setProducts(FilteredData)
    } else {
      setProducts(storeData)
      console.log(products)
    }
  }

  const HandlePriceBar = (e) => {
    console.log(e.target.value)
    setSliderValue(e.target.value)
    if (e.target.value != 0) {

      let sliderFiltData = storeData.filter(item => {
        return +item.price <= e.target.value
      })
      setProducts(sliderFiltData)
    } else {
      setProducts(storeData)
    }
  }


  const HandleHighToLowSort = () => {
    alert("Sort High to Low")
    for (let i = 0; i <= storeData.length - 1; i++) {
      for (let j = 0; j <= storeData.length - 1; j++) {
        if (parseInt(storeData[i].price) >= parseInt(storeData[j].price)) {
          let temp = storeData[i]
          storeData[i] = storeData[j]
          storeData[j] = temp
        }
      }
    }
    console.log(storeData)
    setProducts([...storeData])

  }


  const HandleLowToHighSort = () => {
    alert("Sort Low to High")
    for (let i = 0; i <= storeData.length - 1; i++) {
      for (let j = 0; j <= storeData.length - 1; j++) {
        if (parseInt(storeData[i].price) <= parseInt(storeData[j].price)) {
          let temp = storeData[i]
          storeData[i] = storeData[j]
          storeData[j] = temp
        }
      }
    }
    console.log(storeData)
    setProducts([...storeData])
  }




  return (
    <div className={classes.ProductListing_Section}>
      <div className={classes.ProductListing_Flex_Div}>
        <div className={classes.ProductListing_Left}>
          {/* Brands */}
          <p className={classes.Filter_Heading}>Brands</p>
          {
            brands && brands.map(item => {
              return (<div key={item}>
                <input type="checkbox" name={item} onChange={(e) => HandleCheckedBrands(e)} />
                <span>
                  <label>{item}</label>
                </span>
              </div>)
            })
          }

          {/* price Min Max */}
          <p className={classes.Filter_Heading}>Price</p>
          <div className={classes.MinMax_Div}>
            <input type="text" placeholder="Min" className={classes.Min} onInput={(e) => HandleMinPrice(e)} />
            <input type="text" placeholder="Max" className={classes.Min} onInput={(e) => HandleMaxPrice(e)} />
          </div>
          <button className={classes.Price_Btn} onClick={HandleFindProductsInRange}>Go</button>
          {/* slider Bar */}
          <p className={classes.Filter_Heading}>Price Range</p>
          <input type="range" value={slidervalue} min="0" max="5000" onInput={HandlePriceBar} />
          {/* Low to High High to low */}
          <div className={classes.Sort}>
            <p className={classes.Filter_Heading}>Sort Price</p>
            <div className={classes.Sort_Div}>
              <button className={classes.High_Low} onClick={HandleHighToLowSort}>High to Low</button>
              <button className={classes.High_Low} onClick={HandleLowToHighSort}>Low to High</button>
            </div>
          </div>
        </div>
        <div className={classes.ProductListing_Right}>
          <section className={classes.Card_Listing}>
            {
              products && products.map(item => {
                return (<div className={classes.Card} key={item.id + item.product}>
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
                    <p>{item.brands}</p>
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
