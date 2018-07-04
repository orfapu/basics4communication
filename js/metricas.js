var fecha = "";
var horaInicio = "";
var horaFinal = "";
var lenguajeA = "";
var lenguajeB = "";
var videoVisto = false;
var noEntiendo = 0;
var escalaVisual = 0;
var interpretador = 0;
var traducciones = [];

function init(idiomaA, idiomaB) {
    var d = new Date();
    lenguajeA = idiomaA;
    lenguajeB = idiomaB;
    fecha = "" + d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate();
    horaInicio = "" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
function addTranslation(string1, string2) {
    traducciones.push(string1 + "-" + string2);
}
function usoInterpretador() {
    interpretador += 1;
}
function usoEscalaVisual() {
    escalaVisual += 1;
}
function usoNoEntiendo() {
    noEntiendo += 1;
}
function finish() {
    var d = new Date();
    horaFinal = "" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    //alert(stringMetricas());
    subir();
    videoVisto = false;
    noEntiendo = 0;
    escalaVisual = 0;
    interpretador = 0;
    traducciones = [];
}
function stringMetricas() {
    var stringr = "Fecha: " + fecha + "  HoraInicio: " + horaInicio + "  HoraFinal: ";
    stringr += horaFinal + "  lenguaA: " + lenguajeA + "  lenguaB: " + lenguajeB;
    stringr += " Video visto: " + videoVisto + "  N. usos Interpretador: " + interpretador;
    stringr += "  N. usos EscalaVisual: " + escalaVisual + "  N. usos noEntiendo: " + noEntiendo;
    stringr += "  Traducciones: " + traducciones;
    return stringr;
}

function hideVirtualKeyboard() {
    if (
        document.activeElement &&
        document.activeElement.blur &&
        typeof document.activeElement.blur === 'function'
    ) {
        document.activeElement.blur()
    }
}

function subir(){
    var d = new Date();
   
    firebase.database().ref('session/'+d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay()+"-"+horaInicio).set({
        Fecha: fecha,
        HoraInicio: horaInicio,
        HoraFinal: horaFinal,
        lenguaA: lenguajeA,
        lenguaB: lenguajeB,
        VideoVisto: videoVisto,
        UsosInterpretador: interpretador,
        UsosEscalaVisual: escalaVisual,
        UsosNoEntiendo: noEntiendo,
        Traducciones: traducciones
      });
    
}

function get(){
    var ref = firebase.database().ref('session');
    ref.on('value',gotData,errData);
   
}

function gotData(data){
    var sesions = data.val();
    var keys = Object.keys(sesions);
    $("#sessions").html("");
    //var html = "";
    //var obj = JSON.parse(sesions);
    //  console.log(obj);
    for(var i=0;i<keys.length;i++){
        var obj = sesions[keys[i]];
        var html = 
        `<div class="row pub">
            <div class="col">

                <b>Fecha</b>: ${obj.Fecha}
                <br/>
                <b>Hora inicio</b>: ${obj.HoraInicio}
                <br/>
                <b>Hora final</b>: ${obj.HoraFinal}
                <br/>
                <b>Idioma A</b>: ${obj.lenguaA}
                <br/>
                <b>Idioma B</b>: ${obj.lenguaB}
            </div>
            <div class="col">
                <b>Usos botón no entiendo</b>: ${obj.UsosNoEntiendo}
                <br/>
                <b>Usos escala gráfica</b>: ${obj.UsosEscalaVisual}
                <br/>
                <b>Usos interpretador</b>: ${obj.UsosInterpretador}
                <br/>
                <b>Video visto</b>: ${obj.VideoVisto}
                <br/>
            </div>
        </div>`
        $("#sessions").append(html);
        console.log(obj.Fecha);
    }
    //$("#sessions").html(html);
}
function errData(err){
    alert(err);
}
