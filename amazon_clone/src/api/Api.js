import axios from 'axios'

export async function productsData(){
    const products= await axios.get("https://fakestoreapi.com/products");
    return products
}

export const instance = axios.create({
    baseURL:'http://127.0.0.1:5001/test-901f1/us-central1/api'
})