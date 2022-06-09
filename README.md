# Titanium SDK Downloads Website

Production: https://downloads.titaniumsdk.com/

## Dev

	pnpm i
	pnpm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

One time:

	git remote add dokku dokku@titaniumsdk.com:downloads.titaniumsdk.com

Then to release:

	git push dokku main
