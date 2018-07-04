$(document).ready(function (e) {
    $('img[usemap]').rwdImageMaps();

    $('area').on('click', function () {
        usoEscalaVisual();
        $("#escala").attr("src", "/img/" + $(this).attr('alt') + ".png");
        setTimeout(function () { $("#escala").attr("src", "/img/img3.png"); }, 8000);
    });

    var mus = new Audio();
    mus.src = "/sounds/bell.mp3";
    $("#img1").click(function () {
        var oldSrc = '/img/img1.png';
        var newSrc = '/img/img2.png';
        //alert("clic");
        $('img[src="' + oldSrc + '"]').attr('src', newSrc);
        mus.play();
        setTimeout(change, 2000);
        function change() {
            $('img[src="' + newSrc + '"]').attr('src', oldSrc);
        }
        usoNoEntiendo();
    });

});

$("#tit").click(function () {
    dicPromise();
});

$("#video").click(function(){
    videoWork();
})

$("#creu").click(function () {
   changeLanguage();
});

$("#dic").click(function () {
    dicPromise();
});

$("#go").click(function () {
    $("#wrapper1").removeClass("hide");
    $("#wrapper2").addClass("hide");
    init($("#drop21").val(), $("#drop22").val());
    $('img[usemap]').rwdImageMaps();
    $("#drop1").val($("#drop21").val());
    $("#drop2").val($("#drop22").val());
});

$("#fin").click(function () {
    finish();
    $("#wrapper1").addClass("hide");
    $("#wrapper2").removeClass("hide");
});

$("#translate").click(function () {
    googleImag();
    usoInterpretador();
    dicPromise();
    searchPromise();
});

$("#images").on("click", "#close", function () {
    $("#images").html("");
});

$("#search").click(function () {
    searchPromise();
});

$("#down").click(function () {
    get();
})
