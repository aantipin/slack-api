# Slack-api test framework
This is a [Jest](https://jestjs.io/) framework that allows you to run tests against [Slack web API](https://api.slack.com/web).

### Getting started 
Install [NVM](https://github.com/nvm-sh/nvm) and latest Node.

Install dependencies:
```shell
$ npm install
```
Run tests:
```shell
$ export TOKEN=<>
$ npm test
```
or
```shell
$ jest <filename>
```
### Features 
1. Object-oriented.
2. Validates response against [OpenAPI](https://www.npmjs.com/package/jest-openapi) spec.
3. Supports [tagging](https://www.npmjs.com/package/jest-tags?activeTab=readme).
4. Generates [Junit](https://www.npmjs.com/package/jest-junit) report.

### Future improvements and ideas
1. Integration with test management tools, for example [TestRail](https://www.npmjs.com/package/testrail-jest-reporter).
2. [Snapshot](https://jestjs.io/docs/snapshot-testing) testing. Can be used for comparing responses between different API versions or builds or environments.   
3. [Mocked](https://jestjs.io/docs/mock-functions) testing. Can be used for complex scenarios or for slow and unstable environments.  
4. [Parallel](https://jestjs.io/docs/api#testconcurrentname-fn-timeout) testing. Can be used to reduce execution time.
5. UI integration. There are number of JS UI frameworks: Nightwatch, Playwright, etc. Can be used to check UI elements or perform actions that are not available with the API.

This list can continue depending on project needs and requirements.