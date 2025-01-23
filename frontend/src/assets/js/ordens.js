const btnCadastrarOs = document.getElementById('cadastrarOs');
if (btnCadastrarOs) {
  btnCadastrarOs.addEventListener('click', async function (event) {
    event.preventDefault(); // Evita o comportamento padrão do botão

    const idCliente = document.getElementById('inputIdCliente').value;
    const idProduto = document.getElementById('inputIdProd').value;
    const defeito = document.getElementById('inputDefeitoProd').value; // Adicione um campo para defeito

    if (!idCliente || !idProduto || !defeito) {
      alert('Por favor, preencha todos os campos necessários.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/os', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId: idCliente,
          produtoId: idProduto,
          defeito,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar a OS.');
      }

      const novaOs = await response.json();
      console.log('OS criada com sucesso:', novaOs);


      const tabelaOs = document.getElementById('os-list');
      if (!tabelaOs) {
        console.error("Tabela 'os-list' não encontrada.");
        return;
      }

      const novaLinha = document.createElement('tr');
      novaLinha.innerHTML = `
        <td>${novaOs.id}</td>
        <td>${novaOs.clienteNome}</td>
        <td>${novaOs.produtoModelo}</td>
        <td>${novaOs.defeito}</td>
        <td><button class="btn btn-danger btn-sm remover-item">Remover</button></td>
      `;
      tabelaOs.appendChild(novaLinha);


      alert('OS criada e adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar a OS:', error);
      alert('Erro ao criar a OS. Verifique os dados e tente novamente.');
    }
  });
}
