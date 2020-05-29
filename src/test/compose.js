function add1(str) {
  return '1' + str;
}
function add2(str) {
  return '2' + str;
}
function add3(str) {
  return '3' + str;
}
console.log(add3(add2(add1('hello'))));

function compose(...fns) {
  if (fns.length === 0) return (args) => args;
  if (fns.length === 1) return (...args) => fns[0](...args);
  // 1. 第一种写法
  // return function (...args) {
  //   let last = fns.pop();
  //   let value = last(...args);
  //   return fns.reduceRight((current, fn) => fn(current), value);
  // };
  // 第二种写法
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}

console.log(compose(add1, add2, add3)('hello'));
