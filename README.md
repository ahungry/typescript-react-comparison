# typescript-react-comparison

Comparison benchmarks for various SPA setups using typescript+react.

Initially planning to test:

- Create React App (Typescript) - crat
- craco-swc
- fuse-box (v4 - new as of 2021)

Will track install steps, disk usage, and build time/performance for
both the basic CRA app, as well as a very file-heavy build with many
includes/type checks.

## Notes/Findings
crat is the only one that does type checking - fuse-box is fast because
it doesn't do type checking.  Likewise with swc.  This may be fine for
a faster build/bundle step, if there is a different tsc type checking
step that occurs (likely as tests run or prior to them running).

crat and craco-swc seem to suffer from using babel or webpack or w/e
they still use under the hood, while fuse-box avoids this.

swc is supposed to be much faster than typescript (because it's
written in Rust?) - but I think it's most likely because they don't
typecheck at all (the entire point of typescript).  If you didn't want
type checks, maybe just write in JS to begin with?


# Setup steps for each
## crat

```sh
npm i -g create-react-app
create-react-app crat --template typescript
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

## fuse-box

```sh
git clone git@github.com:fuse-box/react-example.git fuse-box
cd fuse-box
yarn
```


# Benchmarks

## Disk usage
### crat
341M node_modules

### fuse-box
224M node_modules

### craco-swc
470M node_modules

## Build time (for spinning react logo page from crat, or same with 500 deep import chain)
### crat
27.703 seconds /
28.501 seconds (500 chain) /
104.36 seconds (500 chain repeated 3 times) /

### fuse-box
5.8 seconds /
10.339 seconds (500 chain) /
16.504 seconds (500 chain repeated 3 times) /

### craco-swc
22.152 seconds /
39.574 (500 chain) /
65.48 (500 chain repeated 3 times) /

## Build sizes
### crat
572K /
812K (500 chain) /
1.3M (500 chain repeated 3 times) /

### fuse-box
228K /
436K (500 chain) /
816K (500 chain repeated 3 times) /

### craco-swc
568K /
824K (500 chain) /
1.3M (500 chain repeated 3 times) /

# Notes

Script to generate a bunch of crap chained include files:

```sh
for f in {1..1000}; do echo -en "import * as React from 'react'\nimport X from './x$(echo $f+1|bc -q)'\nexport default class Y extends React.Component {render() { return <span><X />$f</span>; }}\n" > x$f.tsx; done
```

Modify the final file (x499.tsx) and ensure it stops the chained imports.

Seems we must stop at 500 or we get "too much recursion" error in react.
