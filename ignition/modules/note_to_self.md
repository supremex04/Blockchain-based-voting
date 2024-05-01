```
Incompatible modifications
There are certain modifications one can make to a Future definition that would make the new version incompatible with the previous one if the previous one has already been partially or completely executed. This would lead to Hardhat Ignition being unable to continue your deployment from where it was left off. Read the Reconciliation guide to learn more about this.
```

```
In the above case, or if you simply want to start over, you can use the --reset option to clear the previous deployment and start from scratch:

```

```
npx hardhat ignition deploy ignition/modules/Apollo.ts --network localhost --reset
```