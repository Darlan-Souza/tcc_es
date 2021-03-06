const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/tcc")
const Trabalho = mongoose.model("trabalhos")

//Sessão de cadastro de trabalhos
router.get('/exibir_todos', function (req, res) {
  Trabalho.find().sort({ date: 'desc' }).then((trabalhos) => {
    res.render("tcc/exibir_todos", { trabalhos: trabalhos })
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao listar as categorias")
    res.redirect("/tcc")
  })
})

router.get('/cadastro', (req, res) => {
  res.render("tcc/cadastro")
})

router.get('/index', function (req, res) {
  res.render("tcc/index")
})

router.get('/exibir_todos', function(req, res){
  res.render("tcc/exibir_todos")
})

router.get('/pesquisa_tcc', function (req, res) {
  res.render("tcc/pesquisa_tcc")
})

router.get('/cronograma', function (req, res) {
  res.render("tcc/cronograma")
})

router.post('/cadastro/novo', (req, res) => {

  const novoTrabalho = {
    titulo: req.body.titulo,
    tema: req.body.tema,
    assunto: req.body.assunto,
    resumo: req.body.resumo,
    orientador: req.body.orientador,
    orientando: req.body.orientando,
    local: req.body.local,
    membros: req.body.membros,
    data: req.body.data
  }

  new Trabalho(novoTrabalho).save().then(() => {
    //Passando a mensagem para a variavel global
    req.flash("success_msg", "Categoria criada com sucesso!")
    res.redirect("/tcc/exibir_todos")
  }).catch((err) => {
    //Passando a mensagem para a variavel global
    req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!" + err)
    res.redirect("/tcc/exibir_todos")
  })
})

//Editar tcc
router.get("/cadastro/edit/:id", (req, res) => {
  Trabalho.findOne({ _id: req.params.id }).then((trabalho) => {
    res.render("tcc/editar", { trabalho: trabalho })
  }).catch((err) => {
    req.flash("error_msg", "Este trabalho não existe!")
    res.redirect("/tcc/exibir_todos")
  })
})

router.post("/cadastro/edit", (req, res) => {
  Trabalho.findOne({ _id: req.body.id }).then((trabalho) => {

    trabalho.titulo = req.body.titulo,
      trabalho.tema = req.body.tema,
      trabalho.assunto = req.body.assunto,
      trabalho.resumo = req.body.resumo,
      trabalho.orientador = req.body.orientador,
      trabalho.orientando = req.body.orientando,
      trabalho.local = req.body.local,
      trabalho.membros = req.body.membros,
      trabalho.data = req.body.data

    trabalho.save().then(() => {
      req.flash("success_msg", "Trabalho editado com sucesso!")
      res.redirect("/tcc/exibir_todos")
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao salvar a edição do trabalho!")
      res.redirect("/tcc/exibir_todos")
    })

  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao editar o trabalho")
    res.redirect("/tcc/exibir_todos")
  })

})

router.post("/cadastro/deletar", (req, res) => {
  Trabalho.remove({ _id: req.body.id }).then(() => {
    req.flash("success_msg", "Trabalho deletado com sucesso!")
    res.redirect("/tcc/exibir_todos")
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao deletar o trabalho!")
    res.redirect("/tcc/exibir_todos")
  })
})

//Sempre fica por ultimo
module.exports = router 