class CaixaDaLanchonete {
    constructor() {
        this.Cardapio = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 6.20 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        ];

        this.extras = {
            chantily: 'cafe',
            queijo: 'sanduiche'
        };

       

        this.formaPagamento = ['dinheiro', 'debito', 'credito'];
    }

    validarItens(itens, formaPagamento) {
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        if (!this.formaPagamento.includes(formaPagamento)) {
            return 'Forma de pagamento inválida!';
        }

        for (let item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!this.Cardapio.find(item => item.codigo === codigo)) {
                return 'Item inválido!';
            }

            if (Number(quantidade) <= 0) {
                return 'Quantidade inválida!';
            }

            if (this.extras[codigo] && !itens.some(i => i.startsWith(this.extras[codigo]))) {
                return 'Item extra não pode ser pedido sem o principal';
            }
        }

        return null;
    }

    aplicarDesconto(formaPagamento, total) {
        if (formaPagamento === 'dinheiro') {
            total *= 0.95;
        } else if (formaPagamento === 'credito') {
            total *= 1.03;
        }
        return total;
    }

    calcularValorDaCompra(formaPagamento, itens) {
        const validacao = this.validarItens(itens, formaPagamento);
        if (validacao) return validacao;
    
        let total = 0;
        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            const cardapioItem = this.Cardapio.find(item => item.codigo === codigo);
            total += cardapioItem.valor * quantidade;
        }
    
        total = this.aplicarDesconto(formaPagamento, total);
    
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    
}
}

const caixa = new CaixaDaLanchonete();
console.log(caixa.calcularValorDaCompra('debito', ['chantily,1'])); // "Item extra não pode ser pedido sem o principal"
console.log(caixa.calcularValorDaCompra('debito', ['cafe,1', 'chantily,1'])); // "R$ 4,50"



