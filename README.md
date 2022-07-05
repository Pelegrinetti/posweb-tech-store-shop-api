# Tech Store / Shop API

> Projeto semestral do curso de pós graduação.

A Shop API tem como objetivo gerenciar compras e produtos relacionados a Tech Store.

## Requisitos

### Rodando em sua máquina:

- NodeJS;
- Yarn;
- Mysql.

### Usando Docker

- Docker Compose;
- Make.

## Como iniciar o projeto:

### Em sua máquina:

- Realize a instalação das dependências;

```sh
yarn install
```

- Execute as migrations do projeto;

```sh
yarn prisma migrate deploy
```

- Inicie a aplicação.

```sh
yarn start-dev
```

### Com Docker

- Instale o plugin do Docker Compose, [referência](https://docs.docker.com/compose/install/compose-plugin/);
- Suba os serviços;

```sh
docker compose up
```

- Rode as migrations.

```sh
make run-migrations
```
