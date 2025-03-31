.PHONY: build-cli
build-cli:
	@echo "Building cli..."
	cd server-workspace/cli && go build -o ../../bin/via-cli

.PHONY: build-extention
build-extention:
	@echo "Building extension..."
	cd extension && pnpm compile

.PHONY: test-core
test-core:
	@echo "Testing core..."
	cd server-workspace && go test ./core/... 

.PHONY: test-cli
test-cli:
	@echo "Testing cli..."
	cd server-workspace && go test -count=5 ./cli/... 

.PHONY: build-all
build-all:
	@echo "Building all..."
	make build-cli
	make build-extention

.PHONY: test-all
test-all:
	@echo "Testing all..."
	make test-core
	make test-cli


