const Cliente = require('../../models/cliente/Cliente');

class ClienteController {
  
  // Adicionar um novo cliente
  async adicionarCliente(req, res) {
    const { nome, cpf, endereco, bairro , cidade , complemento , cep ,  telefone } = req.body;
    try {
      console.log('Dados recebidos:', req.body);
      const novoCliente = await Cliente.create({ nome, cpf, endereco, bairro , cidade , complemento , cep ,  telefone  });
      console.log('Cliente criado com sucesso:', novoCliente);
      res.status(201).json(novoCliente);
    } catch (error) {
      console.error('Erro ao criar o cliente:', error);
      res.status(500).json({ error: 'Erro ao criar o cliente', descricao: error.message });
    }
  }

  // Listar todos os clientes
  async listarCliente(req, res) {
    try {
      const clientes = await Cliente.findAll();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Clientes' });
    }
  }

  // Pesquisar cliente pelo CPF
  async pesquisarCliente(req, res) {
    const { cpf } = req.params; 
    
    console.log("CPF recebido na API:", cpf); 

    if (!cpf) {
      return res.status(400).json({ error: 'O CPF é um parâmetro obrigatório.' });
    }

    try {
        const cliente = await Cliente.findOne({ where: { cpf } });

        if (!cliente) {
            return res.status(404).json({ message: 'Nenhum cliente encontrado com o CPF fornecido.' });
        }
        
        res.status(200).json(cliente);
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        res.status(500).json({ error: 'Erro ao buscar cliente', descricao: error.message });
    }
  }
  
/*
  // Atualizar informações de um cliente por `id`
  async atualizarInformacoesCliente(req, res) {
    const { id } = req.params;
    const { nome, email, endereco, bairro, tipo_cliente } = req.body;
    
    try {
      await Cliente.update({ nome, email, endereco, bairro, tipo_cliente }, { where: { id } });
      res.status(202).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar informações do cliente:', error);
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }

  // Remover um cliente por `id`
  async removerCliente(req, res) {
    const { id } = req.params;
    
    try {
      await Cliente.destroy({ where: { id } });
      res.status(202).json({ message: 'Cliente removido com sucesso.' });
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
      res.status(500).json({ error: 'Erro ao remover cliente' });
    }
  }
    */
}

module.exports = new ClienteController();
