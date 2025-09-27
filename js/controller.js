const Controller = ((model, view) => {
    const formProduto = document.getElementById("form-produto");
    const listaProdutos = document.getElementById("lista-produtos");
    const encerrarCompraBtn = document.getElementById("encerrar-compra");

    const atualizarCarrinho = () => {
        const carrinho = model.getCarrinho();
        const resumo = model.calcularResumo();
        view.renderCarrinho(carrinho, resumo);
    };

    const atualizarProdutos = () => {
        const produtos = model.getProdutos();
        view.renderProdutos(produtos);
    };

    const init = () => {
        atualizarProdutos();

        formProduto.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome-produto").value.trim();
            const preco = parseFloat(document.getElementById("preco-produto").value);

            if (nome === "" || preco <= 0) {
                view.mostrarMensagemErro("Preencha todos os campos corretamente!");
                return;
            }

            model.adicionarProduto(nome, preco);
            view.limparCamposFormulario();
            atualizarProdutos();
            view.mostrarMensagemSucesso(`Produto "${nome}" adicionado com sucesso!`);
        });

        listaProdutos.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-add") || e.target.closest(".btn-add")) {
                const btn = e.target.closest(".btn-add");
                const id = parseInt(btn.getAttribute("data-id"));
                model.adicionarAoCarrinho(id);
                atualizarCarrinho();
                const produto = model.getProdutos().find(p => p.id === id);
                view.mostrarMensagemSucesso(`"${produto.nome}" adicionado ao carrinho!`);
            }
        });

        document.getElementById("itens-carrinho").addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-remove") || e.target.closest(".btn-remove")) {
                const btn = e.target.closest(".btn-remove");
                const id = parseInt(btn.getAttribute("data-id"));
                const produto = model.getCarrinho().find(p => p.id === id);
                model.removerDoCarrinho(id);
                atualizarCarrinho();
                view.mostrarMensagemSucesso(`"${produto.nome}" removido do carrinho.`);
            }
        });

        encerrarCompraBtn.addEventListener("click", () => {
            const carrinho = model.getCarrinho();
            if (carrinho.length === 0) {
                view.mostrarMensagemErro("O carrinho está vazio!");
                return;
            }
            view.mostrarMensagemSucesso("Compra finalizada com sucesso!");
            model.limparCarrinho();
            atualizarCarrinho();
        });
    };

    return { init };
})(Model, View);

Controller.init();
