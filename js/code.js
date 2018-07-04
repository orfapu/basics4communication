function videoWork() {
    $("#change").html(`<div style="text-align:center;" class="mt-2 rectangle mx-auto">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/4TFpE0iuBGg" frameborder="0" allow="autoplay; encrypted-media"
      allowfullscreen></iframe>
  </div>`)
}

function changeLanguage() {
    var temp = $("#drop1").val();
    $("#drop1").val($("#drop2").val());
    $("#drop2").val(temp);
}

function googleImag() {
    var lang1 = getLang($("#drop1").val())
    var lang2 = getLang($("#drop2").val())
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://translation.googleapis.com/language/translate/v2?q=" + $("#input").val() + "&target=" + lang2 + "&format=text&source=" + lang1 + "&key=" + googleTranslateKey,
        "method": "POST",
        "headers": {
            "Cache-Control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        $("#output").html(response.data.translations[0].translatedText + "<br/>");
        addTranslation($("#input").val(), response.data.translations[0].translatedText);
    });
}

function transPromise() {
    var eng = null;
    let p1 = new Promise(
        (resolve, reject) => {
            var lang1 = getLang($("#drop1").val())
            var lang2 = getLang($("#drop2").val())
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + lang1 + "&to=" + lang2,
                "method": "POST",
                "headers": {
                    "Ocp-Apim-Subscription-Key": azureTranslateKey,
                    "Content-Type": "application/json",
                    "X-ClientTraceId": "73ef8278-9177-4950-b435-9dcbca2f1031",
                    "Cache-Control": "no-cache"
                },
                "processData": false,
                "data": "[\n    {\"Text\":\"" + $("#input").val() + "\"}\n]"
            }
            $.ajax(settings).done(function (response) {
                eng = response[0].translations[0].text;
                resolve();
            });
        }
    );
    p1.then(
        function (val) {
            $("#output").html(eng);

        }).catch(
            (reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
}

function searchPromise() {
    var eng = null;
    let p1 = new Promise(
        (resolve, reject) => {
            var lang1 = getLang($("#drop1").val())
            var lang2 = getLang($("#drop2").val())
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + lang1 + "&to=en",
                "method": "POST",
                "headers": {
                    "Ocp-Apim-Subscription-Key": azureTranslateKey,
                    "Content-Type": "application/json",
                    "X-ClientTraceId": "73ef8278-9177-4950-b435-9dcbca2f1031",
                    "Cache-Control": "no-cache"
                },
                "processData": false,
                "data": "[\n    {\"Text\":\"" + $("#input").val() + "\"}\n]"
            }
            $.ajax(settings).done(function (response) {
                eng = response[0].translations[0].text;
                resolve();
            });
        }
    );
    p1.then(
        function (val) {

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + eng + "&license=public&imageType=photo",
                "method": "GET",
                "headers": {
                    "Ocp-Apim-Subscription-Key": azureWebSearchKey,
                    "Cache-Control": "no-cache"
                }
            }

            $.ajax(settings).done(function (response) {
                var urls = [];
                for (var i = 0; i < 10; i++) {
                    urls[i] = response.value[i].thumbnailUrl;
                }
                var html = "";
                for (var i = 0; i < 5; i++) {
                    html += `<div class="square float-left"><img src="${response.value[i].thumbnailUrl}" 
                    class="sq"></div>`
                }

                $("#images").html(html);
            });

        }).catch(
            (reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
}

function transNormal() {
    var lang1 = getLang($("#drop1").val())
    var lang2 = getLang($("#drop2").val())
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + lang1 + "&to=" + lang2,
        "method": "POST",
        "headers": {
            "Ocp-Apim-Subscription-Key": azureTranslateKey,
            "Content-Type": "application/json",
            "X-ClientTraceId": "73ef8278-9177-4950-b435-9dcbca2f1031",
            "Cache-Control": "no-cache"
        },
        "processData": false,
        "data": "[\n    {\"Text\":\"" + $("#input").val() + "\"}\n]"
    }

    $.ajax(settings).done(function (response) {
        $("#output").html(response[0].translations[0].text);
    });
};

function getLang(val) {
    switch (val) {
        case "Español":
            return "es";
        case "Ingles":
            return "en";
        case "Arabe":
            return "ar";
        case "Somali":
            return "so";
        case "Pastun":
            return "ps";
        case "Frances":
            return "fr";
        case "Ruso":
            return "ru";
        default:
            break;
    }
}

function image() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + $("#input").val() + "&license=public&imageType=photo",
        "method": "GET",
        "headers": {
            "Ocp-Apim-Subscription-Key": azureWebSearchKey2,
            "Cache-Control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        var urls = [];
        for (var i = 0; i < 5; i++) {
            urls[i] = response.value[i].thumbnailUrl;
        }
        var html = `<div class="row">
          <div class="col" id="close">x</div>
        </div>
        <div id="carouselExampleControls" class="carousel slide mb-5" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="${urls[0]}" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="${urls[1]}" alt="Second slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="${urls[2]}" alt="Third slide">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>`;
        $("#images").html(html);
    });
}

function dicPromisee() {
    $("#syn").html("");
    var eng = null;
    var other = null;
    var lang1 = getLang($("#drop1").val())
    var lang2 = getLang($("#drop2").val())
    var english = false;
    let p1 = new Promise(
        (resolve, reject) => {
            var tem1 = null;
            var tem2 = null;
            if (lang1 == "en") {
                tem1 = "en";
                tem2 = lang2;
                eng = $("#input").val();
            } else {
                tem1 = lang1;
                tem2 = "en";
                other = $("#input").val();
            }
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + tem1 + "&to=" + tem2,
                "method": "POST",
                "headers": {
                    "Ocp-Apim-Subscription-Key": azureTranslateKey,
                    "Content-Type": "application/json",
                    "X-ClientTraceId": "73ef8278-9177-4950-b435-9dcbca2f1031",
                    "Cache-Control": "no-cache"
                },
                "processData": false,
                "data": "[\n    {\"Text\":\"" + $("#input").val() + "\"}\n]"
            }
            $.ajax(settings).done(function (response) {

                if (lang1 == "en") {
                    other = response[0].translations[0].text;
                } else if (lang2 == "en") {
                    eng = response[0].translations[0].text;
                } else {
                    eng = response[0].translations[0].text
                }
                resolve();
            });
        }
    );
    p1.then(
        function (val) {
            var n = "en";
            var tem = eng;
            if (lang1 == "en") {
                n = lang2;
                tem = other;
            }
            var settings1 = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.cognitive.microsofttranslator.com/dictionary/lookup?api-version=3.0&from=" + n + "&to=" + lang1,
                "method": "POST",
                "headers": {
                    "Ocp-Apim-Subscription-Key": azureTranslateKey,
                    "Content-Type": "application/json",
                    "X-ClientTraceId": "73ef8278-9177-4950-b435-9dcbca2f1031",
                    "Cache-Control": "no-cache"
                },
                "processData": false,
                "data": "[\n    {\"Text\":\"" + tem + "\"}\n]"
            }

            $.ajax(settings1).done(function (response) {
                var respon = response[0].translations[0].normalizedTarget;
                for (var i = 1; i < response[0].translations.length; i++) {
                    respon += " ," + response[0].translations[i].normalizedTarget;
                }
                var add =
                    `<b>${lang1}</b>: ${respon}<br/>`;
                $("#syn").append(add);
            });
            tem = eng;
            n = "en"
            if (lang2 == "en") {
                n = lang1;
                tem = other;
            }
            var settings2 = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.cognitive.microsofttranslator.com/dictionary/lookup?api-version=3.0&from=" + n + "&to=" + lang2,
                "method": "POST",
                "headers": {
                    "Ocp-Apim-Subscription-Key": azureTranslateKey,
                    "Content-Type": "application/json",
                    "X-ClientTraceId": "73ef8278-9177-4950-b435-9dcbca2f1031",
                    "Cache-Control": "no-cache"
                },
                "processData": false,
                "data": "[\n    {\"Text\":\"" + tem + "\"}\n]"
            }

            $.ajax(settings2).done(function (response) {
                var respon = response[0].translations[0].normalizedTarget;
                for (var i = 1; i < response[0].translations.length; i++) {
                    respon += " ," + response[0].translations[i].normalizedTarget;
                }
                var add =
                    `<b>${lang2}</b>: ${respon}<br/>`;
                $("#syn").append(add);
            });


        }).catch(
            (reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });


}

function dicPromise() {
    var tracEng = null;
    var sin = null;
    $("#syn").html("");
    var eng = null;
    var other = null;
    var lang1 = getLang($("#drop1").val())
    var lang2 = getLang($("#drop2").val())
    var english = false;
    let p1 = new Promise(
        (resolve, reject) => {
            var lang1 = getLang($("#drop1").val())
            var lang2 = getLang($("#drop2").val())
            if (lang1 == "en") {
                tracEng = $("#input").val();
                resolve();
            }
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://translation.googleapis.com/language/translate/v2?q=" + $("#input").val() + "&target=" + "en" + "&format=text&source=" + lang1 + "&key=" + googleTranslateKey,
                "method": "POST",
                "headers": {
                    "Cache-Control": "no-cache"
                }
            }

            $.ajax(settings).done(function (response) {

                tracEng = response.data.translations[0].translatedText;


                resolve();
            });
        }
    );
    p1.then(
        function (val) {
            //1-traduir ingles
            //2-fer sinonims
            //3-dos google func
            //alert(tracEng);
            let p2 = new Promise(
                (resolve, reject) => {
                    var settings1 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://api.cognitive.microsofttranslator.com/dictionary/lookup?api-version=3.0&from=" + "en" + "&to=" + "es",
                        "method": "POST",
                        "headers": {
                            "Ocp-Apim-Subscription-Key": azureTranslateKey,
                            "Content-Type": "application/json",
                            "X-ClientTraceId": "73ef8278-9177-4950-b435-9dcbca2f1031",
                            "Cache-Control": "no-cache"
                        },
                        "processData": false,
                        "data": "[\n    {\"Text\":\"" + tracEng + "\"}\n]"
                    }

                    $.ajax(settings1).done(function (response) {
                        sin = response[0].translations[0].normalizedTarget;
                        for (var i = 1; i < response[0].translations.length; i++) {
                            sin += " ," + response[0].translations[i].normalizedTarget;
                        }


                        resolve();
                    });
                });
            p2.then(
                function (val) {
                    //alert(sin);
                    var lang1 = getLang($("#drop1").val())
                    var lang2 = getLang($("#drop2").val())
                    if (lang2 == "es") {
                        $("#syn").append("<b>" + lang2 + "</b>: " + sin + "<br/>");
                    }
                    var settings1 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://translation.googleapis.com/language/translate/v2?q=" + sin + "&target=" + lang2 + "&format=text&source=" + "es" + "&key=" + googleTranslateKey,
                        "method": "POST",
                        "headers": {
                            "Cache-Control": "no-cache"
                        }
                    }

                    $.ajax(settings1).done(function (response) {
                        if (lang2 == "es") {
                            $("#syn").append("<b>" + lang2 + "</b>: " + sin + "<br/>");
                        } else {
                            $("#syn").append("<b>" + lang2 + "</b>: " + response.data.translations[0].translatedText + "<br/>");
                        }

                    });

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://translation.googleapis.com/language/translate/v2?q=" + sin + "&target=" + lang1 + "&format=text&source=" + "es" + "&key=" + googleTranslateKey,
                        "method": "POST",
                        "headers": {
                            "Cache-Control": "no-cache"
                        }
                    }

                    $.ajax(settings).done(function (response) {
                        if (lang1 == "es") {
                            $("#syn").append("<b>" + lang1 + "</b>: " + sin + "<br/>");
                        } else {
                            $("#syn").append("<b>" + lang1 + "</b>: " + response.data.translations[0].translatedText + "<br/>");
                        }
                    });

                });


        }).catch(
            (reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });


}

function dic() {
    var lang1 = getLang($("#drop1").val())
    var lang2 = getLang($("#drop2").val())
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.cognitive.microsofttranslator.com/dictionary/lookup?api-version=3.0&from=" + lang1 + "&to=" + lang2,
        "method": "POST",
        "headers": {
            "Ocp-Apim-Subscription-Key": azureTranslateKey,
            "Content-Type": "application/json",
            "X-ClientTraceId": "73ef8278-9177-4950-b435-9dcbca2f1031",
            "Cache-Control": "no-cache"
        },
        "processData": false,
        "data": "[\n    {\"Text\":\"" + $("#input").val() + "\"}\n]"
    }

    $.ajax(settings).done(function (response) {
        var respon = response[0].translations[0].normalizedTarget;
        for (var i = 1; i < response[0].translations.length; i++) {
            respon += " ," + response[0].translations[i].normalizedTarget;
        }
        var add =
            `<b>${lang1}</b>: altres<br/>
         <b>${lang2}</b>: ${respon}`;
        $("#syn").append(add);
    });
}









