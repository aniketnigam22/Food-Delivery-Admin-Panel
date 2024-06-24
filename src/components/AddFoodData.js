import React, { useState } from 'react'
import './AddFoodData.css'

// importing db and storage form FirebaseConfig for storing the data and file
import { db, storage } from '../Firebase/FirebaseConfig'

// addDoc and collection are the firebase function 
// Firestore is a cloud-based NoSQL database that allows you to store and sync data for your app.
// It’s part of the Firebase suite of products offered by Google.
// collection:Purpose: To specify which collection you want to work with in your Firestore database.
// addDoc: To add a new document to a specified collection in Firestore.
import { addDoc, collection } from 'firebase/firestore'

// uploadBytes:To upload a file to the specified storage reference.
// getDownloadURL:  To get the download URL for a file stored in Firebase Storage.
// ref : : To create a reference to a specific location in Firebase Storage.
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Navbar from '../Navbar/Navbar'


const AddFoodData = () => {
    const [foodName, setFoodName] = useState('')
    const [foodDescription, setFoodDescription] = useState('')
    const [foodPrice, setFoodPrice] = useState()
    const [foodCategory, setFoodCategory] = useState('')
    const [foodImage, setFoodImage] = useState(null)
    const [restaurantName, setRestaurantName] = useState('')

    const [restaurantPhone, setRestaurantPhone] = useState('')
    const [foodImageUrl, setFoodImageUrl] = useState('')

    const [foodType, setFoodType] = useState('')
    const [mealType, setMealType] = useState('')
    const [foodAddon, setFoodAddon] = useState('')
    const [foodAddonPrice, setFoodAddonPrice] = useState('')

    const [resturantEmail, setResturantEmail] = useState('')

    const [resturantAddressBuilding, setrestureantAddressBuilding] = useState('')
    const [resturantAddressStreet, setrestureantAddressStreet] = useState('')
    const [resturantAddressCity, setrestureantAddressCity] = useState('')
    const [resturantAddressPincode, setrestureantAddressPincode] = useState('')

    const handleImageChange = (e) => {
        setFoodImage(e.target.files[0]);
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        if (foodImage == null) {
            alert('Please select an image')
            return
        } else {
            //here we are uploading the image in storage
            // ref(storage, ...): Purpose: This creates a reference to a specific location in Firebase Storage where a file will be stored or accessed.
            //storage: This is the Firebase Storage instance.
            // FoodImage: This is a folder (or directory) within Firebase Storage. 
            // foodImage.name is "pizza.jpg", the path would be "FoodImage/pizza.jpg"
            // Creates a storage path: It constructs a path in Firebase Storage where the file will be saved.
            const imageRef = ref(storage, `FoodImage/${foodImage.name}`)

            //uploadBytes: This function uploads a file (in bytes) to a specified reference in Firebase Storage.
            //imageRef: This is a reference to a specific location in Firebase Storage.
            //food image is the file you want to upload 
            uploadBytes(imageRef, foodImage)
                .then(() => {
                    alert('Image uploaded successfully')
                    getDownloadURL(imageRef)//form imageRef location get the link of the image 
                        .then((url) => {
                            console.log(url)
                            // setFoodImageUrl(url)

                            const foodData = {
                                foodName,
                                foodDescription,
                                foodPrice,
                                foodCategory,
                                restaurantName,
                                restaurantPhone,
                                foodImageUrl: url,//here we are setting the url of the image
                                foodType,
                                mealType,
                                foodAddon,
                                foodAddonPrice,
                                resturantEmail,
                                resturantAddressBuilding,
                                resturantAddressCity,
                                resturantAddressPincode,
                                resturantAddressStreet,
                                id: new Date().getTime().toString()
                            }

                            console.log(foodData)

                            try {
                                //here we are uploading the data in cloud firestore
                                //addDoc:  is a function that adds a new document to a specified Firestore collection.
                                // collection:This part gets a reference to the 'FoodData' collection in your Firestore database.
                                //db:  This is your Firestore database instance, typically imported from your Firebase configuration.
                                //FoodData is the name of your collection or table in firebase
                                //foodData is the the data which you want to save to the firebase
                                const docRef = addDoc(collection(db, 'FoodData'), foodData);
                                alert(`Data Added Successfully${docRef}`)

                            } catch (e) {
                                console.log(`Error adding doucment ${e.message}`)
                                alert(`Error adding doucment ${e.message}`)

                            }
                        })
                })
                .catch((error) => {
                    alert('something went wrong while uploading image', error.message)
                })
        }


    }

    return (
        <div>
            <Navbar />
            <div className='form-outer'>
                <h1 className='heading'>Add Food Data</h1>
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

                    <div className='form-row'>
                        <div className='form-col'>
                            <label>Food Price</label>
                            <input type='number' name='food_price'
                                onChange={(e) => { setFoodPrice(e.target.value) }}
                            />
                        </div>

                        <div className='form-col'>
                            <label>Food Type</label>
                            <select name='food-type' onChange={(e) => { setFoodType(e.target.value) }}>
                                <option value='null'>Select Food Type</option>
                                <option value='veg'>Veg</option>
                                <option value='non-veg'>Non-Veg</option>
                            </select>
                        </div>


                    </div>

                    <br />

                    <br />

                    <div className='form-row'>
                        <div className='form-col'>
                            <label>Food Category</label>
                            <select name='food_category' onChange={(e) => { setFoodCategory(e.target.value) }}>
                                <option value='null'>Select Food Category</option>
                                <option value='indian'>Indian</option>
                                <option value='chinese'>Chinese</option>
                                <option value='italian'>Italian</option>
                                <option value='mexican'>Mexican</option>
                                <option value='american'>American</option>
                            </select>
                        </div>

                        <div className='form-col'>
                            <label>Meal Type</label>
                            <select name='meal_type' onChange={(e) => { setMealType(e.target.value) }}>
                                <option value='null'>Select meal type</option>
                                <option value='dinner'>Dinner</option>
                                <option value='starter'>Starter</option>
                                <option value='breakfast'>Breakfast</option>
                                <option value='liquid'>Liquid</option>
                            </select>
                        </div>
                    </div>

                    <br />

                    <div className='form-row'>
                        <div className='form-col'>
                            <label>Add On Name</label>
                            <input type='text' name='food_addon'
                                onChange={(e) => { setFoodAddon(e.target.value) }}
                            />
                        </div>

                        <div className='form-col'>
                            <label>Add On Price</label>
                            <input type='text' name='food_addon_price'
                                onChange={(e) => { setFoodAddonPrice(e.target.value) }}
                            />
                        </div>
                    </div>

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
                    <div className='form-row'>
                        <div className='form-col'>
                            <label>Resturant Building Number/Name</label>
                            <input type='text' name='resturant_address_building'
                                onChange={(e) => { setrestureantAddressBuilding(e.target.value) }}
                            />
                        </div>

                        <div className='form-col'>
                            <label>Resturant Street/Area Name</label>
                            <input type='text' name='resturant_street_address'
                                onChange={(e) => { setrestureantAddressStreet(e.target.value) }}
                            />
                        </div>
                    </div>



                    <div className='form-row'>
                        <div className='form-col'>
                            <label>Resturant Pincode</label>
                            <input type='text' name='resturant_address_pincode'
                                onChange={(e) => { setrestureantAddressPincode(e.target.value) }}
                            />
                        </div>

                        <div className='form-col'>
                            <label>Resturant City</label>
                            <input type='text' name='resturant_address_city'
                                onChange={(e) => { setrestureantAddressCity(e.target.value) }}
                            />
                        </div>
                    </div>


                    <div className='form-row'>
                        <div className='form-col'>
                            <label>Resturant Phone Number</label>
                            <input type='text' name='resturant_phone'
                                onChange={(e) => { setRestaurantPhone(e.target.value) }}
                            />
                        </div>

                        <div className='form-col'>
                            <label>Resturant Email</label>
                            <input type='text' name='resturant_email'
                                onChange={(e) => { setResturantEmail(e.target.value) }}
                            />
                        </div>
                    </div>


                    <br />

                    <button type='submit' onClick={handleSubmit} className='foodButton' style={{backgroundColor: ' rgb(152, 61, 61)'}}>Add Food</button>
                </form>
            </div>
        </div>
    )
}

export default AddFoodData
