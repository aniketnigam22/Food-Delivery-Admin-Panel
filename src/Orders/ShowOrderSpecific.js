import React, { useEffect, useState } from 'react'
import './ShowOrderSpcecific.css'
import Navbar from '../Navbar/Navbar.js'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase/FirebaseConfig.js'


const ShowOrderSpecific = () => {

    const { orderid } = useParams()
    const [orderdata, setOrderData] = useState({})
    console.log(orderid)

    const getorderdata = async () => {
        const docRef = doc(db, "UserOrders", orderid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setOrderData(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getorderdata()
    }, [])
    return (
        <>
            <Navbar />
            <div className="order-header">
                <Link to='/'><button className='goback-btn'>Go back</button></Link>
                <p className='orderIdcss'>Order Id: {orderid}</p>
                <h1 className='order-head11'>Order Details</h1>
            </div>

            <div className="order-section">

                <div className='orderdetails-form'>
                    <div className="orderetails_row">
                        <p>Customer Name</p>
                        <p>{orderdata.orderName}</p>
                    </div>
                    <div className="orderetails_row">
                        <p>Order Address</p>
                        <p>{orderdata.orderAddress}</p>
                    </div>

                    <div className="orderetails_row">
                        <p>Customer Phone</p>
                        <p>{orderdata.orderPhone}</p>
                    </div>

                    <div className="orderetails_row">
                        <p>Order Status</p>
                        <p>{orderdata.orderstatus}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ShowOrderSpecific
