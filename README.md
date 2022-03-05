<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://e7.pngegg.com/pngimages/810/874/png-clipart-computer-icons-google-compute-engine-google-cloud-platform-cloud-computing-id8-civil-engineer-blue-text.png" alt="Project logo"></a>
</p>

<h3 align="center">Exemplo - Microservice PUB/SUB GPC</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/SDEverton/iclinic_test/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/SDEverton/iclinic_test/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Descrição do projeto
    <br> 
</p>

## 📝 Índice

- [Sobre](#about)
- [Instalação](#getting_started)
- [Autor](#authors)

## 🧐 Sobre <a name = "about"></a>

Com o objetivo de testar os recursos que o ambiente GCP nos proporciona para Microservice, criei um pequeno exemplo de como usar o PUB/SUB + o Storage permitindo o acesso público de um arquivo, decidindo isso dentro da aplicação. Para isso criei 2 projetos, um para receber uma imagem via HTTP transformando esta para base64 e inscrevendo essa informação em um tópico que é lido pelo segundo projeto por meio de um subscribe onde é removida a cor da imagem inserindo um texto sobre a mesma inscrevendo esta novamente em um outro tópico que é devolvido para o primeiro projeto que exibe a url da imagem dentro do Storage da GCP com as devidas alterações.


## 🏁 Iniciando <a name = "getting_started"></a>

### Pré-requisitos

- [NodeJS](https://nodejs.org/en/)
- [Conta na GCP](https://console.cloud.google.com/)

### Principais técnologias envolvidas (libs e outros)

Dotenv
Express
Pub/Sub (GCP)
Storage (GCP)
Multer
Sharp

### Startando aplicação

Para iniciar as aplicações basta criar uma arquivo .env servindo como base o arquivo .env.example, adicionar os dados conforme ambiente criado na GCP. 

Obs: será necessário adicionar as permissões na máquina conforme tutorial (https://medium.com/@gcbrandao/autentica%C3%A7%C3%A3o-no-google-cloud-platform-usando-gcloud-e-java-com-springboot-5350fec33079)

```
yarn or npm i

yarn dev or npm run dev
```

```
http://localhost:3333/profile
```

## ✍️ Autor <a name = "authors"></a>

- [Everton Oliveira](https://github.com/SDEverton)
