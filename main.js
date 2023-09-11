window.onload = () => {
    'use strict';

    //    if ('serviceWorker' in navigator) {
    //        navigator.serviceWorker
    //            .register('./sw.js');
    //    }
    init();

}

function SetButton(i) {
    var x = i;
    x++;
}

var cursorSize;
var speed;
var crosshairs;

function setSpeed() {
    switch (speed.value) {
        case '1':
            test.updateDelay = 100;
            break;
        case '2':
            test.updateDelay = 30;
            break;
        case '3':
            test.updateDelay = 8;
            break;
        case '4':
            test.updateDelay = 5;
            break;
        case '5':
            test.updateDelay = 0;
            break;
    }
}

function init() {
    var splash = document.querySelector('splash');
    crosshairs = document.querySelector('crosshairs');
    crosshairs.hidden = true;
    window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 300);
        };
    var tmr = window.setTimeout(function () {
        //        if (document.body.requestFullscreen) {
        //            document.body.requestFullscreen();
        //        } else if (document.body.msRequestFullscreen) {
        //            document.body.msRequestFullscreen();
        //        } else if (document.body.mozRequestFullScreen) {
        //            document.body.mozRequestFullScreen();
        //        } else if (document.body.webkitRequestFullscreen) {
        //            document.body.webkitRequestFullscreen();
        //        }
        panel.style.opacity = .9;
        splash.hidden = true;
    }, 3000); // hide Splash screen after 2.5 seconds
    splash.onclick = function (e) {
        clearTimeout(tmr);
        //        if (document.body.requestFullscreen) {
        //            document.body.requestFullscreen();
        //        } else if (document.body.msRequestFullscreen) {
        //            document.body.msRequestFullscreen();
        //        } else if (document.body.mozRequestFullScreen) {
        //            document.body.mozRequestFullScreen();
        //        } else if (document.body.webkitRequestFullscreen) {
        //            document.body.webkitRequestFullscreen();
        //        }
        splash.hidden = true;
        panel.style.opacity = .9;
    }

    window.onresize = function (e) {
        event.preventDefault();
        that.init();
    }

    var g = document.getElementById("game");
    g.style.cursor = "crosshair";
    document.addEventListener("keyup", function (e) {
        if (e.key == "Tab") {
            let g = document.getElementById("game");
            if (g.style.cursor == "none") {
                g.style.cursor = "crosshair";
            } else {
                g.style.cursor = "none";
            }
        }
    });

    var panel = document.querySelector('panel');
    speed = document.createElement("INPUT");
    speed.setAttribute("type", "range");
    speed.style.position = "absolute";
    speed.style.height = ".5vh";
    speed.style.width = "9vw";
    speed.style.left = "2.5vw";
    speed.style.top = "1.9vh";
    speed.style.color = 'green';
    speed.value = 3;
    speed.min = 1;
    speed.max = 5;
    cursorSize = document.createElement("INPUT");
    cursorSize.setAttribute("type", "range");
    cursorSize.style.position = "absolute";
    cursorSize.style.height = ".5vh";
    cursorSize.style.width = "9vw";
    cursorSize.style.left = "18vw";
    cursorSize.style.top = "1.9vh";
    cursorSize.style.backgroundColor = 'green';
    cursorSize.value = 4;
    cursorSize.min = 1;
    cursorSize.max = 5;
    panel.appendChild(speed);
    panel.appendChild(cursorSize);
    test.updateDelay = 8
    test.mouse.size = 40;

    speed.onchange = function (e) {
        event.preventDefault();
        setSpeed();
    }

    cursorSize.onchange = function (e) {
        event.preventDefault();
        switch (cursorSize.value) {
            case '1':
                test.mouse.size = 5;
                break;
            case '2':
                test.mouse.size = 10;
                break;
            case '3':
                test.mouse.size = 20;
                break;
            case '4':
                test.mouse.size = 40;
                break;
            case '5':
                test.mouse.size = 80;
                break;
        }
    }


    var mouseX = window.innerWidth / 2;;
    var mouseY = window.innerHeight / 2;

    function MouseClick() {
        var s;
        var elements = document.elementsFromPoint(crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2, crosshairs.offsetTop + (crosshairs.offsetHeight) / 2);
        try {
            if (elements[0].id == "game") {
                var i = 3;
            } else {
                elements[0].click();
            }
        } catch (e) {}
    }

    function MoveMouse(xm, ym) {
        crosshairs.hidden = false;
        try {
            mouseX = crosshairs.offsetLeft + (crosshairs.offsetWidth) / 2;
            mouseY = crosshairs.offsetTop + (crosshairs.offsetHeight) / 2;
            mouseX += xm;
            mouseY += ym;
            if (mouseX < 10)
                mouseX = 10;
            if (mouseY < 10)
                mouseY = 10;
            if (mouseX >= window.innerWidth - 10)
                mouseX = window.innerWidth - 10;
            if (mouseY >= window.innerHeight - 10)
                mouseY = window.innerHeight - 10;
            console.log('MoveTo: ', mouseX, mouseY);
            crosshairs.style.left = mouseX - crosshairs.offsetWidth / 2 + "px";
            crosshairs.style.top = mouseY - crosshairs.offsetHeight / 2 + "px";

            let s = that.mouse.size;
            that.mouse.x = Math.floor(mouseX - Math.floor(s / 2));
            that.mouse.y = Math.floor(mouseY);

            let stl = that.get_material(that.mouse.tool).CSS || {
                "background-color": "red",
            };
            Object.keys(stl).forEach((st) => {
                document.getElementById("cursor").style[st] = stl[st];
            });
            document.getElementById("cursor").style.width = s + "px";
            document.getElementById("cursor").style.height = s + "px";
            document.getElementById("cursor").style.left = mouseX - Math.floor(s / 2) + "px";
            document.getElementById("cursor").style.top = mouseY - Math.floor(s / 2) + "px";
        } catch (e) {}
    }

    function JoystickMoveTo(jy, jx) {
        if (splash.hidden) {
            crosshairs.hidden = false;
            if (Math.abs(jx) < .1 && Math.abs(jy) < .1) {
                try {
                    if (gpad.getButton(14).value > 0) // dpad left
                        MoveMouse(-6, 0);
                    if (gpad.getButton(12).value > 0) // dup
                        MoveMouse(0, -6);
                    if (gpad.getButton(13).value > 0) // ddown
                        MoveMouse(0, 6);
                    if (gpad.getButton(15).value > 0) // dright
                        MoveMouse(6, 0);
                } catch (e) {}
                return;
            }
            if (Math.abs(jx) < .1)
                jx = 0;
            if (Math.abs(jy) < .1)
                jy = 0;
            if (jx == 0 && jy == 0)
                return;
            MoveMouse(jx * 15, jy * 15);
        }
    }

    var currentButton = 0;

    function showPressedButton(index) {
        crosshairs.hidden = false;
        if (!splash.hidden) {
            splash.hidden = true;
            return;
        } else {
            switch (index) {
                case 0: // A
                case 8:
                case 9:
                case 1:
                case 2: // X
                case 3: // Y
                case 9:
                    if (mouseX > window.innerWidth / 10 && mouseX < window.innerWidth * .9)
                        that.mouse.is_down = true;
                    MouseClick();
                    break;
                case 10: // XBox
                    break;
                case 12: // dpad handled by timer elsewhere
                case 13:
                case 14:
                case 15:
                    break;
                default:
            }
        }
    }

    function removePressedButton(index) {
        console.log("Releasd: ", index);
        if (!splash.hidden) {
            splash.hidden = true;
            return;
        } else {
            switch (index) {
                case 0: // A
                case 8:
                case 9:
                case 1:
                case 2: // X
                case 3: // Y
                case 9:
                    that.mouse.is_down = false;
                    break;
                case 10: // XBox
                    break;
                case 12: // dpad handled by timer elsewhere
                case 13:
                case 14:
                case 15:
                    break;
                default:
            }
        }
    }

    var gpad;

    function getAxes() {
        //       console.log('Axis', gpad.getAxis(0), gpad.getAxis(1), gpad.getButton(14).value);
        if (splash.hidden) {
            JoystickMoveTo(gpad.getAxis(1), gpad.getAxis(0));
            JoystickMoveTo(gpad.getAxis(3), gpad.getAxis(2));
        }
        setTimeout(function () {
            getAxes();
        }, 50);
    }

    gamepads.addEventListener('connect', e => {
        //        crosshairs.hidden = false;
        console.log('Gamepad connected:');
        document.getElementById("cursor").style.display = "block";
        console.log(e.gamepad);
        gpad = e.gamepad;
        e.gamepad.addEventListener('buttonpress', e => showPressedButton(e.index));
        e.gamepad.addEventListener('buttonrelease', e => removePressedButton(e.index));
        setTimeout(function () {
            getAxes();
        }, 50);
    });

    gamepads.addEventListener('disconnect', e => {
        console.log('Gamepad disconnected:');
        console.log(e.gamepad);
    });

    gamepads.start();
}
