import React, { useEffect, useState } from 'react'
import './OrderSection.css'
import Navbar from '../Navbar/Navbar'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../Firebase/FirebaseConfig'
import { Link } from 'react-router-dom'




const OrderSection = () => {

    const [allorders, setAllOrders] = useState([])
    const [allorderstatus, setAllOrderStatus] = useState('')
    const [keyword, setkeyword] = useState('')

    const getAllOrders = async () => {
        setAllOrders([])
        try {
            const querysnapshot = await getDocs(collection(db, 'UserOrders'))
            querysnapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data())
                setAllOrders((prev) => [...prev, doc.data()])
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    const changeOrderStatus = (id, orderdata, status) => {
        const docRef = doc(db, "UserOrders", id);
        const data = {
            ...orderdata,
            orderstatus: status
        }
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
            .catch((error) => {
                alert("Error writing document: ", error);
            })

        getAllOrders()
    }

    const changeDeliveryboyName = (id, orderdata, boyname) => {
        console.log(id, orderdata, boyname)
        const docRef = doc(db, "UserOrders", id);
        const data = {
            ...orderdata,
            deliveryboy_name: boyname
        }
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
            .catch((error) => {
                alert("Error writing document: ", error);
            })

        getAllOrders()
    }


    const changeDeliveryboyPhone = (id, orderdata, boyphone) => {
        console.log(id, orderdata, boyphone)
        const docRef = doc(db, "UserOrders", id);
        const data = {
            ...orderdata,
            deliveryboy_phone: boyphone
        }
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
            .catch((error) => {
                alert("Error writing document: ", error);
            })

        getAllOrders()
    }

    console.log(allorders)
    return (
        <div className='order-section'>
            <Navbar />
            <div className='order-head1'>Order Section</div>
            <div className='order-s1'>
                <input type='text' placeholder='Search by order id or delivery status' className='searchbar' onChange={(e) => setkeyword(e.target.value)}></input>

                <div className='order-s1-in'>
                    <p>Sort by order status</p>
                    <select className='ordertxt' onChange={(e) => setAllOrderStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="ontheway">On the way</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className='order__container'>
                <div className='order-row_card1'>
                    <p className='ordertxt'> OrderId</p>
                    <p className='ordertxt'>Paid</p>
                    <p className='ordertxt'>Delivery Status</p>
                    <p className='ordertxt'>Delivery Boy Name</p>
                    <p className='ordertxt'>Delivery Boy Phone</p>

                    <p className='ordertxt'>Cost</p>
                    <button>Show Details</button>
                </div>

                <div className='order__container'>
                    {
                        allorders.filter((val) => {
                            if (allorderstatus === "") {
                                return val
                            } else if (val.orderstatus.toLowerCase().includes(allorderstatus.toLowerCase())) {
                                return val
                            }
                        }).filter((val) => {
                            if (keyword === '') {
                                return val
                            } else if (val.orderId.toLowerCase().includes(keyword.toLowerCase()) || val.orderstatus.toLowerCase().includes(keyword.toLowerCase())) {
                                return val
                            }
                        }).map((order) => {
                            return (
                                <>
                                    <div className='order-row_card'>
                                        <p className='ordertxt'>{order.orderId}</p>
                                        <p className='ordertxt'>{order.orderpayment}</p>
                                        <div className='order-card-in'>
                                            {order.orderstatus === 'pending' &&
                                                <select className='ordertxt' onChange={(e) => changeOrderStatus(order.orderId, order, e.target.value)}>
                                                    <option value="pending">Pending</option>
                                                    <option value="ontheway">On the way</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            }

                                            {order.orderstatus === 'ontheway' &&
                                                <select className='ordertxt' onChange={(e) => changeOrderStatus(order.orderId, order, e.target.value)}>
                                                    <option value="ontheway">On the way</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            }

                                            {order.orderstatus === 'delivered' &&
                                                <select className='ordertxt' onChange={(e) => changeOrderStatus(order.orderId, order, e.target.value)}>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="ontheway">On the way</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            }

                                            {order.orderstatus === 'cancelled' &&
                                                <p className='ordertxt'>{order.orderstatus}</p>
                                            }

                                        </div>

                                        {order.deliveryboy_name ? <p className='ordertxt'> {order.deliveryboy_name}</p> :
                                            <input type="text" placeholder="Enter deliveryboy_name" className='orderinput' onBlur={(e) => changeDeliveryboyName(order.orderId, order, e.target.value)} />
                                        }
                                        {
                                            order.deliveryboy_phone ? <p className='ordertxt'> {order.deliveryboy_phone}</p> :
                                                <input type="text" placeholder="Enter deliveryboy_phone" onBlur={(e) => changeDeliveryboyPhone(order.orderId, order, e.target.value)} className='orderinput' />
                                        }
                                        <p className='ordertxt'>{order.ordercost}</p>
                           
                                        <Link to={`/orderdetails/${order.orderId}`}><button>show details</button></Link>


                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default OrderSection
