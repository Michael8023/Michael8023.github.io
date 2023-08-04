console.log("\n %c Post-Abstract-AI 开源博客文章摘要AI生成工具 %c https://github.com/zhheo/Post-Abstract-AI \n","color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;")
var tianliGPTIsRunning=false;function insertAIDiv(selector){removeExistingAIDiv();const targetElement=document.querySelector(selector);if(!targetElement){return;}
const aiDiv=document.createElement('div');aiDiv.className='post-TianliGPT';const aiTitleDiv=document.createElement('div');aiTitleDiv.className='tianliGPT-title';aiDiv.appendChild(aiTitleDiv);const aiIcon=document.createElement('i');aiIcon.className='tianliGPT-title-icon';aiTitleDiv.appendChild(aiIcon);aiIcon.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px" viewBox="0 0 48 48">
  <title>机器人</title>
  <g id="&#x673A;&#x5668;&#x4EBA;" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <path d="M34.717885,5.03561087 C36.12744,5.27055371 37.079755,6.60373651 36.84481,8.0132786 L35.7944,14.3153359 L38.375,14.3153359 C43.138415,14.3153359 47,18.1768855 47,22.9402569 L47,34.4401516 C47,39.203523 43.138415,43.0650727 38.375,43.0650727 L9.625,43.0650727 C4.861585,43.0650727 1,39.203523 1,34.4401516 L1,22.9402569 C1,18.1768855 4.861585,14.3153359 9.625,14.3153359 L12.2056,14.3153359 L11.15519,8.0132786 C10.920245,6.60373651 11.87256,5.27055371 13.282115,5.03561087 C14.69167,4.80066802 16.024865,5.7529743 16.25981,7.16251639 L17.40981,14.0624532 C17.423955,14.1470924 17.43373,14.2315017 17.43948,14.3153359 L30.56052,14.3153359 C30.56627,14.2313867 30.576045,14.1470924 30.59019,14.0624532 L31.74019,7.16251639 C31.975135,5.7529743 33.30833,4.80066802 34.717885,5.03561087 Z M38.375,19.4902885 L9.625,19.4902885 C7.719565,19.4902885 6.175,21.0348394 6.175,22.9402569 L6.175,34.4401516 C6.175,36.3455692 7.719565,37.89012 9.625,37.89012 L38.375,37.89012 C40.280435,37.89012 41.825,36.3455692 41.825,34.4401516 L41.825,22.9402569 C41.825,21.0348394 40.280435,19.4902885 38.375,19.4902885 Z M14.8575,23.802749 C16.28649,23.802749 17.445,24.9612484 17.445,26.3902253 L17.445,28.6902043 C17.445,30.1191812 16.28649,31.2776806 14.8575,31.2776806 C13.42851,31.2776806 12.27,30.1191812 12.27,28.6902043 L12.27,26.3902253 C12.27,24.9612484 13.42851,23.802749 14.8575,23.802749 Z M33.1425,23.802749 C34.57149,23.802749 35.73,24.9612484 35.73,26.3902253 L35.73,28.6902043 C35.73,30.1191812 34.57149,31.2776806 33.1425,31.2776806 C31.71351,31.2776806 30.555,30.1191812 30.555,28.6902043 L30.555,26.3902253 C30.555,24.9612484 31.71351,23.802749 33.1425,23.802749 Z" id="&#x5F62;&#x72B6;&#x7ED3;&#x5408;" fill="#444444" fill-rule="nonzero"></path>
  </g>
  </svg>`;const aiTitleTextDiv=document.createElement('div');aiTitleTextDiv.className='tianliGPT-title-text';aiTitleTextDiv.textContent='AI摘要';aiTitleDiv.appendChild(aiTitleTextDiv);const aiTagDiv=document.createElement('div');aiTagDiv.className='tianliGPT-tag';aiTagDiv.id='tianliGPT-tag';aiTagDiv.textContent='TianliGPT';aiTitleDiv.appendChild(aiTagDiv);const aiExplanationDiv=document.createElement('div');aiExplanationDiv.className='tianliGPT-explanation';aiExplanationDiv.innerHTML='生成中...'+'<span class="blinking-cursor"></span>';aiDiv.appendChild(aiExplanationDiv);targetElement.insertBefore(aiDiv,targetElement.firstChild);}
function removeExistingAIDiv(){const existingAIDiv=document.querySelector(".post-TianliGPT");if(existingAIDiv){existingAIDiv.parentElement.removeChild(existingAIDiv);}}
var tianliGPT={getTitleAndContent:function(){try{const title=document.title;const container=document.querySelector(tianliGPT_postSelector);if(!container){console.warn('TianliGPT：找不到文章容器。请尝试将引入的代码放入到文章容器之后。如果本身没有打算使用摘要功能可以忽略此提示。');return '';}
const paragraphs=container.getElementsByTagName('p');const headings=container.querySelectorAll('h1, h2, h3, h4, h5');let content='';for(let h of headings){content+=h.innerText+' ';}
for(let p of paragraphs){const filteredText=p.innerText.replace(/https?:\/\/[^\s]+/g,'');content+=filteredText;}
const combinedText=title+' '+content;let wordLimit=1000;if(typeof tianliGPT_wordLimit!=="undefined"){wordLimit=tianliGPT_wordLimit;}
const truncatedText=combinedText.slice(0,wordLimit);return truncatedText;}catch(e){console.error('TianliGPT错误：可能由于一个或多个错误导致没有正常运行，原因出在获取文章容器中的内容失败，或者可能是在文章转换过程中失败。',e);return '';}},fetchTianliGPT:async function(content){if(!tianliGPT_key){return "没有获取到key，代码可能没有安装正确。如果你需要在tianli_gpt文件引用前定义tianliGPT_key变量。详细请查看文档。";}
if(tianliGPT_key==="5Q5mpqRK5DkwT1X9Gi5e"){return "请购买 key 使用，如果你能看到此条内容，则说明代码安装正确。";}
var url=window.location.href;const title=document.title;const apiUrl=`https://summary.tianli0.top/?content=${encodeURIComponent(content)}&key=${encodeURIComponent(tianliGPT_key)}&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;const timeout=20000;try{const controller=new AbortController();const timeoutId=setTimeout(()=>controller.abort(),timeout);const response=await fetch(apiUrl,{signal:controller.signal});if(response.ok){const data=await response.json();return data.summary;}else{if(response.status===402){document.querySelectorAll('.post-TianliGPT').forEach(el=>{el.style.display='none';});}
throw new Error('TianliGPT：余额不足，请充值后请求新的文章');}}catch(error){if(error.name==='AbortError'){if(window.location.hostname==='localhost'){console.warn('警告：请勿在本地主机上测试 API 密钥。');return '获取文章摘要超时。请勿在本地主机上测试 API 密钥。';}else{console.error('请求超时');return '获取文章摘要超时。当你出现这个问题时，可能是key或者绑定的域名不正确。也可能是因为文章过长导致的 AI 运算量过大，您可以稍等一下然后刷新页面重试。';}}else{console.error('请求失败：',error);return '获取文章摘要失败，请稍后再试。';}}},aiShowAnimation:function(text){const element=document.querySelector(".tianliGPT-explanation");if(!element){return;}
if(tianliGPTIsRunning){return;}
if(typeof tianliGPT_typingAnimate!=="undefined"&&!tianliGPT_typingAnimate){element.innerHTML=text;return;}
tianliGPTIsRunning=true;const typingDelay=25;const waitingTime=1000;const punctuationDelayMultiplier=6;element.style.display="block";element.innerHTML="生成中..."+'<span class="blinking-cursor"></span>';let animationRunning=true;let currentIndex=0;let initialAnimation=true;let lastUpdateTime=performance.now();const animate=()=>{if(currentIndex<text.length&&animationRunning){const currentTime=performance.now();const timeDiff=currentTime-lastUpdateTime;const letter=text.slice(currentIndex,currentIndex+1);const isPunctuation=/[，。！、？,.!?]/.test(letter);const delay=isPunctuation?typingDelay*punctuationDelayMultiplier:typingDelay;if(timeDiff>=delay){element.innerText=text.slice(0,currentIndex+1);lastUpdateTime=currentTime;currentIndex++;if(currentIndex<text.length){element.innerHTML=text.slice(0,currentIndex)+
'<span class="blinking-cursor"></span>';}else{element.innerHTML=text;element.style.display="block";tianliGPTIsRunning=false;observer.disconnect();}}
requestAnimationFrame(animate);}}
const observer=new IntersectionObserver((entries)=>{let isVisible=entries[0].isIntersecting;animationRunning=isVisible;if(animationRunning&&initialAnimation){setTimeout(()=>{requestAnimationFrame(animate);},200);}},{threshold:0});let post_ai=document.querySelector('.post-TianliGPT');observer.observe(post_ai);},}
function runTianliGPT(){insertAIDiv(tianliGPT_postSelector);const content=tianliGPT.getTitleAndContent();if(content){console.log('TianliGPT本次提交的内容为：'+content);}
tianliGPT.fetchTianliGPT(content).then(summary=>{tianliGPT.aiShowAnimation(summary);})}
function checkURLAndRun(){if(typeof tianliGPT_postURL==="undefined"){runTianliGPT();return;}
try{const wildcardToRegExp=(s)=>{return new RegExp('^'+s.split(/\*+/).map(regExpEscape).join('.*')+'$');};const regExpEscape=(s)=>{return s.replace(/[|\\{}()[\]^$+*?.]/g,'\\$&');};const urlPattern=wildcardToRegExp(tianliGPT_postURL);const currentURL=window.location.href;if(urlPattern.test(currentURL)){runTianliGPT();}else{console.log("TianliGPT：因为不符合自定义的链接规则，我决定不执行摘要功能。");}}catch(error){console.error("TianliGPT：我没有看懂你编写的自定义链接规则，所以我决定不执行摘要功能",error);}}
document.addEventListener("DOMContentLoaded",function(){checkURLAndRun();});