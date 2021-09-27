# Uniswap Info (V1 + V2)

[![Lint](https://github.com/Uniswap/uniswap-info/workflows/Lint/badge.svg)](https://github.com/Uniswap/uniswap-info/actions?query=workflow%3ALint)
[![Deploy](https://github.com/Uniswap/uniswap-info/workflows/Deploy/badge.svg)](https://github.com/Uniswap/uniswap-info/actions?query=workflow%3ADeploy)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Analytics site for the [Uniswap Protocol](https://uniswap.org).

Includes support for Uniswap V1 and V2. For Uniswap V3 info see <https://github.com/Uniswap/uniswap-v3-info>

### To Start Development

###### Installing dependencies

```bash
yarn
```

###### Running locally

```bash
yarn start
```

# 部署 Info 服务文档

info 服务时数据是基于 the graph 的，所以我们要先部署个 the graph 服务：

- NPM/Yarn 全局安装 truffle ganache-cli

```bash
npm install -g truffle ganache-cli
   or
yarn global add truffle ganache-cli
```

- ganache-cli 启动,这个可以放在后台运行

```bash

ganache-cli -h 0.0.0.0

```

- 下载 graph-node

```bash
git clone https://github.com/graphprotocol/graph-node/

```

- 我们部署 docker 版本的 graph-node，进入 docker 目录

```bash
cd graph-node/docker
```

- 修改链节点的地址（链节点是全节点需要有历史 state）`environment:`为节点地址

```bash
vi docker-compose.yml
```

- 修改完毕，启动 the graph 节点服务，包含了`docker_ipfs_1`,`docker_postgres_1`,`docker_graph-node_1`,三个服务，查看日志等待开始同步区块。

```bash
docker-compose up //显示日志到终端，可以加 -d 参数运行在后台
```

- 开始部署 subgraph ,子图有两个分别是`hpdex-subgraph`和`hpd-blocks`，hpdex-subgragh 是从 11850000 开始同步的（查看 subgraph.yaml 的 startBlock），这个不能改，因为咱们合约部署是在 11860000 左右，超过合约部署的高度，则会统计不全数据，当在一条新链部署时，可以根据情况来修改 startBlock。

hpb-blocks 是从 11800000 开始同步的（查看 subgraph.yaml 的 startBlock），当在一条新链部署时，可以根据当前主网的当前高度，两个礼拜前的区块高度来同步。

```bash
git clone https://github.com/hpdex-project/hpdex-subgragh.git

cd hpdex-subgragh

yarn && yarn codegen

yarn create-local

yarn deploy-local
```

```bash
git clone https://github.com/hpdex-project/hpb-blocks.git

cd hpdex-subgragh

yarn && yarn codegen

yarn create-local

yarn deploy-local
```

然后等待同步完成，

- 启动 info 项目，修改 src/apollo/client.js 的 subgraph 请求路径

下载依赖

```bash
yarn
```

启动

```bash
yarn start
```
