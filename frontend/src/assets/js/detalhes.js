document.addEventListener('DOMContentLoaded', function () {
    let params = new URLSearchParams(window.location.search);
    let osId = params.get('id'); 

    if (osId) {
        console.log("ID da OS:", osId);
        pesquisarDetalhesCliente(osId);
    } else {
        console.error("ID não encontrado na URL");
    }
});

function pesquisarDetalhesCliente(osId) {
    console.log("Buscando detalhes da OS:", osId);
    fetch(`http://localhost:3000/api/cliente/${osId}`) 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar cliente');
        }
        return response.json();
    })
    .then(clientes => {
        console.log("cliente retornado da API:", clientes); 
        const cliente = clientes[0];
    
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
                    <span class="ms-3">${cliente.id}</span>
                    <span class="ms-5">${cliente.nome}</span>
                    <span class="ms-5">${cliente.cpf}</span>
                    <span class="ms-5">${cliente.endereco}</span>
                    <span class="ms-5">${cliente.telefone}</span>
                </div>
            </div>
        </td>
        `;
        tabelaResultPesquCliente.appendChild(novaLinhaPesquisa);
    
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao carregar os dados do produto.');
    });
}
