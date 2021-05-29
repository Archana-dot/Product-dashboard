import React, { useEffect, useState } from 'react';
import '../../assets/css/product.css';
import { Redirect } from 'react-router';


function Product() {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const apiURL = " https://hplussport.com/api/products/order/price/sorc/qty/100";
        fetch(apiURL).then((res) => res.json()).then((data) => {
                console.log("data", data)
                setData(data)
                setIsLoading(false)
            });
    },[])

    function sort(e) {
        var list = Object.assign([], data)
        if (e.target.name === "orderid") {
            if (e.target.value === 'Ascending') {
                list.sort((a, b) => a.id - b.id)
            }
            else {
                list.sort((a, b) => b.id - a.id)
            }
        }
        else if (e.target.name === "name") {
            if (e.target.value === 'Ascending') {
                list.sort((a, b) => a.name.localeCompare(b.name))
            }
            else {
                list.sort((a, b) => b.name.localeCompare(a.name))
            }
        }
        else if (e.target.name === "description") {
            if (e.target.value === 'Ascending') {
                list.sort((a, b) => a.description.localeCompare(b.description))
            }
            else {
                list.sort((a, b) => b.description.localeCompare(a.description))
            }
        }
        else {
            if (e.target.value === 'Ascending') {
                list.sort((a, b) => a.price - b.price)
            }
            else {
                list.sort((a, b) => b.price - a.price)
            }
        }
        setData(list)
    }


if (localStorage.getItem("token") !== "true") {
    return <Redirect to="/" />;
}else{
    return (
        <div className="product">
        <table id="data">
            <thead className="thead">
                <th> Order ID</th>
                <th> Name</th>
                <th> Description</th>
                <th>Price</th>
            </thead>
                    <tbody className="tbody">
                    <td>
                        <select name="orderid" onChange={sort} >
                            <option value="" disabled selected hidden>sort</option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </select>
                    </td>
                    <td>
                        <select name="name" onChange={sort}>
                            <option value="" disabled selected hidden>sort</option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </select>
                    </td>
                    <td>
                    <select name="description" onChange={sort}>
                        <option value="" disabled selected hidden>sort</option>
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>
                    </select>
                    </td>
                    <td>
                        <select name="price" onChange={sort}>
                            <option value="" disabled selected hidden>sort</option >
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </select>
                    </td>

                        {data.map((item, index, key) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
    )
}
}
export default Product;