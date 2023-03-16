(()=>{"use strict";window.application={blocks:{"start-button":function(t){const e=document.createElement("button");e.textContent="Start",e.classList.add("startScreen__button"),e.addEventListener("click",(()=>{let t;window.application.level=document.querySelector('input[name="difficulty"]:checked').id,"1"===window.application.level?t=n:"2"===window.application.level?t=a:"3"===window.application.level&&(t=o),s(c(t))})),t.appendChild(e)},"restart-button":function(t){const e=document.createElement("button");e.textContent="Restart",e.classList.add("gameScreen__button"),e.addEventListener("click",(()=>{let t;"1"===window.application.level?t=n:"2"===window.application.level?t=a:"3"===window.application.level&&(t=o),s(c(t))})),t.appendChild(e)}},token:{},id:{},screens:{start:function(){const t=document.querySelector(".app");t.textContent="";const e=document.createElement("div");e.classList.add("startScreen__background");const n=document.createElement("h1");n.textContent="Choose difficulty",n.classList.add("startScreen__title");const a=document.createElement("div");a.classList.add("startScreen__content"),t.appendChild(e),e.appendChild(n);for(let t=1;t<=3;t++){const n=document.createElement("label");n.classList.add("startScreen__label"),n.htmlFor=t,n.textContent=t;const o=document.createElement("input");o.classList.add("startScreen__input"),o.id=t,o.setAttribute("type","radio"),o.setAttribute("name","difficulty"),e.appendChild(a),a.appendChild(o),a.appendChild(n)}window.application.renderBlock("start-button",e)},game:s},renderScreen:function(t){this.screens[t]()},renderBlock:function(t,e){this.blocks[t](e)},level:[]},window.application.renderScreen("start");const t=["hearts","diamonds","clubs","spades"],e=["6","7","8","9","10","J","Q","K","A"],n=6,a=12,o=18;function c(n){const a=[];for(let o=0;o<n/2;o++){const n=t[Math.floor(Math.random()*t.length)],o=e[Math.floor(Math.random()*e.length)];a.push({suit:n,rank:o}),a.push({suit:n,rank:o})}for(let t=a.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[a[t],a[e]]=[a[e],a[t]]}return a}function s(t){const e=document.querySelector(".app");e.textContent="";const n=document.createElement("div");n.classList.add("gameScreen__topboard"),n.classList.add("center");const a=document.createElement("div");a.classList.add("gameScreen__board"),a.classList.add("center");for(let e=0;e<t.length;e++){const n=document.createElement("div");n.classList.add("gameScreen__card"),n.dataset.index=e,n.dataset.suit=t[e].suit,n.dataset.rank=t[e].rank;const o=document.createElement("div");o.classList.add("gameScreen__front"),o.classList.add(t[e].suit+t[e].rank),o.style.backgroundImage=`url(./dist/img/cards/${t[e].suit}/${t[e].rank}.svg`;const c=document.createElement("div");c.classList.add("gameScreen__back"),c.style.backgroundImage="url(./dist/img/рубашка.svg)",n.appendChild(o),n.appendChild(c),a.appendChild(n),setTimeout((()=>{n.classList.add("flipped")}),5e3)}e.appendChild(n),e.appendChild(a);const o=document.createElement("div");o.classList.add("gameScreen__timer");let c=0;const s=setInterval((()=>{const t=Math.floor(c/60).toString().padStart(2,"0"),e=(c%60).toString().padStart(2,"0");o.textContent=`${t}:${e}`,c++}),1e3);n.appendChild(o),window.application.renderBlock("restart-button",n);const l=()=>{clearInterval(s)};function d(t,e){const n=document.querySelector(".overlay"),a=document.querySelector(".modal-header-text"),o=document.querySelector(".modal-image"),c=document.querySelector(".modal-time-taken"),s=document.querySelector(".modal-time");t?(a.textContent="Congratulations!",o.src="dist/img/Image.png"):(a.textContent="Sorry, you lost.",o.src="dist/img/Image-2.png");const l=Math.floor(e/60),d=e%60;c.textContent="Time taken:",s.textContent=`${l.toString().padStart(2,"0")}:${d.toString().padStart(2,"0")}`,n.style.display="block",document.querySelector(".modal-restart-button").addEventListener("click",(()=>{n.style.display="none",window.application.renderScreen("start")})),document.querySelector(".close").addEventListener("click",(()=>{n.style.display="none"}))}let i=null,r=0;function u(e){if(console.log(e),console.log(i),console.log(this),null===i)this.classList.remove("flipped"),i=this,console.log(i);else{if(this===i)return;this.classList.remove("flipped"),i.dataset.rank===this.dataset.rank&&i.dataset.suit===this.dataset.suit?(r++,i=null,r===t.length/2&&(l(),d(!0,c),console.log("you have won"))):(l(),d(!1,c),console.log("game over"))}}const p=document.querySelectorAll(".gameScreen__card");console.log(p);for(let t=0;t<p.length;t++)p[t].addEventListener("click",u.bind(p[t]))}})();