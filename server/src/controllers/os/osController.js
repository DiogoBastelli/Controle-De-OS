const OS = require('../../models/os/os');
const Cliente = require('../../models/cliente/Cliente');
const Produto = require('../../models/produto/Produto');

class OSController {
  async adicionarOS(req, res) {
    const { clienteId, produtoId, defeito } = req.body;

    try {
      // Verifica se o cliente existe
      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }

      // Verifica se o produto existe
      const produto = await Produto.findByPk(produtoId);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      // Cria a OS com as informações do cliente e do produto
      const novaOS = await OS.create({
        clienteId,
        clienteNome: cliente.nome,
        produtoId,
        produtoModelo: produto.modelo,
        defeito,
      });

      console.log('OS criada com sucesso:', novaOS);
      res.status(201).json(novaOS);
    } catch (error) {
      console.error('Erro ao criar a OS:', error);
      res.status(500).json({ error: 'Erro ao criar a OS', descricao: error.message });
    }
  }

  // Listar todas as OS
  async listarOS(req, res) {
    try {
      const osList = await OS.findAll();
      res.status(200).json(osList);
    } catch (error) {
      console.error('Erro ao buscar as OS:', error);
      res.status(500).json({ error: 'Erro ao buscar as OS' });
    }
  }

  // Buscar OS por ID
  async listarOSPorId(req, res) {
    const { id } = req.params;

    try {
      const os = await OS.findByPk(id);

      if (!os) {
        return res.status(404).json({ error: 'OS não encontrada.' });
      }

      res.status(200).json(os);
    } catch (error) {
      console.error('Erro ao buscar a OS:', error);
      res.status(500).json({ error: 'Erro ao buscar a OS' });
    }
  }

}

module.exports = new OSController();
