import React from 'react';
// import { stat } from 'fs';
import '../css/masterHeader.css'
// import { connect } from 'http2';

export default class Upto70 extends React.Component {
    constructor() {
        super();
        this.state = {
            saleImage: [
                {
                    image: 'https://epicwoo.com/demo/wp-content/uploads/2018/03/bannn.png'
                }
            ]
        }
    }
    render() {
        return (
            <div>
                {this.state.saleImage.map((item) => {
                    return <img className="imgg" src={item.image} />
                })}
            </div>
        )
    }
}