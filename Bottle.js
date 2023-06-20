var img = "";
var CocossdModelStatus = "";
var objects = [];
function back()
{
    window.location = "index.html";
}
function preload()
{
    img = loadImage("Bottle.jpeg");
}
function setup()
{
    canvas = createCanvas(550,400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded); 
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}
function modelLoaded()
{
    console.log("M O D E L  I S  L O A D E D  ! ! ! ! ! !");
    CocossdModelStatus = "True";
    objectDetector.detect(img,gotResults);
}
function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}
function draw()
{
    image(img,0,0,canvas.width,canvas.height);
    if(CocossdModelStatus == "True")
    {
        for(i=0;i<objects.length;i++)
        {
            percent = floor(objects[i].confidence*100);
            document.getElementById("status").innerHTML = "Status - Detected "+objects.length+" object.";
            document.getElementById("NumberOFObjects").innerHTML = "There is 1 object in the image from which cocossd model has detected "+objects.length+" object.";
            fill("white");
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            stroke("red");
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}