# Variables
COMPOSE=docker-compose
BACKEND_DIR=backend
FRONTEND_DIR=frontend

# Colors for terminal output
GREEN=\033[0;32m
NC=\033[0m # No Color

.PHONY: help build up down restart logs clean status test-backend

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

# --- Docker Commands ---

build: ## Build images and compile the Spring Boot JAR
	@echo "$(GREEN)Building Spring Boot JAR...$(NC)"
	cd $(BACKEND_DIR) && ./mvnw clean package -DskipTests
	@echo "$(GREEN)Building Docker containers...$(NC)"
	$(COMPOSE) build

up: ## Start the application in detached mode
	@echo "$(GREEN)Starting the full stack...$(NC)"
	$(COMPOSE) up -d

down: ## Stop and remove containers
	@echo "$(GREEN)Stopping containers...$(NC)"
	$(COMPOSE) down

restart: down up ## Restart the application

logs: ## View logs from all containers
	$(COMPOSE) logs -f

status: ## Check container status
	$(COMPOSE) ps

# --- Utility Commands ---

clean: ## Remove Docker volumes and target folders
	@echo "$(GREEN)Cleaning up...$(NC)"
	$(COMPOSE) down -v
	rm -rf $(BACKEND_DIR)/target
	rm -rf $(FRONTEND_DIR)/dist

# --- CI/CD & Testing ---

test-backend: ## Run Spring Boot Unit Tests
	cd $(BACKEND_DIR) && ./mvnw test

db-shell: ## Access the MySQL Shell inside Docker
	docker exec -it mysql-db mysql -u root -ppassword