# POWERSCRAPER
This is a remake to my my PowerGui/PowerScraper(I really need to get better at naming these things) but uses the mobile powerschool api instead

## Getting Started

Clone the repo and to install packages

```bash
pnpm install
```


Then, run the development server:

```bash
pnpm dev
```
Then use [Key-Finder](https://github.com/amaheshwari01/Key-Finder/) to find your refresh token and paste it into the website

To build for IOS
```bash
pnpm run build && npx cap copy && npx cap open ios
```