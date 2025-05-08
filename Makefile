.PHONY: build-cli
build-cli:
	@echo "Building cli..."
	cd server-workspace/cli && go build -o ../../assets/bin/via-cli

.PHONY: build-extension
build-extension:
	@echo "Building extension..."
	cd extension && pnpm compile

.PHONY: test-core
test-core:
	@echo "Testing core..."
	cd server-workspace && go test ./core/src/...

.PHONY: test-store
test-store:
	@echo "Testing store..."
	cd server-workspace && go test -count=2 ./store/src/... 


.PHONY: test-service
test-service:
	@echo "Testing service..."
	cd server-workspace && go test -count=5 ./service/src/... 

.PHONY: test-cli
test-cli:
	@echo "Testing cli..."
	cd server-workspace && go test -count=5 ./cli/src/... 

.PHONY: test-api
test-api:
	@echo "Testing api..."
	cd server-workspace && go test -count=5 ./api/src/... 

.PHONY: test-website
test-website:
	@echo "Testing website..."
	cd web-workspace/apps/quick-reel-next && pnpm test



.PHONY: build-all
build-all:
	@echo "Building all..."
	make build-cli
	make build-extension

.PHONY: test-all
test-all:
	@echo "Testing all..."
	make test-core
	make test-cli
	make test-website
	make test-store
	make test-service
	make test-api


.PHONY: all
all:
	@echo "Running all..."
	make build-all
	make test-all
	

