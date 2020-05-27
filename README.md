# 1. Redux 应用场景

- 随着 JavaScript 单页应用开发日趋复杂,管理不断变化的 state 非常困难
- Redux 的出现就是为了解决 state 里的数据问题
- 在 React 中，数据在组件中是单向流动的
- 数据从一个方向父组件流向子组件(通过 props)，由于这个特征，两个非父子关系的组件（或者称作兄弟组件）之间的通信就比较麻烦

# 2. 设计思想

- Redux 是将整个应用状态存储到一个地方， 成为 store, 里边保存一棵状态树（state tree）
- 组件可以派发 dispatch 行为（action） 给 store， 而不是直接通知其它组件
- 组件可以通过订阅 store 中的状态（state） 来刷新自己的试图

# 3. Redux 三原则

- 整个应用的 state 被存储在 一颗 object tree 中， 并且这个 object tree 只存在于唯一 一个 store 中
- State 是只读的， 唯一改变 state 的方法， 就是触发 action， action 是一个用于描述已发生事件的普通对象， 使用纯函数来执行修改， 为了描述 action 如何改变 state tree， 就需要编写 reducers
- 单一数据源的设计让 React 组件之间的通信更加方便，便于状态的统一管理

# 4. 20 行代码一步步，手写 redux
