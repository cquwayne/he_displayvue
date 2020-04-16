import Paho from 'paho-mqtt'
let mqtt = {
  host: '39.108.132.71',
  port: 9001,
  options: {
    connectTimeout: 10000,
    clientId: 'browser',
    // username: 'admin',
    // password: '123',
    clean: true
  }
}
// Create a client instance
let client = new Paho.Client(mqtt.host, Number(mqtt.port), 'clientId123')
client.onConnectionLost = onConnectionLost

function subscribe (topics, callback) {
  // set callback handlers
  client.onMessageArrived = function (message) {
    if (topics instanceof Array) {
      for (let i = 0; i < topics.length; i++) {
        if (topics[i] === message['topic']) {
          callback[i](JSON.parse(message['payloadString']))
        }
      }
    } else {
      callback(JSON.parse(message['payloadString']))
    }
  }
  if (client.isConnected()) {
    // Once a connection has been made, make a subscription and send a message.
    client.subscribe(topics)
  } else {
    // connect the client
    client.connect({onSuccess: function () {
      client.subscribe(topics)
    }})
  }
}

// called when the client loses its connection
function onConnectionLost (responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log('onConnectionLost:' + responseObject.errorMessage)
  }
}

function unsubscribe (topics, callback) {
  client.unsubscribe(topics, function (message) {
    console.log(message)
  })
}

function publish (args) {
  let message = new Paho.Message(JSON.stringify(args['message']))
  message.destinationName = args['topic']
  message.retain = false
  client.send(message)
}

export default {
  subscribe (topics, callback) {
    subscribe(topics, callback)
  },
  unsubscribe (topics, callback) {
    unsubscribe(topics, callback)
  },
  publish (args) {
    publish(args)
  }
}