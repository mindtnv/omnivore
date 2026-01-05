open_ios:
	$(MAKE) -C apple open

apple_graphql_gen:
	$(MAKE) -C apple graphql_gen

apple_extension_gen:
	$(MAKE) -C apple extension_gen

android_graphql_gen:
	cp packages/api/src/generated/schema.graphql android/Omnivore/app/src/main/graphql/schema.graphqls

droid:
	@if ! [ -e android/Omnivore/app/src/main/res/values/secrets.xml ]; then \
		cp android/Omnivore/secrets.xml android/Omnivore/app/src/main/res/values/secrets.xml; \
	fi
	studio android/Omnivore

webview_gen:
	pnpm --filter @omnivore/appreader build
	cp packages/appreader/build/bundle.js apple/OmnivoreKit/Sources/Views/Resources/bundle.js
	cp packages/appreader/build/bundle.js android/Omnivore/app/src/main/assets/bundle.js

api:
	pnpm --filter @omnivore/api dev

web:
	pnpm --filter @omnivore/web dev

qp:
	pnpm --filter @omnivore/api dev_qp

content_handler:
	pnpm --filter @omnivore/content-handler build

puppeteer:
	pnpm --filter @omnivore/puppeteer-parse build

content_fetch: content_handler puppeteer
	pnpm --filter @omnivore/content-fetch build
	pnpm --filter @omnivore/content-fetch start
