# contracts-dojo
These are the contracts for Starknet written with Dojo.

## Prerequisites
___
1. Install [Rust](https://www.rust-lang.org/tools/install)
2. Install [Dojo](https://book.dojoengine.org/getting-started/quick-start.html)
3. Install [Scarb](https://docs.swmansion.com/scarb/download.html)

## Running the Contracts
___
### Install Dojoup
````shell
dojoup -v nightly
````
### Run Katana
````shell
katana
````

>_Note: After successfully running the katana go to **[packages/contracts-dojo/Scarb.toml]()** and comment the **world_address** then proceed to next step._


### Deploy the contracts
````shell
scarb run init
````

_Note: After successfully running the scarb script. Uncomment the world_address again in this file **[packages/contracts-dojo/Scarb.toml]()**_

### Run torii
````shell
torii
````