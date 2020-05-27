let state = {
  name: '风影嘎拉',
  color: '#f00',
}
function render(obj) {
  const dom = document.getElementById('root')
  dom.innerHTML = obj.name
  dom.style.color = obj.color
}
render(state)
