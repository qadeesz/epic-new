import React,{Component} from 'react'
import Card from '../CatCard/card'
import '../css/cat_sec.css'


class Mobiles extends Component{



    render(){
        return(
            <div>
                <div className = 'category_sec_heading'>MOBILES</div>
                <div className = 'cat_card_header'>
                    <Card cat = 'mobiles'/>
                </div>
            </div>
        )
    }
}




export default Mobiles