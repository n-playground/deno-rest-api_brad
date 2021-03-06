import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Products } from '../types.ts'

let products: Products[] = [
    {
        id: "1",
        name: "Product One",
        description: "This is product one",
        price: 29.99,
    },
    {
        id: "2",
        name: "Product Two",
        description: "This is product two",
        price: 39.99,
    },
    {
        id: "3",
        name: "Product Three",
        description: "This is product three",
        price: 49.99,
    },
]

// get all products
const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
}

// get single product
const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Products | undefined = products.find(items => items.id === params.id)

    if (product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            message: 'No product found'
        }
    }
}

// add new product
const addProduct = async ({ request, response }: { request: any, response: any }) => {
    const data = await request.body()

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            message: 'No data'
        }
    } else {
        const product: Products = data.value
        product.id = v4.generate()
        products.push(product)

        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

// update a product
const updateProduct = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const product: Products | undefined = products.find(items => items.id === params.id)

    if (product) {
        const data = await request.body()

        const updateData: { name?:string, description?:string, price?:number } = data.value

        products = products.map(items => items.id === params.id ? { ...items, ...updateData } : items)

        response.status = 200
        response.body = {
            success: true,
            data: products
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            data: 'No data found'
        }
    }
}

// delete a product
const deleteProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    products = products.filter(items => items.id !== params.id)

    response.status = 200
    response.body = {
        success: true,
        data: products
    }
}

export { 
    getProducts, 
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}