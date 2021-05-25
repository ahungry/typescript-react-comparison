# typescript-react-comparison

Comparison benchmarks for various SPA setups using typescript+react.

Initially planning to test:

- Create React App (Typescript) - crat
- fusebox-crat
- craco-swc

Will track install steps, disk usage, and build time/performance for
both the basic CRA app, as well as a very file-heavy build with many
includes/type checks.

## Notes
crat is the only one that does type checking - fusebox is fast because
it doesn't do type checking.  Likewise with swc.  This may be fine for
a faster build/bundle step, if there is a different tsc type checking
step that occurs.

# Setup steps for each
## crat

```sh
npm i -g create-react-app
create-react-app crat --template typescript
```

## fusebox-crat

```sh
npm i -g fuse-box-create-react-app
create-react-app fusebox --template fuse-box-react-scripts-ts
```

## craco-swc
https://jwchang0206.medium.com/make-create-react-app-faster-with-rust-6c75ffa8fdfd

```sh
npm i -g create-react-app@3.3.0
create-react-app craco-swc --template typescript
cd craco-swc
yarn add -D @craco/craco craco-swc @swc/core @swc/cli @swc/helpers
cp ../craco.config.js ./ # Obtained from medium post, minor adjustment required
cp ../.swcrc ./ # Obtained from swc.rs and adjusted
# Edit package.json script sections from "react-scripts" to "craco"
```


# Benchmarks

## Disk usage
### crat
341M node_modules

### fusebox-crat
168M node_modules

### craco-swc
470M node_modules

## Build time (for spinning react logo page from crat)
### crat
27.703 seconds

### fusebox-crat
41.109 seconds

### craco-swc
22.152 seconds

## Build sizes
### crat
572K

### fusebox-crat
272K

### craco-swc
568K
