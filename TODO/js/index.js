var addItem = (function(){
    var data = {};
    var ul = document.createElement("ul");
    var mydiv = document.getElementById("mylist");
    mydiv.appendChild(ul);
    return function(){
        let ctrl = document.getElementsByTagName("input");
        let val=ctrl[0].value;
        ctrl[0].value="";
        if(val){
            
           
            let li = document.createElement("li");
            let btn = document.createElement("button");
            let hr=document.createElement("hr");

            //style button
            btn.style.border="0px";
            btn.style.backgroundColor="royalblue";
            btn.style.padding="5px";
            btn.style.width="25px";
            btn.style.height="25px";
            mydiv.style.display = "block";

            //style li
            
            li.appendChild(document.createTextNode(val));
            btn.appendChild(document.createTextNode("X"));
            li.appendChild(btn);
            ul.appendChild(li);
            ul.appendChild(hr)
            
            btn.addEventListener("click",function(){
                ul.removeChild(li);
                ul.removeChild(hr);
                if(ul.childNodes.length==0){
                   mydiv.style.display="none";
                }
            })
        }
    }
})();