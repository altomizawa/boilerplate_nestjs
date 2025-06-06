import { Product } from '../models/product.js'

const getAllProducts = async (req, res) => {
  try{
    const products = await Product.find()
    if (products) {
      return res.status(200).send({
        message: 'list all products',
        products: products
      })
    }
    return res.status(400).send({
      message: 'products not found'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: 'products not found'
    })
  }
}

const addProduct = async (req, res) => {
  const {name, price} = req.body
  
  if(!name || !price) {
    return res.status(400).send({
      message: 'name and price are required'
    })
  }

  try{
    const product = new Product({
      name: name,
      price: price
    })

    if (product) {
      product.save();
      return res.status(200).send({
        message: 'product added',
        product: product
      })
    }
    return res.status(400).send({
      message: 'product not added'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: 'product not added'
    })
  }
}

const getProductById = async (req, res) => {
  const id = req.params.id
  try{
    const product = await Product.findById(id)
    if (product) {
      return res.status(200).send({
        message: 'product found',
        product: product
      })
    }
    return res.status(400).send({
      message: 'product not found'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: 'product not found'
    })
  }
}

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const {name, price} = req.body
  try{
    const existingProduct = await Product.findOne({_id: id})
    if (!existingProduct) {
      throw new Error({status: 404, message: "product not found"})

    }
    existingProduct.name = name || existingProduct.name
    existingProduct.price = price || existingProduct.price
    await existingProduct.save()

    res.status(200).send({
      message: 'product updated',
      product: existingProduct
    })
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    })
  }
}


const deleteProduct = async (req, res) => {
  const id = req.params.id
  try{
    const existingProduct = await Product.findOne({_id: id})
    if (!existingProduct) {
      return res.status(400).send({
        message: 'product not found'
      })
    }
    const deletedProduct = await Product.deleteOne({_id: id})
    if (!deletedProduct) {
      throw new Error({status: 404, message: "product not deleted"})
    }
    res.status(200).send({
      message: 'product deleted',
      product: existingProduct
    })
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    })
  }
}




export { getAllProducts, addProduct, updateProduct, deleteProduct, getProductById }

