const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");e.addEventListener("click",(function(){a=setInterval((()=>d.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`),1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(function(){clearInterval(a),e.disabled=!1,t.disabled=!0}));let a=null;
//# sourceMappingURL=01-color-switcher.950c0919.js.map
