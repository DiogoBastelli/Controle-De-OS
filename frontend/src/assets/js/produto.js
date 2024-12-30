document.addEventListener('DOMContentLoaded', function () {

    carregarProduto();

    // Botão 'AddCarrinho'
    const buttonAddCarrinho = document.getElementById('AddCarrinho');
    if (buttonAddCarrinho) {
        buttonAddCarrinho.onclick = function () {
            alert("Você clicou no botão");
            const IdProdutoAddCarrinho = document.getElementById('inputIdProdutoAdd').value;

            // Verificar se o ID foi preenchido
            if (!IdProdutoAddCarrinho) {
                alert('Por favor, insira o ID do produto.');
                return;
            }
            addAoCarrinho(IdProdutoAddCarrinho);
        };
    } 

    // Função para adicionar o produto ao carrinho
    function addAoCarrinho(IdProduto) {
    fetch(`http://localhost:3000/api/produto/${IdProduto}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar produto');
            }
            return response.json();
        })
        .then(produtos => {
            // A resposta da API é um array
            const produto = produtos[0];  // Acessando o primeiro item do array

            console.log("Produto retornado da API:", produto);

            // Verificar se o produto e o campo 'preco' existem
            if (!produto || !produto.preco) {
                console.error("Campo 'preco' não encontrado:", produto);
                alert("Erro: campo 'preco' não encontrado no produto.");
                return;
            } 

            // Convertendo o preço para número se for uma string
            let preco = produto.preco;
            if (typeof preco === 'string') {
                preco = parseFloat(preco.replace(',', '.'));
            }

            alert(`Produto ${produto.nome} adicionado ao carrinho!`);

            // Definir a quantidade e calcular o subtotal
            const quantidade = 1;
            const subtotal = preco * quantidade;

            const tabelaDoCarrinho = document.getElementById('carrinho-list');
            if (!tabelaDoCarrinho) {
                console.error("Tabela 'carrinho-list' não encontrada.");
                return;
            }

            // Criar nova linha para o produto no carrinho
            const novaLinhaCarrinho = document.createElement('tr');
            novaLinhaCarrinho.innerHTML = `
                <td>${produto.nome}</td>
                <td>R$ ${preco.toFixed(2).replace('.', ',')}</td>
                <td><input type="number" class="form-control w-25" value="${quantidade}" min="1"></td>
                <td class="subtotal">R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
                <td><button class="btn btn-danger btn-sm remover-item">Remover</button></td>
            `;
            tabelaDoCarrinho.appendChild(novaLinhaCarrinho);

            const botaoRemover = novaLinhaCarrinho.querySelector('.remover-item');
            botaoRemover.addEventListener('click', function () {
                removerItem(botaoRemover); // Passa o botão como referência
            });

            // Adicionar event listener para atualizar o subtotal quando a quantidade mudar
            const inputQuantidade = novaLinhaCarrinho.querySelector('input');
            inputQuantidade.addEventListener('change', function () {
                updateSubtotal(inputQuantidade);  // Chama a função passando o input
            });

            // Atualizar o total do carrinho
            updateTotal();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar os dados do produto.');
        });
    }

    function updateSubtotal(input) {
        let row = input.closest('tr');
        let price = parseFloat(row.cells[1].innerText.replace('R$', '').replace(',', '.')); // Preço na segunda célula
        let quantity = parseFloat(input.value);
    
        if (isNaN(price) || isNaN(quantity)) {
            console.error('Preço ou quantidade inválidos');
            alert('Erro nos dados do produto.');
            return;
        }
    
        let subtotal = price * quantity;
    
        // Atualizar o subtotal na tabela
        row.cells[3].innerText = 'R$ ' + subtotal.toFixed(2).replace('.', ',');
    
        // Atualizar o total do carrinho
        updateTotal();
    }
    
    function updateTotal() {
        let total = 0;
        let subtotals = document.querySelectorAll('#carrinho-list tr td.subtotal');
    
        subtotals.forEach(function (subtotal) {
            total += parseFloat(subtotal.innerText.replace('R$', '').replace(',', '.'));
        });
    
        document.getElementById('cart-total').innerText = 'R$ ' + total.toFixed(2).replace('.', ',');
    }

    function removerItem(botao) {
        // Encontra a linha do produto
        const linha = botao.closest('tr');

        // Remove a linha do DOM
        linha.remove();

        // Atualiza o total do carrinho
        updateTotal();
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

    //funcao para adicionar o cliente ao carrinho
    let clienteAssociado = null; // Variável global para armazenar o cliente associado

function addClienteVenda(IdCliente) {
    if (clienteAssociado) {
        alert('Já existe um cliente associado ao carrinho. Remova-o antes de adicionar outro.');
        return;
    }

    fetch(`http://localhost:3000/api/cliente/${IdCliente}`)
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar cliente');
            return response.json();
        })
        .then(clientes => {
            const cliente = clientes[0]; // Pega o primeiro cliente do retorno

            if (!cliente) {
                alert('Cliente não encontrado.');
                return;
            }

            // Associa o cliente à variável global
            clienteAssociado = cliente;
            alert(`Cliente ${cliente.nome} adicionado ao carrinho!`);

            // Atualiza a tabela com os dados do cliente
            const tabelaDoCarrinhoCliente = document.getElementById('cliente-list');
            if (!tabelaDoCarrinhoCliente) {
                console.error("Tabela 'cliente-list' não encontrada.");
                return;
            }

            const novaLinhaCarrinhoCliente = document.createElement('tr');
            novaLinhaCarrinhoCliente.innerHTML = `
                <td>${cliente.nome}</td>
                <td><button class="btn btn-danger btn-sm remover-item">Remover</button></td>
            `;
            tabelaDoCarrinhoCliente.appendChild(novaLinhaCarrinhoCliente);

            // Adicionar funcionalidade de remover o cliente
            const botaoRemover = novaLinhaCarrinhoCliente.querySelector('.remover-item');
            botaoRemover.addEventListener('click', function () {
                if (confirm('Deseja realmente remover o cliente do carrinho?')) {
                    novaLinhaCarrinhoCliente.remove();
                    clienteAssociado = null; // Libera o cliente associado
                    alert('Cliente removido do carrinho.');
                }
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao buscar o cliente.');
        });
}



    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Botão 'enviarProduto'
    const buttonEnviarProduto = document.getElementById('enviarProduto');
    if (buttonEnviarProduto) {
        buttonEnviarProduto.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do botão
            const nome = document.getElementById('inputNomeProduto').value;
            const descricao = document.getElementById('inputDescricao').value;
            const preco = document.getElementById('inputPreco').value;

            fetch('http://localhost:3000/api/produto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, descricao, preco })
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
        console.error("Botão com ID 'enviarProduto' não encontrado.");
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
                        <td>${produto.nome}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.preco}</td>
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