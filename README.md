# concurrentTask
`concurrentTask` returns a task excution function which has a concurrency limit. U can call the task excution function at anywhere in ur code repo to excute a task, and each call will get a promise returned, while the task excution concurrency is limited.

## Usage

```
$ npm install @nostroykingdom/concurrent-task
```

```js
import concurrentTask from '@nostorykingdom/concurrent-task';

const task = ([arg, ms]) => new Promise(resolve => setTimeout(() => resolve(arg), ms));

const run = concurrentTask(2, task);

run(['task1', 500]).then(console.log);
run(['task2', 1000]).then(console.log);
run(['task3', 500]).then(console.log);

// result
// task1 start
// task2 start
// 500ms later
// task1 done 
// task3 start
// console task1
// 500ms later
// task2 done
// console task2
// task3 done
// console task3

```

## License

MIT