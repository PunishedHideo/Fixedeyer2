const robotjs = require('robotjs');
const geometric = require("geometric");
const { GlobalKeyboardListener } = require("node-global-key-listener");
const listen = new GlobalKeyboardListener();

let inZoneLeft = true;
let inZoneRight = true;
let inZoneUpper = true;
let inZoneLower = true;
let KeyListenerTriggered = false;

robotjs.setKeyboardDelay(1);
robotjs.setMouseDelay(1);

function getCoordinates() {
    try {
    const mouse = robotjs.getMousePos();
    let coordinatesX = mouse.x;
    let coordinatesY = mouse.y;
    let coordinatesArray = [coordinatesX, coordinatesY];
    // 2560x1440
    const LeftZone = [[266, 0], [266, 1152], [840, 570]]; // Left Triangle
    const RightZone =  [[1416, 0], [1416, 1152], [840, 570]]; // Right Triangle
    const UpperZone = [[266, 0], [1416, 0], [840, 570]]; // Upper Triangle
    const LowerZone = [[266, 1152], [1416, 1152], [840, 570]] // Lower Triangle
    let zoneCheckLeft = geometric.pointInPolygon(coordinatesArray, LeftZone);
    let zoneCheckRight = geometric.pointInPolygon(coordinatesArray, RightZone);
    let zoneCheckUpper = geometric.pointInPolygon(coordinatesArray, UpperZone);
    let zoneCheckLower = geometric.pointInPolygon(coordinatesArray, LowerZone);
    // console.log('X axis ' + coordinatesX);
    // console.log('Y axis ' + coordinatesY);
    // log(coordinatesArray);
    // console.log(zoneCheckLeft);

    if (zoneCheckLeft && inZoneLeft && KeyListenerTriggered) { // Turning might be slow, seems like a RobotJS issue. Might solve it later?
        // robotjs.mouseToggle("down", "middle");
        // robotjs.mouseToggle("up", "middle");
        console.log('Working');
        robotjs.keyTap("left", ["control"]); // This could be used if the middle mouse turning method isn't good for you(It can trigger mmb special moves)
        inZoneLeft = false;
        inZoneRight = true;
        inZoneUpper = true;
        inZoneLower = true;
    }

    if (zoneCheckRight && inZoneRight && KeyListenerTriggered) {
        // robotjs.mouseToggle("down", "middle");
        // robotjs.mouseToggle("up", "middle");
        robotjs.keyTap("right", ["control"]); // This could be used if the middle mouse turning method isn't good for you(It can trigger mmb special moves)
        console.log('Working');
        inZoneRight = false;
        inZoneLeft = true;
        inZoneUpper = true;
        inZoneLower = true;
    }

    if (zoneCheckUpper && inZoneUpper && KeyListenerTriggered) {
        // robotjs.mouseToggle("down", "middle");
        // robotjs.mouseToggle("up", "middle");
        robotjs.keyTap("up", ["control"]); // This could be used if the middle mouse turning method isn't good for you(It can trigger mmb special moves)
        console.log('Working');
        inZoneUpper = false;
        inZoneLeft = true;
        inZoneLower = true;
        inZoneRight = true;

    }

    if (zoneCheckLower && inZoneLower && KeyListenerTriggered) {
        // robotjs.mouseToggle("down", "middle");
        // robotjs.mouseToggle("up", "middle");
        robotjs.keyTap("down", ["control"]); // This could be used if the middle mouse turning method isn't good for you(It can trigger mmb special moves)
        console.log('Working');
        inZoneLower = false;
        inZoneLeft = true;
        inZoneRight = true;
        inZoneUpper = true;
    }

    } finally {
        setTimeout(getCoordinates, 50);
    }
}

function KeyListener() {
    listen.addListener(function (e, down) {
        if (e.state == "DOWN" && e.name == "G" && (down["LEFT CTRL"] || down["RIGHT CTRL"]) && KeyListenerTriggered) {
            //call your function
            // console.log('Listening triggers -');
            KeyListenerTriggered = false;
            return true;
        }

        if (e.state == "DOWN" && e.name == "G" && (down["LEFT CTRL"] || down["RIGHT CTRL"]) && !KeyListenerTriggered) {
            //call your function
            // console.log('Listening triggers +');
            KeyListenerTriggered = true;
            return true;
        }
    });
}

getCoordinates();
KeyListener();

