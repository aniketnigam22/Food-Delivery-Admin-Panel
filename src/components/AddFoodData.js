import React, { useState } from 'react'
import './AddFoodData.css'

const AddFoodData = () => {
    const [foodName, setFoodName] = useState('')
    const [foodDescription, setFoodDescription] = useState('')
    const [foodPrice, setFoodPrice] = useState()
    const [foodCategory, setFoodCategory] = useState('')
    const [foodImage, setFoodImage] = useState('')
    const [restaurantName, setRestaurantName] = useState('')
    const [foodAddress, setFoodAddress] = useState('')
    const [restaurantPhone, setRestaurantPhone] = useState('')

    const handleImageChange = (e) => {
        setFoodImage(e.target.files[0]);
    };

  
    const handleSubmit = (e) => {
        e.preventDefault()
        const foodData = {
            foodName,
            foodDescription,
            foodPrice,
            foodCategory,
            restaurantName,
            foodAddress,
            restaurantPhone,
            foodImage
        }

        console.log(foodData)
    }

    return (
        <div className='form-outer'>
            <h1>Add Food Data</h1>
            <form className='form-inner'>
                <label>Food Name</label>
                <input type='text' name='food_name'
                    onChange={(e) => { setFoodName(e.target.value) }}
                />

                <br />

                <label>Food Description</label>
                <input type='text' name='food_description'
                    onChange={(e) => { setFoodDescription(e.target.value) }}
                />

                <br />

                <label>Food Price</label>
                <input type='number' name='food_price'
                    onChange={(e) => { setFoodPrice(e.target.value) }}
                />

                <br />

                <label>Food Category</label>
                <input type='text' name='food_category'
                    onChange={(e) => { setFoodCategory(e.target.value) }}
                />

                <br />

                <label>Food Image</label>
                <input type='file' name='food_image'
                    onChange={handleImageChange}
                />

                <br />

                <label>Restaurant Name</label>
                <input type='text' name='restaurant_name'
                    onChange={(e) => { setRestaurantName(e.target.value) }}
                />

                <br />

                <label>Food Address</label>
                <input type='text' name='restaurant_address'
                    onChange={(e) => { setFoodAddress(e.target.value) }}
                />

                <br />

                <label>Restaurant Phone</label>
                <input type='text' name='restaurant_phone'
                    onChange={(e) => { setRestaurantPhone(e.target.value) }}
                />

                <br />

                <button type='submit' onClick={handleSubmit}>Add Food</button>
            </form>
        </div>
    )
}

export default AddFoodData
