import { ProductModel } from '../models/ProductModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products.' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, img } = req.body;
    const product = await ProductModel.create({
      nome, 
      descricao, 
      preco, 
      img,
      estoque 
     });
    return res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product.' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extrair o ID do produto dos parâmetros da solicitação
    const { nome, descricao, preco, estoque, img } = req.body; // Extrair os novos dados do produto do corpo da solicitação

    // Procurar o produto pelo ID no banco de dados
    const product = await ProductModel.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Atualizar os campos do produto com os novos dados fornecidos
    product.nome = nome;
    product.descricao = descricao;
    product.preco = preco;
    product.estoque = estoque;
    product.img = img;

    // Salvar as alterações no banco de dados
    await product.save();

    return res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Failed to update product." });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    var  { quantidade } = req.body;


    let product = await ProductModel.findOne({ where: { id: id } });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    var oldQTD = product.estoque;
    quantidade = oldQTD - quantidade;

    await ProductModel.update({ estoque: quantidade }, { where: { id } });

    return res.json({ message: "Product quantity updated successfully." });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return res
      .status(500)
      .json({ error: "Failed to update product quantity." });
  }
};




export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await ProductModel.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Product not found.' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product.' });
  }
};


export const getProductById = async (req, res) => {
  //   const id = req.params.id;
  //   const object = await TodoModel.findByPk(id);

  const object = await ProductModel.findAll({
    where: { id: req.params.id },
  });
  return res.json(object);
};

//export { getAllProducts, createProduct, updateProduct, deleteProductById, getProductById };
