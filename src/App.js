import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Container/LandingPage/LandingPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductListing from "./Container/ProductListing/ProductListing";
import Details from "./Container/Details/Details";
import TopBar from "./Container/TopBar/TopBar";
// import { globalStore } from "./Container/redux/addToCart"
import { Provider } from "react-redux"
import SignIn from "./Container/SIgnIn/SignIn";
import { auth, createUserProfileDocument } from "./Container/Firebase/Firebase"
import React from "react";



let globalStore = require("../src/Container/redux/addToCart")


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => console.log(snapShot));
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {


    return (
      <BrowserRouter >
        <Provider store={globalStore} >
          <div className="App">
            <TopBar />


            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/productlisting/:id' component={ProductListing} />
              <Route exact path='/details/:productId/:detailId' component={Details} />
              <Route exact path="/signin" component={SignIn} />
              {/* <SignIn /> */}
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }

}
export default App;
