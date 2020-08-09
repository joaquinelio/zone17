
//aArticles [ article, user, ]  
//          filter by !done[X] +@user !#pr   
//          no reorder      
//aComments [ article, @user, date, id ]  
//          article orderby, unique newer date    // no, no
//          -filter by bot reaction-              // couldn't find    

const urlIssue = "https://api.github.com/repos/javascript-tutorial/es.javascript.info/issues/17"
const urlComments = "https://api.github.com/repos/javascript-tutorial/es.javascript.info/issues/17/comments?page="

const artPR = 5
const artUser = 4
const artArt = 2
const artDate = 6

const comBody = 0
const comUser = 1
const comDate = 2
const comId = 3


async function lei17(){

                  // *, [x], [article desc], (http:), (@user), #pr
  const regIssue = /(\[[\sX]\])\s(\[.+\])\s?(\(http[.\S]+\))\s?(\(@\w+\))?\s?(#\d+)?/

  //const regComments = /  /

  //--------------------------------------------------------
  let aArticles = await getArticles( urlIssue, regIssue  )
  
//  aArticles.shift()   // el 1ro es el ejemplo de Ilya //ya eta filtrado
  for (let aa of aArticles){aa.push(" ")}  // date 

  //--------------------------------------------------------
 let aComments = await getComments(urlComments)

  //--------------------------------------------------------
  for (let ac of aComments){
    for (let aa of aArticles){

      if (aa[artUser]==undefined) {aa[artUser]=""} 
      if (aa[artPR]==undefined) {aa[artPR]=""} 
       

      if(aa[artArt] === `[` + ac[comBody] + `]` && 
          aa[artUser] == `(@`+ac[comUser]+`)` && 
          aa[artDate] < ac[comDate]) {

              aa[artDate] = ac[comDate].substring(0, 10)  
              if (aa[artUser]=="undefined") {aa[artUser]=""} 
              //break ??
      }
    }
  }

//  //aArticles.sort( (a,b)=>( a[artDate] > b[artDate] ) )  // ????'?
//  aArticles.sort( (a,b)=>( (a[artDate]<b[artDate])?-1:1) )

  //--------------------------------------------------------
  let sArticle="<table ><tr><th>Artículo</th><th>Traductor</th><th>Fecha</th><th>PR</th></tr>"
  for (let s of aArticles){ 
    //s.shift()
    //sArticle += "<hr><p>" + s.join("</p><p>") + "</p>"  
    
    //sArticle += "<hr><p>" + s[artArt] + "  " + s[artUser] + "  " + s[artDate] + "</p>"

    sArticle += `<tr><td>` + 
      s[artArt] + `</td><td>  ` + s[artUser] + `</td><td>  ` + s[artDate] + `</td><td>  ` + s[artPR] + `</td></tr>`

  }
  document.getElementById("lista").innerHTML = 
      "<p>Articles: " + aArticles.length + "</p><p> " + 
      Date() + "</p>" +
      sArticle +
      "</table>"
}


async function getArticles(url, regexp){
  let aArticles=[]
  let respIssue = await fetch(url)

  if (respIssue.ok){               // .ok = http status ok

    let json = await respIssue.json()

    aArticles = json.body.split("\n").filter((que)=>/^\* \[ ]/.test(que)) // No traducidos [X]  //.map( (s)=>s.match(regexp) )   

  } else {
    alert("resp issue BAAAAD") 
  }
  console.log(aArticles.shift().length )

  return aArticles.map( (s)=>s.match(regexp) ) //.filter((x)=>( x[artPR] == undefined && x[artUser] != undefined ) )     
}


async function getComments(url){
  let aComments = []
  let pagina = 1
  let respComments 

  while (true){   // CAREFUL

    respComments = await fetch(url+pagina)
    if (respComments.ok){
      let json = await respComments.json()

      if (  typeof(json[0]) != "object"  ) {break} 

      for (let o of json){
        if (o.body.length < 55 ){
          aComments.push([o.body, o.user.login, o.created_at, o.id])
        }
      }
    } else {
      alert("resp issue BAAAAD")
      break 
    } 
    pagina++  
  }
  return aComments  
}