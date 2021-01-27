//requisição puxa api timezone 
//(timezone na var local (ex: America/Sao Paulo), utc_offset na var fz (ex: +00:00 -03:00) e ip na var ip)
//função addsec traz o formato do horário e data (melhor descrito abaixo)
//com o document.get coloca as informações nas divs criadas dentro dos cards já criados no html

const req = new XMLHttpRequest();
req.open("GET", "https://worldtimeapi.org/api/ip ")
req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const objeto2 = JSON.parse(this.responseText)
        var local = objeto2.timezone
        addsec(objeto2.datetime)
        var ip = objeto2.client_ip
        var fz = objeto2.utc_offset
        // console.log(objeto2)

        document.getElementById("hip").innerHTML += `<table id="tabela"><tr><td>${local}</td></tr>
                        <tr><td id="colunahip"></td></tr>
                        <tr> <td>${fz}</td></tr>
                        <tr><td>IP:${ip}</td></tr>
                        </table>`



    }

}
req.send()

//função addsec chama (objeto, número). Dentro da al_cap está chamando objeto2.datetime ex: "2021-01-26T04:51:05-07:00"
//As var criadas para ano, mes, dia, h, m e s fazem um corte puxando valores de substring para corresponder a informação separada
//Na Cdata é puxada uma new date com as informações do objeto tirando -1 do mês pois no objeto está no formato 1 a 12 e o formato new date é 0 a 11
//função setInterval estabelece o formato de apresentação das informações para serem colocados na td 'colunahip'
//Ao puxar os dados para entregar no formato MM/DD/YYYY volta a adicionar +1 no month

function addsec(objeto) {

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
        document.getElementById('colunahip').innerHTML = Cdata.getDate() + "/" + (Cdata.getMonth() + 1) + "/" + Cdata.getFullYear() + "<br>" + Cdata.getHours() + ":" + Cdata.getMinutes() + ":" + Cdata.getSeconds() + "s"





    }, 1000)

}