# Barebones Todo App built with multiple frameworks

This repository will contain multiple versions of the same app, so that it can be easily benchmarked later on. The main version will always be the latest version, with all the features. Alternate versions will live in alternate source folders (src-*). A brief description of the alternative is visible as a top folder (beginning with double dot) in each src folder. These are NOT the same as tagged versions, they are forks of the main app. They should normally live in their own repository, but, for learning and comparison purposes, it's easier to host them here.

Base versions, all with in-memory storage:

|          |     | modular | mono<br />(single-file) |                                                                                 |
| -------- | --- | ------- | ----------------------- | ------------------------------------------------------------------------------- |
| OOP      | .ts | xx0     | xx1                     | proper DRY Object Oriented Programming, with abstract classes and inheritance   |
| OOP      | .js | xx2     | xx3                     | same                                                                            |
| ~~OOP~~ | .js | xx4     | xx5                     | simple OOP, with lots of repeated code, but easier to understand and modularise |
| FP       | .js | xx6     | xx7                     | Functional Programming versions                                                 |
| ...      | .?  | xx8     | xx9                     | Framework-specific versions                                                     |


00x-04x - benchmarking the impact of using various types of hardware resources on performance and speed:

* **00x** : in memory
* **01x** : on disk
* **02x:** high compute
* **03x:** database
* **04x:** all resources

From here on, we'll revert to in-memory storage, to take network, I/O and compute out of the equation, and I'll incrementally add typical functionalities:

* **05x:** error handling
* **06x:** input validation/sanitisation
* **07x:** security: authentication
* **08x:** security: authorisation
* **09x:** security: crss/cqrs/others...
* **10x:** middleware: logging
* **11x:** middleware: undetermined yet
* **12x:** documentation: openApi / swagger
* **13x:** others, I was thinking about testing, but that is pre-production. We'll see.


# SETUP

Before running it, you need to install dependencies and build the app:

```sh
npm run setup

# you may need to add nodemon to $PATH:
export PATH="/Users/REPLACE.WITH.YOUR.USER.NAME/.nvm/versions/node/v20.14.0/bin:$PATH"
```

The setup script will run all these commands for you:

```sh
open --background -a Docker
rm -rf node_modules build dist out coverage package-lock.json
docker stop todo-container
docker rm todo-container || true
docker rmi todo-app || true
npm install
npm install --global nodemon
docker build --tag todo-app .
```

# RUN

After setup, pick and run the app of your choice:

```sh
# main app (runs with node)
npm run start

# main app in docker (runs with node)
npm run start:docker

# one of the alternative implementations (these start with nodemon by default)
npm run start:00
npm run start:001
npm run start:002
# ... and so on
```

## DEBUG

- to run it in dev mode, with hot reload (nodemon)

```sh
npm run start:dev
```

- to run it in debug mode, first make sure nodemon is added to your $PATH variable (only once), then run it in debug mode. On a Mac, you should do:

```sh
# debug with VSCode's debug mode or:
npm run debug
```

## K6 Testing

Grafana K6 is an open-source load testing tool that helps you do Load testing, Browser testing, Chaos/Resilience Testing, Performance and Synthetic monitoring. To achieve maximum performance, the tool itself is written in Go, embedding a JavaScript runtime allowing for easy test scripting.
Key features:

- CLI tool with developer-friendly APIs.
- Scripting in JavaScript ES2015/ES6 - with support for local and remote modules
- Checks and Thresholds - for goal-oriented, automation-friendly load testing
- Can be easily included in CI/CD pipelines
  We'll use it for:
- **Load Testing**: involves putting a constant, expected load on a system to evaluate its performance under normal conditions. It helps assess how the system behaves when subjected to typical levels of user activity.
- **Stress Testing**: involves applying a load to a system beyond its normal operational capacity to identify its breaking point or to observe how it behaves under extreme conditions. It helps identify the system's stability and robustness under heavy load.
- **Spike Testing**: involves rapidly increasing or decreasing the load on a system to evaluate its response to sudden changes in user activity. It helps assess how the system handles sudden surges or drops in traffic.
- **Endurance Testing**: involves applying a sustained load to a system over an extended period to evaluate its performance and stability under continuous operation. It helps identify memory leaks, resource exhaustion, and other issues that may arise over time.

To use it, install k6 on your machine (https://k6.io/docs/get-started/installation), then run a test with one of the following:

```sh
npm run test:normal
npm run test:stress
npm run test:spike
npm run test:endurance
```
