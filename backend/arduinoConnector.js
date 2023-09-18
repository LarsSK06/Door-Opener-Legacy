const { Board, Servo } = require('johnny-five')


class ArduinoControl extends Board {
    constructor () {
        super() // Inits Board as well
        this.on('ready', this.ready.bind(this))
        this.servo = null
        this.servoReady = false
    }
    ready() {
        this.servo = new Servo(8)
        this.servoReady = true
        console.log('Arduino ready for use') 
    }
    openDoor() {
        if (this.servo === null) 
            return 'Servo is not ready yet'
        else if (this.servoReady === false) 
            return 'Servo is already moving'
        this.servoReady = false
        this.servo.max()
        setTimeout(() => { // This is non blocking
            this.servo.min() // All this executes after time. Code below continues before this is done
            this.cooldown()
        }, 1000) // 2seconds
        return 'door function completed' // Technically returns *before* its completed
    }
    cooldown() { // How long between each click the arduino with allow
        setTimeout(() => {
            this.servoReady = true
        }, 2000) // 2seconds
    }
}

module.exports = ArduinoControl
