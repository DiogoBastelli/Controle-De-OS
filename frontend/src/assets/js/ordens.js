document.addEventListener('DOMContentLoaded', function () {
    
  const formularioOs = document.getElementById('cadastroOSF');
  const tabelaOs = document.getElementById('os-list');

  // Botão para cadastrar uma nova OS
  const btnCadastrarOs = document.getElementById('cadastrarOs');
  if (btnCadastrarOs) {
      btnCadastrarOs.addEventListener('click', function (event) {
          event.preventDefault(); 

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
              alert('OS cadastrada com sucesso!'); 

              formularioOs.reset();

              carregarOs();
          })
          .catch(error => {
              console.error('Erro:', error);
              alert('Ocorreu um erro ao cadastrar a OS.'); 
          });
      });
  }

  // Função para carregar todas as OSs ao carregar a página
  function carregarOs() {
    fetch('http://localhost:3000/api/os') 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar OSs');
        }
        return response.json();
    })
    .then(oss => {
        
        tabelaOs.innerHTML = ''; 

        oss.forEach(os => {
            const novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
                <td colspan="4">
                    <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                        <div class="me-5"> 
                            <strong>ID: </strong>${os.id} 
                            <strong>Nome: </strong>${os.clienteNome}  
                            <strong>Produto: </strong>${os.produtoModelo} 
                            <strong>ID Produto: </strong>${os.produtoId} 
                            <strong>Defeito: </strong>${os.defeito}
                        </div>

                        <div class="form-group col-3 ms-auto ms-3"> 
                            <select id="statusOs" class="form-select bg-info">
                                <option value="aguardando-orcamento"> Aguardando Orçamento </option>
                                <option value="aprovado"> Aprovado </option>
                                <option value="nao-aprovado"> Não Aprovado </option>
                                <option value="aguardando-aprovacao"> Aguardando Aprovação </option>
                            </select>
                        </div>
                    </div>
                </td>
            `;
            tabelaOs.appendChild(novaLinha);
        });

        const tabela = document.getElementById('os-list');
        tabela.addEventListener('change', function(event) {
            if (event.target && event.target.tagName === 'SELECT') {
                mudarStatus(event.target);
            }
        });
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao carregar a lista de OSs.');
    });
    }

    //funcao para mudar status da os
    function mudarStatus(select){
        const valorSelecionado = select.value;
    
        select.classList.remove('bg-success', 'bg-danger', 'bg-info', 'bg-warning');
    
        if (valorSelecionado === 'aprovado') {
            select.classList.add('bg-success');
        } else if (valorSelecionado === 'nao-aprovado') {
            select.classList.add('bg-danger');
        } else if (valorSelecionado === 'aguardando-orcamento') {
            select.classList.add('bg-info');
        } else if (valorSelecionado === 'aguardando-aprovacao') {
            select.classList.add('bg-warning');
        }
    }
    


  // Botão para pesquisar OS 
  const btnPesquisarOs = document.getElementById('btnPesquisaOs');
  if (btnPesquisarOs) {
      btnPesquisarOs.addEventListener('click', function(event) {
          event.preventDefault();
          
          const inputIdPesquisaOs = document.getElementById('inputIdOs');
          const idOs = inputIdPesquisaOs.value;

          pesquisarOs(idOs); 
      });
  }

  function pesquisarOs(idPesquisaOs) {
    fetch(`http://localhost:3000/api/os/${idPesquisaOs}`) 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar OS');
        }
        return response.json();
    })
    .then(os => {
        console.log("OS retornada da API:", os); 
        const tabelaResultadoPesquisa = document.getElementById('resultPesquisa');
        if (!tabelaResultadoPesquisa) {
            console.error("Tabela 'resultPesquisa' não encontrada.");
            return;
        }

        const novaLinhaPesquisa = document.createElement('tr');
        novaLinhaPesquisa.innerHTML = `
            <td>${os.id}</td>
            <td>${os.clienteNome}</td>
            <td>${os.produtoId}</td>
            <td>${os.produtoModelo}</td>
            <td><button class="btn btn-danger btn-sm remover-item">Remover</button></td>
        `;
        tabelaResultadoPesquisa.appendChild(novaLinhaPesquisa);

        const botaoRemover = novaLinhaPesquisa.querySelector('.remover-item');
        botaoRemover.addEventListener('click', function () {
            removerItem(botaoRemover);
        });
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao carregar os dados da OS.');
    });
  }


  carregarOs()
});
