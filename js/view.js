const View = (() => {
    const listaProdutos = document.getElementById("lista-produtos");
    const itensCarrinho = document.getElementById("itens-carrinho");
    const nomeInput = document.getElementById("nome-produto");
    const precoInput = document.getElementById("preco-produto");
    const totalQuantidade = document.getElementById("total-quantidade");
    const totalValor = document.getElementById("total-valor");

    // Renderiza produtos na página
    const renderProdutos = (produtos) => {
        listaProdutos.innerHTML = ""; // limpa antes de renderizar

        produtos.forEach(p => {
            const card = document.createElement("div");
            card.className = "produto-card";
            card.innerHTML = `
                <span class="badge">Novo</span>
                <h3>${p.nome}</h3>
                <p class="preco">MT ${p.preco.toFixed(2)}</p>
                <button class="btn-add" data-id="${p.id}">
                    <i class="fa fa-cart-plus"></i> Adicionar
                </button>
            `;
            listaProdutos.appendChild(card);

            // Remove badge depois de 3 segundos
            const badge = card.querySelector(".badge");
            setTimeout(() => {
                if(badge) badge.remove();
            }, 3000);
        });
    };

    // Renderiza itens do carrinho
    const renderCarrinho = (carrinho, resumo) => {
        itensCarrinho.innerHTML = carrinho.map(item => `
            <div class="item-carrinho">
                <span>${item.nome} (x${item.quantidade})</span>
                <span>MT ${(item.preco * item.quantidade).toFixed(2)}</span>
                <button class="btn-remove" data-id="${item.id}">
                    <i class="fa fa-trash"></i> Remover
                </button>
            </div>
        `).join("");

        totalQuantidade.textContent = resumo.totalQuantidade;
        totalValor.textContent = resumo.totalValor.toFixed(2);
    };

    // Limpa os campos do formulário
    const limparCamposFormulario = () => {
        nomeInput.value = "";
        precoInput.value = "";
        nomeInput.focus();
    };

    // Mostra mensagem de erro ou sucesso como toast
    const mostrarToast = (msg, tipo = "sucesso") => {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = msg;
        toast.style.background = tipo === "erro" ? "#e74c3c" : "#27ae60";
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    };

    const mostrarMensagemErro = (msg) => mostrarToast(msg, "erro");
    const mostrarMensagemSucesso = (msg) => mostrarToast(msg, "sucesso");

    return {
        renderProdutos,
        renderCarrinho,
        limparCamposFormulario,
        mostrarMensagemErro,
        mostrarMensagemSucesso
    };
})();
