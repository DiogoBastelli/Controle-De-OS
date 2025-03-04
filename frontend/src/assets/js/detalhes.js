document.addEventListener('DOMContentLoaded', function () {
    let params = new URLSearchParams(window.location.search);
    let clienteId = params.get('idCliente');
    let produtoId = params.get('idProduto');
    let OsId = params.get('OsId');

    if (clienteId && produtoId && OsId) {
        console.log("ID do Cliente:", clienteId);
        console.log("ID do Produto:", produtoId);
        console.log("ID do Produto:", OsId);
        pesquisarDetalhesCliente(clienteId);
        pesquisarDetalhesProduto(produtoId)
        pesquisarDetalhesOs(OsId)
    } else {
        console.error("Parâmetros não encontrados na URL");
    }
});

function pesquisarDetalhesCliente(CpfCliente) {
    fetch(`http://localhost:3000/api/cliente/cpf/${CpfCliente}`)  
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar cliente: ${response.statusText}`);
            }
            return response.json();
        })
        .then(cliente => {
            console.log("Cliente retornado da API:", cliente); 

            if (!cliente) {
                alert("Cliente não encontrado!");
                return;
            }

            const tabelaResultPesquCliente = document.getElementById('detalhesCliente-list');
            if (!tabelaResultPesquCliente) {
                console.error("Tabela 'detalhesCliente-list' não encontrada.");
                return;
            }

            const novaLinhaPesquisa = document.createElement('tr');
            novaLinhaPesquisa.innerHTML = `
               <td colspan="4">
                <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                    <div class="me-5"> 
                        <span class="ms-5">Nome: ${cliente.nome}</span>
                        <span class="ms-5">CPF: ${cliente.cpf}</span>
                        <span class="ms-5">Endereço: ${cliente.endereco}</span>
                        <span class="ms-5">Telefone: ${cliente.telefone}</span>
                    </div>
                </div>
            </td>
            `;
            tabelaResultPesquCliente.appendChild(novaLinhaPesquisa);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Cliente não encontrado ou erro na API.');
        });
}

function pesquisarDetalhesProduto(osIdProd) {
    fetch(`http://localhost:3000/api/produto/${osIdProd}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar produto');
            }
            return response.json();
        })
        .then(produtos => {
            console.log("Produto retornado da API:", produtos); 
            const produto = produtos[0];
        
            const tabelaResultadoPesquisa = document.getElementById('detalhesProduto-list');
            if (!tabelaResultadoPesquisa) {
                console.error("Tabela 'detalhesProduto-list' não encontrada.");
                return;
            }

            const novaLinhaPesquisa = document.createElement('tr');
            novaLinhaPesquisa.innerHTML = `
                <td colspan="4">
                    <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                        <div class="me-5"> 
                            <span class="ms-5">Produto: ${produto.tipo}</span>
                            <span class="ms-5">Modelo: ${produto.modelo}</span>
                            <span class="ms-5">Número de série: ${produto.NumSerie}</span>
                        </div>
                    </div>
                </td>
            `;
            tabelaResultadoPesquisa.appendChild(novaLinhaPesquisa);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar os dados do produto.');
        });
}

function pesquisarDetalhesOs(idPesquisaOs) {
    fetch(`http://localhost:3000/api/os/${idPesquisaOs}`) 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar OS');
        }
        return response.json();
    })
    .then(os => {
        console.log("OS retornada da API:", os); 
        const tabelaResultadoPesquisa = document.getElementById('detalhesOs-list');
        if (!tabelaResultadoPesquisa) {
            console.error("Tabela 'detalhesOs-list' não encontrada.");
            return;
        }

        const novaLinhaPesquisa = document.createElement('tr');
        novaLinhaPesquisa.innerHTML = `
         <td colspan="4">
            <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                <div class="me-5"> 
                    <span class="ms-3">Os: ${os.id}</span>
                    <span class="ms-5">Defeito: ${os.defeito}</span>
                    <span class="ms-5 status-text">Status: ${os.status}</span>
                </div>
            </div>
         </td>
        `;
        tabelaResultadoPesquisa.appendChild(novaLinhaPesquisa);

    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao carregar os dados da OS.');
    });
    }