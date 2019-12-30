import React, {Component} from 'react';
import axios from 'axios';
import './food.css';
import Popup from './../popup/popup';

class Food extends Component{

    constructor(props){
        super(props);

        this.state = {
            food_item: '',
            food_ingridient_1: '',
            food_ingridient_2: '',
            bool: false
        }
    }
    
    handleFoodItemChange = (e) => {
        this.setState({food_item: e.target.value});
    }
    
    handleFoodIng1Change = (e) => {
        this.setState({food_ingridient_1: e.target.value});
    }

    handleFoodIng2Change = (e) => {
        this.setState({food_ingridient_2: e.target.value});
    }

    submitData = (e) => {
        e.preventDefault();
        var name = {
            food_item: this.state.food_item,
            food_ingridient: [this.state.food_ingridient_1, this.state.food_ingridient_2]
        }
        axios.post("food-add", name).then(res => {
            console.log(res.data);
        });
    
    }

    analyseData = (e) => {
        e.preventDefault();
        
        axios.post("food-allergey").then(res => {
            console.log(res.data);
            this.setState({bool: true});
            console.log("Yo");
        });
    
    }

    render(){

        return(
            <div>
                <div className="container">
        <header>
            <div className="brand">
                <a href="index.html">CURA: Live a Smart Lifestyle</a>
            </div>
            <div className="nav-bar">
                <ul className="nav-items">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="index.html#section">healthy lifestyle</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Sign Up</a></li>
                </ul>
            </div>
        </header>
        <section id="section">
            <div className="main-section">
                <div className="main-section-heading">
                    <h1>Worried? Want to do your food analysis.</h1>
                </div>
                <div className="medicine-search-form">
                    <form action="" method="post" onSubmit={this.submitData}>
                        <fieldset>
                            <legend><h3> Enter food and it's ingredients:</h3></legend>
                            <div className="input-elements">
                                <h2>Food Item</h2>
                                <h2>Ingredients</h2>
                                <input type="text" id="group1" name="food-item-1" placeholder="Enter Food Item 1" required onChange={this.handleFoodItemChange} value={this.state.food_item}/>
                                <input type="text" id="group2" name="food-item-1-indredient" placeholder="Food Item 1 Indredient" required onChange={this.handleFoodIng1Change} value={this.state.food_ingridient_1} />
                                <input type="text" id="group3" name="food-item-1-indredient" placeholder="Food Item 1 Indredient" required onChange={this.handleFoodIng2Change} value={this.state.food_ingridient_2} />
                                <input type="submit" id="group4" name="food-submit" value="Submit" />

                            </div>
                        </fieldset>
                    </form>
                    
                </div>

                
                <form method="post" onSubmit={this.analyseData}>
                    <input type="submit" name="food-submit" value="Analyze" id="group5"/>
                </form>
                    
                
            </div>
        </section>

        {
            this.state.bool && (<section className="demo">
            <img src={require('./../../graph.png')} />
        </section>
        )
        }
        
        <div>


  
</div>

    </div>
            </div>
        );
    }
}

export default Food;