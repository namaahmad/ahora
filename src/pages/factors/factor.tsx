
import "./factor.css"
import logo from "../../img/logo.png";
import { useEffect, useState } from "react";
import { getList } from "../../utils/dataProvider";
import Loader from '../../components/Widget/Loader';
export default function Factor(props: any) {
    const [productList, setProductsList] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const LoadProducts = () => {
        getList('api/products', {}).then((data: any) => {
            setIsloading(false)
            if (data.items) {
                setProductsList(data.items);
            }
        })
    }
    useEffect(function () {
        LoadProducts();
    }, []);
    return isLoading ? (<Loader />) :
        (<div className="row" >
            <div className="row1">
                <img src={logo} />
                <h1>Invoice</h1>

            </div>
            <div className="row2">
                <div className="row21">

                    <div> For </div>
                    <div className="row22Name">Client Name</div>
                    <div > name@Customer.com</div>
                    <div > 34 Customer Street</div>
                    <div > City</div>
                    <div > Country</div>
                </div>
                <div className="row22">
                    <div> from </div>
                    <div className="row22Name"> John Smith</div>
                    <div > name@Compnay.com</div>
                    <div > 12 Company Street</div>
                    <div > City</div>
                    <div > Country</div>
                    <div > P : 60423432</div>
                </div>
            </div>
            <br />
            <div className="line"></div>
            <br />
            <div className="row2">
                <div className="row3">
                    <div className="row32">
                        <div> INV2241 </div>
                        <div> 8 Agu 2018 </div>
                        <div> 6 Days </div>
                        <div> 14 Agu 2018 </div>
                    </div>
                    <div className="row31">

                        <div> Number  </div>
                        <div> Date  </div>
                        <div> Terms </div>
                        <div> Due </div>
                    </div>

                </div>
            </div>
            <br />
            <br />
            <div className="row2">
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: '10%', textAlign: "center" }}>Amount</th>
                            <th style={{ width: '5%', textAlign: "center" }}>Qty</th>
                            <th style={{ width: '5%', textAlign: "center" }}>Price</th>
                            <th style={{ width: '70%', paddingLeft: "10px" }}>Description</th>
                        </tr>

                    </thead>

                    <tbody>
                        {productList.map((product: any) => {
                            return (
                                <tr>
                                    <td>{product.quantity * product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>{product.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>)
}