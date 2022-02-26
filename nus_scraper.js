chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if(request.method == "getHTML"){
            var html=document.getElementsByClassName("module-card");
            var outp =[];
            for (i=0,len=html.length; i<len; i++){
                outp.push(html.item(i).href);
            }
            console.log(html);
            sendResponse({data: outp, method: "getHTML"}); //same as innerText
        }
        if(request.method == "getTable"){
            var html = document.getElementsByTagName("list-view-item");
            var outp = [];
            for (i=0,len=html.length; i<len; i++){
                var entry = html.item(i);
                inHTML = entry.innerHTML;
                link = inHTML.match(/nus-sg.*?\\/);
                inTEXT = entry.innerText;
                text=inTEXT.split("\n");
                var obj = {name:text[0], 
                    date:text[3],
                    duration:text[5],
                    user:text[8],
                    link:link
                };
                outp.push(obj);
            }
            sendResponse({data: outp, method: "getTable"});
        }
    }
);