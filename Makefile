.PHONY: build-cli
build-cli:
	@echo "Building cli..."
	cd server-workspace/cli && go build -o ../../bin/via-cli

.PHONY: build-extention
build-extention:
	@echo "Building extension..."
	cd extension && pnpm i && pnpm compile