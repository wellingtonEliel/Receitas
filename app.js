const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Base de dados em memória
let receitas = [
    { id: 1, nome: "Bolo de Cenoura", ingredientes: ["cenoura", "farinha", "açúcar", "ovos", "fermento"], preparo: "Misture todos os ingredientes e asse." },
    { id: 2, nome: "Panqueca", ingredientes: ["farinha", "leite", "ovos", "fermento"], preparo: "Misture tudo e frite." },
];

// Rotas para API
app.get('/receitas', (req, res) => res.json(receitas));
app.get('/receitas/:id', (req, res) => {
    const receita = receitas.find(r => r.id === parseInt(req.params.id));
    receita ? res.json(receita) : res.status(404).json({ mensagem: "Receita não encontrada" });
});
app.post('/receitas', (req, res) => {
    const { nome, ingredientes, preparo } = req.body;
    const novaReceita = { id: receitas.length + 1, nome, ingredientes, preparo };
    receitas.push(novaReceita);
    res.status(201).json(novaReceita);
});
app.put('/receitas/:id', (req, res) => {
    const receita = receitas.find(r => r.id === parseInt(req.params.id));
    if (!receita) return res.status(404).json({ mensagem: "Receita não encontrada" });
    const { nome, ingredientes, preparo } = req.body;
    receita.nome = nome || receita.nome;
    receita.ingredientes = ingredientes || receita.ingredientes;
    receita.preparo = preparo || receita.preparo;
    res.json(receita);
});
app.delete('/receitas/:id', (req, res) => {
    const index = receitas.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ mensagem: "Receita não encontrada" });
    receitas.splice(index, 1);
    res.status(204).end();
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));