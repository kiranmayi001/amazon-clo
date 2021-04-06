import React, { useEffect, useState } from "react";
import classes from "./LandingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { SliderData } from "../../sliderdata";
import axios from "axios";
import { Link } from "react-router-dom";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [sliderId, setsliderId] = useState(0);
  // const getProducts = () =>{

  // }

  const prevSliderImage=()=>{
      sliderId==0 ? setsliderId(SliderData.length-1) : setsliderId(sliderId-1)
  }

  const nextSilderImage = ()=>{
       sliderId ==SliderData.length-1 ? setsliderId(0) : setsliderId(sliderId+1)
  }

  useEffect(() => {
    axios
      .get("https://60375ca8543504001772228a.mockapi.io/landingpage-amazon")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log("err");
      });
  }, []);

  return (
    <div className={classes.LandinPageConatiner}>
      <div className={classes.caraouselContainer}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={classes.Angle_Left}
          onClick={() => prevSliderImage()}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          className={classes.Angle_Right}
          onClick={() => nextSilderImage()}
        />
        <div className={classes.SlideWrapper}>
        {SliderData &&
          SliderData.map((item, index) => {
            return (
              <div
                key={item.image + index}
                className={
                  index == sliderId
                    ? classes.activeSliderImage
                    : classes.SliderImage
                }
              >
                {index == sliderId && (
                  <img
                    src={item.image}
                    className={classes.bannerImage}
                    alt="Slider"
                  />
                )}
              </div>
            );
          })}
      </div>
      </div>

      <div className={classes.ProductDivisionContainer}>
        <div className={classes.ProductLeftSection}>
          <div className={classes.CardDiv}>
            {products &&
              products.map((item) => {
                return (
                  <Link
                    to={`/productlisting/${item.id}`}
                    className={classes.Card}
                  >
                    <h3 className={classes.Heading_Specific}>Top Picks</h3>
                    <img
                      className={classes.LandingImage}
                      src={item.productImage}
                      alt="LandingImage"
                    />
                    <p className={classes.LandingPara}>{item.title}</p>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className={classes.ProductRightSection}>
          {/* <div className={classes.changeImage}   >
                            <img className={classes.addImage} src={this.state.addImage} alt="add" />
                        </div> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
