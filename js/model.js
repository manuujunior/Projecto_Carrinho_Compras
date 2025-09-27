const Model = (() => {
    let produtos = [];
    let carrinho = [];

    // Adiciona um novo produto à lista
    const adicionarProduto = (nome, preco) => {
        const id = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;
        produtos.push({ id, nome, preco });
    };

    // Retorna todos os produtos
    const getProdutos = () => produtos;

    // Adiciona um produto ao carrinho
    const adicionarAoCarrinho = (id) => {
        const produto = produtos.find(p => p.id === id);
        if (!produto) return;

        const item = carrinho.find(p => p.id === id);
        if (item) {
            item.quantidade += 1;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
    };

    // Remove um produto do carrinho
    const removerDoCarrinho = (id) => {
        const index = carrinho.findIndex(p => p.id === id);
        if (index !== -1) {
            carrinho[index].quantidade -= 1;
            if (carrinho[index].quantidade <= 0) {
                carrinho.splice(index, 1);
            }
        }
    };

    // Limpa o carrinho
    const limparCarrinho = () => {
        carrinho = [];
    };

    // Retorna itens do carrinho
    const getCarrinho = () => carrinho;

    // Calcula resumo do carrinho
    const calcularResumo = () => {
        const totalQuantidade = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
        const totalValor = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
        return { totalQuantidade, totalValor };
    };

    return {
        adicionarProduto,
        getProdutos,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        getCarrinho,
        calcularResumo
    };
})();
