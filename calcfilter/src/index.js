import React from 'react';
import ReactDOM from 'react-dom';
import './estilos.css';
import filtro from './filter.png';
import App from './App';
import * as serviceWorker from './serviceWorker';


var clase = "colum unshow";
class Ludo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            flow: 0,
            fhigh:0,
            R1: 0,
            R2: 0,
        };   
    }
    eventHandler = (event) => {
        if (event.target.name == "low")
        {this.setState({flow: event.target.value});}
        if (event.target.name == "high")
        this.setState({fhigh: event.target.value});
    }
    calculate = () => {
        const comerciales = [10 , 12 , 15 , 18 , 22 , 27 , 33 , 39 , 47 , 51 , 56 , 68 , 82 , 100];
        let high;
        let low;
        let cifrasl;
        let cifrash;
        high = Math.round(1 / (this.state.fhigh * 10e-7 * 6.28));
        low = Math.round(1 / (this.state.flow * 10e-8 * 6.28));
        low = low.toString();
        high = high.toString();
        cifrasl = low.length - 1;
        cifrash = high.length -1;
        low = low.slice(0,2);
        high = high.slice(0,2);
        for ( let i = 0 ; i < comerciales.length ; i++){
            if (low <= comerciales[i]){
              low = comerciales[i];
              i = comerciales.length;
            }
        }
            for ( let i = 0 ; i < comerciales.length ; i++){
                if (high <= comerciales[i]){
                  high = comerciales[i];
                  i = comerciales.length;
                }
            }
                switch (cifrasl){
                    case 1 :
                      low = ( low * 10) + "Ω";
                      break;
                    case 2 :
                      low = (low / 10) + "KΩ";
                      break;
                    case 3 :
                      low += "KΩ";
                      break;
                    case 4 :
                      low = ( low / 10) + "MΩ";
                      break;
                    case 5 :
                      low += "MΩ";
                      break;
                  }
                  switch (cifrash){
                    case 1 :
                      high = ( high * 10) + "Ω";
                      break;
                    case 2 :
                      high = (high / 10) + "KΩ";
                      break;
                    case 3 :
                      high += "KΩ";
                      break;
                    case 4 :
                      high = ( high / 10) + "MΩ";
                      break;
                    case 5 :
                      high += "MΩ";
                      break;
                  }
        this.setState({R1: low});
        this.setState({R2: high});
        clase = "colum show";
    }
    render() {
        return (
          <div style={{backgroundColor:'rgb(2, 15, 49)', fontFamily:"Arial, Helvetica, sans-serif", boxShadow:"3px 3px 3px grey", padding:"20px", margin:"auto"}}>
          <h1 style={{color:"#f2f2f2", textAlign:"center"}}>Calculadora de filtro pasa banda</h1>
          <div className="appcont">
            <div className="colum">
            <img src={filtro} alt="filtro"/>
            </div>
            <div className="colum" style={{margin:'auto', width:"50%"}}>
            <p>Frecuencia de corte baja</p>
            <input name="low" onChange={this.eventHandler} type='number'/>
            <p>Frecuencia de corte alta</p>
            <input  name="high" onChange={this.eventHandler} type='number'/>
            <br/><br/>
            <button type='button' onClick={this.calculate}>Calcular valores</button>   
            </div>
        <div className= {clase}> 
        <ul>
        <li>C1 = 100 nf </li>
        <li>C2 = 10 nf</li>
        <li>R1 = {this.state.R1}</li>
        <li>R2 = {this.state.R2}</li>
        </ul>
        </div>
        </div>
        </div>
        );}
        }
    


ReactDOM.render(<Ludo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
