const Sonos = require('../index').Sonos
const listener = require('../').Listener
const sonos = new Sonos(process.env.SONOS_HOST || '192.168.96.56')

listener.on('ZoneGroupTopology', result => {
  console.log('Zone group topology event, got info about all current groups')
})

// Start listening for events on this sonos speaker.
listener.subscribeTo(sonos).then(result => {
  console.log('Manually subscribed to sonos events')
})

// Subscribe to the CTRL + C event and cancel the current subscribtions
process.on('SIGINT', () => {
  console.log('Hold-on cancelling all subscriptions')
  listener.stopListener().then(result => {
    console.log('Cancelled all subscriptions')
    process.exit()
  }).catch(err => {
    console.log('Error cancelling subscriptions, exit in 3 seconds  %s', err)
    setTimeout(() => {
      process.exit(1)
    }, 2500)
  })
})
