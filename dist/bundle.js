(()=>{"use strict";function e(){var e=document.querySelector(".app");e.textContent="";var t=document.createElement("div");t.classList.add("startScreen__background");var n=document.createElement("h1");n.textContent="Choose difficulty",n.classList.add("startScreen__title");var a=document.createElement("div");a.classList.add("startScreen__content"),e.appendChild(t),t.appendChild(n);for(var r=1;r<=3;r++){var c=document.createElement("label");c.classList.add("startScreen__label"),c.htmlFor=r.toString(),c.textContent=r.toString();var o=document.createElement("input");o.classList.add("startScreen__input"),o.id=r.toString(),o.setAttribute("type","radio"),o.setAttribute("name","difficulty"),t.appendChild(a),a.appendChild(o),a.appendChild(c)}window.application.renderBlock("start-button",t)}var t,n=0,a=0,r=function(){i()},c=function(){document.querySelector(".gameScreen__timer").textContent="00:00",clearTimeout(t);var e=(a>9?a:"0"+a)+":"+(n>9?n:"0"+n);return n=0,a=0,e};function o(){++n>=60&&(n=0,a++),document.querySelector(".gameScreen__timer").textContent=(a>9?a:"0"+a)+":"+(n>9?n:"0"+n),i()}function i(){t=setTimeout(o,1e3)}function d(t){var n=document.querySelector(".overlay"),a=document.querySelector(".modal-header-text"),r=document.querySelector(".modal-image"),o=document.querySelector(".modal-time"),i=c();t?(a.textContent="Congratulations!",r.src="static/img/Image.png"):(a.textContent="Sorry, you lost.",r.src="static/img/Image-2.png"),o.textContent=i,n.style.display="block",document.querySelector(".modal-restart-button").addEventListener("click",(function(){n.style.display="none",e()})),document.querySelector(".close").addEventListener("click",(function(){n.style.display="none"}))}var l=null,s=0;function u(){var e=document.querySelectorAll(".gameScreen__card");if(console.log(e),null===l)this.classList.remove("flipped"),l=this,console.log(l);else{if(this===l)return;this.classList.remove("flipped"),l.dataset.rank===this.dataset.rank&&l.dataset.suit===this.dataset.suit?(s++,l=null,s===e.length/2&&(s=0,d(!0))):(s=0,l=null,d(!1))}}var m=6,p=12,v=18;function g(){var e=document.querySelector(".app");e.textContent="";var t=document.createElement("div");t.classList.add("gameScreen__topboard"),t.classList.add("center");var n=document.createElement("div");n.classList.add("gameScreen__board"),n.classList.add("center");var a=0;"1"===window.application.level?a=m:"2"===window.application.level?a=p:"3"===window.application.level&&(a=v);for(var c=function(e){for(var t=["hearts","diamonds","clubs","spades"],n=["6","7","8","9","10","J","Q","K","A"],a=[],r=0;r<e/2;r++){var c=t[Math.floor(Math.random()*t.length)],o=n[Math.floor(Math.random()*n.length)];a.push({suit:c,rank:o}),a.push({suit:c,rank:o})}return a.sort((function(){return Math.random()-.5}))}(a),o=function(e){var t=document.createElement("div");t.classList.add("gameScreen__card"),t.dataset.index=e.toString(),t.dataset.suit=c[e].suit,t.dataset.rank=c[e].rank;var a=document.createElement("div");a.classList.add("gameScreen__front"),a.classList.add(c[e].suit+c[e].rank),a.style.backgroundImage="url(./static/img/cards/".concat(c[e].suit,"/").concat(c[e].rank,".svg");var r=document.createElement("div");r.classList.add("gameScreen__back"),r.style.backgroundImage="url(./static/img/рубашка.svg)",t.appendChild(a),t.appendChild(r),n.appendChild(t),setTimeout((function(){t.classList.add("flipped")}),5e3)},i=0;i<c.length;i++)o(i);setTimeout((function(){r()}),5e3),e.appendChild(t),e.appendChild(n);var d=document.createElement("div");d.classList.add("gameScreen__timer"),t.appendChild(d),window.application.renderBlock("restart-button",t);var l=document.querySelectorAll(".gameScreen__card");for(console.log(l),i=0;i<l.length;i++)l[i].addEventListener("click",u.bind(l[i]))}window.application={blocks:{"start-button":function(e){var t=document.createElement("button");t.textContent="Start",t.classList.add("startScreen__button"),t.addEventListener("click",(function(){var e;window.application.level=null===(e=document.querySelector('input[name="difficulty"]:checked'))||void 0===e?void 0:e.id,g()})),e.appendChild(t)},"restart-button":function(e){var t=document.createElement("button");t.textContent="Restart",t.classList.add("gameScreen__button"),t.addEventListener("click",(function(){g(),c()})),e.appendChild(t)}},screens:{start:e,game:g},renderScreen:function(e){this.screens[e]()},renderBlock:function(e,t){this.blocks[e](t)},level:null,timers:[]},e()})();