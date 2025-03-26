document.addEventListener('DOMContentLoaded', function () {
    let params = new URLSearchParams(window.location.search);
    let clienteId = params.get('idCliente');
    let produtoId = params.get('idProduto');
    let osId = params.get('OsId');

    if (clienteId && produtoId && osId) {
        pesquisarDetalhesCliente(clienteId);
        pesquisarDetalhesProduto(produtoId, osId)
        pesquisarDetalhesOs(osId)
        
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
            if (!cliente) {
                alert("Cliente não encontrado!");
                return;
            }

            const tabelaResultPesquCliente = document.getElementById('detalhesCliente-list');

            const novaLinhaPesquisa = document.createElement('tr');
            novaLinhaPesquisa.innerHTML = `
               <td colspan="4">
                    <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras">
                        <div class="d-flex flex-wrap">
                            <div class="w-100 d-flex">
                                <span class="flex-grow-1"><strong>Nome:</strong> ${cliente.nome}</span>
                                <span class="flex-grow-1"><strong>CPF:</strong> ${cliente.cpf}</span>
                                <span class="flex-grow-1"><strong>Endereço:</strong> ${cliente.endereco}</span>
                            </div>
                            <div class="w-100 d-flex mt-2">
                                <span class="flex-grow-1"><strong>Telefone:</strong> ${cliente.telefone}</span>
                                <span class="flex-grow-1"><strong>Bairro:</strong> ${cliente.bairro}</span>
                                <span class="flex-grow-1"><strong>Complemento:</strong> ${cliente.complemento}</span>
                                <span class="flex-grow-1"><strong>Cidade:</strong> ${cliente.cidade}</span>
                            </div>
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

function pesquisarDetalhesProduto(idProduto, idOs) {
    Promise.all([
        fetch(`http://localhost:3000/api/produto/${idProduto}`).then(res => res.json()),
        fetch(`http://localhost:3000/api/os/${idOs}`).then(res => res.json())
    ])
    .then(([produtos, os]) => {

        const produto = produtos[0]; 
        const tabelaResultadoPesquisa = document.getElementById('detalhesProduto-list');

        const novaLinhaPesquisa = document.createElement('tr');
        novaLinhaPesquisa.innerHTML = `
            <td colspan="4">
                <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras">
                    <div class="d-flex flex-wrap">
                        <div class="w-100 d-flex justify-content-between">
                            <span><strong>Produto:</strong> ${produto.tipo}</span>
                            <span><strong>Modelo:</strong> ${produto.modelo}</span>

                            <span><strong>Número de série:</strong> ${produto.NumSerie}</span>
                            <span><strong>Defeito:</strong> ${os.defeito}</span>
                        </div>
                    </div>
                </div>
            </td>
        `;
        tabelaResultadoPesquisa.appendChild(novaLinhaPesquisa);
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao carregar os dados.');
    });
}

function pesquisarDetalhesOs(idOs) {
    fetch(`http://localhost:3000/api/os/${idOs}`) 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar OS');
        }
        return response.json();
    })
    .then(os => {
        const tabelaResultadoPesquisa = document.getElementById('detalhesOs-list');

        const novaLinhaPesquisa = document.createElement('tr');
        novaLinhaPesquisa.innerHTML = `
        <td colspan="4">
            <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras">
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <span><strong>OS:</strong> ${os.id}</span>
                    <span class="status-text"><strong>Status:</strong> ${os.status}</span>
                    <span class="status-text"><strong>Orcamento:</strong> ${os.orcamento}</span>
                    <span><strong>Data:</strong> ${os.dataFormatada}</span>
                    <span class="status-text"><strong>Horário:</strong> ${os.horaFormatada}</span>
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