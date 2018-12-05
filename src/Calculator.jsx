import React, { Component } from "react";
import './App.css';    /* IMPORTING THE STYLLING SHEET */



export default class Calculator extends Component {
     
/*  FUNCTION WHICH WILLL BE CALLED WHENEVER ANY BUTTON IUS PRESSED*/
    calculate(e) {
        
        /*CONDITION TO CHECK WETHER ANY OPERATOR KEY IS PRESSED  */

         if(this.checkoperator(e.target.value)) {
            if(this.state.firstoperandfilled == true && this.state.equalclicked == false) {               
                        this.setState({operatorvalue:e.target.value,operatorclicked:true,todisplay:"0"});
            }
         if(this.state.secondoperandfilled == true) {
             if(this.state.equalclicked == true) {
                 this.setState({operatorvalue:e.target.value,operatorclicked:true,firstoperand:this.state.todisplay,secondoperand:"0",firstoperandfilled:true,secondoperandfilled:false,todisplay:"0",equalclicked:false});
             }

         }   
        }
        
        /* CONDITION TO CHECK WHETHER NUMBER IS PRESSED */

        if(!isNaN(e.target.value)) {
            if(this.state.operatorclicked == false) {
                if(this.state.todisplay == "0") {
                    this.setState({todisplay:e.target.value, firstoperand:e.target.value});
                }
                else {
                    var tofill = this.state.todisplay;
                    tofill = tofill + e.target.value;
                    this.setState({todisplay:tofill,firstoperand:tofill});                    
                }
                this.setState({firstoperandfilled:true});
            }
            else {
                if(this.state.operatorclicked == true) {
                    if(this.state.todisplay == "0") {
                        this.setState({todisplay:e.target.value, secondoperand:e.target.value});
                    }
                    else {
                        var tofill = this.state.todisplay;
                        tofill = tofill + e.target.value;
                        this.setState({todisplay:tofill,secondoperand:tofill});                    
                    }
                    this.setState({secondoperandfilled:true});

                }

            }


        }

        /* THIS CONDITION FIRES WHEN EQAUL TO SIGN IS PRESSED */

        if(e.target.value == 'Equal') {
            if(this.state.firstoperandfilled == true && this.state.secondoperandfilled == true && this.state.operatorclicked== true) {
                var firstvalue = parseFloat(this.state.firstoperand);
                var secondvalue = parseFloat(this.state.secondoperand);
                var result = this.calculatesum(firstvalue,secondvalue,this.state.operatorvalue);
                
                this.setState({todisplay:result,equalclicked:true});
                 
            }
            else {
                this.setState({todisplay:"INVALID FORMAT"});
            }


        }

        /* CONDITION TO RESET ALL THE CALCULATOR VALUES */

        if(e.target.value == 'AC') {
            this.setState({
                todisplay:"0",
                firstoperand:"0",
                secondoperand:"0",
                operatorvalue:"none",
                operatorclicked: false,
                firstoperandfilled:false,
                secondoperandfilled:false,
                equalclicked:false});
            
        }

        /* CONDITION FOR THE ADDING DECIMAL */

        if(e.target.value == 'decimal') {
            if(this.state.firstoperandfilled == true && this.state.operatorclicked == false)
            {
                var firstvalue = this.state.firstoperand; 
                var newvalue =  firstvalue+'.';
                this.setState({firstoperand:newvalue,todisplay:newvalue});
            }
            if(this.state.secondoperandfilled == true && this.state.operatorclicked == true) {
               
                var secondvalue = this.state.secondoperand; 
                var newvalue =  secondvalue+'.';
                this.setState({secondoperand:newvalue,todisplay:newvalue});
            }
            
        }

        /* CONDITION TO REMOVE LAST DIGIT OF INPUT */

        if(e.target.value == 'ESC') {
            if(this.state.firstoperandfilled == true && this.state.operatorclicked == false)
            {
                var firstvalue = this.state.firstoperand; 
                var newvalue =  firstvalue.slice(0, -1);
                this.setState({firstoperand:newvalue,todisplay:newvalue});
            }
            if(this.state.secondoperandfilled == true && this.state.operatorclicked == true) {
               
                var secondvalue = this.state.secondoperand; 
                var newvalue =  secondvalue.slice(0, -1);
                this.setState({secondoperand:newvalue,todisplay:newvalue});
            }

        }
    }

    /* A CONSTRUCTOR WHICH ASSIGNS ALL VALUE IN BEGINING */
    constructor(props) {
        super(props);

        this.state = {
            todisplay:"0",            /* DISPLAY IN SCREEN */
            firstoperand:"0",         /* SETS  FIRST VALUE OF USER*/
            secondoperand:"0",        /* SETS SECOND VALUE OF USER */ 
            operatorclicked: false,   /* CHECKS IF OPERATOR BUTTON IS CLICKED */
            firstoperandfilled:false, /* WHEN FIRST OPERATOR IS FILLING */
            secondoperandfilled:false, /* WHEN SECOND OPERATOR IS FILLING */
            operatorvalue:"none",      /* WHICH OPERATOR IS SELECTED eg:+,-,*,/  */
            equalclicked:false          /* WHEN EQUAL TO IS CLICKED */
        }
        
        /* BINDING ALL FUNCTION */

        this.calculate = this.calculate.bind(this);
        this.checkoperator = this.checkoperator.bind(this);
        this.calculatesum = this.calculatesum.bind(this);
    }

    /* FUNCTION WHICH RETURN IS OPERATOR THAT IS SELECTED */
    checkoperator(Valuefromuser) {
        if(Valuefromuser== 'Modulus' || Valuefromuser== 'Divide' || Valuefromuser== 'Multiply' || Valuefromuser== 'Minus' || Valuefromuser== 'Add' ) {
           return true;
        }
        else {
            return false;
        }
    }
    /* @params first value 
       @params second value
       @params which operation to be performed 
       RETURN RESULT
    */
    calculatesum(firstvalue,secondvalue,operator){
        var result;
        switch(operator){
            case "Modulus" :
                result=firstvalue%secondvalue;
                break;
            case "Divide" :
                result=firstvalue/secondvalue;
                result= Math.round(result * 100) / 100;
                break;
            case "Multiply" :
                result=firstvalue*secondvalue;
                break;
            case "Minus" :
                result=firstvalue-secondvalue;
                break;
            case "Add" :
                result=firstvalue+secondvalue;
                break;                                
        }
           return result;
    
    }

    render() {
        return (
            <div className="calculator-container">
                <p id="screen" className="calculator-screen">{this.state.todisplay}</p>
                <div className="buttons">
                    <table>
                        <tbody>
                            <tr>
                                <td><button className="top-button" value="AC" onClick={this.calculate} name="AC">AC</button></td>
                                <td><button className="top-button" value="ESC" onClick={this.calculate}>DEL</button></td>
                                <td><button className="top-button" value="Modulus" onClick={this.calculate}>%</button></td>
                                <td><button className="side-button" value="Divide" onClick={this.calculate}>/</button></td>
                            </tr>
                            <tr>
                                <td><button value="7" onClick={this.calculate}>7</button></td>
                                <td><button value="8" onClick={this.calculate}>8</button></td>
                                <td><button value="9" onClick={this.calculate}>9</button></td>
                                <td><button className="side-button" value="Multiply" onClick={this.calculate}>*</button></td>
                            </tr>
                            <tr>
                                <td><button value="4" onClick={this.calculate}>4</button></td>
                                <td><button value="5" onClick={this.calculate}>5</button></td>
                                <td><button value="6" onClick={this.calculate}>6</button></td>
                                <td><button className="side-button" value="Minus" onClick={this.calculate}>-</button></td>
                            </tr>
                            <tr>
                                <td><button value="1" onClick={this.calculate}>1</button></td>
                                <td><button value="2" onClick={this.calculate}>2</button></td>
                                <td><button value="3" onClick={this.calculate}>3</button></td>
                                <td><button className="side-button" value="Add" onClick={this.calculate}>+</button></td>
                            </tr>
                            <tr>
                                <td colSpan="2"><button className="bigger-button" value="0" onClick={this.calculate}>0</button></td>
                                <td><button value="decimal" onClick={this.calculate}>.</button></td>
                                <td><button className="side-button" value="Equal" onClick={this.calculate}>=</button></td>
                            </tr>
                        </tbody>
                        
                    </table>              
                </div>
            </div>
        );
    }
}

 


