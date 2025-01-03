document.addEventListener('DOMContentLoaded', function () {

    carregarProduto();

    //pesquisar produto
    const btnPesquisarProduto = document.getElementById('pesquisarProduto');
    if (btnPesquisarProduto) {
        btnPesquisarProduto.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do botão]
            const idPesquisaProduto = document.getElementById('inputIdProduto').value
            console.log(idPesquisaProduto)
            pesquisarProduto(idPesquisaProduto);
        });
    } 

    function pesquisarProduto(idPesquisaProduto) {
    fetch(`http://localhost:3000/api/produto/${idPesquisaProduto}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar produto');
            }
            return response.json();
        })
        .then(produtos => {
            console.log("Produto retornado da API:", produtos); 
            const produto = produtos[0];
        
            const tabelaResultadoPesquisa = document.getElementById('resultPesquisa');
            if (!tabelaResultadoPesquisa) {
                console.error("Tabela 'resultPesquisa' não encontrada.");
                return;
            }
        
            const novaLinhaPesquisa = document.createElement('tr');
            novaLinhaPesquisa.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.tipo}</td>
                <td>${produto.modelo}</td>
                <td>${produto.NumSerie}</td>
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
            alert('Ocorreu um erro ao carregar os dados do produto.');
        });
    }

    

    ///////////////////////////////////////////////////////////////////////////////////////
    //Cliente Carrinho
    const buttonAddClienteCarrinho = document.getElementById('AddCliente');
    if (buttonAddClienteCarrinho) {
        buttonAddClienteCarrinho.addEventListener('click', function (event) {
            event.preventDefault();
            alert("Clicado no bota de adicionar o cliente");
            const IdClienteCarrinho = document.getElementById('inputIdCliente').value;

            if (!IdClienteCarrinho) {
                alert('Por favor, insira o ID do cliente.');
                return;
            }
            addClienteVenda(IdClienteCarrinho);
        });
    }

    // Botão 'cadastrarProduto'
    const btncadastrarProduto = document.getElementById('cadastrarProduto');
    if (btncadastrarProduto) {
        btncadastrarProduto.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do botão]

            const tipo = document.getElementById('inputTipo').value;
            const modelo = document.getElementById('inputModelo').value;
            const NumSerie = document.getElementById('inputNumSerie').value;

            fetch('http://localhost:3000/api/produto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tipo, modelo, NumSerie })
            })
                .then(response => {
                    if (!response.ok) throw new Error('Erro na resposta da rede');
                    return response.json();
                })
                .then(data => {
                    console.log('Sucesso:', data);
                    alert('Produto cadastrado com sucesso!');
                    document.getElementById('cadastroProduto').reset();
                    carregarProduto();
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Ocorreu um erro ao cadastrar o cliente.');
                });
        });
    } else {
        
    }

    // Botão 'deleteButtonProduto'
    const buttonDeleteProduto = document.getElementById('deleteButtonProduto');
    if (buttonDeleteProduto) {
        buttonDeleteProduto.onclick = async function () {
            const produtoId = prompt("Digite o ID do Produto que deseja deletar:");
            if (produtoId) {
                const confirmDelete = confirm('Tem certeza que deseja deletar este produto?');
                if (confirmDelete) {
                    await deleteProduto(produtoId);
                    carregarProduto();
                }
            }
        };
    } else {
        console.error("Botão com ID 'deleteButtonProduto' não encontrado.");
    }

    // Funções auxiliares
    async function deleteProduto(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/produto/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Produto deletado com sucesso!');
            } else {
                alert('Erro ao deletar produto.');
            }
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    }

    function carregarProduto() {
        fetch('http://localhost:3000/api/produto')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao buscar produtos');
                return response.json();
            })
            .then(produtos => {
                const tabelaprodutos = document.getElementById('produto-list');
                if (!tabelaprodutos) {
                    console.error("Tabela 'produto-list' não encontrada.");
                    return;
                }
                tabelaprodutos.innerHTML = '';

                produtos.forEach(produto => {
                    const novaLinha = document.createElement('tr');
                    novaLinha.innerHTML = `
                        <td>${produto.id}</td>
                        <td>${produto.tipo}</td>
                        <td>${produto.modelo}</td>
                        <td>${produto.NumSerie}</td>
                        <td><button class="btn btn-info" onclick="preencherFormulario(${produto.id})">Selecionar</button></td>
                    `;
                    tabelaprodutos.appendChild(novaLinha);
                });
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao carregar a lista de produtos.');
            });
    }

    const buttonFinalizarVenda = document.getElementById('finalizarVenda');
if (buttonFinalizarVenda) {
    buttonFinalizarVenda.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do botão

        if (!clienteAssociado) {
            alert('Você precisa adicionar um cliente antes de finalizar a venda.');
            return;
        }

        const produtos = [];
        const linhasCarrinho = document.querySelectorAll('#carrinho-list tr');

        if (linhasCarrinho.length === 0) {
            alert('Adicione produtos ao carrinho antes de finalizar a venda.');
            return;
        }

        // Coleta os produtos do carrinho
        linhasCarrinho.forEach(linha => {
            const nome = linha.cells[0].innerText;
            const preco = parseFloat(
                linha.cells[1].innerText.replace('R$', '').replace(',', '.')
            );
            const quantidade = parseInt(
                linha.querySelector('input').value
            );

            produtos.push({
                nome,
                preco,
                quantidade,
                subtotal: preco * quantidade
            });
        });

        // Dados do resumo da venda
        const dadosVenda = {
            cliente: clienteAssociado,
            produtos
        };

        // Armazena os dados no localStorage
        localStorage.setItem('dadosVenda', JSON.stringify(dadosVenda));

        // Redireciona para a página de resumo
        window.location.href = 'finalizacao.html';
        });
    }


    
});