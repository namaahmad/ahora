
import "./factor.css"
import logo from "../../img/logo.png";
export default function Factor(props: any) {
    return (
        <div className="row" >
            <div className="row1">
                <img src={logo} />
                <h1>Invoice</h1>

            </div>
            <div className="row2">
                <p>
                    For
                    <br/>
                </p>
                <p>
                    from 
                    <br/>
                    John Smith
                </p>
            </div>
        </div>)
}