status_new = "";
objects = [];

function home(){
    window.location= "home.html"
}
function preload() {
    pic = loadImage("c.jpeg")
}
//cut 11, 12, 13 and put them back in setup
function enter() {
    ve = document.getElementById("id").value;
    pic = loadImage(ve);
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Model Loading in Progress"
    detector.detect(pic, gotResults)
    document.getElementById("id").value = " ";
}

function setup() {
    canvas = createCanvas(670, 500);
    canvas.position(410, 200);


}

function modelLoaded() {
    status_new = true;
    console.log("Model Loaded!!")
    detector.detect(pic, gotResults)
}

function draw() {
    image(pic, 0, 0, 670, 500)

    if (status_new != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected!!"
            obj_name = objects[i].label;
            obj_per = floor(objects[i].confidence * 100);
            obj_x = objects[i].x;
            obj_y = objects[i].y;
            obj_w = objects[i].width;
            obj_h = objects[i].height;
            fill("green");
            stroke("white");
            textSize(20)
            text(obj_name + " " + obj_per + "%", obj_x + 100, obj_y + 100)
            noFill();
            strokeWeight(3)
            stroke("black")
            rect(obj_x, obj_y, obj_w, obj_h)
        }
    }

}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}