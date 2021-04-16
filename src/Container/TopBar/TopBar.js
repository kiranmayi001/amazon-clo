import React, { Component } from 'react'
import classes from "./TopBar.module.css"
import logo from "../assets/header_logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart, faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { connect } from "react-redux"

function TopBar(props) {
    return (
        <div className={classes.TopBar}>
            <div className={classes.Logo_Wrapper}>

                <img src={logo} alt="logo" className={classes.Amazon_Logo} />
                <p className={classes.Domain}>.in</p>
            </div>

            <div className={classes.SelectAdress_Container}>

                <p className={classes.HelloText}>Hello</p>
                <div className={classes.Logo_Container}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={classes.Map_Icon} />
                    <p className={classes.SelectAddress_Text}>Select your address</p>
                </div>

            </div>

            <div className={classes.SearchBar_Container}>
                <select className={classes.Select_Container}>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                    <option>All categories</option>
                </select>

                <input type="search" className={classes.Search_Field} />
                <FontAwesomeIcon icon={faSearch} className={classes.Search_Icon} />
            </div>


            <div className={classes.SignIn_Container}>
                <p class={classes.SignIn_Text}>Hello, Sign in</p>
                <p className={classes.MyAccount_Text}>My Account</p>
            </div>


            <div className={classes.Returns_Orders_Container}>
                <p class={classes.Return_Text}>Returns</p>
                <p className={classes.Orders_Text}> &Orders</p>
            </div>

            <div className={classes.Cart_Container}>
                <FontAwesomeIcon icon={faShoppingCart} className={classes.Shopping_Cart} />
                <p className={classes.Items_Count}>{props.qty}</p>

            </div>

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        qty: state.quantity
    }
}

export default connect(mapStateToProps)(TopBar)
