def on_koi_onbtn(btnA, btnB):
    if btnA == 1:
        koi.koi_addtag(list2[currentID])
koi.koi_onbtn(on_koi_onbtn)

def on_received_value_deprecated(name, value):
    global motorSpeed, Rpercent, Lpercent
    if name == "speed":
        motorSpeed = value
    if name == "degree":
        if value < -90:
            value = -90
        if value > 90:
            value = 90
        if value < 0:
            Rpercent = 100
            Lpercent = (1 + value / 90) * 100
        if value > 0:
            Lpercent = 100
            Rpercent = (1 - value / 90) * 100
        if value == 0:
            Lpercent = 100
            Rpercent = 100
radio.on_received_value_deprecated(on_received_value_deprecated)

def back_後退(duration_時間: number):
    robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (100 * -1))
    robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (100 * -1))
    robotbit.rgb().set_pixel_color(0, neopixel.colors(NeoPixelColors.RED))
    robotbit.rgb().set_pixel_color(3, neopixel.colors(NeoPixelColors.RED))
    robotbit.rgb().show()
    basic.pause(duration_時間 * 1000)
    robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (100 * 0))
    robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (100 * 0))
    robotbit.rgb().clear()
def turnRight_右轉(duration_時間: number):
    robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (100 * 0))
    robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (100 * 1))
    robotbit.rgb().set_pixel_color(3, neopixel.colors(NeoPixelColors.GREEN))
    robotbit.rgb().show()
    basic.pause(duration_時間 * 1000)
    robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (100 * 0))
    robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (100 * 0))
    robotbit.rgb().clear()
    robotbit.rgb().show()

def on_button_pressed_a():
    global flag
    flag = 1
    moveForward_前進(10)
    turnLeft_左轉(10)
    turnRight_右轉(10)
    flag = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_koi_classified(classId):
    global flag
    basic.show_string(classId)
    if classId == "2":
        music.start_melody(music.built_in_melody(Melodies.ENTERTAINER),
            MelodyOptions.ONCE)
        robotbit.rgb().set_pixel_color(1, neopixel.colors(NeoPixelColors.RED))
        robotbit.rgb().show()
        flag = 2
koi.koi_classified(on_koi_classified)

def moveForward_前進(duration_時間: number):
    robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (100 * 1))
    robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (100 * 1))
    robotbit.rgb().set_pixel_color(0, neopixel.colors(NeoPixelColors.GREEN))
    robotbit.rgb().set_pixel_color(3, neopixel.colors(NeoPixelColors.GREEN))
    robotbit.rgb().show()
    basic.pause(duration_時間 * 1000)
    robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (100 * 0))
    robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (100 * 0))
    robotbit.rgb().clear()
    robotbit.rgb().show()

def on_button_pressed_ab():
    global motorSpeed
    motorSpeed = 0
    robotbit.rgb().clear()
    robotbit.rgb().show()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def turnLeft_左轉(duration_時間: number):
    robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (100 * 1))
    robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (100 * 0))
    robotbit.rgb().set_pixel_color(0, neopixel.colors(NeoPixelColors.GREEN))
    robotbit.rgb().show()
    basic.pause(duration_時間 * 1000)
    robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (100 * 0))
    robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (100 * 0))
    robotbit.rgb().clear()
    robotbit.rgb().show()
Lpercent = 0
Rpercent = 0
currentID = 0
list2: List[str] = []
flag = 0
motorSpeed = 0
koi.koi_init(SerialPin.P2, SerialPin.P1)
radio.set_group(1)
robotbit.rgb().set_brightness(100)
robotbit.rgb().show_color(neopixel.colors(NeoPixelColors.YELLOW))
motorSpeed = 5
flag = 0
list2 = ["1", "2", "3", "4"]
currentID = 1
classId = "0"
koi.koi_reset_cls()
koi.koi_cls_load("class1.json")

def on_forever():
    if flag == 1:
        koi.koi_run()
        basic.pause(500)
    if flag == 2:
        if motorSpeed >= 0:
            robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (Lpercent * 1))
            robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (Rpercent * 1))
        else:
            robotbit.motor_run(robotbit.Motors.M2A, motorSpeed * (Lpercent * 1))
            robotbit.motor_run(robotbit.Motors.M1B, motorSpeed * (Rpercent * 1))
basic.forever(on_forever)
