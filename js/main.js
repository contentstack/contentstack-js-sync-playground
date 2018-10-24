
var showloader = function () {
     $("#loader").css({"display":"block"});
     $("#loader").fadeOut();
     $("#wrapper-loader").css({"display":"none"}); 
}

var hideloader = function () {
    console.log("hide")
     $("#loader").css({"display":"none"});
     $("#loader").fadeOut();
     $("#wrapper-loader").css({"display":"block"}); 

};