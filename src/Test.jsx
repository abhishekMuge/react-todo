import React, { Component } from 'react';
import axios from 'axios';


export default class check extends Component {
    constructor(){
        super();
        this.state = { 
            data : []
        }
    }

   async componentDidMount(){
        const response = await axios.get('https://royal-stats.herokuapp.com/player/8L9L9GL');
        console.log(response);
      }

    render() {
        return (
            <div>
                gjgjh
            </div>
        )
    }
}
