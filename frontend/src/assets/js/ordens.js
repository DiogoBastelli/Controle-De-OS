//botao para cadastrar o Os
const btnCadastrarOs = document.getElementById('cadastrarOs');
if (btnCadastrarOs) {
    btnCadastrarOs.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do botão

        const idCliente = document.getElementById('inputIdCliente').value;
        const idProduto = document.getElementById('inputIdProd').value;
        const defeitoProd = document.getElementById('inputDefeitoProd').value

        Promise.all([pesquisarCliente(idCliente), pesquisarProduto(idProduto)])
            .then(([cliente, produto]) => {
                const tabelaResultPesqu = document.getElementById('os-list');

                if (!tabelaResultPesqu) {
                    console.error("Tabela 'os-list' não encontrada.");
                    return;
                }

                const novaLinha = document.createElement('tr');
                novaLinha.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${produto.id}</td>
                    <td>${produto.modelo}</td>
                    <td>${defeitoProd}</td>
                `;
                tabelaResultPesqu.appendChild(novaLinha);

                const botaoRemover = novaLinha.querySelector('.remover-item');
                botaoRemover.addEventListener('click', function () {
                    removerItem(botaoRemover);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar dados:', error);
                alert('Erro ao carregar dados do cliente ou produto.');
            });
    });
}

function pesquisarCliente(idCliente) {
    return fetch(`http://localhost:3000/api/cliente/${idCliente}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar cliente');
            }
            return response.json();
        })
        .then(clientes => clientes[0]); // Retorna o primeiro cliente
}

function pesquisarProduto(idProduto) {
    return fetch(`http://localhost:3000/api/produto/${idProduto}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar produto');
            }
            return response.json();
        })
        .then(produtos => produtos[0]); // Retorna o primeiro produto
}

