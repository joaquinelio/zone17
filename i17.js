
//aArticles [ article, user, ]  
//          filter by !done[X] +@user !#pr   
//          no reorder      
//aComments [ article, @user, date, id ]  
//          article orderby, unique newer date    // no, no
//          -filter by bot reaction-              // couldn't find    

//const urlIssue = document.getElementById("urlissue").value 
//"https://api.github.com/repos/javascript-tutorial/es.javascript.info/issues/17"

//const urlComments = urlIssue+ "/comments?page=" 

// art = {PR:5, User:4,  }  
// cmt = { }
const artPR = 5
const artUser = 4
const artArt = 2
const artDate = 6

const comBody = 0
const comUser = 1
const comDate = 2
const comId = 3

async function lei17(){
  
  let urlIssue = document.getElementById("urlissue").value
  let urlComments = urlIssue + "/comments?page=" 
  

                  // *, [x], [article desc], (http:), (@user), #pr
  let regIssue = /(\[[\sX]\])\s(\[.+\])\s?(\([.\S]+\))\s?(\(@.+\))?\s?(#\d+)?/

  //const regComments = /  /

  //--------------------------------------------------------
  let aArticles = await getArticles( urlIssue, regIssue  )
  for (let aa of aArticles){
    if(Array.isArray(aa)) aa.push(" ")
  }  // date 

  //--------------------------------------------------------
 let aComments = await getComments(urlComments)

  //--------------------------------------------------------
  for (let ac of aComments){
    for (let aa of aArticles){
      
      if (!Array.isArray(aa)) continue
      
      aa[artUser] = aa[artUser] || "" //   ||= ""
      aa[artPR] = aa[artPR] || ""
  
      if(aa[artArt] === `[` + ac[comBody] + `]` && 
          aa[artUser] == `(@`+ac[comUser]+`)` && 
          aa[artDate] < ac[comDate]) {

              aa[artDate] = ac[comDate].substring(0, 10)  
//              aa[artUser] = aa[artUser] || "" 
      }
    }
  }

//  //aArticles.sort( (a,b)=>( a[artDate] > b[artDate] ) )  // ????'?
//  aArticles.sort( (a,b)=>( (a[artDate]<b[artDate])?-1:1) )

  //--------------------------------------------------------
  let sArticle="<table ><tr><th>Artícle</th><th>Translator</th><th>Claimed Date</th><th>PR</th></tr>"
  for (let s of aArticles){ 
    //s.shift()
    //sArticle += "<hr><p>" + s.join("</p><p>") + "</p>"  
    
    //sArticle += "<hr><p>" + s[artArt] + "  " + s[artUser] + "  " + s[artDate] + "</p>"
    if (!Array.isArray(s)) continue
    
    sArticle += `<tr><td>` + 
      s[artArt] + `,</td><td>  ` + s[artUser] + `,</td><td>  ` + s[artDate] + `,</td><td>  ` + s[artPR] + `</td></tr>`

  }
  document.getElementById("lista").innerHTML = 
      "<p>Pending Articles: " + aArticles.length + "</p><p> " + 
      Date() + "</p>" +
      sArticle +
      "</table>"
}


async function getArticles(url, regexp){
  let aArticles=[]
  let respIssue = await fetch(url)

  if (respIssue.ok){               

    let json = await respIssue.json()

    aArticles = json.body.split("\n").filter((que) => /http/.test(que) && /^\* \[ ]/.test(que)) // No traducidos [X]  //.map( (s)=>s.match(regexp) )   
    
    
  } else {
    alert("resp issue BAAAAD") 
  }

  return aArticles.map( (s)=>s.match(regexp) )   //.filter((x)=>( x[artPR] == undefined && x[artUser] != undefined ) )     
}


async function getComments(url){
  let aComments = []
  let pagina = 1
  let respComments 

  while (true){   
    respComments = await fetch(url+pagina)
    if (respComments.ok){
      let json = await respComments.json()

      if (  typeof(json[0]) != "object"  ) {break} 

      for (let o of json){
        if (o.body.length < 55 ){ // <55 dont bother
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
