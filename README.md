# 
# BBD NEXUS APIs

This is a simple fastify wrapper of the NEXUS API.

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Contributing](#contributing)

## About <a name = "about"></a>

This project is just wrapper, which calls the underlying  `SSN and IRS` for getting data from existing data  sources. 

## Getting Started <a name = "getting_started"></a>

Now you can start using this wrapper by installing it via npm/yarn:

1. just clone the repo and install dependencies.
2. you can also view swagger documentation at `http://localhost:3000/docs`


⚠️ Rate limitting is implemented on this wrapper, so that you don't blow of your systems, you can increase or remove it from in `app.ts`  file. 

### Prerequisites

What things you need to install the software and how to install them.

```
node >= 18 
```

### Installing



```
yarn
```

And run it for local env

```
yarn dev
```

## Contributing <a name = "contributing"></a>

Pull requests are welcome. This is small project we can make something good out of it.
