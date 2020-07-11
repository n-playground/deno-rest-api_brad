import { Router } from 'https://deno.land/x/oak/mod.ts'
import { 
  getProducts, 
  getProduct, 
  addProduct 
} from './controllers/products.ts'

const router = new Router()

router.get('/api/v1/products', getProducts)
router.get('/api/v1/product/:id', getProduct)
router.post('/api/v1/product/add', addProduct)

export default router