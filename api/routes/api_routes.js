const express = require('express')
const app = express()
const port = 3000

let apiRouter = express.Router()

const endpoint = '/api/'
const produtos_disponiveis = {
    produtos: [{
            id: 001,
            descricao: "Ração Canina Adulto",
            valor: 183.00,
            marca: "Special Dog"
        },
        {
            id: 002,
            descricao: "Brinquedo Latex Galinha",
            valor: 7.90,
            marca: "Napi"
        },
        {
            id: 003,
            descricao: "Tapete Higiênico",
            valor: 80.50,
            marca: "Super Secão"
        },
        {
            id: 004,
            descricao: "Petisco",
            valor: 15.80,
            marca: "Pedigree"
        },
        {
            id: 005,
            descricao: "Coleira Antipulgas",
            valor: 80.00,
            marca: "Scalibur"
        },
    ]
}

app.get(endpoint, function (req, res) {
    res.send('index');
})

app.get(endpoint + 'produtos', function (req, res) {
    res.status(200).json(produtos_disponiveis)
})

app.get(endpoint + 'produtos/:id', function (req, res) {
    const product = produtos_disponiveis.produtos.find(p => p.id == req.params.id)
    if (!product) {
        return res.status(404).json();
    }
    res.status(200).json(product)
})

app.put(endpoint + 'produtos/:id', function (req, res) {
    const product = req.body;
    const id = req.params.id;

    const old_product = produtos_disponiveis.produtos.find(p => p.id == req.params.id)
    const index = produtos_disponiveis.produtos.indexOf(old_product);

    produtos_disponiveis.produtos[index] = {
        ...product,
        id
    };

    res.status(200).json(product)
})

app.delete(endpoint + 'produtos/:id', function (req, res) {
    const old_product = produtos_disponiveis.produtos.find(p => p.id == req.params.id)
    const index = produtos_disponiveis.produtos.indexOf(old_product);

    if (index > -1) {
        produtos_disponiveis.produtos.splice(index, 1);
    }

    res.status(204).json()
})

app.post(endpoint + 'produtos', function (req, res) {
    const product = req.body;
    const id = produtos_disponiveis.produtos.length + 1;
    produtos_disponiveis.produtos.push({
        ...product,
        id
    });
    res.status(200).json(produtos_disponiveis)
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = apiRouter;