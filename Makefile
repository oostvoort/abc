deploy-client:
	cd packages/client && pnpm build
#	pnpm version patch
#	git add package.json
#	git commit -m "chore: bump version to $(jq -r '.version' package.json)"
	rsync -avrz packages/client/dist devtest-localserver:~/auto-battle-cards/

build-web-dojo:
	cp packages/contracts-dojo/target/dev/manifest.json packages/client/manifest.json;
	node packages/client/generateComponents.cjs;
	cp packages/client/output.ts packages/client/src/dojo/contractComponents.ts;