
/*
separar 
  respissue
  respcoment
  mix -> htm


  regex!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
  o vieja escuela 
  mmm... awk es mas vieja escuela

*/



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

    document.getElementById("lista").innerHTML = aOldArticles.length + "<hr><p>" + aOldArticles.join("</p><p>") + "</p><hr>"

   
//    for(let i of aOldArticles){
//	document.getElementById(" ").innerHTML = (
//    }
   



  } else {alert("ufa!!!")}
}

function ffOld(que){

  const regexp = /^\* \[ ]/

  //  const regexp = /(^\* \[ ] )(\[[\w-]\])/     wtf 
//  const regexp = /^(\* \[ ]) \[(/w+)] \((\w+)\) \((@/w+)\) \(?(!#)\)/ 

  return regexp.test(que)
}


async function getComments(){

}
