var button = document.getElementById("nus");
button.addEventListener("click", function(){
    chrome.tabs.create({url:"https://luminus.nus.edu.sg/modules"});
});
var removeTabs=[];
var confrenceData = [];
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    if (url === "https://luminus.nus.edu.sg/modules"){
        //console.log("login");
        removeTabs.push(tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, {method: "getHTML"}, function(response) {
            if(response.method=="getHTML"){
                alltext = response.data;
                //console.log(alltext);
                alltext.forEach(confrenceGetter);
            }
        });
    ;
        

    }   else{
        //console.log("not login");
        //print please login 
    }
    return;
    // use `url` here inside the callback because it's asynchronous!
});


function confrenceGetter(value){
    //console.log(value);
    var tab;
    chrome.tabs.create({url:value.concat("/conferencing"),active:false},function(newTab) {
        //console.log(newTab.id);
        tab=newTab.id;
        });

}
