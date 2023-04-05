let subs = {}

const subscribe = (event, callback) => {
  if (!subs[event]) {
    subs[event] = []
  }
  subs[event] = [ ...subs[event], callback ]
}

const unsubscribe = event => {
  delete subs[event]
}

const publish = (event, data) => {
  if (subs[event]) {
    subs[event].forEach(callback => callback(data))
  }
}

const test = data => console.log(`a subscription, was published with: ${data}`)

subscribe('new_event', test)

publish('new_event', 'Hello world!')

unsubscribe('new_event')
