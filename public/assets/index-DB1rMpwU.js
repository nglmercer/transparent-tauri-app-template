var Qt=Object.defineProperty;var Kt=(n,e,t)=>e in n?Qt(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var f=(n,e,t)=>Kt(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const kt=document.createElement("template");kt.innerHTML=`
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
`;class Zt extends HTMLElement{constructor(){super(),this._queue=[],this._current=null,this._timeoutId=null,this.attachShadow({mode:"open"}).appendChild(kt.content.cloneNode(!0))}get delay(){const e=this._queue.length,t=this._calculateSize(this._current);let s;e>2?s=1e3:e<=1?s=1500:s=2500;const i=t/100;return console.log("sizeFactor",s+i*1e3),s+i*1e3}_calculateSize(e){return e?typeof e=="object"?JSON.stringify(e).length:e.length:0}addToQueue(e){this._queue.push(e),this._current||this._processQueue()}_processQueue(){if(this._timeoutId&&clearTimeout(this._timeoutId),this._queue.length===0){this._current=null,this.shadowRoot.host.style.display="none";return}this._current=this._queue.shift(),this._displayCurrent(),this._timeoutId=setTimeout(()=>this._processQueue(),this.delay)}_displayCurrent(){this.shadowRoot.host.style.display="block";const e=this.shadowRoot.querySelector(".original"),t=this.shadowRoot.querySelector(".translations");e.textContent=this._current.input,t.innerHTML=Object.entries(this._current.traducciones).map(([s,i])=>`<div class="translation"><strong>${s}:</strong> ${i}</div>`).join("")}setColor(e){this.setAttribute("color",e),this.shadowRoot.host.style.setProperty("--color",e)}setBackground(e){this.setAttribute("background",e),this.shadowRoot.host.style.setProperty("--background",e)}}customElements.get("translation-queue")||customElements.define("translation-queue",Zt);const Jt=(()=>{const n=new Map,e=new Promise(t=>{window.addEventListener("pointerdown",t,{once:!0}),window.addEventListener("keydown",t,{once:!0})});return async t=>{try{const s=new Audio;if(s.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA",await s.play(),t&&t.id&&n.has(t.id)){const r=n.get(t.id);if(r)return r}const i=new AudioContext(t);return t&&t.id&&n.set(t.id,i),i}catch{if(await e,t&&t.id&&n.has(t.id)){const r=n.get(t.id);if(r)return r}const i=new AudioContext(t);return t&&t.id&&n.set(t.id,i),i}}})(),Xt=n=>new Promise((e,t)=>{const s=new FileReader;s.onload=()=>{if(s.result){const i=JSON.parse(s.result);e(i)}else t("oops")},s.readAsText(n)});function St(n){var e=atob(n),t=new Uint8Array(e.length);for(let s=0;s<e.length;s++)t[s]=e.charCodeAt(s);return t.buffer}const es={isClientContentMessage:ns,isInterrupted:hs,isModelTurn:ts,isServerContentMessage:os,isSetupCompleteMessage:rs,isToolCall:us,isToolCallCancellationMessage:ls,isToolCallMessage:as,isTurnComplete:cs};function ts(n){var a;const e=n;if(console.log("isModelTurn",n),!e.modelTurn||!e.modelTurn.parts)return n;let t=(a=e.modelTurn)==null?void 0:a.parts;const s=t.filter(l=>l.inlineData&&l.inlineData.mimeType.startsWith("audio/pcm")),i=s.map(l=>{var c;return(c=l.inlineData)==null?void 0:c.data}),r=t.filter(l=>!s.includes(l));if(i.forEach(l=>{if(l){const c=St(l);console.log("server.audio",`buffer (${c.byteLength})`)}}),ss(n.modelTurn.parts[0]),!r.length){console.log("no hay otros parts",r);return}return t=r,console.log("isModelTurn content",{modelTurn:{parts:t}}),n.modelTurn}function ss(n){if(!n.inlineData){console.log("playAudio",n),is(n);return}ms(n.inlineData.data,n.inlineData.mimeType)}function is(n){try{if(!n||!n.text)throw new Error("La respuesta está vacía o es indefinida.");const e=n.text.trim();if(!e.startsWith("```json")||!e.endsWith("```"))throw new Error("El formato del JSON no es válido.");const t=e.replace(/```json\n|\n```/g,""),s=JSON.parse(t),i=D.getInstance("translation");return i&&i.emit("translation",s),console.log("Respuesta exitosa:",s),s}catch(e){return console.error("Error al parsear la respuesta:",e.message),null}}function se(n,e,t="object"){return n!=null&&typeof n=="object"&&typeof n[e]===t}function ns(n){return se(n,"clientContent")}function rs(n){return se(n,"setupComplete")}function os(n){return se(n,"serverContent")}function as(n){return se(n,"toolCall")}function ls(n){return se(n,"toolCallCancellation")&&ps(n.toolCallCancellation)}function cs(n){return typeof n=="object"&&typeof n.turnComplete=="boolean"}function hs(n){return typeof n=="object"&&n.interrupted===!0}function us(n){if(!n||typeof n!="object")return!1;const e=n;return Array.isArray(e.functionCalls)&&e.functionCalls.every(ds)}function ds(n){if(!n||typeof n!="object")return!1;const e=n;return typeof e.name=="string"&&typeof e.id=="string"&&typeof e.args=="object"&&e.args!==null}function ps(n){return typeof n=="object"&&Array.isArray(n.ids)}class fs{constructor(){this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.audioQueue=[],this.isPlaying=!1,this.currentSource=null,this.analyser=null,this.dataArray=null,this.bufferLength=256,this.rafId=null}async setAudioData(e,t){if(t.includes("audio/pcm")){const s=this.base64ToArrayBuffer(e),i=bs(s,24e3);this.addToQueue(i,"audio/wav")}else this.addToQueue(e,t);this.isPlaying||this.playNextChunk()}addToQueue(e,t){this.audioQueue.push({data:e,mimeType:t})}async decodeAudioData(e,t){try{return await this.audioContext.decodeAudioData(e)}catch(s){throw console.error("Error decoding audio data:",s),s}}base64ToArrayBuffer(e){const t=atob(e),s=t.length,i=new Uint8Array(s);for(let r=0;r<s;r++)i[r]=t.charCodeAt(r);return i.buffer}async playNextChunk(){if(this.audioQueue.length===0){this.isPlaying=!1;return}this.isPlaying=!0;const{data:e,mimeType:t}=this.audioQueue.shift();this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=this.bufferLength,this.dataArray=new Uint8Array(this.analyser.frequencyBinCount);const s=await this.decodeAudioData(e,t),i=this.audioContext.createBufferSource();i.buffer=s,i.connect(this.analyser),this.analyser.connect(this.audioContext.destination),this.setupVisualizer(),i.start(0),this.currentSource=i,i.onended=()=>{cancelAnimationFrame(this.rafId),this.playNextChunk()}}setupVisualizer(){const e=document.querySelector("audio-visualizer");if(!e)return;const t=()=>{this.analyser.getByteTimeDomainData(this.dataArray),e.updateData(this.dataArray),this.rafId=requestAnimationFrame(t)};this.rafId=requestAnimationFrame(t)}stop(){this.currentSource&&(this.currentSource.stop(),this.currentSource.disconnect()),cancelAnimationFrame(this.rafId),this.audioQueue=[],this.isPlaying=!1}updateVisualizerInRealTime(e){const t=document.querySelector("audio-visualizer");if(!t)return;this.visualizerIntervalId&&(clearInterval(this.visualizerIntervalId),this.visualizerIntervalId=null);const s=50,i=e*1e3/s;let r=0;this.visualizerIntervalId=setInterval(()=>{if(r>=i){clearInterval(this.visualizerIntervalId),this.visualizerIntervalId=null;return}const o=r/i,a=this.calculateCurrentSamples(o);t.updateData(a),r++},s)}calculateCurrentSamples(e){try{if(!this.pcmData||this.pcmData.length===0)return new Float32Array(0);const t=Math.floor(e*this.pcmData.length),s=t+Math.floor(this.pcmData.length/this.bufferLength);return this.pcmData.slice(t,s)}catch(t){return console.error("Buffer detached:",t),new Float32Array(0)}}}const gs=new fs;async function ms(n,e){const t=document.querySelector("audio-visualizer");try{if(await gs.setAudioData(n,e),!t){console.error("Visualizador no encontrado");return}}catch(s){console.error("Error al cargar audio:",s)}}function bs(n,e){if(!(n instanceof ArrayBuffer))throw new Error("pcmData debe ser un ArrayBuffer");const t=new Uint8Array(n),s=new ArrayBuffer(44+t.length),i=new DataView(s),r=(a,l)=>{for(let c=0;c<l.length;c++)i.setUint8(a+c,l.charCodeAt(c))};return r(0,"RIFF"),i.setUint32(4,36+t.length,!0),r(8,"WAVE"),r(12,"fmt "),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,1,!0),i.setUint32(24,e,!0),i.setUint32(28,e*2,!0),i.setUint16(32,2,!0),i.setUint16(34,16,!0),r(36,"data"),i.setUint32(40,t.length,!0),new Uint8Array(s,44).set(t),s}const C=class C{constructor(e){if(e||(e=`emitter_${C.idCounter++}`),C.instances.has(e))return C.instances.get(e);this.id=e,this.events={},this.history=[],C.instances.set(e,this)}on(e,t){return this.events[e]||(this.events[e]=[]),this.events[e].push(t),this}once(e,t){const s=(...i)=>{t(...i),this.off(e,s)};return this.on(e,s),this}emit(e,...t){return this.events[e]&&this.events[e].forEach(s=>s(...t)),this}off(e,t){return this.events[e]&&(t?this.events[e]=this.events[e].filter(s=>s!==t):delete this.events[e]),this}saveToHistory(e){return this.history.push(e),this}getHistory(){return this.history}clearHistory(){return this.history=[],this}static getInstance(e){if(!C.instances.has(e))throw new Error(`No Emitter instance found with id: ${e}`);return C.instances.get(e)}removeAllListeners(){this.events={}}};f(C,"instances",new Map),f(C,"idCounter",0);let D=C;document.querySelector("#app").innerHTML=`
  <div class="container mx-auto">
  <audio-stream-player id="voiceplayer"></audio-stream-player>
    <call-control-bar state="active"></call-control-bar>
    </div>
`;const Ie=document.createElement("translation-queue");document.body.appendChild(Ie);const ys=new D("translation");ys.on("translation",n=>{console.log("Translation received:",n),Ie.addToQueue(n)});Ie.addToQueue({input:"Hola",traducciones:{es:"Hola",en:"Hello"}});const $t="Eres una IA de traducción. Tu tarea es recibir un texto en español y devolver un JSON con las traducciones al inglés y japonés. O también, si no se entiende o se hacen gestos, acciones o onomatopeyas, puedes narrarlo en el formato deseado.",vs="<texto original en español usando muchos términos en inglés también>",At=[{label:"traducción al español",value:"es"},{label:"traducción al inglés",value:"en"},{label:"traducción al japonés",value:"jp"},{label:"traducción al portugués",value:"pt"},{label:"traducción al francés",value:"fr"},{label:"traducción al italiano",value:"it"}];function ws(n,e,t){return t.length===0&&(t=At),`
${n}
Formato de salida:  
{  
  "input": "${e}",
  "traducciones": {
    ${t.map(s=>`"${s.value}": "${s.label}"`).join(`,
`)}
  }  
}`}function xs(){var e;const n=document.createElement("custom-modal");n.id="modal_content",n.innerHTML=`
    <custom-input
      type="text"
      id="apikey"
      name="apikey"
      value="${localStorage.getItem("API_KEY")||""}"
      placeholder="API Key"
    ></custom-input>
    <custom-input
      type="textarea"
      id="mainInstruction"
      name="mainInstruction"
      value="${((e=localStorage.getItem("configAPI"))==null?void 0:e.mainInstruction)||$t}"
      placeholder="Main Instruction"
    ></custom-input>
    <custom-input
      type="textarea"
      id="inputText"
      name="inputText"
      value="${localStorage.getItem("inputText")||vs}"
      placeholder="Input Text Prompt"
    ></custom-input>
    <enhanced-select multiple
      style="border: 0px;"
      id="select_servers"
      name="select_servers"
    ></enhanced-select>
  `,document.body.appendChild(n),setTimeout(()=>{document.querySelector("#select_servers").setOptions(At)},200),document.querySelectorAll("custom-input").forEach(t=>{t.addEventListener("input-change",()=>{Se()})}),document.querySelector("#select_servers").addEventListener("change",()=>{Se()})}function Se(){const n=Ss();localStorage.setItem("configAPI",JSON.stringify(n))}function ks(){const n=localStorage.getItem("configAPI");if(n){console.log("lastData",JSON.parse(n));const e=JSON.parse(n);$s(e)}Se()}function Ss(){const n=document.querySelector("#apikey").getInputValues(),e=document.querySelector("#mainInstruction").getInputValues(),t=document.querySelector("#inputText").getInputValues(),s=document.querySelector("#select_servers").getSelectedOptions(),i=document.querySelector("#select_servers").getValue(),r=ws(e,t,s);return{apikey:n,mainInstruction:e,inputText:t,selectServers:s,selectValue:i,stringInstruction:r}}function $s(n){document.querySelector("#apikey").setInputValues(n.apikey),document.querySelector("#mainInstruction").setInputValues(n.mainInstruction||$t),document.querySelector("#inputText").setInputValues(n.inputText),n.selectValue&&(console.log("data.selectServers",n.selectValue),document.querySelector("#select_servers").setSelectedValues(n.selectValue))}xs();setTimeout(ks,500);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=globalThis,Re=ae.ShadowRoot&&(ae.ShadyCSS===void 0||ae.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Le=Symbol(),We=new WeakMap;let Et=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Re&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=We.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&We.set(t,e))}return e}toString(){return this.cssText}};const Ct=n=>new Et(typeof n=="string"?n:n+"",void 0,Le),_t=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new Et(t,n,Le)},As=(n,e)=>{if(Re)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=ae.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,n.appendChild(s)}},Fe=Re?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return Ct(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Es,defineProperty:Cs,getOwnPropertyDescriptor:_s,getOwnPropertyNames:Ts,getOwnPropertySymbols:Is,getPrototypeOf:Rs}=Object,I=globalThis,Ge=I.trustedTypes,Ls=Ge?Ge.emptyScript:"",ye=I.reactiveElementPolyfillSupport,G=(n,e)=>n,$e={toAttribute(n,e){switch(e){case Boolean:n=n?Ls:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Tt=(n,e)=>!Es(n,e),Ye={attribute:!0,type:String,converter:$e,reflect:!1,hasChanged:Tt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),I.litPropertyMetadata??(I.litPropertyMetadata=new WeakMap);class z extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ye){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Cs(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=_s(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const a=i==null?void 0:i.call(this);r.call(this,o),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ye}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;const e=Rs(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){const t=this.properties,s=[...Ts(t),...Is(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(Fe(i))}else e!==void 0&&t.push(Fe(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return As(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EC(e,t){var r;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const o=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:$e).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){var r;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),a=typeof o.converter=="function"?{fromAttribute:o.converter}:((r=o.converter)==null?void 0:r.fromAttribute)!==void 0?o.converter:$e;this._$Em=i,this[i]=a.fromAttribute(t,o.type),this._$Em=null}}requestUpdate(e,t,s){if(e!==void 0){if(s??(s=this.constructor.getPropertyOptions(e)),!(s.hasChanged??Tt)(this[e],t))return;this.P(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,s){this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],o)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(t)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[G("elementProperties")]=new Map,z[G("finalized")]=new Map,ye==null||ye({ReactiveElement:z}),(I.reactiveElementVersions??(I.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=globalThis,le=Y.trustedTypes,Qe=le?le.createPolicy("lit-html",{createHTML:n=>n}):void 0,It="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,Rt="?"+_,Ms=`<${Rt}>`,M=document,J=()=>M.createComment(""),X=n=>n===null||typeof n!="object"&&typeof n!="function",Me=Array.isArray,Os=n=>Me(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",ve=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ke=/-->/g,Ze=/>/g,R=RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Je=/'/g,Xe=/"/g,Lt=/^(?:script|style|textarea|title)$/i,Ps=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),T=Ps(1),O=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),et=new WeakMap,L=M.createTreeWalker(M,129);function Mt(n,e){if(!Me(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qe!==void 0?Qe.createHTML(e):e}const Ns=(n,e)=>{const t=n.length-1,s=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=j;for(let a=0;a<t;a++){const l=n[a];let c,h,u=-1,d=0;for(;d<l.length&&(o.lastIndex=d,h=o.exec(l),h!==null);)d=o.lastIndex,o===j?h[1]==="!--"?o=Ke:h[1]!==void 0?o=Ze:h[2]!==void 0?(Lt.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=R):h[3]!==void 0&&(o=R):o===R?h[0]===">"?(o=i??j,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?R:h[3]==='"'?Xe:Je):o===Xe||o===Je?o=R:o===Ke||o===Ze?o=j:(o=R,i=void 0);const p=o===R&&n[a+1].startsWith("/>")?" ":"";r+=o===j?l+Ms:u>=0?(s.push(c),l.slice(0,u)+It+l.slice(u)+_+p):l+_+(u===-2?a:p)}return[Mt(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class ee{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0;const a=e.length-1,l=this.parts,[c,h]=Ns(e,t);if(this.el=ee.createElement(c,s),L.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=L.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(It)){const d=h[o++],p=i.getAttribute(u).split(_),g=/([.?@])?(.*)/.exec(d);l.push({type:1,index:r,name:g[2],strings:p,ctor:g[1]==="."?Bs:g[1]==="?"?Ds:g[1]==="@"?Vs:pe}),i.removeAttribute(u)}else u.startsWith(_)&&(l.push({type:6,index:r}),i.removeAttribute(u));if(Lt.test(i.tagName)){const u=i.textContent.split(_),d=u.length-1;if(d>0){i.textContent=le?le.emptyScript:"";for(let p=0;p<d;p++)i.append(u[p],J()),L.nextNode(),l.push({type:2,index:++r});i.append(u[d],J())}}}else if(i.nodeType===8)if(i.data===Rt)l.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(_,u+1))!==-1;)l.push({type:7,index:r}),u+=_.length-1}r++}}static createElement(e,t){const s=M.createElement("template");return s.innerHTML=e,s}}function V(n,e,t=n,s){var o,a;if(e===O)return e;let i=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const r=X(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((a=i==null?void 0:i._$AO)==null||a.call(i,!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=V(n,i._$AS(n,e.values),i,s)),e}class zs{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??M).importNode(t,!0);L.currentNode=i;let r=L.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new ie(r,r.nextSibling,this,e):l.type===1?c=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(c=new Us(r,this,e)),this._$AV.push(c),l=s[++a]}o!==(l==null?void 0:l.index)&&(r=L.nextNode(),o++)}return L.currentNode=M,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class ie{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=V(this,e,t),X(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==O&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Os(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&X(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=ee.createElement(Mt(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(t);else{const o=new zs(i,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=et.get(e.strings);return t===void 0&&et.set(e.strings,t=new ee(e)),t}k(e){Me(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new ie(this.O(J()),this.O(J()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class pe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(e,t=this,s,i){const r=this.strings;let o=!1;if(r===void 0)e=V(this,e,t,0),o=!X(e)||e!==this._$AH&&e!==O,o&&(this._$AH=e);else{const a=e;let l,c;for(e=r[0],l=0;l<r.length-1;l++)c=V(this,a[s+l],t,l),c===O&&(c=this._$AH[l]),o||(o=!X(c)||c!==this._$AH[l]),c===v?e=v:e!==v&&(e+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!i&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Bs extends pe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}}class Ds extends pe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}}class Vs extends pe{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=V(this,e,t,0)??v)===O)return;const s=this._$AH,i=e===v&&s!==v||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Us{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}}const we=Y.litHtmlPolyfillSupport;we==null||we(ee,ie),(Y.litHtmlVersions??(Y.litHtmlVersions=[])).push("3.2.1");const qs=(n,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const r=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new ie(e.insertBefore(J(),r),r,void 0,t??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class B extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=qs(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return O}}var vt;B._$litElement$=!0,B.finalized=!0,(vt=globalThis.litElementHydrateSupport)==null||vt.call(globalThis,{LitElement:B});const xe=globalThis.litElementPolyfillSupport;xe==null||xe({LitElement:B});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");class Ae extends B{constructor(){super(),this.state="inactive",this.buttonStates={mic:!1,video:!1,cancelvideo:!1,connect:!1},this.activeicons={mic:"mic_off",video:"hangout_video_off",pause:"play_arrow",connect:"play_arrow",screen:"cancel_presentation",configure:"settings"},this.inactiveicons={mic:"mic",video:"videocam",pause:"pause",connect:"pause",screen:"screen_share",configure:"settings"}}firstUpdated(){this.emitevent()}updated(e){e.has("state")&&this.handleStateChange()}handleStateChange(){const e=this.shadowRoot.querySelector(".actions-nav");this.state==="active"?e.classList.remove("disabled"):e.classList.add("disabled")}render(){return T`
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
      <section class="control-tray">
        <canvas style="display: none;" width="480" height="270"></canvas>
        <nav class="actions-nav ${this.state==="inactive"?"disabled":""}">
          ${this.getbutton("mic")}
          ${this.getbutton("video")}
          ${this.getbutton("screen")}
        </nav>
        <div class="connection-container">
          <div class="connection-button-container">
            ${this.getbutton("connect")}
          </div>
          <button class="btn-base"  data-type="state">
          <span class="material-symbols-outlined">${this.state==="active"?"Stream":"Disconnected"}</span>
        </button>
        ${this.getBasebutton("configure","settings")}

      </div>

      </section>
    `}getbutton(e,t){return T`
      <button 
        class="action-button ${e}-button ${this.buttonStates[e]?"active":""}" 
        data-type="${e}"
      >
        <span class="material-symbols-outlined">
          ${this.getButtonIcon(e)}
        </span>
      </button>
    `}getBasebutton(e,t){return T`
      <button 
        class="btn-base ${e}-button action-button" 
        data-type="${e}"
      >
        <span class="material-symbols-outlined">
          ${this.getButtonIcon(e)}
        </span>
      </button>
    `}emitevent(){this.shadowRoot.querySelectorAll("button").forEach(t=>{t.addEventListener("click",s=>{const i=t.getAttribute("data-type");this.toggleButtonState(i),this.dispatchEvent(new CustomEvent("button-click",{detail:{button:t,buttonType:i,state:this.state,buttonState:this.buttonStates[i]},bubbles:!0,composed:!0}))})})}toggleButtonState(e){this.buttonStates={...this.buttonStates,[e]:!this.buttonStates[e]},this.requestUpdate()}getButtonIcon(e){return this.buttonStates[e]?this.activeicons[e]||e:this.inactiveicons[e]||e}}f(Ae,"styles",_t`
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
  `),f(Ae,"properties",{state:{type:String,reflect:!0},buttonStates:{type:Object}});customElements.define("call-control-bar",Ae);class Hs extends HTMLElement{static get observedAttributes(){return["mode","primary-color","background","secondary-color"]}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0}),this.visualizers=new Map,this.currentVisualizer=null,this.particles=[],this.resizeObserver=new ResizeObserver(()=>this.resize()),this.modes=["wave","bars","circles","particles","plasma","mirror-wave","hexagons","centered-bars","floating-bars"],this.currentMode="wave",this.shadowRoot.innerHTML=`
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
        `,this.canvas=this.shadowRoot.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.registerVisualizers(),this.resize()}registerVisualizers(){this.registerVisualizer("wave",js),this.registerVisualizer("bars",Ws),this.registerVisualizer("centered-bars",Fs),this.registerVisualizer("floating-bars",Gs),this.registerVisualizer("circles",Ys),this.registerVisualizer("pulse",Qs)}startVisualization(){this.isAnimating=!0,this.draw()}stopVisualization(){this.isAnimating=!1}registerVisualizer(e,t){this.visualizers.set(e,new t(this))}connectedCallback(){this.resizeObserver.observe(this.canvas),this.setMode(this.getAttribute("mode")||"wave"),this.startVisualization()}disconnectedCallback(){this.stopVisualization(),this.resizeObserver.disconnect()}updateData(e){e&&(this.dataArray=e,this.draw())}attributeChangedCallback(e,t,s){e==="mode"&&this.modes.includes(s)&&(this.currentMode=s,this.setMode(s)),e==="primary-color"&&this.style.setProperty("--primary-color",s),e==="background"&&this.style.setProperty("--background",s)}resize(){this.canvas.width=this.canvas.clientWidth*2,this.canvas.height=this.canvas.clientHeight*2}draw(){!this.dataArray||!this.currentVisualizer||(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.currentVisualizer.draw(this.dataArray),requestAnimationFrame(()=>this.draw()))}setMode(e){this.visualizers.has(e)&&(this.currentVisualizer=this.visualizers.get(e),this.currentVisualizer.init(),this.currentMode=e)}}class q{constructor(e){this.visualizer=e,this.ctx=e.ctx,this.canvas=e.canvas}init(){}draw(){}}class js extends q{draw(e){const{ctx:t,canvas:s}=this;t.beginPath(),t.lineWidth=2,t.strokeStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color");const i=s.width/e.length;let r=0;for(let o=0;o<e.length;o++){const l=e[o]/128*s.height/2;o===0?t.moveTo(r,l):t.lineTo(r,l),r+=i}t.lineTo(s.width,s.height/2),t.stroke()}}class Ws extends q{draw(e){const{ctx:t,canvas:s}=this,i=s.width/e.length*.8,r=s.width/e.length*.2;let o=0;t.fillStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color");for(let a=0;a<e.length;a++){const l=e[a]/255*s.height;t.fillRect(o,s.height-l,i,l),o+=i+r}}}class Fs extends q{draw(e){const{ctx:t,canvas:s}=this,i=s.height/2,r=s.width/e.length*.6,o=s.width/e.length*.4;let a=0;t.fillStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color");for(let l=0;l<e.length;l++){const c=e[l]/255*i;t.fillRect(a,i-c,r,c*2),a+=r+o}}}class Gs extends q{init(){this.floatOffsets=new Array(128).fill(0)}draw(e){const{ctx:t,canvas:s}=this,i=s.height/2,r=s.width/e.length*.8,o=s.width/e.length*.2;let a=0;t.fillStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color");for(let l=0;l<e.length;l++){const c=e[l]/255*i;this.floatOffsets[l]=(this.floatOffsets[l]+.02)%(Math.PI*2);const h=Math.sin(this.floatOffsets[l])*10;t.fillRect(a,i-c+h,r,c),a+=r+o}}}class Ys extends q{init(){this.rotation=0,this.history=new Array(60).fill(0)}draw(e){const{ctx:t,canvas:s}=this,i=s.width/2,r=s.height/2,o=Math.min(s.width,s.height)*.4,a=e.reduce((c,h)=>c+h,0)/e.length;this.history.push(a),this.history.shift(),t.fillStyle=getComputedStyle(this.visualizer).getPropertyValue("--background"),t.fillRect(0,0,s.width,s.height),t.beginPath(),t.strokeStyle=getComputedStyle(this.visualizer).getPropertyValue("--primary-color"),t.lineWidth=4,t.arc(i,r,o*(a/255)*.8,0,Math.PI*2),t.stroke();const l=Math.PI*2/e.length;this.rotation+=.002,e.forEach((c,h)=>{const u=l*h+this.rotation,d=c/255*o*.4;t.beginPath(),t.fillStyle=`hsla(${h/e.length*360}, 70%, 50%, 0.7)`,t.arc(i+Math.cos(u)*o*.6,r+Math.sin(u)*o*.6,d,0,Math.PI*2),t.fill()}),t.strokeStyle=getComputedStyle(this.visualizer).getPropertyValue("--secondary-color"),t.beginPath(),this.history.forEach((c,h)=>{const u=s.width/this.history.length*h,d=s.height-c/255*s.height;h===0?t.moveTo(u,d):t.lineTo(u,d)}),t.stroke()}}class Qs extends q{draw(e){const{ctx:t,canvas:s}=this,i=s.height/2,r=getComputedStyle(this.visualizer).getPropertyValue("--primary-color"),o=2*(e.length-1),l=(s.width-o)/e.length;t.clearRect(0,0,s.width,s.height);for(let c=0;c<e.length;c++){const h=e[c]/255*i,u=c*(l+2);t.fillStyle=r,t.fillRect(u,s.height/2-h/2,l,h)}}}customElements.define("audio-visualizer",Hs);class Ks extends HTMLElement{constructor(){super(),this.isOpen=!1,this.currentMode="dark",this.onOpenCallback=null,this.onCloseCallback=null,this.attachShadow({mode:"open"});const e=`
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
      `}connectedCallback(){}setupEventListeners(){this.closeButton.addEventListener("click",()=>this.close()),this.overlay.addEventListener("click",e=>{e.target===this.overlay&&this.close()})}setMode(e="dark"){["dark","light"].includes(e)||(console.warn("Invalid mode. Using default dark mode."),e="dark"),this.classList.remove("dark-mode","light-mode"),this.classList.add(`${e}-mode`),this.currentMode=e}toggleMode(){const e=this.currentMode==="dark"?"light":"dark";this.setMode(e)}open(e=null){this.onOpenCallback=e,this.style.display="block",this.offsetHeight,this.setAttribute("visible",""),this.isOpen=!0,this.onOpenCallback&&this.onOpenCallback()}close(e=null){this.onCloseCallback=e,this.removeAttribute("visible"),this.isOpen=!1,setTimeout(()=>{this.style.display="none",this.isOpen=!1,this.onCloseCallback&&this.onCloseCallback()},300)}appendChild(e){super.appendChild(e)}setContent(e){for(;this.firstChild;)this.removeChild(this.firstChild);if(typeof e=="string"){const t=document.createElement("div");t.innerHTML=e,this.appendChild(t)}else e instanceof Node&&this.appendChild(e)}getContentContainer(){return this}}customElements.define("custom-modal",Ks);if(!customElements.get("custom-input")){class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0}),this.handleInputChange=this.handleInputChange.bind(this)}static get observedAttributes(){return["type","id","name","value","placeholder","disabled","readonly","darkmode","options","required","title","pattern"]}getStyles(){const t=this.hasAttribute("darkmode");return`
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
        `}connectedCallback(){this.render();const t=this.shadowRoot.querySelector("input, textarea, select");t&&(t.addEventListener("input",this.handleInputChange),t.addEventListener("change",this.handleInputChange)),this.shadowRoot.querySelectorAll("form")}disconnectedCallback(){const t=this.shadowRoot.querySelector("input, textarea, select");t&&(t.removeEventListener("input",this.handleInputChange),t.removeEventListener("change",this.handleInputChange)),this.shadowRoot.querySelector(".validate-form")}handleInputChange(t){const s=this.getInputValues();this.dispatchEvent(new CustomEvent("input-change",{detail:{id:this.getAttribute("id"),name:this.getAttribute("name"),value:s},bubbles:!0,composed:!0}))}attributeChangedCallback(t,s,i){s!==i&&this.render()}handleSubmit(t){t.preventDefault(),t.target.checkValidity()&&this.dispatchEvent(new CustomEvent("form-submit",{detail:{id:this.getAttribute("id"),name:this.getAttribute("name"),value:this.getInputValues()},bubbles:!0,composed:!0}))}render(){const t=this.getAttribute("type")||"text",s=this.getAttribute("id"),i=this.getAttribute("name"),r=this.getAttribute("value")||"",o=this.getAttribute("placeholder")||"",a=this.hasAttribute("disabled"),l=this.hasAttribute("readonly"),c=this.getAttribute("options")||"[]",h=this.hasAttribute("required")?"required":"",u=this.getAttribute("title")||"",d=this.getAttribute("pattern")||"",p={type:t,id:s,name:i,value:r,placeholder:o,disabled:a,readonly:l,options:c,required:h,title:u,pattern:d};this.shadowRoot.innerHTML=`
          <style>${this.getStyles()}</style>
          <form class="validate-form">
            <div class="input-container">
              ${this.renderInput(p)}
            </div>
          </form>
        `;const g=this.shadowRoot.querySelector("input, textarea, select");g&&(g.addEventListener("input",this.handleInputChange),g.addEventListener("change",this.handleInputChange))}renderInput(t){const{type:s,id:i,name:r,value:o,placeholder:a,disabled:l,readonly:c,options:h,required:u,title:d,pattern:p}=t,g=u?"required":"";switch(s){case"textarea":return`
              <textarea
                id="${i}"
                name="${r}"
                placeholder="${a}"
                ${l?"disabled":""}
                ${c?"readonly":""}
                ${g}
                  ${d?`title="${d}" oninvalid="this.setCustomValidity('${d}')" oninput="this.setCustomValidity('')"`:""}
                  ${p?`pattern="${p}"`:""}
              >${o}</textarea>
            `;case"checkbox":case"switch":case"boolean":return`
              <label class="switch">
                <input
                  type="checkbox"
                  id="${i}"
                  name="${r}"
                  ${o==="true"?"checked":""}
                  ${l?"disabled":""}
                  ${c?"readonly":""}
                  ${g}
                  ${d?`title="${d}" oninvalid="this.setCustomValidity('${d}')" oninput="this.setCustomValidity('')"`:""}
                  ${p?`pattern="${p}"`:""}
                >
                <span class="slider"></span>
              </label>
            `;case"select":const b=JSON.parse(h);return`
              <select
                id="${i}"
                name="${r}"
                ${l?"disabled":""}
                ${c?"readonly":""}
                ${u?"required":""}
                  ${d?`title="${d}" oninvalid="this.setCustomValidity('${d}')" oninput="this.setCustomValidity('')"`:""}
                  ${p?`pattern="${p}"`:""}
              >
                ${b.map(S=>`
                  <option value="${S.value}" ${S.value===o?"selected":""}>
                    ${S.image?`<img src="${S.image}" alt="${S.label}" style="vertical-align: middle; margin-right: 5px;">`:""}
                    ${S.label}
                  </option>
                `).join("")}
              </select>
            `;case"radio":return JSON.parse(h).map(S=>`
              <label>
                <input
                  type="radio"
                  id="${i}"
                  name="${r}"
                  value="${S.value}"
                  ${S.value===o?"checked":""}
                  ${l?"disabled":""}
                  ${c?"readonly":""}
                >
                ${S.label}
              </label>
            `).join("");default:return`
                <input
                  type="${s==="string"?"text":s}"
                  id="${i}"
                  name="${r}"
                  value="${o}"
                  placeholder="${a}"
                  ${l?"disabled":""}
                  ${c?"readonly":""}
                  ${g}
                  ${d?`title="${d}" oninvalid="this.setCustomValidity('${d}')" oninput="this.setCustomValidity('')"`:""}
                  ${p?`pattern="${p}"`:""}
                >
              `}}getInputValues(){const t=this.shadowRoot.querySelector("input, textarea, select");if(!t)return null;if(t.type==="checkbox")return t.checked;if(t.tagName.toLowerCase()==="textarea"){const r=t.value.trim();return r?r.split(`
`):[]}if(t.tagName.toLowerCase()==="select")return t.value;if(t.type==="radio"){const r=this.shadowRoot.querySelector(`input[name="${t.name}"]:checked`);return r?r.value:null}const s=this.parseValueByType(t),i=this.shadowRoot.querySelectorAll("form");return i&&i.forEach(r=>{r.reportValidity()?r.classList.remove("invalid"):r.classList.add("invalid")}),s}getvalidation(){let t=!1;const s=this.shadowRoot.querySelectorAll("form");return s&&s.forEach(i=>{i.reportValidity()?t=!0:t=!1}),t}parseValueByType(t){t.value;const s=t.type,i=t.value;switch(s){case"number":const r=Number(i);return isNaN(r)?0:r*1;case"text":case"string":return i;default:return i}}setInputValues(t){const s=this.shadowRoot.querySelector("input, textarea, select");if(s){if(s.type==="checkbox")s.checked=!!t;else if(Array.isArray(t)&&s.tagName.toLowerCase()==="textarea")s.value=t.join(`
`);else if(s.tagName.toLowerCase()==="select")s.value=t;else if(s.type==="radio"){const i=this.shadowRoot.querySelector(`input[name="${s.name}"][value="${t}"]`);i&&(i.checked=!0)}else s.value=t;this.handleInputChange()}}resetInputValues(){const t=this.shadowRoot.querySelector("input, textarea, select");t&&(t.type==="checkbox"?t.checked=!1:t.value="",this.handleInputChange())}setOptions(t){this.getAttribute("type")==="select"&&(this.setAttribute("options",JSON.stringify(t)),this.render())}getSelectedOption(){if(this.getAttribute("type")==="select"){const t=this.shadowRoot.querySelector("select");return t?t.value:null}return null}}customElements.define("custom-input",n)}class Zs extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0}),this.selectedValues=[],this.options=[],this.multiple=!1}static get observedAttributes(){return["multiple","grid"]}attributeChangedCallback(e,t,s){e==="multiple"&&(this.multiple=s!==null,this.selectedValues=[],this.render(),this.updateSelections())}connectedCallback(){this.multiple=this.hasAttribute("multiple"),this.render(),this.addEventListeners()}render(){this.shadowRoot.innerHTML=`
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
      `}addEventListeners(){this.shadowRoot.querySelector(".options-list").addEventListener("click",t=>{const s=t.target.closest(".option");s&&(this.multiple?this.toggleOption(s):this.selectOption(s))})}updatePreview(e){const t=this.shadowRoot.querySelector(".preview-container");t.innerHTML="",Array.isArray(e)||(e=e?[e]:[]),e.length>0?(t.style.display="flex",e.forEach(s=>{if(s.img||s.image){const i=document.createElement("img");i.src=s.img||s.image,i.alt=s.label,t.appendChild(i)}else if(s.html){const i=document.createElement("div");i.innerHTML=s.html,t.appendChild(i)}else t.style.display="none"})):t.style.display="none"}toggleOption(e){const t=e.dataset.value,s=this.selectedValues.indexOf(t);s===-1?this.selectedValues.push(t):this.selectedValues.splice(s,1),this.updateSelections();const i=this.options.filter(r=>this.selectedValues.includes(r.value));this.updatePreview(i),this.dispatchEvent(new CustomEvent("change",{detail:i}))}selectOption(e){const t=e.dataset.value,s=this.options.find(i=>i.value===t);console.log("selectedOption",s,t),s&&(this.selectedValues=[t],this.updateSelections(),this.updatePreview(s),this.dispatchEvent(new CustomEvent("change",{detail:s})))}setSelectedValues(e){this.selectedValues=e,this.updateSelections()}updateSelections(){this.shadowRoot.querySelectorAll(".option").forEach(t=>{t.classList.toggle("selected",this.selectedValues.includes(t.dataset.value))})}setOptions(e){this.options=e;const t=this.shadowRoot.querySelector(".options-list");if(t.innerHTML=e.map(s=>{let i="",r="";return(s.img||s.image)&&(i+=`<img src="${s.img||s.image}" alt="${s.label}">`),s.state&&(r=`<span class="state">${s.state}</span>`),i+=`<span>${s.label}</span>`,`
          <div class="option ${this.selectedValues.includes(s.value)?"selected":""}" 
               data-value="${s.value}">
            ${i}
            ${r}
          </div>
        `}).join(""),this.selectedValues.length>0)if(this.multiple){const s=e.filter(i=>this.selectedValues.includes(i.value));this.updatePreview(s)}else{const s=e.find(i=>i.value===this.selectedValues[0]);s&&this.updatePreview(s)}}getValue(){return this.multiple?this.selectedValues:this.selectedValues[0]||null}getSelectedOptions(){const e=this.options.filter(t=>this.selectedValues.includes(t.value));return this.multiple?e:e[0]||null}}customElements.define("enhanced-select",Zs);const Js=`
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
}`,Xs=`
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
}`,tt=(n,e)=>{const t=new Blob([`registerProcessor('${n}', ${e})`],{type:"application/javascript"});return URL.createObjectURL(t)};class ei extends D{constructor(e=16e3){super(),this.stream=null,this.audioContext=null,this.source=null,this.recording=!1,this.recordingWorklet=null,this.vuWorklet=null,this.starting=!1,this.targetSampleRate=e,this.resamplingEnabled=!0}async start(){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error("Could not request user media");return this.starting=new Promise(async(e,t)=>{try{if(this.stream=await navigator.mediaDevices.getUserMedia({audio:!0}),this.audioContext=new(window.AudioContext||window.webkitAudioContext),console.log(`Browser's sample rate: ${this.audioContext.sampleRate}`),!this.audioContext)throw new Error("AudioContext could not be created.");if(this.source=this.audioContext.createMediaStreamSource(this.stream),this.resamplingEnabled&&this.audioContext.sampleRate!==this.targetSampleRate){const i=new OfflineAudioContext(1,this.audioContext.sampleRate,this.audioContext.sampleRate),o=this.audioContext.createScriptProcessor(4096,1,1);o.onaudioprocess=a=>{const c=a.inputBuffer.getChannelData(0),h=this.resampleAudio(c,this.audioContext.sampleRate,this.targetSampleRate),u=new Int16Array(h.length);for(let d=0;d<h.length;d++)u[d]=Math.max(-32768,Math.min(32767,Math.round(h[d]*32767)));if(this.recording){const d=this.arrayBufferToBase64(u.buffer);this.emit("data",d)}},this.source.connect(o),o.connect(this.audioContext.destination)}else{const i="audio-recorder-worklet",r=tt(i,Js);await this.audioContext.audioWorklet.addModule(r),this.recordingWorklet=new AudioWorkletNode(this.audioContext,i),this.recordingWorklet.port.onmessage=async o=>{const a=o.data.data.int16arrayBuffer;if(a){const l=this.arrayBufferToBase64(a);this.emit("data",l)}},this.source.connect(this.recordingWorklet)}const s="vu-meter";await this.audioContext.audioWorklet.addModule(tt(s,Xs)),this.vuWorklet=new AudioWorkletNode(this.audioContext,s),this.vuWorklet.port.onmessage=i=>{this.emit("volume",i.data.volume)},this.source.connect(this.vuWorklet),this.recording=!0,e()}catch(s){t(s)}this.starting=null}),this.starting}resampleAudio(e,t,s){const i=t/s,r=Math.round(e.length/i),o=new Float32Array(r);for(let a=0;a<r;a++){const l=a*i,c=Math.floor(l),h=l-c;c+1<e.length?o[a]=e[c]*(1-h)+e[c+1]*h:o[a]=e[c]}return o}arrayBufferToBase64(e){const t=new Uint8Array(e),s=t.byteLength;let i="";for(let r=0;r<s;r++)i+=String.fromCharCode(t[r]);return window.btoa(i)}stop(){const e=()=>{this.source&&this.source.disconnect(),this.stream&&this.stream.getTracks().forEach(t=>t.stop()),this.audioContext&&this.audioContext.close(),this.stream=void 0,this.recordingWorklet=void 0,this.vuWorklet=void 0,this.audioContext=void 0,this.recording=!1};if(this.starting){this.starting.then(e).catch(console.error);return}e()}}class Ot{constructor(){f(this,"handleStreamEnded",()=>{this.isStreaming=!1,this.stream=null,this.videoElement&&(this.videoElement.srcObject=null),this.notifyListeners()});this.stream=null,this.isStreaming=!1,this.type="webcam",this.eventListeners=new Set,this.videoElement=null}setVideoElement(e){if(!(e instanceof HTMLVideoElement))throw new Error("Element must be an HTMLVideoElement");this.videoElement=e,this.stream&&(this.videoElement.srcObject=this.stream,this.videoElement.play().catch(t=>{console.error("Error playing video:",t)}))}addEventListener(e){return this.eventListeners.add(e),()=>this.eventListeners.delete(e)}notifyListeners(){const e={stream:this.stream,isStreaming:this.isStreaming,type:this.type};this.eventListeners.forEach(t=>t(e))}async start(){try{const e=await navigator.mediaDevices.getUserMedia({video:!0});return this.stream=e,this.isStreaming=!0,this.videoElement&&(this.videoElement.srcObject=this.stream,await this.videoElement.play()),this.stream.getTracks().forEach(t=>{t.addEventListener("ended",this.handleStreamEnded)}),this.notifyListeners(),e}catch(e){throw console.error("Error starting webcam capture:",e),e}}stop(){this.stream&&(this.stream.getTracks().forEach(e=>{e.removeEventListener("ended",this.handleStreamEnded),e.stop()}),this.videoElement&&(this.videoElement.srcObject=null),this.stream=null,this.isStreaming=!1,this.notifyListeners())}getState(){return{type:this.type,start:this.start.bind(this),stop:this.stop.bind(this),isStreaming:this.isStreaming,stream:this.stream}}}class Pt{constructor(){f(this,"handleStreamEnded",()=>{this.isStreaming=!1,this.stream=null,this.videoElement&&(this.videoElement.srcObject=null),this.notifyListeners()});this.stream=null,this.isStreaming=!1,this.type="screen",this.eventListeners=new Set,this.videoElement=null}setVideoElement(e){if(!(e instanceof HTMLVideoElement))throw new Error("Element must be an HTMLVideoElement");this.videoElement=e,this.stream&&(this.videoElement.srcObject=this.stream,this.videoElement.play().catch(t=>{console.error("Error playing video:",t)}))}addEventListener(e){return this.eventListeners.add(e),()=>this.eventListeners.delete(e)}notifyListeners(){const e={stream:this.stream,isStreaming:this.isStreaming,type:this.type};this.eventListeners.forEach(t=>t(e))}async start(){try{const e=await navigator.mediaDevices.getDisplayMedia({video:!0});return this.stream=e,this.isStreaming=!0,this.videoElement&&(this.videoElement.srcObject=this.stream,await this.videoElement.play()),this.stream.getTracks().forEach(t=>{t.addEventListener("ended",this.handleStreamEnded)}),this.notifyListeners(),e}catch(e){throw console.error("Error starting screen capture:",e),e}}stop(){this.stream&&(this.stream.getTracks().forEach(e=>{e.removeEventListener("ended",this.handleStreamEnded),e.stop()}),this.videoElement&&(this.videoElement.srcObject=null),this.stream=null,this.isStreaming=!1,this.notifyListeners())}getState(){return{type:this.type,start:this.start.bind(this),stop:this.stop.bind(this),isStreaming:this.isStreaming,stream:this.stream}}}class st{constructor(e={}){this.fps=e.fps||.5,this.scale=e.scale||.25,this.quality=e.quality||1,this.timeoutId=null,this.isActive=!1,this.mediaCapture=null,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d")}setMediaCapture(e){if(!(e instanceof Ot||e instanceof Pt))throw new Error("Invalid media capture instance");this.stop(),this.mediaCapture=e,this.unsubscribe=this.mediaCapture.addEventListener(t=>{t.isStreaming||this.stop()})}start(e){if(!this.mediaCapture||!this.mediaCapture.stream)throw new Error("No media stream available");this.isActive=!0;const t=this.mediaCapture.stream.getVideoTracks()[0],{width:s,height:i}=t.getSettings();this.canvas.width=s*this.scale,this.canvas.height=i*this.scale;const r=()=>{if(!this.isActive||!this.mediaCapture.isStreaming)return;const o=document.createElement("video");o.srcObject=this.mediaCapture.stream,o.play().then(()=>{this.ctx.drawImage(o,0,0,this.canvas.width,this.canvas.height);const a=this.canvas.toDataURL("image/jpeg",this.quality),l=a.slice(a.indexOf(",")+1);e({mimeType:"image/jpeg",data:l,width:this.canvas.width,height:this.canvas.height,timestamp:Date.now(),sourceType:this.mediaCapture.type}),o.pause(),o.srcObject=null,this.isActive&&(this.timeoutId=window.setTimeout(r,1e3/this.fps))}).catch(a=>{console.error("Error capturing frame:",a),this.stop()})};r()}stop(){this.isActive=!1,this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=null),this.unsubscribe&&this.unsubscribe()}setOptions(e={}){this.fps=e.fps??this.fps,this.scale=e.scale??this.scale,this.quality=e.quality??this.quality}getState(){var e;return{isActive:this.isActive,fps:this.fps,scale:this.scale,quality:this.quality,sourceType:((e=this.mediaCapture)==null?void 0:e.type)||null}}}class ti{constructor(){this.videoWrappers=document.querySelectorAll(".video-wrapper"),this.videoContainerGrid=document.querySelector(".video-container-grid"),this.activeVideoSources=new Set}updateContainerVisibility(){this.activeVideoSources.size===0?this.videoContainerGrid.classList.add("hidden"):this.videoContainerGrid.classList.remove("hidden"),this.videoWrappers.forEach(e=>{const t=e.querySelector("video").id;this.activeVideoSources.has(t)?e.classList.remove("hidden"):e.classList.add("hidden")})}addActiveVideoSource(e){this.activeVideoSources.add(e),this.updateContainerVisibility()}removeActiveVideoSource(e){this.activeVideoSources.delete(e),this.updateContainerVisibility()}}const{ClientContentMessage:cn,isInterrupted:si,isModelTurn:ii,isServerContentMessage:ni,isSetupCompleteMessage:ri,isToolCallCancellationMessage:oi,isToolCallMessage:ai,isTurnComplete:li}=es;function ke(n){return Array.isArray(n)?n:[n]}class ci extends D{constructor({url:e,apiKey:t}){super(),this.url=e||"wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent",this.url+=`?key=${t}`,this.ws=null,this.isConnecting=!1,this.messageQueue=[],this.connectionRetries=0,this.maxRetries=3,this.connected=!1,this.reconnectionTimeout=null,this.contextQueue=[],this.config=null,this.send=this.send.bind(this),this.connect=this.connect.bind(this),this._sendDirect=this._sendDirect.bind(this),this.handleConnectionError=this.handleConnectionError.bind(this),this.addToContext=this.addToContext.bind(this),this.sendWithContext=this.sendWithContext.bind(this)}log(e,t){const s={date:new Date,type:e,message:t};this.emit("log",s)}async connect(e){if(this.config=e,this.isConnecting)return new Promise(t=>{this.once("connected",()=>t(!0))});this.disconnect(),this.isConnecting=!0;try{const t=new WebSocket(this.url);return t.addEventListener("message",async s=>{s.data instanceof Blob?await this.receive(s.data):console.log("Non-blob message received:",s)}),new Promise((s,i)=>{const r=o=>{this.handleConnectionError(o,t,i)};t.addEventListener("error",r),t.addEventListener("open",o=>{if(!e){this.isConnecting=!1,i(new Error("Invalid config sent to `connect(config)`"));return}this.log(`client.${o.type}`,"Connected to socket"),this.emit("open"),this.connected=!0,this.ws=t,this.isConnecting=!1,this.emit("connected");const a={setup:e};this._sendDirect(a),this.log("client.send","Setup message sent"),this.processMessageQueue(),t.removeEventListener("error",r),t.addEventListener("close",this.handleClose.bind(this)),s(!0)})})}catch(t){throw this.isConnecting=!1,t}}handleConnectionError(e,t,s){this.disconnect(t);const i=`Could not connect to "${this.url}"`;this.log(`server.${e.type}`,i),this.isConnecting=!1,this.connected=!1,s(new Error(i))}handleClose(e){this.connected=!1;let t=e.reason||"";if(t.toLowerCase().includes("error")){const s="ERROR]",i=t.indexOf(s);i>0&&(t=t.slice(i+s.length+1,1/0))}this.log(`server.${e.type}`,`Disconnected ${t?`with reason: ${t}`:""}`),this.emit("close",e),this.connectionRetries<this.maxRetries&&(this.connectionRetries++,setTimeout(()=>{this.connect(this.config).catch(console.error)},1e3*this.connectionRetries))}disconnect(e){return this.ws===e&&this.ws||this.ws&&!e?(this.ws.close(),console.log("Disconnected",this.ws),this.ws=null,this.connected=!1,this.log("client.close","Disconnected"),this.reconnectionTimeout&&(clearTimeout(this.reconnectionTimeout),this.reconnectionTimeout=null),this.removeAllListeners(),!0):!1}processMessageQueue(){for(;this.messageQueue.length>0;){const e=this.messageQueue.shift();this._sendDirect(e)}}async receive(e){const t=await Xt(e);if(ai(t)){this.log("server.toolCall",t),this.emit("toolcall",t.toolCall);return}if(oi(t)){this.log("receive.toolCallCancellation",t),this.emit("toolcallcancellation",t.toolCallCancellation);return}if(ri(t)){this.log("server.send","Setup complete"),this.emit("setupcomplete");return}if(ni(t)){const{serverContent:s}=t;if(si(s)){this.log("receive.serverContent","Interrupted"),this.emit("interrupted");return}if(li(s)&&(this.log("server.send","Turn complete"),this.emit("turncomplete")),ii(s)){if(!s.modelTurn||!s.modelTurn.parts)return s;const i=s.modelTurn.parts,r=i.filter(l=>l.inlineData&&l.inlineData.mimeType.startsWith("audio/pcm")),o=r.map(l=>{var c;return(c=l.inlineData)==null?void 0:c.data}),a=i.filter(l=>!r.includes(l));if(o.forEach(l=>{if(l){const c=St(l);this.emit("audio",c),this.log("server.audio",`Buffer (${c.byteLength})`)}}),a.length){const l={modelTurn:{parts:a}};this.emit("content",l),this.log("server.content",t)}}}else console.log("Received unmatched message:",t)}sendRealtimeInput(e){if(!this.connected||this.isConnecting){const i={realtimeInput:{mediaChunks:e}};this.enqueueMessage(i),this.reconnectionTimeout||(this.reconnectionTimeout=setTimeout(()=>{this.config&&this.connect(this.config).catch(console.error).finally(()=>{this.reconnectionTimeout=null})},1e3));return}const t=e.some(i=>i.mimeType.includes("audio"))&&e.some(i=>i.mimeType.includes("image"))?"audio + video":e.some(i=>i.mimeType.includes("audio"))?"audio":e.some(i=>i.mimeType.includes("image"))?"video":"unknown",s={realtimeInput:{mediaChunks:e}};this._sendDirect(s),this.log("client.realtimeInput",t)}sendToolResponse(e){const t={toolResponse:e};this._sendDirect(t),this.log("client.toolResponse",t)}addToContext(e){e=ke(e);const t={role:"user",parts:e};this.contextQueue.push(t)}sendWithContext(e,t=!0){e=ke(e);const s={role:"user",parts:e},r={clientContent:{turns:[...this.contextQueue,s],turnComplete:t}};this._sendDirect(r),this.log("client.send",r)}send(e,t=!0){e=ke(e);const i={clientContent:{turns:[{role:"user",parts:e}],turnComplete:t}};this._sendDirect(i),this.log("client.send",i)}_sendDirect(e){if(!this.connected){if(this.isConnecting){this.enqueueMessage(e);return}if(this.connectionRetries<this.maxRetries){this.enqueueMessage(e),this.connect(this.config).catch(console.error);return}throw new Error("WebSocket is not connected and max retries exceeded")}if(!this.ws)throw new Error("WebSocket instance is null");const t=JSON.stringify(e);this.ws.send(t)}enqueueMessage(e){this.messageQueue.push(e)}}class it{constructor({url:e,apiKey:t}){this.url=e,this.apiKey=t,this.client=new ci({url:e,apiKey:t}),this.audioStreamer=null,this.connected=!1,this.config={model:"models/gemini-2.0-flash-exp"},this.volume=0}async initializeAudioStreamer(){if(!this.audioStreamer)try{const e=await Jt({id:"audio-out"});this.audioStreamer=new AudioStreamer(e),await this.audioStreamer.addWorklet("vumeter-out",VolMeterWorket,t=>{this.volume=t.data.volume,console.log("Current Volume:",this.volume)})}catch(e){throw console.error("Failed to initialize audio streamer:",e),e}}attachClientListeners(){const e=()=>{this.connected=!1,console.log("Connection closed.")},t=()=>{this.audioStreamer&&this.audioStreamer.stop()},s=i=>{this.audioStreamer&&this.audioStreamer.addPCM16(new Uint8Array(i))};this.client.on("close",e).on("interrupted",t).on("audio",s)}detachClientListeners(){this.client.off("close").off("interrupted").off("audio")}async connect(e){if(!e)throw new Error("Configuration has not been set");this.client.disconnect(),await this.client.connect(e),this.connected=!0,console.log("Connected successfully!",e)}async disconnect(){this.client.disconnect(),this.connected=!1,this.detachClientListeners(),console.log("Disconnected successfully.")}}var ce;(function(n){n.STRING="string",n.NUMBER="number",n.INTEGER="integer",n.BOOLEAN="boolean",n.ARRAY="array",n.OBJECT="object"})(ce||(ce={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt;(function(n){n.LANGUAGE_UNSPECIFIED="language_unspecified",n.PYTHON="python"})(nt||(nt={}));var rt;(function(n){n.OUTCOME_UNSPECIFIED="outcome_unspecified",n.OUTCOME_OK="outcome_ok",n.OUTCOME_FAILED="outcome_failed",n.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(rt||(rt={}));var ot;(function(n){n.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",n.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",n.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",n.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",n.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(ot||(ot={}));var at;(function(n){n.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",n.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",n.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",n.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",n.BLOCK_NONE="BLOCK_NONE"})(at||(at={}));var lt;(function(n){n.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",n.NEGLIGIBLE="NEGLIGIBLE",n.LOW="LOW",n.MEDIUM="MEDIUM",n.HIGH="HIGH"})(lt||(lt={}));var ct;(function(n){n.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",n.SAFETY="SAFETY",n.OTHER="OTHER"})(ct||(ct={}));var Q;(function(n){n.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",n.STOP="STOP",n.MAX_TOKENS="MAX_TOKENS",n.SAFETY="SAFETY",n.RECITATION="RECITATION",n.LANGUAGE="LANGUAGE",n.OTHER="OTHER"})(Q||(Q={}));var ht;(function(n){n.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",n.RETRIEVAL_QUERY="RETRIEVAL_QUERY",n.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",n.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",n.CLASSIFICATION="CLASSIFICATION",n.CLUSTERING="CLUSTERING"})(ht||(ht={}));var ut;(function(n){n.MODE_UNSPECIFIED="MODE_UNSPECIFIED",n.AUTO="AUTO",n.ANY="ANY",n.NONE="NONE"})(ut||(ut={}));var dt;(function(n){n.MODE_UNSPECIFIED="MODE_UNSPECIFIED",n.MODE_DYNAMIC="MODE_DYNAMIC"})(dt||(dt={}));var pt;(function(n){n.GENERATE_CONTENT="generateContent",n.STREAM_GENERATE_CONTENT="streamGenerateContent",n.COUNT_TOKENS="countTokens",n.EMBED_CONTENT="embedContent",n.BATCH_EMBED_CONTENTS="batchEmbedContents"})(pt||(pt={}));Q.RECITATION,Q.SAFETY,Q.LANGUAGE;const hi="generativelanguage.googleapis.com",Ee=`wss://${hi}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`,U=ui();function ui(){var e;let n=(e=JSON.parse(localStorage.getItem("configAPI")))==null?void 0:e.apikey;return n&&n!==""||(n="AIzaSyBCvzPEORNt5ktrEA1f7uSQ4zB6H3nqHIc"),n}if(typeof U!="string"||U.length<1)throw new Error("set REACT_APP_GEMINI_API_KEY in .env");console.log("API_KEY",U);const Nt={name:"render_altair",description:"Displays an altair graph in json format.",parameters:{type:ce.OBJECT,properties:{json_graph:{type:ce.STRING,description:"JSON STRING representation of the graph to render."}},required:["json_graph"]}};var wt;console.log((wt=JSON.parse(localStorage.getItem("configAPI")))==null?void 0:wt.stringInstruction);var xt;const zt={model:"models/gemini-2.0-flash-exp",generationConfig:{temperature:1,top_p:.95,top_k:40,responseModalities:"TEXT",max_output_tokens:1024,speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:"Aoede"}}}},systemInstruction:{parts:[{text:((xt=JSON.parse(localStorage.getItem("configAPI")))==null?void 0:xt.stringInstruction)||`Eres una IA de traducción. Tu tarea es recibir un texto en español y devolver un JSON con las traducciones al inglés y japonés. 
      o tambien si no se entiende o se hacen gestos acciones o onomatopeyas puedes narrarlo en el formato deseado.
    Formato de salida:  
    {  
      "input": "<texto original en español usando muchos terminos en ingles tambien>"
      "traducciones": {
        "es": "<traducción al español>",
        "en": "<traducción al inglés>",  
        "jp": "<traducción al japonés>",
        "pt": "<traducción al portugués>"
      }  
    }  `}]},tools:[{googleSearch:{}},{functionDeclarations:[Nt]}]},te={instance:null,initialize({url:n,apiKey:e,config:t}){return this.instance||(this.instance=new it({url:n,apiKey:e,config:t}),this.setupEventListeners()),this.instance},setupEventListeners(){this.instance.client.on("toolcall",this.handleToolCall).on("setupcomplete",()=>console.log("Setup complete")).on("interrupted",()=>console.log("Interrupted")).on("turncomplete",()=>console.log("Turn complete"))},handleToolCall(n){const e=n.functionCalls.find(t=>t.name===Nt.name);e&&vi(e.args.json_graph),n.functionCalls.length&&setTimeout(()=>this.sendToolResponse({functionResponses:n.functionCalls.map(t=>({response:{output:{success:!0}},id:t.id}))}),200)},connect(n){this.instance&&this.disconnect(),this.instance=new it({url:Ee,apiKey:U}),this.setupEventListeners(),this.instance.connect(n)},disconnect(){this.instance&&(this.instance.disconnect(),this.instance=null)},reconnect(n){this.disconnect(),this.connect(n)},getInstance(){return this.instance?this.instance:this.initialize({url:Ee,apiKey:U})}},w={audioRecorder:new ei,screenCapture:new Pt,webcam:new Ot,extractors:{webcam:new st({fps:1,scale:.5,quality:.8}),screen:new st({fps:1,scale:.5,quality:.8})},active:{webcam:!1,screen:!1}};te.initialize({url:Ee,apiKey:U}).connect(zt);const di=document.querySelector("call-control-bar");di.addEventListener("button-click",pi);w.audioRecorder.on("data",n=>yi("audio/pcm;rate=16000",n));async function pi(n){const{buttonType:e,buttonState:t}=n.detail;switch(console.log("Control:",e,t),e){case"mic":t?w.audioRecorder.start():w.audioRecorder.stop();break;case"screen":t?fi():mi();break;case"video":t?gi():bi();break;case"configure":document.querySelector("#modal_content").open();break;case"connect":t?te.getInstance().disconnect():te.getInstance().connect(zt);break}}const ne=new ti;ne.updateContainerVisibility();async function fi(){w.screenCapture.start();const n=document.getElementById("screen");w.screenCapture.setVideoElement(n),ne.addActiveVideoSource("screen"),await Bt("screen")}async function gi(){w.webcam.start();const n=document.getElementById("webcam");w.webcam.setVideoElement(n),ne.addActiveVideoSource("webcam"),await Bt("webcam")}function mi(){w.screenCapture.stop(),ne.removeActiveVideoSource("screen")}function bi(){w.webcam.stop(),ne.removeActiveVideoSource("webcam")}async function Bt(n){const e=w.extractors[n],t=n==="webcam"?w.webcam:w.screenCapture;if(!w.active[n])try{await t.start(),w.active[n]=!0,e.setMediaCapture(t),await new Promise(s=>setTimeout(s,1e3)),e.start(s=>{te.getInstance().client.sendRealtimeInput([{mimeType:s.mimeType,data:s.data}])})}catch(s){console.error(`Error en ${n}:`,s),w.active[n]=!1,t.stop(),e.stop()}}function yi(n,e){te.getInstance().client.sendRealtimeInput([{mimeType:n,data:e}])}function vi(n){console.log("Recibido JSON para renderizar:",n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},xi=n=>(...e)=>({_$litDirective$:n,values:e});class ki{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ce extends ki{constructor(e){if(super(e),this.it=v,e.type!==wi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===v||e==null)return this._t=void 0,this.it=e;if(e===O)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Ce.directiveName="unsafeHTML",Ce.resultType=1;const Si=xi(Ce);function Oe(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let N=Oe();function Dt(n){N=n}const K={exec:()=>null};function y(n,e=""){let t=typeof n=="string"?n:n.source;const s={replace:(i,r)=>{let o=typeof r=="string"?r:r.source;return o=o.replace(x.caret,"$1"),t=t.replace(i,o),s},getRegex:()=>new RegExp(t,e)};return s}const x={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}#`),htmlBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}<(?:[a-z].*>|!--)`,"i")},$i=/^(?:[ \t]*(?:\n|$))+/,Ai=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ei=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,re=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ci=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Vt=/(?:[*+-]|\d{1,9}[.)])/,Ut=y(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,Vt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),Pe=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,_i=/^[^\n]+/,Ne=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ti=y(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ne).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ii=y(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Vt).getRegex(),fe="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ze=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ri=y("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ze).replace("tag",fe).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),qt=y(Pe).replace("hr",re).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",fe).getRegex(),Li=y(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",qt).getRegex(),Be={blockquote:Li,code:Ai,def:Ti,fences:Ei,heading:Ci,hr:re,html:Ri,lheading:Ut,list:Ii,newline:$i,paragraph:qt,table:K,text:_i},ft=y("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",re).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",fe).getRegex(),Mi={...Be,table:ft,paragraph:y(Pe).replace("hr",re).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ft).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",fe).getRegex()},Oi={...Be,html:y(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ze).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:K,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:y(Pe).replace("hr",re).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ut).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Pi=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ni=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ht=/^( {2,}|\\)\n(?!\s*$)/,zi=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ge=/[\p{P}\p{S}]/u,De=/[\s\p{P}\p{S}]/u,jt=/[^\s\p{P}\p{S}]/u,Bi=y(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,De).getRegex(),Di=/(?!~)[\p{P}\p{S}]/u,Vi=/(?!~)[\s\p{P}\p{S}]/u,Ui=/(?:[^\s\p{P}\p{S}]|~)/u,qi=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Hi=y(/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,"u").replace(/punct/g,ge).getRegex(),Wt="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ji=y(Wt,"gu").replace(/notPunctSpace/g,jt).replace(/punctSpace/g,De).replace(/punct/g,ge).getRegex(),Wi=y(Wt,"gu").replace(/notPunctSpace/g,Ui).replace(/punctSpace/g,Vi).replace(/punct/g,Di).getRegex(),Fi=y("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,jt).replace(/punctSpace/g,De).replace(/punct/g,ge).getRegex(),Gi=y(/\\(punct)/,"gu").replace(/punct/g,ge).getRegex(),Yi=y(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qi=y(ze).replace("(?:-->|$)","-->").getRegex(),Ki=y("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qi).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),he=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Zi=y(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",he).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ft=y(/^!?\[(label)\]\[(ref)\]/).replace("label",he).replace("ref",Ne).getRegex(),Gt=y(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ne).getRegex(),Ji=y("reflink|nolink(?!\\()","g").replace("reflink",Ft).replace("nolink",Gt).getRegex(),Ve={_backpedal:K,anyPunctuation:Gi,autolink:Yi,blockSkip:qi,br:Ht,code:Ni,del:K,emStrongLDelim:Hi,emStrongRDelimAst:ji,emStrongRDelimUnd:Fi,escape:Pi,link:Zi,nolink:Gt,punctuation:Bi,reflink:Ft,reflinkSearch:Ji,tag:Ki,text:zi,url:K},Xi={...Ve,link:y(/^!?\[(label)\]\((.*?)\)/).replace("label",he).getRegex(),reflink:y(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",he).getRegex()},_e={...Ve,emStrongRDelimAst:Wi,url:y(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},en={..._e,br:y(Ht).replace("{2,}","*").getRegex(),text:y(_e.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},oe={normal:Be,gfm:Mi,pedantic:Oi},W={normal:Ve,gfm:_e,breaks:en,pedantic:Xi},tn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},gt=n=>tn[n];function E(n,e){if(e){if(x.escapeTest.test(n))return n.replace(x.escapeReplace,gt)}else if(x.escapeTestNoEncode.test(n))return n.replace(x.escapeReplaceNoEncode,gt);return n}function mt(n){try{n=encodeURI(n).replace(x.percentDecode,"%")}catch{return null}return n}function bt(n,e){var r;const t=n.replace(x.findPipe,(o,a,l)=>{let c=!1,h=a;for(;--h>=0&&l[h]==="\\";)c=!c;return c?"|":" |"}),s=t.split(x.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((r=s.at(-1))!=null&&r.trim())&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(x.slashPipe,"|");return s}function F(n,e,t){const s=n.length;if(s===0)return"";let i=0;for(;i<s&&(n.charAt(s-i-1)===e&&!t);)i++;return n.slice(0,s-i)}function sn(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])t++;else if(n[s]===e[1]&&(t--,t<0))return s;return-1}function yt(n,e,t,s,i){const r=e.href,o=e.title||null,a=n[1].replace(i.other.outputLinkReplace,"$1");if(n[0].charAt(0)!=="!"){s.state.inLink=!0;const l={type:"link",raw:t,href:r,title:o,text:a,tokens:s.inlineTokens(a)};return s.state.inLink=!1,l}return{type:"image",raw:t,href:r,title:o,text:a}}function nn(n,e,t){const s=n.match(t.other.indentCodeCompensation);if(s===null)return e;const i=s[1];return e.split(`
`).map(r=>{const o=r.match(t.other.beginningSpace);if(o===null)return r;const[a]=o;return a.length>=i.length?r.slice(i.length):r}).join(`
`)}class ue{constructor(e){f(this,"options");f(this,"rules");f(this,"lexer");this.options=e||N}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const s=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?s:F(s,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const s=t[0],i=nn(s,t[3]||"",this.rules);return{type:"code",raw:s,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let s=t[2].trim();if(this.rules.other.endingHash.test(s)){const i=F(s,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(s=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:F(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let s=F(t[0],`
`).split(`
`),i="",r="";const o=[];for(;s.length>0;){let a=!1;const l=[];let c;for(c=0;c<s.length;c++)if(this.rules.other.blockquoteStart.test(s[c]))l.push(s[c]),a=!0;else if(!a)l.push(s[c]);else break;s=s.slice(c);const h=l.join(`
`),u=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${h}`:h,r=r?`${r}
${u}`:u;const d=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=d,s.length===0)break;const p=o.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){const g=p,b=g.raw+`
`+s.join(`
`),k=this.blockquote(b);o[o.length-1]=k,i=i.substring(0,i.length-g.raw.length)+k.raw,r=r.substring(0,r.length-g.text.length)+k.text;break}else if((p==null?void 0:p.type)==="list"){const g=p,b=g.raw+`
`+s.join(`
`),k=this.list(b);o[o.length-1]=k,i=i.substring(0,i.length-p.raw.length)+k.raw,r=r.substring(0,r.length-g.raw.length)+k.raw,s=b.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim();const i=s.length>1,r={type:"list",raw:"",ordered:i,start:i?+s.slice(0,-1):"",loose:!1,items:[]};s=i?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=i?s:"[*+-]");const o=this.rules.other.listItemRegex(s);let a=!1;for(;e;){let c=!1,h="",u="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;h=t[0],e=e.substring(h.length);let d=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,me=>" ".repeat(3*me.length)),p=e.split(`
`,1)[0],g=!d.trim(),b=0;if(this.options.pedantic?(b=2,u=d.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,u=d.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(p)&&(h+=p+`
`,e=e.substring(p.length+1),c=!0),!c){const me=this.rules.other.nextBulletRegex(b),qe=this.rules.other.hrRegex(b),He=this.rules.other.fencesBeginRegex(b),je=this.rules.other.headingBeginRegex(b),Yt=this.rules.other.htmlBeginRegex(b);for(;e;){const be=e.split(`
`,1)[0];let H;if(p=be,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,"  "),H=p):H=p.replace(this.rules.other.tabCharGlobal,"    "),He.test(p)||je.test(p)||Yt.test(p)||me.test(p)||qe.test(p))break;if(H.search(this.rules.other.nonSpaceChar)>=b||!p.trim())u+=`
`+H.slice(b);else{if(g||d.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||He.test(d)||je.test(d)||qe.test(d))break;u+=`
`+p}!g&&!p.trim()&&(g=!0),h+=be+`
`,e=e.substring(be.length+1),d=H.slice(b)}}r.loose||(a?r.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(a=!0));let k=null,S;this.options.gfm&&(k=this.rules.other.listIsTask.exec(u),k&&(S=k[0]!=="[ ] ",u=u.replace(this.rules.other.listReplaceTask,""))),r.items.push({type:"list_item",raw:h,task:!!k,checked:S,loose:!1,text:u,tokens:[]}),r.raw+=h}const l=r.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let c=0;c<r.items.length;c++)if(this.lexer.state.top=!1,r.items[c].tokens=this.lexer.blockTokens(r.items[c].text,[]),!r.loose){const h=r.items[c].tokens.filter(d=>d.type==="space"),u=h.length>0&&h.some(d=>this.rules.other.anyLine.test(d.raw));r.loose=u}if(r.loose)for(let c=0;c<r.items.length;c++)r.items[c].loose=!0;return r}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const s=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:s,raw:t[0],href:i,title:r}}}table(e){var a;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const s=bt(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(s.length===i.length){for(const l of i)this.rules.other.tableAlignRight.test(l)?o.align.push("right"):this.rules.other.tableAlignCenter.test(l)?o.align.push("center"):this.rules.other.tableAlignLeft.test(l)?o.align.push("left"):o.align.push(null);for(let l=0;l<s.length;l++)o.header.push({text:s[l],tokens:this.lexer.inline(s[l]),header:!0,align:o.align[l]});for(const l of r)o.rows.push(bt(l,o.header.length).map((c,h)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[h]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const s=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:s,tokens:this.lexer.inline(s)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const s=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(s)){if(!this.rules.other.endAngleBracket.test(s))return;const o=F(s.slice(0,-1),"\\");if((s.length-o.length)%2===0)return}else{const o=sn(t[2],"()");if(o>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){const o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],r=o[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(s)?i=i.slice(1):i=i.slice(1,-1)),yt(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let s;if((s=this.rules.inline.reflink.exec(e))||(s=this.rules.inline.nolink.exec(e))){const i=(s[2]||s[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=t[i.toLowerCase()];if(!r){const o=s[0].charAt(0);return{type:"text",raw:o,text:o}}return yt(s,r,s[0],this.lexer,this.rules)}}emStrong(e,t,s=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&s.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!s||this.rules.inline.punctuation.exec(s)){const o=[...i[0]].length-1;let a,l,c=o,h=0;const u=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(i=u.exec(t))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(l=[...a].length,i[3]||i[4]){c+=l;continue}else if((i[5]||i[6])&&o%3&&!((o+l)%3)){h+=l;continue}if(c-=l,c>0)continue;l=Math.min(l,l+c+h);const d=[...i[0]][0].length,p=e.slice(0,o+i.index+d+l);if(Math.min(o,l)%2){const b=p.slice(1,-1);return{type:"em",raw:p,text:b,tokens:this.lexer.inlineTokens(b)}}const g=p.slice(2,-2);return{type:"strong",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let s=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(s),r=this.rules.other.startingSpaceChar.test(s)&&this.rules.other.endingSpaceChar.test(s);return i&&r&&(s=s.substring(1,s.length-1)),{type:"codespan",raw:t[0],text:s}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let s,i;return t[2]==="@"?(s=t[1],i="mailto:"+s):(s=t[1],i=s),{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}url(e){var s;let t;if(t=this.rules.inline.url.exec(e)){let i,r;if(t[2]==="@")i=t[0],r="mailto:"+i;else{let o;do o=t[0],t[0]=((s=this.rules.inline._backpedal.exec(t[0]))==null?void 0:s[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:i,href:r,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const s=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:s}}}}class ${constructor(e){f(this,"tokens");f(this,"options");f(this,"state");f(this,"tokenizer");f(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||N,this.options.tokenizer=this.options.tokenizer||new ue,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={other:x,block:oe.normal,inline:W.normal};this.options.pedantic?(t.block=oe.pedantic,t.inline=W.pedantic):this.options.gfm&&(t.block=oe.gfm,this.options.breaks?t.inline=W.breaks:t.inline=W.gfm),this.tokenizer.rules=t}static get rules(){return{block:oe,inline:W}}static lex(e,t){return new $(t).lex(e)}static lexInline(e,t){return new $(t).inlineTokens(e)}lex(e){e=e.replace(x.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){var i,r,o;for(this.options.pedantic&&(e=e.replace(x.tabCharGlobal,"    ").replace(x.spaceLine,""));e;){let a;if((r=(i=this.options.extensions)==null?void 0:i.block)!=null&&r.some(c=>(a=c.call({lexer:this},e,t))?(e=e.substring(a.raw.length),t.push(a),!0):!1))continue;if(a=this.tokenizer.space(e)){e=e.substring(a.raw.length);const c=t.at(-1);a.raw.length===1&&c!==void 0?c.raw+=`
`:t.push(a);continue}if(a=this.tokenizer.code(e)){e=e.substring(a.raw.length);const c=t.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+a.raw,c.text+=`
`+a.text,this.inlineQueue.at(-1).src=c.text):t.push(a);continue}if(a=this.tokenizer.fences(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.heading(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.hr(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.blockquote(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.list(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.html(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.def(e)){e=e.substring(a.raw.length);const c=t.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+a.raw,c.text+=`
`+a.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title});continue}if(a=this.tokenizer.table(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.lheading(e)){e=e.substring(a.raw.length),t.push(a);continue}let l=e;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const h=e.slice(1);let u;this.options.extensions.startBlock.forEach(d=>{u=d.call({lexer:this},h),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=e.substring(0,c+1))}if(this.state.top&&(a=this.tokenizer.paragraph(l))){const c=t.at(-1);s&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):t.push(a),s=l.length!==e.length,e=e.substring(a.raw.length);continue}if(a=this.tokenizer.text(e)){e=e.substring(a.raw.length);const c=t.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):t.push(a);continue}if(e){const c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){var a,l,c;let s=e,i=null;if(this.tokens.links){const h=Object.keys(this.tokens.links);if(h.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)h.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let r=!1,o="";for(;e;){r||(o=""),r=!1;let h;if((l=(a=this.options.extensions)==null?void 0:a.inline)!=null&&l.some(d=>(h=d.call({lexer:this},e,t))?(e=e.substring(h.raw.length),t.push(h),!0):!1))continue;if(h=this.tokenizer.escape(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.tag(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.link(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(h.raw.length);const d=t.at(-1);h.type==="text"&&(d==null?void 0:d.type)==="text"?(d.raw+=h.raw,d.text+=h.text):t.push(h);continue}if(h=this.tokenizer.emStrong(e,s,o)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.codespan(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.br(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.del(e)){e=e.substring(h.raw.length),t.push(h);continue}if(h=this.tokenizer.autolink(e)){e=e.substring(h.raw.length),t.push(h);continue}if(!this.state.inLink&&(h=this.tokenizer.url(e))){e=e.substring(h.raw.length),t.push(h);continue}let u=e;if((c=this.options.extensions)!=null&&c.startInline){let d=1/0;const p=e.slice(1);let g;this.options.extensions.startInline.forEach(b=>{g=b.call({lexer:this},p),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(u=e.substring(0,d+1))}if(h=this.tokenizer.inlineText(u)){e=e.substring(h.raw.length),h.raw.slice(-1)!=="_"&&(o=h.raw.slice(-1)),r=!0;const d=t.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=h.raw,d.text+=h.text):t.push(h);continue}if(e){const d="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return t}}class de{constructor(e){f(this,"options");f(this,"parser");this.options=e||N}space(e){return""}code({text:e,lang:t,escaped:s}){var o;const i=(o=(t||"").match(x.notSpaceStart))==null?void 0:o[0],r=e.replace(x.endingNewline,"")+`
`;return i?'<pre><code class="language-'+E(i)+'">'+(s?r:E(r,!0))+`</code></pre>
`:"<pre><code>"+(s?r:E(r,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,s=e.start;let i="";for(let a=0;a<e.items.length;a++){const l=e.items[a];i+=this.listitem(l)}const r=t?"ol":"ul",o=t&&s!==1?' start="'+s+'"':"";return"<"+r+o+`>
`+i+"</"+r+`>
`}listitem(e){var s;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((s=e.tokens[0])==null?void 0:s.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+E(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",s="";for(let r=0;r<e.header.length;r++)s+=this.tablecell(e.header[r]);t+=this.tablerow({text:s});let i="";for(let r=0;r<e.rows.length;r++){const o=e.rows[r];s="";for(let a=0;a<o.length;a++)s+=this.tablecell(o[a]);i+=this.tablerow({text:s})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),s=e.header?"th":"td";return(e.align?`<${s} align="${e.align}">`:`<${s}>`)+t+`</${s}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${E(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:s}){const i=this.parser.parseInline(s),r=mt(e);if(r===null)return i;e=r;let o='<a href="'+e+'"';return t&&(o+=' title="'+E(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:s}){const i=mt(e);if(i===null)return E(s);e=i;let r=`<img src="${e}" alt="${s}"`;return t&&(r+=` title="${E(t)}"`),r+=">",r}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:E(e.text)}}class Ue{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class A{constructor(e){f(this,"options");f(this,"renderer");f(this,"textRenderer");this.options=e||N,this.options.renderer=this.options.renderer||new de,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ue}static parse(e,t){return new A(t).parse(e)}static parseInline(e,t){return new A(t).parseInline(e)}parse(e,t=!0){var i,r;let s="";for(let o=0;o<e.length;o++){const a=e[o];if((r=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&r[a.type]){const c=a,h=this.options.extensions.renderers[c.type].call({parser:this},c);if(h!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){s+=h||"";continue}}const l=a;switch(l.type){case"space":{s+=this.renderer.space(l);continue}case"hr":{s+=this.renderer.hr(l);continue}case"heading":{s+=this.renderer.heading(l);continue}case"code":{s+=this.renderer.code(l);continue}case"table":{s+=this.renderer.table(l);continue}case"blockquote":{s+=this.renderer.blockquote(l);continue}case"list":{s+=this.renderer.list(l);continue}case"html":{s+=this.renderer.html(l);continue}case"paragraph":{s+=this.renderer.paragraph(l);continue}case"text":{let c=l,h=this.renderer.text(c);for(;o+1<e.length&&e[o+1].type==="text";)c=e[++o],h+=`
`+this.renderer.text(c);t?s+=this.renderer.paragraph({type:"paragraph",raw:h,text:h,tokens:[{type:"text",raw:h,text:h,escaped:!0}]}):s+=h;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}parseInline(e,t=this.renderer){var i,r;let s="";for(let o=0;o<e.length;o++){const a=e[o];if((r=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&r[a.type]){const c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){s+=c||"";continue}}const l=a;switch(l.type){case"escape":{s+=t.text(l);break}case"html":{s+=t.html(l);break}case"link":{s+=t.link(l);break}case"image":{s+=t.image(l);break}case"strong":{s+=t.strong(l);break}case"em":{s+=t.em(l);break}case"codespan":{s+=t.codespan(l);break}case"br":{s+=t.br(l);break}case"del":{s+=t.del(l);break}case"text":{s+=t.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}}class Z{constructor(e){f(this,"options");f(this,"block");this.options=e||N}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?$.lex:$.lexInline}provideParser(){return this.block?A.parse:A.parseInline}}f(Z,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class rn{constructor(...e){f(this,"defaults",Oe());f(this,"options",this.setOptions);f(this,"parse",this.parseMarkdown(!0));f(this,"parseInline",this.parseMarkdown(!1));f(this,"Parser",A);f(this,"Renderer",de);f(this,"TextRenderer",Ue);f(this,"Lexer",$);f(this,"Tokenizer",ue);f(this,"Hooks",Z);this.use(...e)}walkTokens(e,t){var i,r;let s=[];for(const o of e)switch(s=s.concat(t.call(this,o)),o.type){case"table":{const a=o;for(const l of a.header)s=s.concat(this.walkTokens(l.tokens,t));for(const l of a.rows)for(const c of l)s=s.concat(this.walkTokens(c.tokens,t));break}case"list":{const a=o;s=s.concat(this.walkTokens(a.items,t));break}default:{const a=o;(r=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&r[a.type]?this.defaults.extensions.childTokens[a.type].forEach(l=>{const c=a[l].flat(1/0);s=s.concat(this.walkTokens(c,t))}):a.tokens&&(s=s.concat(this.walkTokens(a.tokens,t)))}}return s}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(s=>{const i={...s};if(i.async=this.defaults.async||i.async||!1,s.extensions&&(s.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const o=t.renderers[r.name];o?t.renderers[r.name]=function(...a){let l=r.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[r.level];o?o.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),i.extensions=t),s.renderer){const r=this.defaults.renderer||new de(this.defaults);for(const o in s.renderer){if(!(o in r))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const a=o,l=s.renderer[a],c=r[a];r[a]=(...h)=>{let u=l.apply(r,h);return u===!1&&(u=c.apply(r,h)),u||""}}i.renderer=r}if(s.tokenizer){const r=this.defaults.tokenizer||new ue(this.defaults);for(const o in s.tokenizer){if(!(o in r))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const a=o,l=s.tokenizer[a],c=r[a];r[a]=(...h)=>{let u=l.apply(r,h);return u===!1&&(u=c.apply(r,h)),u}}i.tokenizer=r}if(s.hooks){const r=this.defaults.hooks||new Z;for(const o in s.hooks){if(!(o in r))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const a=o,l=s.hooks[a],c=r[a];Z.passThroughHooks.has(o)?r[a]=h=>{if(this.defaults.async)return Promise.resolve(l.call(r,h)).then(d=>c.call(r,d));const u=l.call(r,h);return c.call(r,u)}:r[a]=(...h)=>{let u=l.apply(r,h);return u===!1&&(u=c.apply(r,h)),u}}i.hooks=r}if(s.walkTokens){const r=this.defaults.walkTokens,o=s.walkTokens;i.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),r&&(l=l.concat(r.call(this,a))),l}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return $.lex(e,t??this.defaults)}parser(e,t){return A.parse(e,t??this.defaults)}parseMarkdown(e){return(s,i)=>{const r={...i},o={...this.defaults,...r},a=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof s>"u"||s===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof s!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(s)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const l=o.hooks?o.hooks.provideLexer():e?$.lex:$.lexInline,c=o.hooks?o.hooks.provideParser():e?A.parse:A.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(s):s).then(h=>l(h,o)).then(h=>o.hooks?o.hooks.processAllTokens(h):h).then(h=>o.walkTokens?Promise.all(this.walkTokens(h,o.walkTokens)).then(()=>h):h).then(h=>c(h,o)).then(h=>o.hooks?o.hooks.postprocess(h):h).catch(a);try{o.hooks&&(s=o.hooks.preprocess(s));let h=l(s,o);o.hooks&&(h=o.hooks.processAllTokens(h)),o.walkTokens&&this.walkTokens(h,o.walkTokens);let u=c(h,o);return o.hooks&&(u=o.hooks.postprocess(u)),u}catch(h){return a(h)}}}onError(e,t){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+E(s.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(s);throw s}}}const P=new rn;function m(n,e){return P.parse(n,e)}m.options=m.setOptions=function(n){return P.setOptions(n),m.defaults=P.defaults,Dt(m.defaults),m};m.getDefaults=Oe;m.defaults=N;m.use=function(...n){return P.use(...n),m.defaults=P.defaults,Dt(m.defaults),m};m.walkTokens=function(n,e){return P.walkTokens(n,e)};m.parseInline=P.parseInline;m.Parser=A;m.parser=A.parse;m.Renderer=de;m.TextRenderer=Ue;m.Lexer=$;m.lexer=$.lex;m.Tokenizer=ue;m.Hooks=Z;m.parse=m;m.options;m.setOptions;m.use;m.walkTokens;m.parseInline;A.parse;$.lex;const on=Ct(`
  :host {
    display: block;
    padding: 1rem;
    color-scheme: light dark;
  }
  .todo-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 4px;
  }
  .todo-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .todo-actions {
    display: flex;
    gap: 8px;
  }
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
  }
  .edit-btn {
    background-color: #3b82f6;
    color: white;
  }
  .edit-btn:hover {
    background-color: #258ee6;
  }
  .delete-btn {
    background-color: #ef4444;
    color: white;
  }
  .delete-btn:hover {
    background-color: #dc2626;
  }
  textarea {
    box-sizing: border-box;
    border-radius: 4px;
  }

  .markdown-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .markdown-editor {
    width: 100%;
    min-height: 100px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: monospace;
  }

  .markdown-preview {
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  .markdown-preview :first-child {
    margin-top: 0;
  }

  .markdown-preview :last-child {
    margin-bottom: 0;
  }

  .preview-header {
    font-size: 0.8em;
    color: #666;
    margin-bottom: 4px;
  }

  .edit-mode .markdown-preview {
    display: block;
  }

  .view-mode .markdown-editor {
    display: none;
  }

  .view-mode .markdown-preview {
    border: none;
    background: none;
    padding: 4px 0;
  }

  .view-mode .preview-header {
    display: none;
  }
`);class Te extends B{constructor(){super(),this.todo={},this.editingId=null}render(){return T`
      <div class="todo-container">
        ${this.renderTodoItem(this.todo)}
      </div>
    `}renderTodoItem(e,t=0){const s=this.editingId===e.id,i=e.tags?e.tags.map(o=>T`<span class="tag">${o}</span>`):"",r=T`
      <div class="todo-item" style="margin-left: ${t*20}px;">
        <input
          type="checkbox"
          .checked=${e.completed}
          @change=${()=>this.toggleComplete(e)}
        />
        <span class="todo-title">${e.title}</span>
        ${i}
        <div class="markdown-container ${s?"edit-mode":"view-mode"}">
          ${s?T`
            <textarea
              class="markdown-editor"
              @input=${o=>this.handleMarkdownInput(o,e)}
              placeholder="${e.task?"Subtask Description":"Task Description"}"
            >${e.description}</textarea>
            <div class="preview-header">Preview:</div>
          `:""}
          <div class="markdown-preview">
            ${Si(this.renderMarkdown(e.description))}
          </div>
        </div>
        <div class="todo-actions">
          <button
            class="edit-btn"
            @click=${()=>this.toggleEdit(e)}
          >
            ${s?"Save":"Edit"}
          </button>
          <button
            class="delete-btn"
            @click=${()=>this.deleteTodo(e)}
          >
            Delete
          </button>
        </div>
      </div>
      <details>
      <summary>
        ${e.tasks.length} ${e.completed?"(Completed)":"elements"}
      </summary>
      ${e.tasks?e.tasks.map(o=>this.renderTodoItem(o,t+1)):""}

    </details>
    `;return console.log(t,e.tasks.length),t>0?T`
        <details>
          <summary>
            ${e.title} ${e.completed?"(Completed)":""}
          </summary>
          ${r}
        </details>
      `:r}renderMarkdown(e){return e?m(e):""}handleMarkdownInput(e,t){t.description=e.target.value,this.requestUpdate()}toggleEdit(e){this.editingId===e.id?(this.editingId=null,this.dispatchEvent(new CustomEvent("edit-todo",{detail:{item:e},bubbles:!0,composed:!0}))):this.editingId=e.id,this.requestUpdate()}toggleComplete(e){e.completed=!e.completed,this.dispatchEvent(new CustomEvent("task-completed",{detail:{id:e},bubbles:!0,composed:!0})),this.requestUpdate()}deleteTodo(e){this.dispatchEvent(new CustomEvent("delete-todo",{detail:{id:e.id},bubbles:!0,composed:!0}))}}f(Te,"styles",_t`
    ${on}
  `),f(Te,"properties",{todo:{type:Object},editingId:{type:String}});customElements.define("todo-component",Te);
