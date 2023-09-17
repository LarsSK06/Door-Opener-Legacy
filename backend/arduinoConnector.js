const { Board, Servo } = require('johnny-five')


class ArduinoControl extends Board {
    constructor () {
        super()
        this.on('ready', this.ready.bind(this))
        this.servo = null
    }
    ready() {
        this.servo = new Servo(8)
        console.log('Arduino ready for use') 
    }
    openDoor() {
        this.servo.max()
        setTimeout(() => {
            this.servo.min()
        }, 1000)
    }
}

module.exports = ArduinoControl
