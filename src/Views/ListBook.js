import React, {Component} from "react";
export default class ListBook extends Component{
	render(){
    	return(<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            	<Shelf/>
          	</div>
            <FAB/>
          </div>)}}
               
               