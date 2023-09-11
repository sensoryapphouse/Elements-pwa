"use strict";

function Mouse(canvas) {
    this.x = 0;
    this.y = 0;
    this.is_down = false;
    this.size = 20; // PB was 5
    this.tool = SAND;
    this.canvas = canvas;

    this.canvas.addEventListener("mousedown", this.handle_mouse_down.bind(this), false);
    this.canvas.addEventListener("mouseup", this.handle_mouse_up.bind(this), false);
    this.canvas.addEventListener("mousemove", this.handle_mouse_move.bind(this), false);

    //    this.canvas.addEventListener("touchstart", this.handle_touch_start.bind(this), false);
    //    this.canvas.addEventListener("touchend", this.handle_touch_end.bind(this), false);
    //    this.canvas.addEventListener("touchmove", this.handle_touch_move.bind(this), false);

    this.canvas.addEventListener(
        "contextmenu",
        function (e) {
            console.log(e);
            e.preventDefault();
        },
        false
    );

    this.canvas.addEventListener("mouseout ", function (e) {
        document.getElementById("cursor").style.display = "none";
    });
    this.canvas.addEventListener("mouseover", function (e) {
        document.getElementById("cursor").style.display = "block";
    });

    /*let m = this;
    document.addEventListener(
      "mousemove",
      function(e) {
        $("#cursor").css({
          left: e.pageX,
          top: e.pageY,
          color: "red",
          width: m.size,
          height: m.size
        });

        if (e.toElement.id !== "game" && e.toElement.id !== "cursor") {
          document.getElementById("cursor").style.display = "none";
          console.log(e);
        } else {
          document.getElementById("cursor").style.display = "block";
        }
      },
      false
    );
    document.addEventListener(
      "mousemove",
      function(e) {
        $("#cursor").css({
          left: e.pageX,
          top: e.pageY,
          color: "red",
          width: m.size,
          height: m.size
        });

        if ((e.toElement.id !== "game" && e.toElement.id !== "cursor") || e.buttons == 1) {
          document.getElementById("cursor").style.display = "none";
          console.log(e);
        } else {
          document.getElementById("cursor").style.display = "block";
        }
      },
      false
    );
    document.getElementById('cursor').addEventListener(
      "mousedown",
      function(e) {
          document.getElementById("cursor").style.display = "none";
      },
      false
    );*/
}

Mouse.prototype.handle_mouse_up = function (event) {
    this.is_down = false;
};
Mouse.prototype.handle_mouse_down = function (event) {
    if (event.clientX < window.innerWidth * .07 || event.clientX > window.innerWidth * .92)
        return;
    if (event.button == 0) this.is_down = true;
};

Mouse.prototype.get_mouse_pos = function (evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
};

Mouse.prototype.set_mouse_pos = function (posx, posy) {
    this.x = posx;
    this.y = posy;
};
//Mouse.prototype.get_mouse_loc = function (event) {
//    var pos = this.get_mouse_pos(event);
//    let loc = {};
//    loc.x = pos.x - Math.floor(test.mouse.size / 2);
//    loc.y = pos.y - Math.floor(test.mouse.size / 2);
//    return loc;
//};

Mouse.prototype.handle_mouse_move = function (event) {
    var pos = this.get_mouse_pos(event);
    this.x = pos.x - Math.floor(test.mouse.size / 2);
    this.y = pos.y - Math.floor(test.mouse.size / 2);
};
//
//Mouse.prototype.handle_touch_start = function (event) {
//    this.is_down = true;
//};
//Mouse.prototype.handle_touch_end = function (event) {
//    this.is_down = false;
//    console.log("Touch end");
//};
//
//Mouse.prototype.get_touch_pos = function (evt) {
//    var rect = this.canvas.getBoundingClientRect();
//    return {
//        x: evt.clientX - rect.left,
//        y: evt.clientY - rect.top,
//    };
//};
//
//Mouse.prototype.handle_touch_move = function (event) {
//    var pos = this.get_touch_pos(event.touches[0]);
//
//    this.x = pos.x - Math.floor(test.mouse.size / 2);
//    this.y = pos.y - Math.floor(test.mouse.size / 2);
//    console.log("Touch move", this.x, this.y);
//};
