// Access-control indica se os recursos da resposta podem ser compartilhados com a origem dada. No caso * qualquer origem. 

var header = ('Access-Control-Allow-Origin: *');  

document.getElementById('tzone').addEventListener("change", function () {

    region = document.getElementById("reg")
    region.innerHTML += `<option value="" selected hidden disable>Carregando...</option>`




    const select = document.querySelector('select#tzone');
    const valueSelect = select.value

    const rec2 = new XMLHttpRequest();
    rec2.open("GET", `https://worldtimeapi.org/api/timezone/${valueSelect}`)
    rec2.onreadystatechange = function () {
        if (rec2.readyState == 4 && rec2.status == 200) {
            region.innerHTML = "<option value='' selected hidden disable>selecione..</option>"
            const obj = JSON.parse(this.responseText);
            var tamanho2 = []
            for (var i = 0; i < obj.length; i++) {
                var rquebra2 = quebra(obj[i])
                if (tamanho2.includes(rquebra2[1]) === false) {
                    tamanho2.push(rquebra2[1])
                }
            }
            for (i = 0; i < tamanho2.length; i++) {
                region.innerHTML += "<option value=" + tamanho2[i] + ">" + tamanho2[i] + "</option>"
            }
            
        }
    }
    rec2.send()
})



document.getElementById('reg').addEventListener("change", function () {



    const vsel = document.getElementById('tzone').value
    const select2 = document.querySelector('select#reg');
    const valueSelect2 = select2.value



    const rec3 = new XMLHttpRequest();
    rec3.open("GET", `https://worldtimeapi.org/api/timezone/${vsel}/${valueSelect2}`)

    rec3.onreadystatechange = function () {
        document.getElementById('hora').innerHTML = "<p>carregando...</p>"
        if (rec3.readyState == 4 && rec3.status == 200) {
            const objlc = JSON.parse(this.responseText)
            var local = objlc.timezone
            stoptime()
            addsec(objlc.datetime)
            var fuzo = objlc.utc_offset

            document.getElementById('hora').innerHTML = `<table style="text-align:center; justify-content:center;"><thead><tr><td>${local}</td></thead></tr> <tr><td id="tempo"> </td></tr> <tr><td>${fuzo}</td></tr></table>`



        }
        else if(this.readyState == 0 || this.status == 404){
            document.getElementById('hora').innerHTML = `<div>Informação Temporariamente Indisponível, tente outra opção</div>`
        }
    }

    rec3.send()
    document.getElementById('hora').innerHTML = "<p>Carregando...</p>"

})

var Time


function addsec(objeto) {

    var ano = parseInt(objeto.substring(0, 4))
    var mes = objeto.substring(5, 7)
    var dia = objeto.substring(8, 10)

    var h = objeto.substring(11, 13)
    var m = objeto.substring(14, 16)
    var s = objeto.substring(17, 19)

    var Cdata = new Date(ano, (mes - 1), dia, h, m, s)



    Time = setInterval(function () {
        var auxi = Cdata.getSeconds()
        Cdata.setSeconds(auxi + 1)
        document.getElementById('tempo').innerHTML = Cdata.getDate() + "/" + (Cdata.getMonth() + 1) + "/" + Cdata.getFullYear() + "<br>" + Cdata.getHours() + ":" + Cdata.getMinutes() + ":" + Cdata.getSeconds() + "s"
    }, 1000)

}
function stoptime() {
    clearInterval(Time)
}



function quebra(obj) {
    var separa = obj.split("/")

    var tmz = separa[0]
    separa.shift();
    var regiao = separa
    if (regiao.length > 1) {
        regiao = regiao.join("/")
    } else {
        regiao = regiao[0]
        if (regiao === undefined) {
            regiao = tmz
        }
    }

    const regi = [tmz, regiao]
    return regi

}
