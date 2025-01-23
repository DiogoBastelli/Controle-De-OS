document.addEventListener('DOMContentLoaded', function () {
    
  const formularioOs = document.getElementById('cadastroOSF');

  // Botão para cadastrar uma nova OS
  const btnCadastrarOs = document.getElementById('cadastrarOs');
  if (btnCadastrarOs) {
      btnCadastrarOs.addEventListener('click', function (event) {
          event.preventDefault(); // Evita o comportamento padrão do botão

          // Pegando os dados do formulário
          const clienteId = document.getElementById('inputIdCliente').value;
          const produtoId = document.getElementById('inputIdProd').value;
          const defeito = document.getElementById('inputDefeitoProd').value;

          // Chamada à API para cadastrar a OS
          fetch('http://localhost:3000/api/os', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ clienteId, produtoId, defeito })
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Erro ao cadastrar a OS');
              }
              return response.json();
          })
          .then(data => {
              console.log('Sucesso:', data);
              alert('OS cadastrada com sucesso!'); // Mensagem de sucesso

              // Limpar o formulário
              formularioOs.reset();

              // Recarregar a tabela com todas as OSs
              carregarOs();
          })
          .catch(error => {
              console.error('Erro:', error);
              alert('Ocorreu um erro ao cadastrar a OS.'); // Mensagem de erro
          });
      });
  }

  // Função para carregar todas as OSs ao carregar a página
  function carregarOs() {
      fetch('http://localhost:3000/api/os') // Rota que devolve todas as OSs
          .then(response => {
              if (!response.ok) {
                  throw new Error('Erro ao buscar OSs');
              }
              return response.json();
          })
          .then(oss => {
              const tabelaOs = document.getElementById('os-list');
              tabelaOs.innerHTML = ''; // Limpa a tabela antes de preenchê-la

              // Adicionando cada OS na tabela
              oss.forEach(os => {
                  const novaLinha = document.createElement('tr');
                  novaLinha.innerHTML = `
                      <td>${os.id}</td>
                      <td>${os.clienteNome}</td>
                      <td>${os.produtoModelo}</td>
                      <td>${os.produtoId}</td>
                      <td>${os.defeito}</td>
                  `;
                  tabelaOs.appendChild(novaLinha);
              });
          })
          .catch(error => {
              console.error('Erro:', error);
              alert('Ocorreu um erro ao carregar a lista de OSs.');
          });
  }

  carregarOs()
});
