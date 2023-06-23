function concurrentTask(concurrency, taskFn) {
  let running = 0;
  const queen = [];

  function run(task) {
    running++;
    const [ctx, args, resolve, reject] = task || queen.shift();
    Promise.resolve(taskFn.apply(ctx, args))
      .finally(() => {
        running--;
        queen.length && run();
      })
      .then(resolve, reject);
  }

  return function (...args) {
    const ctx = this;
    return new Promise((resolve, reject) => {
      const task = [ctx, args, resolve, reject];
      running < concurrency ? run(task) : queen.push(task);
    });
  };
}

export default concurrentTask;
