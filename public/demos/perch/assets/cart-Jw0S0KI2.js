const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./shell-CsP8Yqvb.js","./shell-BvVLUs4-.css"])))=>i.map(i=>d[i]);
import{C as e,_ as t,b as n,d as r,g as i,i as a,l as o,m as s,o as c,r as l,s as u,u as d,w as f}from"./shell-CsP8Yqvb.js";var p=`modulepreload`,m=function(e,t){return new URL(e,t).href},h={},g=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=m(t,n),t=s(t),t in h)return;h[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:p,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};o({page:`cart`});var _=`<svg aria-hidden="true"><use href="#i-chevron" /></svg>`;document.getElementById(`crumbs`).innerHTML=`<a href="index.html">Home</a>${_}<span aria-current="page">Bag</span>`;var v=75,y=8,b={code:`PERCH10`,pct:10},x=!1,S=document.getElementById(`bag`);function C(){let e=a(),t=x?Math.round(e*b.pct)/100:0,n=e-t,r=n===0||n>=v?0:y;return{sub:e,discount:t,ship:r,total:n+r}}function w(){let e=l();if(S.innerHTML=``,!e.length){S.append(c(`
      <div class="empty">
        <h2>Your bag is empty</h2>
        <p>Nothing perched here yet. Have a look at what people are buying this week.</p>
        <a class="btn btn--accent btn--lg" href="category.html?c=women">Start browsing</a>
      </div>`));return}let t=C(),n=c(`
    <div class="bag">
      <div>
        <div class="lines" id="lines"></div>
      </div>
      <aside class="summary">
        <h2>Summary</h2>
        <div class="summary__row"><span>Subtotal</span><b>${f(t.sub)}</b></div>
        ${t.discount?`<div class="summary__row"><span>${b.code} (−${b.pct}%)</span><b>−${f(t.discount)}</b></div>`:``}
        <div class="summary__row"><span>Delivery</span><b>${t.ship===0?`Free`:f(t.ship)}</b></div>
        <div class="summary__total"><span>Total</span><b>${f(t.total)}</b></div>

        <form class="promo" id="promo" autocomplete="off">
          <label class="sr-only" for="promo-code">Promotion code</label>
          <input id="promo-code" type="text" placeholder="Promotion code" ${x?`disabled value="`+b.code+`"`:``} />
          <button class="btn" type="submit" ${x?`disabled`:``}>Apply</button>
        </form>
        <p class="promo__msg" id="promo-msg" role="status">${x?`<span class="is-ok">Code applied.</span>`:``}</p>

        <a class="btn btn--accent btn--lg btn--block" href="checkout.html">Continue to checkout</a>
        <p class="summary__note">Demo only — no payment is ever taken.</p>
      </aside>
    </div>`);S.append(n);let r=n.querySelector(`#lines`);e.forEach((e,t)=>{let n=e.product,i=[e.colour,e.size].filter(Boolean).join(` · `);r.append(c(`
      <div class="line">
        <a class="line__img" href="product.html?p=${n.slug}">
          <img src="img/${n.img}.jpg" alt="${u(n.name)}" loading="lazy" />
        </a>
        <div>
          <p class="line__brand">${u(n.brand)}</p>
          <a class="line__name" href="product.html?p=${n.slug}">${u(n.name)}</a>
          ${i?`<p class="line__variant">${u(i)}</p>`:``}
          <div class="line__ctl">
            <div class="stepper">
              <button type="button" data-dec="${t}" aria-label="Decrease quantity of ${u(n.name)}"><svg aria-hidden="true"><use href="#i-minus"/></svg></button>
              <output aria-label="Quantity">${e.qty}</output>
              <button type="button" data-inc="${t}" aria-label="Increase quantity of ${u(n.name)}"><svg aria-hidden="true"><use href="#i-plus"/></svg></button>
            </div>
            <button class="link-btn" type="button" data-rm="${t}">Remove</button>
          </div>
        </div>
        <div class="line__right">
          <p class="line__price">${f(n.price*e.qty)}</p>
          ${e.qty>1?`<p class="line__each">${f(n.price)} each</p>`:``}
        </div>
      </div>`))}),n.querySelector(`#promo`).addEventListener(`submit`,e=>{e.preventDefault();let t=n.querySelector(`#promo-code`),r=n.querySelector(`#promo-msg`);t.value.trim().toUpperCase()===b.code?(x=!0,w(),s(`Promotion code applied`)):(r.innerHTML=`<span class="is-bad">That code isn’t recognised. Try PERCH10.</span>`,t.focus())})}S.addEventListener(`click`,e=>{let t=e.target.closest(`[data-inc]`),n=e.target.closest(`[data-dec]`),i=e.target.closest(`[data-rm]`);if(!t&&!n&&!i)return;let a=l();if(t){let e=+t.dataset.inc;r(e,a[e].qty+1)}if(n){let e=+n.dataset.dec;r(e,a[e].qty-1)}if(i){let e=+i.dataset.rm,t=a[e].product.name;r(e,0),s(`${t} removed`)}w()}),w();var T=new Set(l().map(e=>e.slug)),E=n.filter(e=>!T.has(e.slug)).slice(0,7),D=c(`<section class="band" style="margin-top:var(--section-gap)">
  <div class="band__head"><h2>Keep looking</h2></div>
  <div class="rail-wrap">
    <div class="rail-scroll" data-rail></div>
    <button class="rail-arrow rail-arrow--prev" type="button" data-rail-prev aria-label="Scroll left" hidden><svg aria-hidden="true"><use href="#i-chevron"/></svg></button>
    <button class="rail-arrow" type="button" data-rail-next aria-label="Scroll right"><svg aria-hidden="true"><use href="#i-chevron"/></svg></button>
  </div></section>`);E.forEach(e=>D.querySelector(`[data-rail]`).append(d(e))),document.getElementById(`related`).append(D),t(),i();var O=new URLSearchParams(location.search).get(`add`);O&&e(O)&&g(async()=>{let{addToBag:e}=await import(`./shell-CsP8Yqvb.js`).then(e=>e.f);return{addToBag:e}},__vite__mapDeps([0,1]),import.meta.url).then(({addToBag:e})=>{e(O),w()});