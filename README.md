# typescript-react-comparison

Comparison benchmarks for various SPA setups using typescript+react.

Initially planning to test:

- Create React App (Typescript) - crat
- fusebox-crat (3 year outdated fusebox template)
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

## Build time (for spinning react logo page from crat, or same with 500 deep import chain)
### crat
27.703 seconds /
28.501 seconds (500 chain)

### fusebox-crat
41.109 seconds /
66.80 seconds (500 chain)

### craco-swc
22.152 seconds /
39.574 (500 chain)

## Build sizes
### crat
572K /
812K (500 chain)

### fusebox-crat
272K /
432K (500 chain)

### craco-swc
568K /
824K (500 chain)

# Notes

Script to generate a bunch of crap chained include files:

```sh
for f in {1..1000}; do echo -en "import * as React from 'react'\nimport X from './x$(echo $f+1|bc -q)'\nexport default class Y extends React.Component {render() { return <span><X />$f</span>; }}\n" > x$f.tsx; done
```

Modify the final file (x499.tsx) and ensure it stops the chained imports.

Seems we must stop at 500 or we get "too much recursion" error in react.
