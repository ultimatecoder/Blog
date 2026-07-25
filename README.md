# Blog - [Jaysinh's own heed](https://ultimatecoder.github.io/Blog/)

This repository contains backend tool I use to write and publish my blog. Since begining, I have invested more time in identifying proper flow than writing blog post.

* Framework: Jekyll
* URL: https://ultimatecoder.github.io/Blog/
* Build/deploy: GitHub Actions ([`.github/workflows/`](.github/workflows)) — every pull request runs a build + link-check ([`ci.yml`](.github/workflows/ci.yml)), and pushes to `master` build and publish to GitHub Pages ([`pages.yml`](.github/workflows/pages.yml)).
