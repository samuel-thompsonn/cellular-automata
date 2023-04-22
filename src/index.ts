import printMe from './print'

function component (): HTMLDivElement {
  const element = document.createElement('div')
  const button = document.createElement('button')

  element.innerHTML = 'Hello webpack'
  button.innerHTML = 'Click me and check the console!'
  button.onclick = printMe

  element.appendChild(button)

  return element
}

document.body.appendChild(component())
