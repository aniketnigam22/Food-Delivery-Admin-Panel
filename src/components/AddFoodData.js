import React, { useState } from 'react'
import './AddFoodData.css'
import { db, storage } from '../Firebase/FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


const AddFoodData = () => {
    const [foodName, setFoodName] = useState('')
    const [foodDescription, setFoodDescription] = useState('')
    const [foodPrice, setFoodPrice] = useState()
    const [foodCategory, setFoodCategory] = useState('')
    const [foodImage, setFoodImage] = useState(null)
    const [restaurantName, setRestaurantName] = useState('')
    const [foodAddress, setFoodAddress] = useState('')
    const [restaurantPhone, setRestaurantPhone] = useState('')
    const [foodImageUrl, setFoodImageUrl] = useState('')

    const handleImageChange = (e) => {
        setFoodImage(e.target.files[0]);
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        if (foodImage == null) {
            alert('Please select an image')
            return
        } else {
            const imageRef = ref(storage, `FoodImage/${foodImage.name}`)
            uploadBytes(imageRef, foodImage)
                .then(() => {
                    alert('Image uploaded successfully')
                    getDownloadURL(imageRef)
                        .then((url) => {
                            console.log(url)
                            // setFoodImageUrl(url)

                            const foodData = {
                                foodName,
                                foodDescription,
                                foodPrice,
                                foodCategory,
                                restaurantName,
                                foodAddress,
                                restaurantPhone,
                                foodImageUrl:url
                            }

                            console.log(foodData)

                            try {
                                const docRef = addDoc(collection(db, 'FoodData'), foodData);
                                alert(`Data Added Successfully${docRef.id}`)

                            } catch (e) {
                                console.log(`Error adding doucment ${e}`)
                            }
                        })
                })
                .catch((error) => {
                    alert('something went wrong while uploading image', error.message)
                })
        }


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
