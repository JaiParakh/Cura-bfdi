import React, {Component} from 'react';
import './medicine.css';
import axios from 'axios';

class Medicine extends Component{

    constructor(props){
        super(props);

        this.state = {
            med_name: ''
        }
    }
    
    handleMedChange = (e) => {
        this.setState({med_name: e.target.value});
        console.log(this.state.med_name);
    }

    submitData = (e) => {
        e.preventDefault();
        var name = {
            med: this.state.med_name
        }
        axios.post("medicine-allergey", name).then(res => {
            console.log(res.data);
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
                    <h1>Worried? Want some medicine recommendations</h1>
                </div>
                <div className="medicine-search-form">
                    <form method="post" onSubmit={this.submitData}>
                        <fieldset>
                            <legend><h3> Search your medicine:</h3></legend>
                            <div className="input-elements">
                                <input type="text" name="medicine-name" placeholder="Search your medicine here" onChange={this.handleMedChange} value={this.state.med_name} />
                                <input type="submit" name="medicine-submit" value="Submit Query" />
                            </div>
                        </fieldset>
                    </form>
                </div>
                
            </div>
        </section>
        <footer>
            <div><h4>Copyrights 2019 @CURA</h4></div>
            <div><h4>Connect with us on:</h4></div>
        </footer>
    </div>
    </div>
        );
    }
}

export default Medicine;