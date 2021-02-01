//loop for vai fazer até 12 vezes um número aleatório multiplicado pela length do objeto (386), retornando 12 números aleatórios do objeto que fazem referência as localidades.
//var objetoal retorna o nome dos 12 objetos consultados a partir de seus números referência


// Access-control indica se os recursos da resposta podem ser compartilhados com a origem dada. No caso * qualquer origem. 

var header = ('Access-Control-Allow-Origin: *');  

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://worldtimeapi.org/api/timezone")

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const objeto = JSON.parse(this.responseText)
        // console.log(objeto)
        for (var i = 1; i <= 12; i++) {
            var al = Math.floor(Math.random() * objeto.length)
            var objetoal = objeto[al]
            // console.log(al)
            // console.log(objetoal)
            al_cap(i, objetoal)
        }

    }
}

xhr.send()

//função al_cap puxa (i= número de 1 a 12, objetoal = 12 localidades
//requisição puxa api timezone + objetoal, para trazer informações específicas para as 12 localidades sorteadas 
//(timezone na var local e utc_offset na var fz ex: +00:00 -03:00)
//função addsec traz o formato do horário e data (melhor descrito abaixo)
//com o document.get coloca as informações nas divs criadas dentro dos cards já criados no html


function al_cap(i, objetoal) {
    document.getElementById(String(i)).innerHTML = ''
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "https://worldtimeapi.org/api/timezone/" + objetoal)
    xhr2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objeto2 = JSON.parse(this.responseText)
            // console.log(objeto2) 
            var local = objeto2.timezone
            // console.log(local)
            addsec(objeto2.datetime, i)
            // console.log(objeto2.datetime)
            var fz = objeto2.utc_offset
            // console.log(fz)
            document.getElementById(String(i)).innerHTML += `<div id="new" style="width:300px; justify-content:center; text-align:center;"><div>${local}</div>
                        <div id="coluna${i}"></div>
                        <div>${fz}</div>
                        </div>`
        }
        else if(this.readyState == 0 || this.status == 404) {
            al_cap(i, objetoal)
        }

    }
    xhr2.send()
}

//função addsec chama (objeto, número). Dentro da al_cap está chamando objeto2.datetime ex: "2021-01-26T04:51:05-07:00"
//As var criadas para ano, mes, dia, h, m e s fazem um corte puxando valores de substring para corresponder a informação separada
//Na Cdata é puxada uma new date com as informações do objeto tirando -1 do mês pois no objeto está no formato 1 a 12 e o formato new date é 0 a 11
//função setInterval estabelece o formato de apresentação das informações para serem colocados nas divs
//Ao puxar os dados para entregar no formato MM/DD/YYYY volta a adicionar +1 no month


function addsec(objeto, i) {

    var ano = parseInt(objeto.substring(0, 4))
    var mes = objeto.substring(5, 7)
    var dia = objeto.substring(8, 10)

    var h = objeto.substring(11, 13)
    var m = objeto.substring(14, 16)
    var s = objeto.substring(17, 19)

    var Cdata = new Date(ano, (mes - 1), dia, h, m, s)
   
    setInterval(function () {
        var auxi = Cdata.getSeconds()
        Cdata.setSeconds(auxi + 1)
        document.getElementById('coluna' + i).innerHTML = Cdata.getDate() + "/" + (Cdata.getMonth() + 1) + "/" + Cdata.getFullYear() + "<br>" + Cdata.getHours() + ":" + Cdata.getMinutes() + ":" + Cdata.getSeconds() + "s"
    }, 1000)
    

}

var nav = document.getElementById("mdl-navigation");
var links = nav.getElementsByClassName("mdl-navigation__link");
for (var i = 0; i < btns.length; i++) {
  links[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}