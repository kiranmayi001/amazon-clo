import React, { useState, useEffect } from 'react'
import classes from './Details.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useParams } from 'react-router-dom'


function Details() {
    const detailsId = useParams().detailId.split('=')[0];
    const detailName = useParams().detailId.split('=')[1];

    const productId = useParams().productId;
    const [detailObj, setDetailObj] = useState({})
    const [activeprev, setActivePre] = useState([])
    const [arr, setArr] = useState([])
    const [localStore, setLocalStore] = useState([])
    const [quantity, setQuantity] = useState(1)
    console.log(useParams())
    useEffect(() => {
        axios.get(`https://5ff9e67117386d0017b52317.mockapi.io/products/${productId}`)
            .then(response => {
                console.log(response.data.products[detailsId])
                setDetailObj(response.data.products[detailsId - 1])
                setActivePre(response.data.products[detailsId - 1].activepreview)
            })
            .catch(err => {
                console.log("error in Details")
            })

    }, [])

    useEffect(() => {
        let datafromLocalStore = (localStorage.getItem('cartItems') === null) ? [] : JSON.parse(localStorage.getItem('cartItems'))

        setLocalStore([...datafromLocalStore])
        if (localStore) {
            for (let i = 0; i < localStore.length; i++) {
                if (localStore[i].id == detailObj.id + detailName) {
                    console.log(detailObj.id)
                    quantity = localStore[i].qty
                    setQuantity(quantity)
                }
            }
            // console.log([...datafromLocalStore])
        }

    }, [])


    const handleAddToCart = () => {
        alert("add to cart?")
        console.log(localStore)
        if (localStore.length === 0) {

            detailObj.id = detailObj.id + detailName;
            detailObj.qty = quantity
            detailObj.price = detailObj.price * detailObj.qty
            localStore.push(detailObj)
            setLocalStore([...localStore])
            localStorage.setItem('cartItems', JSON.stringify(localStore))
        } else {
            let isExist = false;
            if (localStore.length != 0) {

                alert("length not 0")

                for (let i = 0; i < localStore.length; i++) {
                    if (localStore[i].id == detailObj.id) {
                        alert("item already Existed")
                        let Newprice = localStore[i].price
                        isExist = true;
                        Newprice = Newprice / localStore[i].qty;
                        localStore[i].qty = quantity

                        localStore[i].price = localStore[i].qty * Newprice
                        console.log(localStore[i].qty.toString() * Newprice)
                        setLocalStore([...localStore])
                        localStorage.setItem('cartItems', JSON.stringify(localStore))
                        return;
                    }
                }
                if (isExist == false) {
                    alert("product does not exist")
                    detailObj.id = detailObj.id + detailName;
                    detailObj.qty = quantity
                    detailObj.price = detailObj.price * detailObj.qty
                    localStore.push(detailObj)
                    setLocalStore([...localStore])
                    localStorage.setItem('cartItems', JSON.stringify(localStore))

                }
            }

        }










        localStorage.setItem("cartItems", JSON.stringify(localStore))
    }



    // const handleIncrement = () => {
    //     alert("inc")
    //     setQuantity(() => quantity + 1)
    // }

    // const handleDecrement = () => {
    //     alert("Dec")
    //     setQuantity(() => quantity - 1)
    // }


    return (
        <div className={classes.Details_Section}>
            {/* Active Image Section */}
            <section className={classes.Active_Section}>
                <div className={classes.Flex_Active_Images}>
                    {
                        activeprev && activeprev.map((item, index) => {
                            return (<div key={item.id + detailsId + index} className={classes.Inactive}>
                                <img className={classes.Image} src={item} alt="Detail Img" />
                            </div>)
                        })
                    }

                </div>

            </section>

            {/* Main Image Section */}
            <section className={classes.Image_Section}>
                <div className={classes.Main_Image_div}>
                    <img className={classes.Main_Image} src={detailObj.productUrl} alt="Detail Img" />
                </div>
            </section>

            {/* Details of the the item Section */}
            <section className={classes.Item_Details_Section}>
                <h1 className={classes.Title}>{detailObj.product}</h1>
                <p className={classes.Brand}>Brand: {detailObj.brands}</p>
                {/* SEction for rating and review */}
                <section className={classes.Review_Section}>
                    <div className={classes.Start_Ratings}>
                        <FontAwesomeIcon icon={faStar} className={classes.Filled_star} />
                        <FontAwesomeIcon icon={faStar} className={classes.Filled_star} />
                        <FontAwesomeIcon icon={faStar} className={classes.Filled_star} />
                        <FontAwesomeIcon icon={faStar} className={classes.Filled_star} />
                        <FontAwesomeIcon icon={faStarHalf} className={classes.Filled_star} />

                    </div>
                    <div className={classes.No_of_Ratings}>{detailObj.noOfReviews} ratings</div>
                </section>
                {/* Price Section */}
                <div className={classes.PriceSection}>
                    <p className={classes.Mrp}>Price: <FontAwesomeIcon className={classes.Rupee_Sign} icon={faRupeeSign} /> <span className={classes.Price}>{detailObj.price}</span> </p>
                </div>
                {/* Add to Cart Section */}
                <section className={classes.Add_To_Cart_Section}>
                    <div className={classes.Qty_Section}>
                        <p className={classes.Increment} onClick={handleDecrement}>-</p>
                        <p className={classes.Qty}>{quantity}</p>
                        <p className={classes.Decrement} onClick={handleIncrement}>+</p>
                    </div>
                    <button className={classes.AddCart_Btn} onClick={handleAddToCart}>Add To Cart</button>
                </section>
                {/* Decription */}
                <section className={classes.Description_Section}>
                    <p className={classes.Description_Title}>About this Item :</p>
                    <p className={classes.Description}>
                        <ul>
                            <li>Adjustable Split AC with inverter compressor: Variable speed compressor which adjusts power depending on heat load. It is most energy efficient and comes with 2 Adjustable modes to choose within different tonnages for different cooling needs</li>
                        </ul>
                    </p>
                </section>
            </section>



        </div>
    )
}

export default Details;
