import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Container/LandingPage/LandingPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductListing from "./Container/ProductListing/ProductListing";
import Fontawesom from "./Container/FontAwesom/Fontawesom";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Fontawesom />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/productlisting/:id' component={ProductListing} />

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
