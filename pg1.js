objects= [];
status_new= "";
function home(){
    window.location= "home.html"
}
function preload(){
    img1= loadImage("c.jpeg")
}
function setup(){
    canvas= createCanvas(600, 500)
    canvas.center()
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Model Loading in Progress"
   detector.detect(img1, gotResults)
}
function draw(){
    image(img1,0, 0, 600, 500 );
    if (status_new != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected!!"
            obj_name = objects[i].label;
            obj_per = floor(objects[i].confidence * 100);
            obj_x = objects[i].x;
            obj_y = objects[i].y;
            obj_w = objects[i].width;
            obj_h = objects[i].height;
            fill("red");
            stroke("black");
            textSize(20)
            text(obj_name + " " + obj_per + "%", obj_x + 100, obj_y + 100)
            noFill();
            strokeWeight(3)
            stroke("black")
            rect(obj_x, obj_y, obj_w, obj_h)
        }
    }
}
function modelLoaded(){
status_new= true;
console.log("model loaded")
document.getElementById("status").innerHTML= "Status: Model Loaded"
}
function gotResults(error, results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}