# Platform

Frontend & Backend Monorepo built using Bun, Turborepo, Next.js and Nest.js

![GitHub contributors](https://img.shields.io/github/contributors/jakofakt-cz/platform)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/jakofakt-cz/platform)
![GitHub Repo stars](https://img.shields.io/github/stars/jakofakt-cz/platform?style=flat)
![GitHub forks](https://img.shields.io/github/forks/jakofakt-cz/platform?style=flat)

[Prerequisites](#-prerequisites)
[Installation](#-how-to-install)
[Repository Structure](#-repository-structure)
[Testing & Deployment](#-how-to-test--deploy)
[Contributing](#-contributing)

---

## ⚙️ Prerequisites

- [Bun](https://bun.sh) >= 1.3.0 (optionally latest)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (optional, for tooling compatibility)

---

## 🪛 How to install?

Before you start to use the repo, you need to download dependencies.
You can do that by running command below.

> 💡 *Tip:* You can also run this command if you're missing dependencies and have already used the repo.

```bash
bun install
```

&nbsp;
### Updating dependencies
If you need to update dependencies, you can use command below

```bash
bun update
```

---

## 🏗️ Repository Structure

Before starting to work in the repository, it's essential to understand it's structure to keep things clean and simple.

```

/apps
├─── frontend # Next.js Application
└─── backend # Nest.js Application
```

---

## 🖥️ How to test & deploy?

### 🧪 Deploying locally (for testing purposes)

Deploying locally is generally used for testing purposes and is not intended to be used in production in any way. 
We have already setupped areas where are services deployed. currently you can change frontend's in the command script and backend's in `src/main.ts` file by changing the const value.

- Frontend is deployed on port 3000 (increments automatically if port is used)
- Backend is deployed on port 4000

> 💡 *Tip:* This command is alias of `turbo dev`.
> 
```bash
bun dev
```

&nbsp;

### 🌐 Deploying into production

Deploying into production is automatic and shouldn't really be required for doing anything beside that. 
Both repos have individual ways of deploying into production.

#### Frontend

```bash
bun --filter 'frontend' build
```

#### Backend

```bash
bun --filter 'backend' start:prod
```

---

## 🤝 Contributing
We're open to any contributions. Please open an issue if you'd like to suggest a change or report a bug.
If you have any suggested changes, please open a pull request. There are few rules to the contributing though.

1. Be respectful to others (especially contributors, as they do it in their free time)
2. Try to be specific
3. In case of any PR's, you need to follow [Conventional Commits Stylesheet](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)
4. Respect project's license, you can see more about license below
5. Maintainer is anyone who is in the **Core** Team

### 🧾 License
This repository is licensed under the **AGPL-3.0 license** - see [LICENSE](./LICENSE) file for details. 

&nbsp;

### 🙌 Contributors
Thanks to all our amazing contributors!

[![Contributors](https://contrib.rocks/image?repo=jakofakt-cz/platform)](https://github.com/jakofakt-cz/platform/graphs/contributors)