// Access-control indica se os recursos da resposta podem ser compartilhados com a origem dada. No caso * qualquer origem. 
var header = ('Access-Control-Allow-Origin: *'); 

var progressBar = document.getElementById('progress')
progressBar.style.visibility = "hidden"

 

document.getElementById('tzone').addEventListener("change", function () {

    region = document.getElementById("reg")
    region.innerHTML += `<option value="" selected hidden disable>Carregando...</option>`
    
    progressBar.value = 0
    
    setTimeout(function() {
        progressBar.style.visibility = "visible"
    }, 100)


  
    


//rec2 chama api timezone dependendo do valor selecionado no primeiro seletor ex: Antarctica retorna no segundo seletor: ("Antarctica/Casey","Antarctica/Davis","Antarctica/DumontDUrville".......)
//function é chamada na troca de valor do primeiro seletor
//Dentro de function () funcao quebra pega um valor do objeto ex: Antarctica/Casey e retorna um array com 2 valores (0) Antarctica, (1) Casey
//no array tamanho2 há um loop para adicionar o valor 1 do retorno da função quebra ex: Casey
//com a var region, acessa o innerHTML do segundo seletor "reg" adicionando o valor da var tamanho2

    const select = document.querySelector('select#tzone');
    const valueSelect = select.value

    const rec2 = new XMLHttpRequest();
    rec2.open("GET", `https://worldtimeapi.org/api/timezone/${valueSelect}`)
    rec2.onreadystatechange = function () {
        if (rec2.readyState == 4 && rec2.status == 200) {            
            region.innerHTML = "<option value='' selected hidden disable>selecione..</option>"
            setTimeout(function() {
                progressBar.style.visibility = "hidden"
            }, 100)
            
            

            rec2.onprogress = function(pe) {
                if(pe.lengthComputable) {
                    progressBar.max = pe.total
                    progressBar.value = pe.loaded
                }
            }              
                    
            rec2.onloadend = function(pe) {
                progressBar.value = pe.loaded
            }

            const obj = JSON.parse(this.responseText)  
            // console.log(obj)                     
            var tamanho2 = []  
            // console.log(tamanho2)                      
            for (var i = 0; i < obj.length; i++) {
                var rquebra2 = quebra(obj[i])
                // console.log(rquebra2)
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

    progressBar.value = 0
    
        setTimeout(function() {
            progressBar.style.visibility = "visible"
        }, 100)


//segunda req da página local puxa detalhes do local (seletor2) como: 28T22:20:50.218390+11:00","day_of_week":4,"day_of_year":28,"dst":false.... etc
//no change do seletor 2 (reg) é chamada function ()
//function adiciona em uma tabela na div "hora" a timezone e o fuso


    const rec3 = new XMLHttpRequest();
    rec3.open("GET", `https://worldtimeapi.org/api/timezone/${vsel}/${valueSelect2}`)

    rec3.onreadystatechange = function () {
        document.getElementById('hora').innerHTML = "<p>Carregando...</p>"
        
        if (rec3.readyState == 4 && rec3.status == 200) {

            setTimeout(function() {
                progressBar.style.visibility = "hidden"
            }, 100)
            
            

            rec3.onprogress = function(pe) {
                if(pe.lengthComputable) {
                    progressBar.max = pe.total
                    progressBar.value = pe.loaded
                }
            }              
                    
            rec3.onloadend = function(pe) {
                progressBar.value = pe.loaded
            }

            const objlc = JSON.parse(this.responseText)
            // console.log(objlc)
            var local = objlc.timezone
            stoptime()
            addsec(objlc.datetime)
            var fuso = objlc.utc_offset

            document.getElementById('hora').innerHTML = `<table style="text-align:center; justify-content:center;"><thead><tr><td>${local}</td></thead></tr> <tr><td id="tempo"> </td></tr> <tr><td>${fuso}</td></tr></table>`



        }
        else if(this.readyState == 0 || this.status == 404){
            document.getElementById('hora').innerHTML = `<div>Informação Temporariamente Indisponível, tente outra opção</div>`
        }
    }

    rec3.send()
    document.getElementById('hora').innerHTML = "<p>Carregando...</p>"

})

var Time

//função addsec chama (objeto, número). Dentro da al_cap está chamando objeto2.datetime ex: "2021-01-26T04:51:05-07:00"
//As var criadas para ano, mes, dia, h, m e s fazem um corte puxando valores de substring para corresponder a informação separada
//Na Cdata é puxada uma new date com as informações do objeto tirando -1 do mês pois no objeto está no formato 1 a 12 e o formato new date é 0 a 11
//função setInterval estabelece o formato de apresentação das informações para serem colocados na td 'colunahip'
//Ao puxar os dados para entregar no formato MM/DD/YYYY volta a adicionar +1 no month
//com o Set interval, depois de 1 segundo é chamada a função (1000 miliseconds)


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
    // console.log(tmz)
    separa.shift();
    var regiao = separa
    // console.log(regiao)
    if (regiao.length > 1) {
        regiao = regiao.join("/")
    } else {
        regiao = regiao[0]
        if (regiao === undefined) {
            regiao = tmz
        }
    }

    const regi = [tmz, regiao]
    // console.log(regi)
    return regi

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
