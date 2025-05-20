var F=Object.defineProperty;var U=(n,e,t)=>e in n?F(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var C=(n,e,t)=>U(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();class Q extends HTMLElement{constructor(){super(),this.isOpen=!1,this.currentMode="dark",this.onOpenCallback=null,this.onCloseCallback=null,this.attachShadow({mode:"open"});const e=`
            <style>
              ${this.getStyles()}
            </style>
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="close-button">&times;</button>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                </div>
            </div>
        `;this.shadowRoot.innerHTML=e,this.overlay=this.shadowRoot.querySelector(".modal-overlay"),this.closeButton=this.shadowRoot.querySelector(".close-button"),this.modalBody=this.shadowRoot.querySelector(".modal-body"),this.setupEventListeners(),this.setMode("dark")}getStyles(){return`
                :host {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }
                :host([visible]) {
                    opacity: 1;
                }
                .modal-content {
                    padding: 1rem;
                    border-radius: 8px;
                    position: relative;
                    min-width: 360px;
                    min-height: 360px;
                    max-height: 95dvh;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    opacity: 0;
                    transition: all 0.3s ease;
                    transform: scale(0.9);
                }
                :host([visible]) .modal-content {
                    transform: scale(1);
                    opacity: 1;
                }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: background-color 0.3s ease;
                }
                
                /* Dark Mode Styles */
                :host(.dark-mode) .modal-overlay {
                    background: rgba(0, 0, 0, 0.5);
                }
                :host(.dark-mode) .modal-content {
                    background: #1c1c1c;
                    color: #f4f4f4;
                }
                
                /* Light Mode Styles */
                :host(.light-mode) .modal-overlay {
                    background: rgba(0, 0, 0, 0.3);
                }
                :host(.light-mode) .modal-content {
                    background: #ffffff;
                    color: #333;
                    border: 1px solid #e0e0e0;
                }
                
                .close-button {
                    position: absolute;
                    top: 1px;
                    right: 1px;
                    border: none;
                    cursor: pointer;
                    width: 36px;
                    height: 36px;
                    border-radius: 10%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                /* Dark Mode Button */
                :host(.dark-mode) .close-button {
                    background-color: #dc3545;
                    color: white;
                }
                :host(.dark-mode) .close-button:hover {
                    background-color: #c82333;
                }
                
                /* Light Mode Button */
                :host(.light-mode) .close-button {
                    background-color: #f0f0f0;
                    color: #333;
                }
                :host(.light-mode) .close-button:hover {
                    background-color: #e0e0e0;
                }
                
                .modal-body {
                    margin-top: 20px;
                }
                
                ::slotted(*) {
                    max-width: 100%;
                }
      `}connectedCallback(){}setupEventListeners(){this.closeButton.addEventListener("click",()=>this.close()),this.overlay.addEventListener("click",e=>{e.target===this.overlay&&this.close()})}setMode(e="dark"){["dark","light"].includes(e)||(console.warn("Invalid mode. Using default dark mode."),e="dark"),this.classList.remove("dark-mode","light-mode"),this.classList.add(`${e}-mode`),this.currentMode=e}toggleMode(){const e=this.currentMode==="dark"?"light":"dark";this.setMode(e)}open(e=null){this.onOpenCallback=e,this.style.display="block",this.offsetHeight,this.setAttribute("visible",""),this.isOpen=!0,this.onOpenCallback&&this.onOpenCallback()}close(e=null){this.onCloseCallback=e,this.removeAttribute("visible"),this.isOpen=!1,setTimeout(()=>{this.style.display="none",this.isOpen=!1,this.onCloseCallback&&this.onCloseCallback()},300)}appendChild(e){super.appendChild(e)}setContent(e){for(;this.firstChild;)this.removeChild(this.firstChild);if(typeof e=="string"){const t=document.createElement("div");t.innerHTML=e,this.appendChild(t)}else e instanceof Node&&this.appendChild(e)}getContentContainer(){return this}}customElements.get("custom-modal")||customElements.define("custom-modal",Q);if(!customElements.get("custom-input")){class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0}),this.handleInputChange=this.handleInputChange.bind(this)}static get observedAttributes(){return["type","id","name","value","placeholder","disabled","readonly","darkmode","options","required","title","pattern"]}getStyles(){const t=this.hasAttribute("darkmode");return`
          :host {
            display: block;
            margin: inherit;
            color-scheme: light dark;
            margin: 0.5rem;
            padding: 0.5rem;
          }
          
          .input-container {
            display: flex;
            flex-direction: column;
            padding: inherit;
          }
          
          input, textarea, select {
            padding: inherit;
            padding: 0.5rem;  /* Valor de respaldo si no se hereda */
            border: inherit;
            border-color: ${t?"#555":"#ccc"};
            border-radius: 4px;
            font-size: 14px;
            background-color: inherit;
            color: inherit;
          }
          textarea {
            resize: vertical;
            min-height: 100px;
          }
          input:disabled, textarea:disabled, select:disabled {
            background-color: ${t?"#222":"#f5f5f5"};
            cursor: not-allowed;
            color: ${t?"#666":"#888"};
          }
          
          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 30px;
          }
          
          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${t?"#555":"#ccc"};
            transition: .4s;
            border-radius: 34px;
          }
          
          .slider:before {
            position: absolute;
            content: "";
            height: 22px;
            width: 22px;
            left: 4px;
            bottom: 4px;
            background-color: ${t?"#888":"white"};
            transition: .4s;
            border-radius: 50%;
          }
          
          input:checked + .slider {
            background-color: #2196F3;
          }
          
          input:checked + .slider:before {
            transform: translateX(28px);
          }
          
          input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #2196F3;
            box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
          }
        `}connectedCallback(){this.render();const t=this.shadowRoot.querySelector("input, textarea, select");t&&(t.addEventListener("input",this.handleInputChange),t.addEventListener("change",this.handleInputChange)),this.shadowRoot.querySelectorAll("form")}disconnectedCallback(){const t=this.shadowRoot.querySelector("input, textarea, select");t&&(t.removeEventListener("input",this.handleInputChange),t.removeEventListener("change",this.handleInputChange)),this.shadowRoot.querySelector(".validate-form")}handleInputChange(t){const s=this.getInputValues();this.dispatchEvent(new CustomEvent("input-change",{detail:{id:this.getAttribute("id"),name:this.getAttribute("name"),value:s},bubbles:!0,composed:!0}))}attributeChangedCallback(t,s,i){s!==i&&this.render()}handleSubmit(t){t.preventDefault(),t.target.checkValidity()&&this.dispatchEvent(new CustomEvent("form-submit",{detail:{id:this.getAttribute("id"),name:this.getAttribute("name"),value:this.getInputValues()},bubbles:!0,composed:!0}))}render(){const t=this.getAttribute("type")||"text",s=this.getAttribute("id"),i=this.getAttribute("name"),o=this.getAttribute("value")||"",a=this.getAttribute("placeholder")||"",l=this.hasAttribute("disabled"),r=this.hasAttribute("readonly"),c=this.getAttribute("options")||"[]",u=this.hasAttribute("required")?"required":"",p=this.getAttribute("title")||"",d=this.getAttribute("pattern")||"",m={type:t,id:s,name:i,value:o,placeholder:a,disabled:l,readonly:r,options:c,required:u,title:p,pattern:d};this.shadowRoot.innerHTML=`
          <style>${this.getStyles()}</style>
          <form class="validate-form">
            <div class="input-container">
              ${this.renderInput(m)}
            </div>
          </form>
        `;const b=this.shadowRoot.querySelector("input, textarea, select");b&&(b.addEventListener("input",this.handleInputChange),b.addEventListener("change",this.handleInputChange))}renderInput(t){const{type:s,id:i,name:o,value:a,placeholder:l,disabled:r,readonly:c,options:u,required:p,title:d,pattern:m}=t,b=p?"required":"";switch(s){case"textarea":return`
              <textarea
                id="${i}"
                name="${o}"
                placeholder="${l}"
                ${r?"disabled":""}
                ${c?"readonly":""}
                ${b}
                  ${d?`title="${d}" oninvalid="this.setCustomValidity('${d}')" oninput="this.setCustomValidity('')"`:""}
                  ${m?`pattern="${m}"`:""}
              >${a}</textarea>
            `;case"checkbox":case"switch":case"boolean":return`
              <label class="switch">
                <input
                  type="checkbox"
                  id="${i}"
                  name="${o}"
                  ${a==="true"?"checked":""}
                  ${r?"disabled":""}
                  ${c?"readonly":""}
                  ${b}
                  ${d?`title="${d}" oninvalid="this.setCustomValidity('${d}')" oninput="this.setCustomValidity('')"`:""}
                  ${m?`pattern="${m}"`:""}
                >
                <span class="slider"></span>
              </label>
            `;case"select":const H=JSON.parse(u);return`
              <select
                id="${i}"
                name="${o}"
                ${r?"disabled":""}
                ${c?"readonly":""}
                ${p?"required":""}
                  ${d?`title="${d}" oninvalid="this.setCustomValidity('${d}')" oninput="this.setCustomValidity('')"`:""}
                  ${m?`pattern="${m}"`:""}
              >
                ${H.map(f=>`
                  <option value="${f.value}" ${f.value===a?"selected":""}>
                    ${f.image?`<img src="${f.image}" alt="${f.label}" style="vertical-align: middle; margin-right: 5px;">`:""}
                    ${f.label}
                  </option>
                `).join("")}
              </select>
            `;case"radio":return JSON.parse(u).map(f=>`
              <label>
                <input
                  type="radio"
                  id="${i}"
                  name="${o}"
                  value="${f.value}"
                  ${f.value===a?"checked":""}
                  ${r?"disabled":""}
                  ${c?"readonly":""}
                >
                ${f.label}
              </label>
            `).join("");default:return`
                <input
                  type="${s==="string"?"text":s}"
                  id="${i}"
                  name="${o}"
                  value="${a}"
                  placeholder="${l}"
                  ${r?"disabled":""}
                  ${c?"readonly":""}
                  ${b}
                  ${d?`title="${d}" oninvalid="this.setCustomValidity('${d}')" oninput="this.setCustomValidity('')"`:""}
                  ${m?`pattern="${m}"`:""}
                >
              `}}getInputValues(){const t=this.shadowRoot.querySelector("input, textarea, select");if(!t)return null;if(t.type==="checkbox")return t.checked;if(t.tagName.toLowerCase()==="textarea"){const o=t.value.trim();return o?o.split(`
`):[]}if(t.tagName.toLowerCase()==="select")return t.value;if(t.type==="radio"){const o=this.shadowRoot.querySelector(`input[name="${t.name}"]:checked`);return o?o.value:null}const s=this.parseValueByType(t),i=this.shadowRoot.querySelectorAll("form");return i&&i.forEach(o=>{o.reportValidity()?o.classList.remove("invalid"):o.classList.add("invalid")}),s}getvalidation(){let t=!1;const s=this.shadowRoot.querySelectorAll("form");return s&&s.forEach(i=>{i.reportValidity()?t=!0:t=!1}),t}parseValueByType(t){t.value;const s=t.type,i=t.value;switch(s){case"number":const o=Number(i);return isNaN(o)?0:o*1;case"text":case"string":return i;default:return i}}setInputValues(t){const s=this.shadowRoot.querySelector("input, textarea, select");if(s){if(s.type==="checkbox")s.checked=!!t;else if(Array.isArray(t)&&s.tagName.toLowerCase()==="textarea")s.value=t.join(`
`);else if(s.tagName.toLowerCase()==="select")s.value=t;else if(s.type==="radio"){const i=this.shadowRoot.querySelector(`input[name="${s.name}"][value="${t}"]`);i&&(i.checked=!0)}else s.value=t;this.handleInputChange()}}resetInputValues(){const t=this.shadowRoot.querySelector("input, textarea, select");t&&(t.type==="checkbox"?t.checked=!1:t.value="",this.handleInputChange())}setOptions(t){this.getAttribute("type")==="select"&&(this.setAttribute("options",JSON.stringify(t)),this.render())}getSelectedOption(){if(this.getAttribute("type")==="select"){const t=this.shadowRoot.querySelector("select");return t?t.value:null}return null}}customElements.define("custom-input",n)}class J extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0}),this.selectedValues=[],this.options=[],this.multiple=!1}static get observedAttributes(){return["multiple","grid"]}attributeChangedCallback(e,t,s){e==="multiple"&&(this.multiple=s!==null,this.selectedValues=[],this.render(),this.updateSelections())}connectedCallback(){this.multiple=this.hasAttribute("multiple"),this.render(),this.addEventListeners()}render(){this.shadowRoot.innerHTML=`
        <style>
          :host {
            display: inherit;
            grid-template-columns: inherit;
            grid-template-rows: inherit;
            font-family: Arial, sans-serif;
            border: 0px;
          }
          .select-container {
            border-radius: 4px;
            max-width: ${this.hasAttribute("grid")?"100%":"300px"};
            max-height: 480px;
            overflow-y: auto;
            padding: 8px;
          }
          .preview-container {
            border: 0px;
            margin-bottom: 12px;
            padding: 8px;
            border-bottom: 1px solid #eee;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px;
          }
          .preview-container img {
            max-width: 100%;
            max-height: 150px;
            object-fit: contain;
          }
          .options-list {
            display: ${this.hasAttribute("grid")?"grid":"flex"};
            flex-direction: column;
            grid-template-columns: repeat(auto-fit, minmax(100px, auto));
            gap: ${this.hasAttribute("grid")?"8px":"4px"};
          }
          .option {
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s ease;
            border: 2px solid transparent;
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #222c3a;
            border: 3px solid #2e3e53;
          }
          .option:hover {
            background-color: inherit;
            color: inherit;
          }
          .option.selected {
            background-color: inherit;
            color: #32d583;;
            border-color: #32d583;;
            font-weight: 500;
          }
          .option img {
            width: 24px;
            height: 24px;
            object-fit: cover;
            border-radius: 2px;
          }
        </style>
        <div class="select-container">
          <div class="preview-container" style="display: none;"></div>
          <div class="options-list"></div>
        </div>
      `}addEventListeners(){this.shadowRoot.querySelector(".options-list").addEventListener("click",t=>{const s=t.target.closest(".option");s&&(this.multiple?this.toggleOption(s):this.selectOption(s))})}updatePreview(e){const t=this.shadowRoot.querySelector(".preview-container");t.innerHTML="",Array.isArray(e)||(e=e?[e]:[]),e.length>0?(t.style.display="flex",e.forEach(s=>{if(s.img||s.image){const i=document.createElement("img");i.src=s.img||s.image,i.alt=s.label,t.appendChild(i)}else if(s.html){const i=document.createElement("div");i.innerHTML=s.html,t.appendChild(i)}else t.style.display="none"})):t.style.display="none"}toggleOption(e){const t=e.dataset.value,s=this.selectedValues.indexOf(t);s===-1?this.selectedValues.push(t):this.selectedValues.splice(s,1),this.updateSelections();const i=this.options.filter(o=>this.selectedValues.includes(o.value));this.updatePreview(i),this.dispatchEvent(new CustomEvent("change",{detail:i}))}selectOption(e){const t=e.dataset.value,s=this.options.find(i=>i.value===t);console.log("selectedOption",s,t),s&&(this.selectedValues=[t],this.updateSelections(),this.updatePreview(s),this.dispatchEvent(new CustomEvent("change",{detail:s})))}setSelectedValues(e){this.selectedValues=e,this.updateSelections()}updateSelections(){this.shadowRoot.querySelectorAll(".option").forEach(t=>{t.classList.toggle("selected",this.selectedValues.includes(t.dataset.value))})}setOptions(e){this.options=e;const t=this.shadowRoot.querySelector(".options-list");if(t.innerHTML=e.map(s=>{let i="",o="";return(s.img||s.image)&&(i+=`<img src="${s.img||s.image}" alt="${s.label}">`),s.state&&(o=`<span class="state">${s.state}</span>`),i+=`<span>${s.label}</span>`,`
          <div class="option ${this.selectedValues.includes(s.value)?"selected":""}" 
               data-value="${s.value}">
            ${i}
            ${o}
          </div>
        `}).join(""),this.selectedValues.length>0)if(this.multiple){const s=e.filter(i=>this.selectedValues.includes(i.value));this.updatePreview(s)}else{const s=e.find(i=>i.value===this.selectedValues[0]);s&&this.updatePreview(s)}}getValue(){return this.multiple?this.selectedValues:this.selectedValues[0]||null}getSelectedOptions(){const e=this.options.filter(t=>this.selectedValues.includes(t.value));return this.multiple?e:e[0]||null}}customElements.get("enhanced-select")||customElements.define("enhanced-select",J);const z=document.createElement("template");z.innerHTML=`
  <style>
    :host {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--background, rgba(0,0,0,0.8));
      color: var(--color, white);
      padding: 15px;
      border-radius: 8px;
      max-width: 300px;
      display: none;
      z-index: 1000;
    }
    
    .original {
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    .translation {
      margin-top: 5px;
      opacity: 0.9;
    }
  </style>
  <div class="original"></div>
  <div class="translations"></div>
`;class G extends HTMLElement{constructor(){super(),this._queue=[],this._current=null,this._timeoutId=null,this.attachShadow({mode:"open"}).appendChild(z.content.cloneNode(!0))}get delay(){const e=this._queue.length,t=this._calculateSize(this._current);let s;e>2?s=1e3:e<=1?s=1500:s=2500;const i=t/100;return console.log("sizeFactor",s+i*1e3),s+i*1e3}_calculateSize(e){return e?typeof e=="object"?JSON.stringify(e).length:e.length:0}addToQueue(e){this._queue.push(e),this._current||this._processQueue()}_processQueue(){if(this._timeoutId&&clearTimeout(this._timeoutId),this._queue.length===0){this._current=null,this.shadowRoot.host.style.display="none";return}this._current=this._queue.shift(),this._displayCurrent(),this._timeoutId=setTimeout(()=>this._processQueue(),this.delay)}_displayCurrent(){this.shadowRoot.host.style.display="block";const e=this.shadowRoot.querySelector(".original"),t=this.shadowRoot.querySelector(".translations");e.textContent=this._current.input,t.innerHTML=Object.entries(this._current.traducciones).map(([s,i])=>`<div class="translation"><strong>${s}:</strong> ${i}</div>`).join("")}setColor(e){this.setAttribute("color",e),this.shadowRoot.host.style.setProperty("--color",e)}setBackground(e){this.setAttribute("background",e),this.shadowRoot.host.style.setProperty("--background",e)}}customElements.get("translation-queue")||customElements.define("translation-queue",G);const Y=(()=>{const n=new Map,e=new Promise(t=>{window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("keydown",t,{once:!0})});return async t=>{try{const s=new Audio;if(s.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA",await s.play(),t&&t.id&&n.has(t.id)){const o=n.get(t.id);if(o)return o}const i=new AudioContext(t);return t&&t.id&&n.set(t.id,i),i}catch{if(await e,t&&t.id&&n.has(t.id)){const o=n.get(t.id);if(o)return o}const i=new AudioContext(t);return t&&t.id&&n.set(t.id,i),i}}})(),K=n=>new Promise((e,t)=>{const s=new FileReader;s.onload=()=>{if(s.result){const i=JSON.parse(s.result);e(i)}else t("oops")},s.readAsText(n)});function P(n){var e=atob(n),t=new Uint8Array(e.length);for(let s=0;s<e.length;s++)t[s]=e.charCodeAt(s);return t.buffer}const X={isClientContentMessage:se,isInterrupted:le,isModelTurn:Z,isServerContentMessage:ne,isSetupCompleteMessage:ie,isToolCall:ce,isToolCallCancellationMessage:re,isToolCallMessage:oe,isTurnComplete:ae};function Z(n){var l;const e=n;if(console.log("isModelTurn",n),!e.modelTurn||!e.modelTurn.parts)return n;let t=(l=e.modelTurn)==null?void 0:l.parts;const s=t.filter(r=>r.inlineData&&r.inlineData.mimeType.startsWith("audio/pcm")),i=s.map(r=>{var c;return(c=r.inlineData)==null?void 0:c.data}),o=t.filter(r=>!s.includes(r));if(i.forEach(r=>{if(r){const c=P(r);console.log("server.audio",`buffer (${c.byteLength})`)}}),ee(n.modelTurn.parts[0]),!o.length){console.log("no hay otros parts",o);return}return t=o,console.log("isModelTurn content",{modelTurn:{parts:t}}),n.modelTurn}function ee(n){if(!n.inlineData){console.log("playAudio",n),te(n);return}me(n.inlineData.data,n.inlineData.mimeType)}let y="";function te(n){try{if(!n||!n.text)throw new Error("La respuesta está vacía o es indefinida.");y+=n.text;const e=y.includes("```json"),t=y.includes("\n```");if(e&&t){const s=y.indexOf("```json"),i=y.indexOf("\n```",s);if(i===-1)return;const a=y.slice(s,i+4).replace(/```json\n|\n```/g,""),l=JSON.parse(a),r=x.getInstance("translation");return r&&r.emit("translation",l),console.log("Respuesta exitosa:",l),y="",l}}catch(e){return console.error("Error al parsear la respuesta:",e.message),y="",null}}function E(n,e,t="object"){return n!=null&&typeof n=="object"&&typeof n[e]===t}function se(n){return E(n,"clientContent")}function ie(n){return E(n,"setupComplete")}function ne(n){return E(n,"serverContent")}function oe(n){return E(n,"toolCall")}function re(n){return E(n,"toolCallCancellation")&&de(n.toolCallCancellation)}function ae(n){return typeof n=="object"&&typeof n.turnComplete=="boolean"}function le(n){return typeof n=="object"&&n.interrupted===!0}function ce(n){if(!n||typeof n!="object")return!1;const e=n;return Array.isArray(e.functionCalls)&&e.functionCalls.every(ue)}function ue(n){if(!n||typeof n!="object")return!1;const e=n;return typeof e.name=="string"&&typeof e.id=="string"&&typeof e.args=="object"&&e.args!==null}function de(n){return typeof n=="object"&&Array.isArray(n.ids)}class he{constructor(){this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.audioQueue=[],this.isPlaying=!1,this.currentSource=null,this.analyser=null,this.dataArray=null,this.bufferLength=256,this.rafId=null}async setAudioData(e,t){if(t.includes("audio/pcm")){const s=this.base64ToArrayBuffer(e),i=fe(s,24e3);this.addToQueue(i,"audio/wav")}else this.addToQueue(e,t);this.isPlaying||this.playNextChunk()}addToQueue(e,t){this.audioQueue.push({data:e,mimeType:t})}async decodeAudioData(e,t){try{return await this.audioContext.decodeAudioData(e)}catch(s){throw console.error("Error decoding audio data:",s),s}}base64ToArrayBuffer(e){const t=atob(e),s=t.length,i=new Uint8Array(s);for(let o=0;o<s;o++)i[o]=t.charCodeAt(o);return i.buffer}async playNextChunk(){if(this.audioQueue.length===0){this.isPlaying=!1;return}this.isPlaying=!0;const{data:e,mimeType:t}=this.audioQueue.shift();this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=this.bufferLength,this.dataArray=new Uint8Array(this.analyser.frequencyBinCount);const s=await this.decodeAudioData(e,t),i=this.audioContext.createBufferSource();i.buffer=s,i.connect(this.analyser),this.analyser.connect(this.audioContext.destination),this.setupVisualizer(),i.start(0),this.currentSource=i,i.onended=()=>{cancelAnimationFrame(this.rafId),this.playNextChunk()}}setupVisualizer(){const e=document.querySelector("audio-visualizer");if(!e)return;const t=()=>{this.analyser.getByteTimeDomainData(this.dataArray),e.updateData(this.dataArray),this.rafId=requestAnimationFrame(t)};this.rafId=requestAnimationFrame(t)}stop(){this.currentSource&&(this.currentSource.stop(),this.currentSource.disconnect()),cancelAnimationFrame(this.rafId),this.audioQueue=[],this.isPlaying=!1}updateVisualizerInRealTime(e){const t=document.querySelector("audio-visualizer");if(!t)return;this.visualizerIntervalId&&(clearInterval(this.visualizerIntervalId),this.visualizerIntervalId=null);const s=50,i=e*1e3/s;let o=0;this.visualizerIntervalId=setInterval(()=>{if(o>=i){clearInterval(this.visualizerIntervalId),this.visualizerIntervalId=null;return}const a=o/i,l=this.calculateCurrentSamples(a);t.updateData(l),o++},s)}calculateCurrentSamples(e){try{if(!this.pcmData||this.pcmData.length===0)return new Float32Array(0);const t=Math.floor(e*this.pcmData.length),s=t+Math.floor(this.pcmData.length/this.bufferLength);return this.pcmData.slice(t,s)}catch(t){return console.error("Buffer detached:",t),new Float32Array(0)}}}const pe=new he;async function me(n,e){const t=document.querySelector("audio-visualizer");try{if(await pe.setAudioData(n,e),!t){console.error("Visualizador no encontrado");return}}catch(s){console.error("Error al cargar audio:",s)}}function fe(n,e){if(!(n instanceof ArrayBuffer))throw new Error("pcmData debe ser un ArrayBuffer");const t=new Uint8Array(n),s=new ArrayBuffer(44+t.length),i=new DataView(s),o=(l,r)=>{for(let c=0;c<r.length;c++)i.setUint8(l+c,r.charCodeAt(c))};return o(0,"RIFF"),i.setUint32(4,36+t.length,!0),o(8,"WAVE"),o(12,"fmt "),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,1,!0),i.setUint32(24,e,!0),i.setUint32(28,e*2,!0),i.setUint16(32,2,!0),i.setUint16(34,16,!0),o(36,"data"),i.setUint32(40,t.length,!0),new Uint8Array(s,44).set(t),s}const g=class g{constructor(e){if(e||(e=`emitter_${g.idCounter++}`),g.instances.has(e))return g.instances.get(e);this.id=e,this.events={},this.history=[],g.instances.set(e,this)}on(e,t){return this.events[e]||(this.events[e]=[]),this.events[e].push(t),this}once(e,t){const s=(...i)=>{t(...i),this.off(e,s)};return this.on(e,s),this}emit(e,...t){return this.events[e]&&this.events[e].forEach(s=>s(...t)),this}off(e,t){return this.events[e]&&(t?this.events[e]=this.events[e].filter(s=>s!==t):delete this.events[e]),this}saveToHistory(e){return this.history.push(e),this}getHistory(){return this.history}clearHistory(){return this.history=[],this}static getInstance(e){if(!g.instances.has(e))throw new Error(`No Emitter instance found with id: ${e}`);return g.instances.get(e)}removeAllListeners(){this.events={}}};C(g,"instances",new Map),C(g,"idCounter",0);let x=g;document.querySelector("#app").innerHTML=`
  <div class="container mx-auto">
  <audio-stream-player id="voiceplayer"></audio-stream-player>
    <call-control-bar state="active"></call-control-bar>
    </div>
`;const L=document.createElement("translation-queue");document.body.appendChild(L);const ge=new x("translation");ge.on("translation",n=>{console.log("Translation received:",n),L.addToQueue(n)});L.addToQueue({input:"Hola",traducciones:{es:"Hola",en:"Hello"}});const ve="Eres una IA de traducción. Tu tarea es recibir un texto en español y devolver un JSON con las traducciones al inglés y japonés. O también, si no se entiende o se hacen gestos, acciones o onomatopeyas, puedes narrarlo en el formato deseado.",N=[{label:"traducción al español",value:"es"},{label:"traducción al inglés",value:"en"},{label:"traducción al japonés",value:"jp"},{label:"traducción al portugués",value:"pt"},{label:"traducción al francés",value:"fr"},{label:"traducción al italiano",value:"it"}];function ye(n,e,t){return t.length===0&&(t=N),`
${n}
Formato de salida:  
{  
  "input": "${e}",
  "traducciones": {
    ${t.map(s=>`"${s.value}": "${s.label}"`).join(`,
`)}
  }  
}`}function be(){document.body.insertAdjacentHTML("beforeend",`    <custom-modal id="modal_content">
        <custom-input
            type="text"
            id="apikey"
            name="apikey"
            value=""
            placeholder="API Key">
        </custom-input>

        <custom-input
            type="textarea"
            id="mainInstruction"
            name="mainInstruction"
            value=""
            placeholder="Main Instruction">
        </custom-input>

        <custom-input
            type="textarea"
            id="inputText"
            name="inputText"
            value=""
            placeholder="Input Text Prompt">
        </custom-input>

        <enhanced-select multiple
            style="border: 0px;"
            id="select_servers"
            name="select_servers">
        </enhanced-select>
    </custom-modal>`),setTimeout(()=>{document.querySelector("#select_servers").setOptions(N)},1e3),document.querySelectorAll("custom-input").forEach(e=>{e.addEventListener("input-change",()=>{T()})}),document.querySelector("#select_servers").addEventListener("change",()=>{T()})}function T(){const n=Ce();localStorage.setItem("configAPI",JSON.stringify(n))}function we(){const n=localStorage.getItem("configAPI");if(n){console.log("lastData",JSON.parse(n));const e=JSON.parse(n);xe(e)}T()}function Ce(){const n=document.querySelector("#apikey").getInputValues(),e=document.querySelector("#mainInstruction").getInputValues(),t=document.querySelector("#inputText").getInputValues(),s=document.querySelector("#select_servers").getSelectedOptions(),i=document.querySelector("#select_servers").getValue(),o=ye(e,t,s);return{apikey:n,mainInstruction:e,inputText:t,selectServers:s,selectValue:i,stringInstruction:o}}function xe(n){document.querySelector("#apikey").setInputValues(n.apikey),document.querySelector("#mainInstruction").setInputValues(n.mainInstruction||ve),document.querySelector("#inputText").setInputValues(n.inputText),n.selectValue&&(console.log("data.selectServers",n.selectValue),document.querySelector("#select_servers").setSelectedValues(n.selectValue))}be();setTimeout(we,500);class Se extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.state="inactive",this.buttonStates={mic:!1,video:!1,screen:!1,connect:!1,configure:!1},this.activeIcons={mic:"mic_off",video:"hangout_video_off",pause:"play_arrow",connect:"play_arrow",screen:"cancel_presentation",configure:"settings"},this.inactiveIcons={mic:"mic",video:"videocam",pause:"pause",connect:"pause",screen:"screen_share",configure:"settings"},this.render()}connectedCallback(){this.setupEventListeners()}attributeChangedCallback(e,t,s){e==="state"&&t!==s&&(this.state=s,this.handleStateChange())}static get observedAttributes(){return["state"]}handleStateChange(){const e=this.shadowRoot.querySelector(".actions-nav");this.state==="active"?e.classList.remove("disabled"):e.classList.add("disabled")}setupEventListeners(){this.shadowRoot.querySelectorAll("button").forEach(t=>{t.addEventListener("click",s=>{const i=t.getAttribute("data-type");i in this.buttonStates&&this.toggleButtonState(i),this.dispatchEvent(new CustomEvent("button-click",{detail:{button:t,buttonType:i,state:this.state,buttonState:this.buttonStates[i]},bubbles:!0,composed:!0}))})})}toggleButtonState(e){this.buttonStates[e]=!this.buttonStates[e],this.updateButtonUI(e)}updateButtonUI(e){const t=this.shadowRoot.querySelector(`[data-type="${e}"]`);if(!t)return;this.buttonStates[e]?t.classList.add("active"):t.classList.remove("active");const s=t.querySelector(".material-symbols-outlined");s&&(s.textContent=this.getButtonIcon(e))}getButtonIcon(e){return this.buttonStates[e]?this.activeIcons[e]||e:this.inactiveIcons[e]||e}createButton(e,t="action-button"){const s=document.createElement("button");s.className=`${t} ${e}-button ${this.buttonStates[e]?"active":""}`,s.setAttribute("data-type",e);const i=document.createElement("span");return i.className="material-symbols-outlined",i.textContent=this.getButtonIcon(e),s.appendChild(i),s}render(){const e=document.createElement("style");e.textContent=`
      :host {
        display: block;
        font-family: 'Material Symbols Outlined', sans-serif;
      }
      
      .control-tray {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 10px;
        color: white;
      }
      
      .actions-nav {
        display: flex;
        justify-content: center;
        gap: 10px;
        opacity: 1;
        transition: opacity 0.3s;
      }
      
      .actions-nav.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      
      .action-button {
        background: #3c3c3c;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .btn-base {
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .action-button:hover {
        background: #5c5c5c;
      }
      
      .action-button .material-symbols-outlined {
        font-size: 24px;
      }
      
      .connection-container {
        display: flex;
        align-items: center;
        margin: 1rem;
      }
      
      .text-indicator {
        margin-left: 10px;
      }
      
      .action-button.active {
        background: #5c5c5c;
      }
    `;const t=document.createElement("link");t.href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",t.rel="stylesheet";const s=document.createElement("section");s.className="control-tray";const i=document.createElement("canvas");i.width=480,i.height=270,i.style.display="none";const o=document.createElement("nav");o.className=`actions-nav ${this.state==="inactive"?"disabled":""}`,["mic","video","screen"].forEach(u=>{o.appendChild(this.createButton(u))});const a=document.createElement("div");a.className="connection-container";const l=document.createElement("div");l.className="connection-button-container",l.appendChild(this.createButton("connect"));const r=document.createElement("button");r.className="btn-base",r.setAttribute("data-type","state");const c=document.createElement("span");c.className="material-symbols-outlined",c.textContent=this.state==="active"?"Stream":"cloud_off",r.appendChild(c),a.appendChild(l),a.appendChild(r),a.appendChild(this.createButton("configure","btn-base action-button")),s.appendChild(i),s.appendChild(o),s.appendChild(a),this.shadowRoot.appendChild(t),this.shadowRoot.appendChild(e),this.shadowRoot.appendChild(s)}}customElements.define("call-control-bar",Se);class Ee extends HTMLElement{static get observedAttributes(){return["mode","primary-color","background","secondary-color"]}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0}),this.visualizers=new Map,this.currentVisualizer=null,this.particles=[],this.resizeObserver=new ResizeObserver(()=>this.resize()),this.modes=["wave","bars","circles","particles","plasma","mirror-wave","hexagons","centered-bars","floating-bars"],this.currentMode="wave",this.shadowRoot.innerHTML=`
            <style>
                :host {
                    --primary-color: gray;
                    --secondary-color: #ff00ff;
                    --background: #1a1a1a;
                    --bar-width: 4px;
                    --glow-intensity: 0.8;
                    display: block;
                }
                
                canvas {
                    width: 100%;
                    height: 200px;
                    background: inherit;
                    transition: background 0.3s ease;
                }
            </style>
            <canvas></canvas>
        `,this.canvas=this.shadowRoot.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.registerVisualizers(),this.resize()}registerVisualizers(){this.registerVisualizer("wave",Ae),this.registerVisualizer("bars",Ie),this.registerVisualizer("centered-bars",ke),this.registerVisualizer("floating-bars",Te),this.registerVisualizer("circles",Me),this.registerVisualizer("pulse",Ve)}startVisualization(){this.isAnimating=!0,this.draw()}stopVisualization(){this.isAnimating=!1}registerVisualizer(e,t){this.visualizers.set(e,new t(this))}connectedCallback(){this.resizeObserver.observe(this.canvas),this.setMode(this.getAttribute("mode")||"wave"),this.startVisualization()}disconnectedCallback(){this.stopVisualization(),this.resizeObserver.disconnect()}updateData(e){e&&(this.dataArray=e,this.draw())}attributeChangedCallback(e,t,s){e==="mode"&&this.modes.includes(s)&&(this.currentMode=s,this.setMode(s)),e==="primary-color"&&this.style.setProperty("--primary-color",s),e==="background"&&this.style.setProperty("--background",s)}resize(){this.canvas.width=this.canvas.clientWidth*2,this.canvas.height=this.canvas.clientHeight*2}draw(){!this.dataArray||!this.currentVisualizer||(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.currentVisualizer.draw(this.dataArray),requestAnimationFrame(()=>this.draw()))}setMode(e){this.visualizers.has(e)&&(this.currentVisualizer=this.visualizers.get(e),this.currentVisualizer.init(),this.currentMode=e)}}class S{constructor(e){this.visualizer=e,this.ctx=e.ctx,this.canvas=e.canvas}init(){}draw(){}}class Ae extends S{draw(e){const{ctx:t,canvas:s}=this;t.beginPath(),t.lineWidth=2,t.strokeStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color");const i=s.width/e.length;let o=0;for(let a=0;a<e.length;a++){const r=e[a]/128*s.height/2;a===0?t.moveTo(o,r):t.lineTo(o,r),o+=i}t.lineTo(s.width,s.height/2),t.stroke()}}class Ie extends S{draw(e){const{ctx:t,canvas:s}=this,i=s.width/e.length*.8,o=s.width/e.length*.2;let a=0;t.fillStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color");for(let l=0;l<e.length;l++){const r=e[l]/255*s.height;t.fillRect(a,s.height-r,i,r),a+=i+o}}}class ke extends S{draw(e){const{ctx:t,canvas:s}=this,i=s.height/2,o=s.width/e.length*.6,a=s.width/e.length*.4;let l=0;t.fillStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color");for(let r=0;r<e.length;r++){const c=e[r]/255*i;t.fillRect(l,i-c,o,c*2),l+=o+a}}}class Te extends S{init(){this.floatOffsets=new Array(128).fill(0)}draw(e){const{ctx:t,canvas:s}=this,i=s.height/2,o=s.width/e.length*.8,a=s.width/e.length*.2;let l=0;t.fillStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color");for(let r=0;r<e.length;r++){const c=e[r]/255*i;this.floatOffsets[r]=(this.floatOffsets[r]+.02)%(Math.PI*2);const u=Math.sin(this.floatOffsets[r])*10;t.fillRect(l,i-c+u,o,c),l+=o+a}}}class Me extends S{init(){this.rotation=0,this.history=new Array(60).fill(0)}draw(e){const{ctx:t,canvas:s}=this,i=s.width/2,o=s.height/2,a=Math.min(s.width,s.height)*.4,l=e.reduce((c,u)=>c+u,0)/e.length;this.history.push(l),this.history.shift(),t.fillStyle=getComputedStyle(this.visualizer).getPropertyValue("--background"),t.fillRect(0,0,s.width,s.height),t.beginPath(),t.strokeStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color"),t.lineWidth=4,t.arc(i,o,a*(l/255)*.8,0,Math.PI*2),t.stroke();const r=Math.PI*2/e.length;this.rotation+=.002,e.forEach((c,u)=>{const p=r*u+this.rotation,d=c/255*a*.4;t.beginPath(),t.fillStyle=`hsla(${u/e.length*360}, 70%, 50%, 0.7)`,t.arc(i+Math.cos(p)*a*.6,o+Math.sin(p)*a*.6,d,0,Math.PI*2),t.fill()}),t.strokeStyle=getComputedStyle(this.visualizer).getPropertyValue("--secondary-color"),t.beginPath(),this.history.forEach((c,u)=>{const p=s.width/this.history.length*u,d=s.height-c/255*s.height;u===0?t.moveTo(p,d):t.lineTo(p,d)}),t.stroke()}}class Ve extends S{draw(e){const{ctx:t,canvas:s}=this,i=s.height/2,o=getComputedStyle(this.visualizer).getPropertyValue("--primary-color"),a=2*(e.length-1),r=(s.width-a)/e.length;t.clearRect(0,0,s.width,s.height);for(let c=0;c<e.length;c++){const u=e[c]/255*i,p=c*(r+2);t.fillStyle=o,t.fillRect(p,s.height/2-u/2,r,u)}}}customElements.define("audio-visualizer",Ee);const Le=`
class AudioProcessingWorklet extends AudioWorkletProcessor {
  // send and clear buffer every 2048 samples, 
  // which at 16khz is about 8 times a second
  buffer = new Int16Array(2048);
  bufferWriteIndex = 0;

  constructor() {
    super();
    this.hasAudio = false;
  }

  process(inputs) {
    if (inputs[0].length) {
      const channel0 = inputs[0][0];
      this.processChunk(channel0);
    }
    return true;
  }

  sendAndClearBuffer(){
    this.port.postMessage({
      event: "chunk",
      data: {
        int16arrayBuffer: this.buffer.slice(0, this.bufferWriteIndex).buffer,
      },
    });
    this.bufferWriteIndex = 0;
  }

  processChunk(float32Array) {
    const l = float32Array.length;
    
    for (let i = 0; i < l; i++) {
      const int16Value = float32Array[i] * 32768;
      this.buffer[this.bufferWriteIndex++] = int16Value;
      if(this.bufferWriteIndex >= this.buffer.length) {
        this.sendAndClearBuffer();
      }
    }

    if(this.bufferWriteIndex >= this.buffer.length) {
      this.sendAndClearBuffer();
    }
  }
}`,$e=`
class VolMeter extends AudioWorkletProcessor {
  volume
  updateIntervalInMS
  nextUpdateFrame

  constructor() {
    super()
    this.volume = 0
    this.updateIntervalInMS = 25
    this.nextUpdateFrame = this.updateIntervalInMS
    this.port.onmessage = event => {
      if (event.data.updateIntervalInMS) {
        this.updateIntervalInMS = event.data.updateIntervalInMS
      }
    }
  }

  get intervalInFrames() {
    return (this.updateIntervalInMS / 1000) * sampleRate
  }

  process(inputs) {
    const input = inputs[0]

    if (input.length > 0) {
      const samples = input[0]
      let sum = 0
      let rms = 0

      for (let i = 0; i < samples.length; ++i) {
        sum += samples[i] * samples[i]
      }

      rms = Math.sqrt(sum / samples.length)
      this.volume = Math.max(rms, this.volume * 0.7)

      this.nextUpdateFrame -= samples.length
      if (this.nextUpdateFrame < 0) {
        this.nextUpdateFrame += this.intervalInFrames
        this.port.postMessage({volume: this.volume})
      }
    }

    return true
  }
}`,R=(n,e)=>{const t=new Blob([`registerProcessor('${n}', ${e})`],{type:"application/javascript"});return URL.createObjectURL(t)};class Re extends x{constructor(e=16e3){super(),this.stream=null,this.audioContext=null,this.source=null,this.recording=!1,this.recordingWorklet=null,this.vuWorklet=null,this.starting=!1,this.targetSampleRate=e,this.resamplingEnabled=!0}async start(){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error("Could not request user media");return this.starting=new Promise(async(e,t)=>{try{if(this.stream=await navigator.mediaDevices.getUserMedia({audio:!0}),this.audioContext=new(window.AudioContext||window.webkitAudioContext),console.log(`Browser's sample rate: ${this.audioContext.sampleRate}`),!this.audioContext)throw new Error("AudioContext could not be created.");if(this.source=this.audioContext.createMediaStreamSource(this.stream),this.resamplingEnabled&&this.audioContext.sampleRate!==this.targetSampleRate){const i=new OfflineAudioContext(1,this.audioContext.sampleRate,this.audioContext.sampleRate),a=this.audioContext.createScriptProcessor(4096,1,1);a.onaudioprocess=l=>{const c=l.inputBuffer.getChannelData(0),u=this.resampleAudio(c,this.audioContext.sampleRate,this.targetSampleRate),p=new Int16Array(u.length);for(let d=0;d<u.length;d++)p[d]=Math.max(-32768,Math.min(32767,Math.round(u[d]*32767)));if(this.recording){const d=this.arrayBufferToBase64(p.buffer);this.emit("data",d)}},this.source.connect(a),a.connect(this.audioContext.destination)}else{const i="audio-recorder-worklet",o=R(i,Le);await this.audioContext.audioWorklet.addModule(o),this.recordingWorklet=new AudioWorkletNode(this.audioContext,i),this.recordingWorklet.port.onmessage=async a=>{const l=a.data.data.int16arrayBuffer;if(l){const r=this.arrayBufferToBase64(l);this.emit("data",r)}},this.source.connect(this.recordingWorklet)}const s="vu-meter";await this.audioContext.audioWorklet.addModule(R(s,$e)),this.vuWorklet=new AudioWorkletNode(this.audioContext,s),this.vuWorklet.port.onmessage=i=>{this.emit("volume",i.data.volume)},this.source.connect(this.vuWorklet),this.recording=!0,e()}catch(s){t(s)}this.starting=null}),this.starting}resampleAudio(e,t,s){const i=t/s,o=Math.round(e.length/i),a=new Float32Array(o);for(let l=0;l<o;l++){const r=l*i,c=Math.floor(r),u=r-c;c+1<e.length?a[l]=e[c]*(1-u)+e[c+1]*u:a[l]=e[c]}return a}arrayBufferToBase64(e){const t=new Uint8Array(e),s=t.byteLength;let i="";for(let o=0;o<s;o++)i+=String.fromCharCode(t[o]);return window.btoa(i)}stop(){const e=()=>{this.source&&this.source.disconnect(),this.stream&&this.stream.getTracks().forEach(t=>t.stop()),this.audioContext&&this.audioContext.close(),this.stream=void 0,this.recordingWorklet=void 0,this.vuWorklet=void 0,this.audioContext=void 0,this.recording=!1};if(this.starting){this.starting.then(e).catch(console.error);return}e()}}class D{constructor(){C(this,"handleStreamEnded",()=>{this.isStreaming=!1,this.stream=null,this.videoElement&&(this.videoElement.srcObject=null),this.notifyListeners()});this.stream=null,this.isStreaming=!1,this.type="webcam",this.eventListeners=new Set,this.videoElement=null}setVideoElement(e){if(!(e instanceof HTMLVideoElement))throw new Error("Element must be an HTMLVideoElement");this.videoElement=e,this.stream&&(this.videoElement.srcObject=this.stream,this.videoElement.play().catch(t=>{console.error("Error playing video:",t)}))}addEventListener(e){return this.eventListeners.add(e),()=>this.eventListeners.delete(e)}notifyListeners(){const e={stream:this.stream,isStreaming:this.isStreaming,type:this.type};this.eventListeners.forEach(t=>t(e))}async start(){try{const e=await navigator.mediaDevices.getUserMedia({video:!0});return this.stream=e,this.isStreaming=!0,this.videoElement&&(this.videoElement.srcObject=this.stream,await this.videoElement.play()),this.stream.getTracks().forEach(t=>{t.addEventListener("ended",this.handleStreamEnded)}),this.notifyListeners(),e}catch(e){throw console.error("Error starting webcam capture:",e),e}}stop(){this.stream&&(this.stream.getTracks().forEach(e=>{e.removeEventListener("ended",this.handleStreamEnded),e.stop()}),this.videoElement&&(this.videoElement.srcObject=null),this.stream=null,this.isStreaming=!1,this.notifyListeners())}getState(){return{type:this.type,start:this.start.bind(this),stop:this.stop.bind(this),isStreaming:this.isStreaming,stream:this.stream}}}class W{constructor(){C(this,"handleStreamEnded",()=>{this.isStreaming=!1,this.stream=null,this.videoElement&&(this.videoElement.srcObject=null),this.notifyListeners()});this.stream=null,this.isStreaming=!1,this.type="screen",this.eventListeners=new Set,this.videoElement=null}setVideoElement(e){if(!(e instanceof HTMLVideoElement))throw new Error("Element must be an HTMLVideoElement");this.videoElement=e,this.stream&&(this.videoElement.srcObject=this.stream,this.videoElement.play().catch(t=>{console.error("Error playing video:",t)}))}addEventListener(e){return this.eventListeners.add(e),()=>this.eventListeners.delete(e)}notifyListeners(){const e={stream:this.stream,isStreaming:this.isStreaming,type:this.type};this.eventListeners.forEach(t=>t(e))}async start(){try{const e=await navigator.mediaDevices.getDisplayMedia({video:!0});return this.stream=e,this.isStreaming=!0,this.videoElement&&(this.videoElement.srcObject=this.stream,await this.videoElement.play()),this.stream.getTracks().forEach(t=>{t.addEventListener("ended",this.handleStreamEnded)}),this.notifyListeners(),e}catch(e){throw console.error("Error starting screen capture:",e),e}}stop(){this.stream&&(this.stream.getTracks().forEach(e=>{e.removeEventListener("ended",this.handleStreamEnded),e.stop()}),this.videoElement&&(this.videoElement.srcObject=null),this.stream=null,this.isStreaming=!1,this.notifyListeners())}getState(){return{type:this.type,start:this.start.bind(this),stop:this.stop.bind(this),isStreaming:this.isStreaming,stream:this.stream}}}class q{constructor(e={}){this.fps=e.fps||.5,this.scale=e.scale||.25,this.quality=e.quality||1,this.timeoutId=null,this.isActive=!1,this.mediaCapture=null,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d")}setMediaCapture(e){if(!(e instanceof D||e instanceof W))throw new Error("Invalid media capture instance");this.stop(),this.mediaCapture=e,this.unsubscribe=this.mediaCapture.addEventListener(t=>{t.isStreaming||this.stop()})}start(e){if(!this.mediaCapture||!this.mediaCapture.stream)throw new Error("No media stream available");this.isActive=!0;const t=this.mediaCapture.stream.getVideoTracks()[0],{width:s,height:i}=t.getSettings();this.canvas.width=s*this.scale,this.canvas.height=i*this.scale;const o=()=>{if(!this.isActive||!this.mediaCapture.isStreaming)return;const a=document.createElement("video");a.srcObject=this.mediaCapture.stream,a.play().then(()=>{this.ctx.drawImage(a,0,0,this.canvas.width,this.canvas.height);const l=this.canvas.toDataURL("image/jpeg",this.quality),r=l.slice(l.indexOf(",")+1);e({mimeType:"image/jpeg",data:r,width:this.canvas.width,height:this.canvas.height,timestamp:Date.now(),sourceType:this.mediaCapture.type}),a.pause(),a.srcObject=null,this.isActive&&(this.timeoutId=window.setTimeout(o,1e3/this.fps))}).catch(l=>{console.error("Error capturing frame:",l),this.stop()})};o()}stop(){this.isActive=!1,this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=null),this.unsubscribe&&this.unsubscribe()}setOptions(e={}){this.fps=e.fps??this.fps,this.scale=e.scale??this.scale,this.quality=e.quality??this.quality}getState(){var e;return{isActive:this.isActive,fps:this.fps,scale:this.scale,quality:this.quality,sourceType:((e=this.mediaCapture)==null?void 0:e.type)||null}}}class qe{constructor(){this.videoWrappers=document.querySelectorAll(".video-wrapper"),this.videoContainerGrid=document.querySelector(".video-container-grid"),this.activeVideoSources=new Set}updateContainerVisibility(){this.activeVideoSources.size===0?this.videoContainerGrid.classList.add("hidden"):this.videoContainerGrid.classList.remove("hidden"),this.videoWrappers.forEach(e=>{const t=e.querySelector("video").id;this.activeVideoSources.has(t)?e.classList.remove("hidden"):e.classList.add("hidden")})}addActiveVideoSource(e){this.activeVideoSources.add(e),this.updateContainerVisibility()}removeActiveVideoSource(e){this.activeVideoSources.delete(e),this.updateContainerVisibility()}}const{ClientContentMessage:it,isInterrupted:Be,isModelTurn:Oe,isServerContentMessage:ze,isSetupCompleteMessage:Pe,isToolCallCancellationMessage:Ne,isToolCallMessage:De,isTurnComplete:We}=X;function k(n){return Array.isArray(n)?n:[n]}class je extends x{constructor({url:e,apiKey:t}){super(),this.url=e||"wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent",this.url+=`?key=${t}`,this.ws=null,this.isConnecting=!1,this.messageQueue=[],this.connectionRetries=0,this.maxRetries=5,this.connected=!1,this.reconnectionTimeout=null,this.contextQueue=[],this.config=null,this.intentionalClose=!1,this.retryDelay=1e3,this.send=this.send.bind(this),this.connect=this.connect.bind(this),this._sendDirect=this._sendDirect.bind(this),this.handleConnectionError=this.handleConnectionError.bind(this),this.addToContext=this.addToContext.bind(this),this.sendWithContext=this.sendWithContext.bind(this)}log(e,t){const s={date:new Date,type:e,message:t};this.emit("log",s)}async connect(e){if(this.config=e,this.isConnecting)return new Promise(t=>{this.once("connected",()=>t(!0))});this.disconnect(),this.isConnecting=!0,this.intentionalClose=!1;try{const t=new WebSocket(this.url);return t.addEventListener("message",async s=>{s.data instanceof Blob?await this.receive(s.data):console.log("Non-blob message received:",s)}),new Promise((s,i)=>{const o=a=>{this.handleConnectionError(a,t,i)};t.addEventListener("error",o),t.addEventListener("open",a=>{if(!e){this.isConnecting=!1,i(new Error("Invalid config sent to `connect(config)`"));return}this.log(`client.${a.type}`,"Connected to socket"),this.emit("open"),this.connected=!0,this.ws=t,this.isConnecting=!1,this.emit("connected");const l={setup:e};this._sendDirect(l),this.log("client.send","Setup message sent"),this.processMessageQueue(),t.removeEventListener("error",o),t.addEventListener("close",this.handleClose.bind(this)),s(!0)})})}catch(t){throw this.isConnecting=!1,t}}handleConnectionError(e,t,s){this.disconnect(t);const i=`Could not connect to "${this.url}"`;this.log(`server.${e.type}`,i),this.isConnecting=!1,this.connected=!1,s(new Error(i))}handleClose(e){this.connected=!1;let t=e.reason||"";if(t.toLowerCase().includes("error")){const s="ERROR]",i=t.indexOf(s);i>0&&(t=t.slice(i+s.length+1,1/0))}if(this.log(`server.${e.type}`,`Disconnected ${t?`with reason: ${t}`:""}`),this.emit("close",e),!this.intentionalClose&&this.connectionRetries<this.maxRetries){this.connectionRetries++;const s=this.retryDelay*Math.pow(2,this.connectionRetries-1);console.log(`Attempting to reconnect in ${s}ms...`),this.reconnectionTimeout=setTimeout(()=>{this.connect(this.config).catch(console.error)},s)}else console.log("Max retries reached. Stopping reconnection attempts.")}disconnect(e){return this.ws&&!e&&(this.removeAllListeners(),this.intentionalClose=!0,this.ws.close(),this.ws=null,this.connected=!1),this.ws===e&&this.ws?(console.log("Disconnected",this.ws),this.ws=null,this.connected=!1,this.log("client.close","Disconnected"),this.reconnectionTimeout&&(clearTimeout(this.reconnectionTimeout),this.reconnectionTimeout=null),!0):!1}processMessageQueue(){for(;this.messageQueue.length>0;){const e=this.messageQueue.shift();this._sendDirect(e)}}async receive(e){const t=await K(e);if(De(t)){this.log("server.toolCall",t),this.emit("toolcall",t.toolCall);return}if(Ne(t)){this.log("receive.toolCallCancellation",t),this.emit("toolcallcancellation",t.toolCallCancellation);return}if(Pe(t)){this.log("server.send","Setup complete"),this.emit("setupcomplete");return}if(ze(t)){const{serverContent:s}=t;if(Be(s)){this.log("receive.serverContent","Interrupted"),this.emit("interrupted");return}if(We(s)&&(this.log("server.send","Turn complete"),this.emit("turncomplete")),Oe(s)){if(!s.modelTurn||!s.modelTurn.parts)return s;const i=s.modelTurn.parts,o=i.filter(r=>r.inlineData&&r.inlineData.mimeType.startsWith("audio/pcm")),a=o.map(r=>{var c;return(c=r.inlineData)==null?void 0:c.data}),l=i.filter(r=>!o.includes(r));if(a.forEach(r=>{if(r){const c=P(r);this.emit("audio",c),this.log("server.audio",`Buffer (${c.byteLength})`)}}),l.length){const r={modelTurn:{parts:l}};this.emit("content",r),this.log("server.content",t)}}}else console.log("Received unmatched message:",t)}sendRealtimeInput(e){if(!this.connected||this.isConnecting){const i={realtimeInput:{mediaChunks:e}};this.enqueueMessage(i),this.reconnectionTimeout||(this.reconnectionTimeout=setTimeout(()=>{this.config&&this.connect(this.config).catch(console.error).finally(()=>{this.reconnectionTimeout=null})},1e3));return}const t=e.some(i=>i.mimeType.includes("audio"))&&e.some(i=>i.mimeType.includes("image"))?"audio + video":e.some(i=>i.mimeType.includes("audio"))?"audio":e.some(i=>i.mimeType.includes("image"))?"video":"unknown",s={realtimeInput:{mediaChunks:e}};this._sendDirect(s),this.log("client.realtimeInput",t)}sendToolResponse(e){const t={toolResponse:e};this._sendDirect(t),this.log("client.toolResponse",t)}addToContext(e){e=k(e);const t={role:"user",parts:e};this.contextQueue.push(t)}sendWithContext(e,t=!0){e=k(e);const s={role:"user",parts:e},o={clientContent:{turns:[...this.contextQueue,s],turnComplete:t}};this._sendDirect(o),this.log("client.send",o)}send(e,t=!0){e=k(e);const i={clientContent:{turns:[{role:"user",parts:e}],turnComplete:t}};this._sendDirect(i),this.log("client.send",i)}_sendDirect(e){if(!this.connected){if(this.isConnecting){this.enqueueMessage(e);return}if(this.connectionRetries<this.maxRetries){this.enqueueMessage(e),this.connect(this.config).catch(console.error);return}throw new Error("WebSocket is not connected and max retries exceeded")}if(!this.ws)throw new Error("WebSocket instance is null");try{const t=JSON.stringify(e);this.ws.send(t)}catch(t){if(t.message.includes("CLOSING")||t.message.includes("CLOSED"))this.connected=!1,this.intentionalClose||this.connect(this.config).catch(console.error);else throw t}}enqueueMessage(e){this.messageQueue.push(e)}}const v=class v{static getInstance({url:e,apiKey:t,config:s}){return v.instance||(v.instance=new v({url:e,apiKey:t,config:s})),v.instance}constructor({url:e,apiKey:t,config:s}){if(v.instance)return v.instance;this.url=e,this.apiKey=t,this.client=new je({url:e,apiKey:t}),this.audioStreamer=null,this.connected=!1,this.config=s||{model:"models/gemini-2.0-flash-exp"},this.volume=0,this.eventHandlers=new Map,this.setupEventHandlers()}setupEventHandlers(){this.eventHandlers.set("close",()=>{this.connected=!1,console.log("Connection closed.")}),this.eventHandlers.set("interrupted",()=>{this.audioStreamer&&this.audioStreamer.stop()}),this.eventHandlers.set("audio",e=>{this.audioStreamer&&this.audioStreamer.addPCM16(new Uint8Array(e))}),this.attachClientListeners()}async initializeAudioStreamer(){if(!this.audioStreamer)try{const e=await Y({id:"audio-out"});this.audioStreamer=new AudioStreamer(e),await this.audioStreamer.addWorklet("vumeter-out",VolMeterWorket,t=>{this.volume=t.data.volume,console.log("Current Volume:",this.volume)})}catch(e){throw console.error("Failed to initialize audio streamer:",e),e}}attachClientListeners(){for(const[e,t]of this.eventHandlers.entries())this.client.on(e,t);return this}detachClientListeners(){for(const e of this.eventHandlers.keys())this.client.off(e);return this}on(e,t){return this.eventHandlers.set(e,t),this.client.on(e,t),this}off(e,t){return t?this.client.off(e,t):(this.client.off(e),this.eventHandlers.delete(e)),this}async connect(e){if(e?this.config=e:e=this.config,!e)throw new Error("Configuration has not been set");return this.client.disconnect(),await this.client.connect(e),this.connected=!0,console.log("Connected successfully!"),this}async disconnect(){return this.client.disconnect(),this.connected=!1,this.detachClientListeners(),console.log("Disconnected successfully."),this}async reconnect(e){return await this.disconnect(),this.connect(e)}sendToolResponse(e){return this.client.sendToolResponse(e),this}};C(v,"instance",null);let M=v;const V={STRING:"string",NUMBER:"number",INTEGER:"integer",BOOLEAN:"boolean",ARRAY:"array",OBJECT:"object"};console.log("SchemaType",V);const _e="generativelanguage.googleapis.com",He=`wss://${_e}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`,I=Fe();function Fe(){var e;let n=(e=JSON.parse(localStorage.getItem("configAPI")))==null?void 0:e.apikey;return n&&n!==""||(n="AIzaSyBCvzPEORNt5ktrEA1f7uSQ4zB6H3nqHIc"),n}if(typeof I!="string"||I.length<1)throw new Error("set REACT_APP_GEMINI_API_KEY in .env");console.log("API_KEY",I);const j={name:"render_altair",description:"Displays an altair graph in json format.",parameters:{type:V.OBJECT,properties:{json_graph:{type:V.STRING,description:"JSON STRING representation of the graph to render."}},required:["json_graph"]}};var B;console.log((B=JSON.parse(localStorage.getItem("configAPI")))==null?void 0:B.stringInstruction);var O;const $={model:"models/gemini-2.0-flash-exp",generationConfig:{temperature:1,top_p:.95,top_k:40,responseModalities:"TEXT",speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:"Aoede"}}}},systemInstruction:{parts:[{text:((O=JSON.parse(localStorage.getItem("configAPI")))==null?void 0:O.stringInstruction)||`Eres una IA de traducción. Tu tarea es recibir un texto en español y devolver un JSON con las traducciones.
  Formato de salida:
  "\`\`\`json"{  
    "input": "<texto original en español usando muchos términos en inglés también>",
    "traducciones": {
      "es": "<traducción al español>",
      "en": "<traducción al inglés>",  
      "jp": "<traducción al japonés>",
      "pt": "<traducción al portugués>"
    }  
  }"\`\`\`"
  `}]},tools:[{googleSearch:{}},{functionDeclarations:[j]}]},w=M.getInstance({url:He,apiKey:I,config:$}),Ue=function(n){const e=n.functionCalls.find(t=>t.name===j.name);e&&et(e.args.json_graph),n.functionCalls.length&&setTimeout(()=>w.sendToolResponse({functionResponses:n.functionCalls.map(t=>({response:{output:{success:!0}},id:t.id}))}),200)};w.client.on("toolcall",Ue).on("setupcomplete",()=>console.log("Setup complete")).on("interrupted",()=>console.log("Interrupted")).on("turncomplete",()=>console.log("Turn complete"));const h={audioRecorder:new Re,screenCapture:new W,webcam:new D,extractors:{webcam:new q({fps:1,scale:.5,quality:.8}),screen:new q({fps:1,scale:.5,quality:.8})},active:{webcam:!1,screen:!1}};w.connect($);const Qe=document.querySelector("call-control-bar");Qe.addEventListener("button-click",Je);h.audioRecorder.on("data",n=>Ze("audio/pcm;rate=16000",n));async function Je(n){const{buttonType:e,buttonState:t}=n.detail;switch(console.log("Control:",e,t),e){case"mic":t?h.audioRecorder.start():h.audioRecorder.stop();break;case"screen":t?Ge():Ke();break;case"video":t?Ye():Xe();break;case"configure":document.querySelector("#modal_content").open();break;case"connect":t?w.disconnect():w.connect($);break}}setTimeout(()=>{h.audioRecorder.start()},1e3);const A=new qe;A.updateContainerVisibility();async function Ge(){h.screenCapture.start();const n=document.getElementById("screen");h.screenCapture.setVideoElement(n),A.addActiveVideoSource("screen"),await _("screen")}async function Ye(){h.webcam.start();const n=document.getElementById("webcam");h.webcam.setVideoElement(n),A.addActiveVideoSource("webcam"),await _("webcam")}function Ke(){h.screenCapture.stop(),A.removeActiveVideoSource("screen")}function Xe(){h.webcam.stop(),A.removeActiveVideoSource("webcam")}async function _(n){const e=h.extractors[n],t=n==="webcam"?h.webcam:h.screenCapture;if(!h.active[n])try{await t.start(),h.active[n]=!0,e.setMediaCapture(t),await new Promise(s=>setTimeout(s,1e3)),e.start(s=>{w.client.sendRealtimeInput([{mimeType:s.mimeType,data:s.data}])})}catch(s){console.error(`Error en ${n}:`,s),h.active[n]=!1,t.stop(),e.stop()}}function Ze(n,e){w.client.sendRealtimeInput([{mimeType:n,data:e}])}function et(n){console.log("Recibido JSON para renderizar:",n)}
