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

const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
}

export { getProducts }