# typescript-react-comparison

Comparison benchmarks for various SPA setups using typescript+react.

Initially planning to test:

- Create React App (Typescript) - CRAT
- Fusebox
- CRACO + SWC

# Setup steps for each

## CRAT

```sh
npx create-react-app crat --template typescript
```

# Benchmarks

## Disk usage
### CRAT
341M node_modules

### Fusebox
168M node_modules

## Build time (for spinning react logo page from CRAT)
### CRAT
27.703 seconds

### Fusebox
41.109 seconds

## Build sizes
### CRAT
572K

### Fusebox
272K
