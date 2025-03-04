const OS = require('../../models/os/os');
const Cliente = require('../../models/cliente/Cliente');
const Produto = require('../../models/produto/Produto');

class OSController {
  async adicionarOS(req, res) {
    const { clienteCpf, ProdNumSerie, defeito, status } = req.body;

    try {
      // Verifica se o cliente existe
      const cliente = await Cliente.findOne({ where: { cpf: clienteCpf } });
      if (!cliente) {
          console.log('Cliente não encontrado:', clienteCpf);
          return res.status(404).json({ message: 'Nenhum cliente encontrado com o CPF fornecido.' });
      }
  
      // Verifica se o produto existe
      const produto = await Produto.findOne({ where: { NumSerie: ProdNumSerie } });
      if (!produto) {
          console.log('Produto não encontrado:', ProdNumSerie);
          return res.status(404).json({ error: 'Produto não encontrado.' });
      }
  
      // Cria a OS
      const novaOS = await OS.create({
          clienteCpf: cliente.cpf,
          clienteNome: cliente.nome,
          ProdutoNumSerie: produto.NumSerie,
          produtoModelo: produto.modelo,
          defeito,
          status: status || "aguardando-orcamento",
      });
  
      console.log('OS criada com sucesso:', novaOS);
      res.status(201).json(novaOS);
  } catch (error) {
      console.error('Erro ao buscar cliente/produto ou criar a OS:', error);
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

  async atualizarStatusOS(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    console.log("Recebendo requisição para atualizar OS:", id, "Novo status:", status); 

    try {
        const [updated] = await OS.update({ status }, { where: { id } });

        if (updated) {
            res.status(202).json({ message: 'Status da OS atualizado com sucesso!' });
        } else {
            res.status(404).json({ error: 'OS não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar status da OS:', error);
        res.status(500).json({ error: 'Erro ao atualizar status da OS' });
    }
}



}

module.exports = new OSController();
