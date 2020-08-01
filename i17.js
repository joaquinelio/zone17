
async function lei17(){

  const urlIssue = "https://api.github.com/repos/javascript-tutorial/es.javascript.info/issues/17"
  const urlComments = "https://api.github.com/repos/javascript-tutorial/es.javascript.info/issues/17/comments?page="


  let respIssue = await fetch(urlIssue)
  let respComments = await fetch(urlComments)

  



  if (respIssue.ok){
    let json = await respIssue.json()
    let sBody = json.body
    
//    let aOldArticles = sBody.match(/^\* \[ ]    . ??????  ?(@/w+) ?????    ?!(#) ?????  \n$ ????? /g   ????????????????

    let aOldArticles = sBody.split("\n").filter( ffOld )

//    alert (aOldArticles.length)

    document.getElementById("lista").innerHTML = "<hr><p>" + aOldArticles.join("</p><p>") + "</p><hr>"

   
//    for(let i of aOldArticles){
//	document.getElementById(" ").innerHTML = (
//    }
   



  } else {alert("ufa!!!")}
}

function ffOld(que){

//   const regexp = /^\* \[ ]/

//  const regexp = /^(\* \[ ]) \[(/w+)] \((\w+)\) \((@/w+)\) \(?(!#)\)/ 

  const regexp = /(^\* \[ ] )(\[[\w-]\])/ 

  return regexp.test(que)
}


async function getComments(){

}
