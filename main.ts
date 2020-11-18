koi.koi_onbtn(function (btnA, btnB) {
    if (btnA == 1) {
        koi.koi_addtag(list2[currentID])
    }
})
radio.onReceivedValueDeprecated(function (name, value) {
    if (name == "speed") {
        motorSpeed = value
    }
    if (name == "degree") {
        if (value < -90) {
            value = -90
        }
        if (value > 90) {
            value = 90
        }
        if (value < 0) {
            Rpercent = 100
            Lpercent = (1 + value / 90) * 100
        }
        if (value > 0) {
            Lpercent = 100
            Rpercent = (1 - value / 90) * 100
        }
        if (value == 0) {
            Lpercent = 100
            Rpercent = 100
        }
    }
})
function back_後退 (duration_時間: number) {
    if (flag == 1) {
        robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (100 * -1))
        robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (100 * -1))
        robotbit.rgb().setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        robotbit.rgb().setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
        robotbit.rgb().show()
        basic.pause(duration_時間 * 1000)
        robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (100 * 0))
        robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (100 * 0))
        robotbit.rgb().clear()
    }
}
function turnRight_右轉 (duration_時間: number) {
    if (flag == 1) {
        robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (100 * 0))
        robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (100 * 1))
        robotbit.rgb().setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        robotbit.rgb().show()
        basic.pause(duration_時間 * 1000)
        robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (100 * 0))
        robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (100 * 0))
        robotbit.rgb().clear()
        robotbit.rgb().show()
    }
}
input.onButtonPressed(Button.A, function () {
    robotbit.rgb().clear()
    robotbit.rgb().show()
    flag = 1
    moveForward_前進(10)
    turnLeft_左轉(10)
    turnRight_右轉(10)
    flag = 0
})
koi.koi_classified(function (classId) {
    basic.showString(classId)
    if (classId == "2") {
        flag = 2
        basic.clearScreen()
    }
})
function moveForward_前進 (duration_時間: number) {
    if (flag == 1) {
        robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (100 * 1))
        robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (100 * 1))
        robotbit.rgb().setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        robotbit.rgb().setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        robotbit.rgb().show()
        basic.pause(duration_時間 * 1000)
        robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (100 * 0))
        robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (100 * 0))
        robotbit.rgb().clear()
        robotbit.rgb().show()
    }
}
input.onButtonPressed(Button.AB, function () {
    motorSpeed = 0
    robotbit.rgb().clear()
    robotbit.rgb().show()
})
function turnLeft_左轉 (duration_時間: number) {
    if (flag == 1) {
        robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (100 * 1))
        robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (100 * 0))
        robotbit.rgb().setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        robotbit.rgb().show()
        basic.pause(duration_時間 * 1000)
        robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (100 * 0))
        robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (100 * 0))
        robotbit.rgb().clear()
        robotbit.rgb().show()
    }
}
let Lpercent = 0
let Rpercent = 0
let currentID = 0
let list2: string[] = []
let flag = 0
let motorSpeed = 0
koi.koi_init(SerialPin.P2, SerialPin.P1)
radio.setGroup(101)
robotbit.rgb().setBrightness(100)
robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Yellow))
motorSpeed = 5
flag = 0
list2 = ["1", "2", "3", "4"]
currentID = 1
let classId = "0"
koi.koi_reset_cls()
koi.koi_cls_load("class1.json")
basic.forever(function () {
    if (flag == 1) {
        koi.koi_run()
        basic.pause(500)
    }
    if (flag == 2) {
        music.playMelody("G B A G C5 B A B ", 200)
        flag = 3
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Green))
        robotbit.rgb().show()
    }
    if (flag == 3) {
        if (motorSpeed >= 0) {
            robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (Lpercent * 1))
            robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (Rpercent * 1))
        } else {
            robotbit.MotorRun(robotbit.Motors.M2A, motorSpeed * (Lpercent * -1))
            robotbit.MotorRun(robotbit.Motors.M1B, motorSpeed * (Rpercent * -1))
        }
    }
})
