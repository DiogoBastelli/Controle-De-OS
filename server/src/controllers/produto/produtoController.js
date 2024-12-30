const Produto = require('../../models/produto/Produto');

class ProdutoController {
  
  // Adicionar um novo produto
  async adicionarProduto(req, res) {
    const { nome, descricao, preco } = req.body;
    try {
      console.log('Dados recebidos:', req.body);
      const novoProduto = await Produto.create({ nome, descricao, preco });
      console.log('Produto criado com sucesso:', novoProduto);
      res.status(201).json(novoProduto);
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
      res.status(500).json({ error: 'Erro ao criar o produto', descricao: error.message });
    }
  }

  // Listar todos os produto
  async listarProduto(req, res) {
    try {
      const produto = await Produto.findAll();
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Produto' });
    }
  }

  async pesquisaItemUnico(req, res) {
    try {
      const { id } = req.params;
      console.log("chegou" , id)
      const produto = await Produto.findAll({ where: { id } });
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ error: 'Produto nao encotrado' });
    }
  }

  // Remover um Produto por `id`
  async removerProduto(req, res) {
    const { id } = req.params;
    
    try {
      await Produto.destroy({ where: { id } });
      res.status(202).json({ message: 'Produto removido com sucesso.' });
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      res.status(500).json({ error: 'Erro ao remover produto' });
    }
  }

}
module.exports = new ProdutoController();