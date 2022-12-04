import { useEffect, useState } from "react";
import { ORDERS_API } from "../api";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(ORDERS_API, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data.orders))
    }, []);

    return (
        <div className="adminDashboard">
            
        </div>
    )
}

export default AdminDashboard;