# Project Context & Architecture

This document provides a high-level overview of the project's architecture, technology choices, and development workflow.

## 1. Core Philosophy

This project is structured as a **monorepo** managed by **pnpm workspaces** and orchestrated by **Turborepo**. The primary goal is to maintain a full-stack application (backend API and frontend web client) within a single repository. This approach offers several advantages:

-   **Shared Code:** Easily share code, types, and configurations between the frontend and backend.
-   **Atomic Commits:** Changes across the entire stack can be made in a single commit.
-   **Simplified Dependency Management:** `pnpm` handles hoisting and linking of shared local packages.
-   **Intelligent Task Running:** Turborepo caches build/test/lint outputs, only re-running tasks on code that has changed, leading to significantly faster CI/CD and local development loops.

## 2. Technology Stack

-   **Monorepo Tooling:** [Turborepo](https://turbo.build/repo) + [pnpm Workspaces](https://pnpm.io/workspaces)
-   **Backend:** [NestJS](https://nestjs.com/) (Node.js framework)
-   **Frontend:** [SvelteKit](https://kit.svelte.dev/)
-   **Database:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Containerization:** [Docker](https://www.docker.com/) & Docker Compose

## 3. Project Structure Breakdown

### `apps/`

This directory contains the runnable applications of the monorepo.

-   `apps/api`: A **NestJS** application serving as the backend REST API. It handles business logic, database interactions, and authentication.
-   `apps/web`: A **SvelteKit** application for the frontend. It consumes data from the `api` and provides the user interface.

### `packages/`

This directory contains shared code and configurations intended to be used across different `apps`.

-   `packages/database`: A dedicated package for all database-related logic.
    -   It contains the **Prisma schema** (`schema.prisma`), which is the single source of truth for our database structure.
    -   It exports the initialized **Prisma Client**, ensuring all apps use the same database connection logic.
-   `packages/shared`: A general-purpose package for any code that needs to be shared between `apps/api` and `apps/web`. This is perfect for:
    -   TypeScript types and interfaces (e.g., API request/response shapes).
    -   Shared utility functions and constants.
-   `packages/eslint-config-custom`: A centralized ESLint configuration. Both `api` and `web` extend this configuration to ensure consistent code style and quality rules across the entire codebase.

### `tsconfig/`

This is not a traditional package but a directory holding shared TypeScript configurations. Each app/package extends a base configuration from here (`base.json`, `svelte.json`), reducing boilerplate and ensuring consistent compiler settings.

### `docker/`

This directory holds the `Dockerfile` for each service. This separation keeps the root directory cleaner and centralizes container definitions. Docker Compose files in the root directory reference these files.

## 4. Development Workflow

### Prerequisites

-   Node.js (v18+)
-   pnpm (`npm install -g pnpm`)
-   Docker & Docker Compose

### Initial Setup

1.  **Clone the repository.**
2.  **Create the root environment file:**
    ```bash
    cp .env.example .env
    ```
3.  **Fill in `.env`:** Add the `DATABASE_URL` required by Prisma and Docker.
    ```env
    # .env
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
    ```
4.  **Install dependencies:** From the root of the project, run:
    ```bash
    pnpm install
    ```
    This will install dependencies for all apps and packages and link them together.

### Running the Application

1.  **Start the database:**
    ```bash
    docker-compose up -d postgres
    ```
2.  **Run the first database migration:** This syncs your Prisma schema with the database.
    ```bash
    pnpm --filter database db:migrate
    ```
3.  **Start the development servers:**
    ```bash
    pnpm dev
    ```
    Turborepo will start the `api` (NestJS) and `web` (SvelteKit) applications concurrently in watch mode.

    -   The API will be available at `http://localhost:3000`.
    -   The frontend will be available at `http://localhost:5173`.

### Other Useful Commands

-   **Build all apps:** `pnpm build`
-   **Lint all apps:** `pnpm lint`
-   **Open Prisma Studio (GUI for your database):** `pnpm --filter database db:studio`