import{C as e,_ as t,b as n,c as r,g as i,h as a,l as o,m as s,n as c,o as l,p as u,s as d,u as f,v as p,w as m,y as h}from"./shell-DV6JbPcv.js";var g=e(new URLSearchParams(location.search).get(`p`))||n[0],_=h.find(e=>e.slug===g.cat);o({page:`product`,activeCat:g.cat}),document.title=`${g.name} — ${g.brand} | perch`;var v=`<svg aria-hidden="true"><use href="#i-chevron" /></svg>`;document.getElementById(`crumbs`).innerHTML=`<a href="index.html">Home</a>${v}<a href="category.html?c=${g.cat}">${d(_.label)}</a>${v}<span aria-current="page">${d(g.name)}</span>`;var y=[{label:`Full view`,style:`transform:scale(1);object-position:50% 50%`},{label:`Top detail`,style:`transform:scale(3.1);object-position:42% 22%`},{label:`Base detail`,style:`transform:scale(3.6);object-position:62% 78%`}],b=g.sizes.length===1,x=r().includes(g.slug),S=g.was?Math.round((1-g.price/g.was)*100):0;document.getElementById(`pdp`).append(l(`
  <div class="pdp">
    <div class="gal">
      <figure class="gal__main">
        <img id="gal-img" src="img/${g.img}.jpg" alt="${d(g.name)} by ${d(g.brand)}"
             style="${y[0].style}" />
      </figure>
      <div class="gal__strip" role="tablist" aria-label="Product views">
        ${y.map((e,t)=>`
          <button class="gal__thumb ${t===0?`is-on`:``}" type="button" role="tab"
                  aria-selected="${t===0}" data-view="${t}" aria-label="${e.label}">
            <img src="img/${g.img}.jpg" alt="" style="${e.style}" />
          </button>`).join(``)}
      </div>
    </div>

    <div class="pinfo">
      <p class="pinfo__brand">${d(g.brand)}</p>
      <h1 class="pinfo__name">${d(g.name)}</h1>

      <div class="pinfo__rate">
        ${u(g.rating,null,`stars--md`)}
        <a href="#reviews">${g.reviews.toLocaleString(`en-US`)} reviews</a>
      </div>

      <div class="pinfo__price">
        ${m(g.price)}
        ${g.was?`<span class="pinfo__was">${m(g.was)}</span>
                         <span class="pinfo__save">−${S}%</span>`:``}
      </div>

      <p class="pinfo__blurb">${d(g.blurb)}</p>

      <div class="opt">
        <div class="opt__label"><span>Colour</span><span id="colour-name">${d(g.colours[0].name)}</span></div>
        <div class="opt__row" id="colours">
          ${g.colours.map((e,t)=>`
            <button class="swatch ${t===0?`is-on`:``}" type="button"
                    style="--c:${e.hex}" data-colour="${d(e.name)}"
                    aria-label="${d(e.name)}" aria-pressed="${t===0}"></button>`).join(``)}
        </div>
      </div>

      ${b?``:`
      <div class="opt">
        <div class="opt__label"><span>Size</span><span id="size-hint">Select a size</span></div>
        <div class="opt__row" id="sizes">
          ${g.sizes.map(e=>`
            <button class="sizebtn" type="button" data-size="${d(e)}" aria-pressed="false">${d(e)}</button>`).join(``)}
        </div>
      </div>`}

      <div class="pdp__actions">
        <button class="btn btn--accent btn--lg" type="button" id="add">
          ${b?`Add to bag`:`Select a size`}
        </button>
        <button class="iconbtn ${x?`is-on`:``}" type="button" id="save"
                aria-label="Save ${d(g.name)}" aria-pressed="${x}">
          <svg aria-hidden="true"><use href="#i-heart" /></svg>
        </button>
      </div>

      <div class="trust">
        <div><svg aria-hidden="true"><use href="#i-truck" /></svg>Free carbon-neutral delivery over $75</div>
        <div><svg aria-hidden="true"><use href="#i-return" /></svg>60-day returns, collected from your door</div>
      </div>

      <div class="acc">
        <div class="acc__item">
          <button class="acc__btn" type="button" aria-expanded="true" aria-controls="acc-details">
            Details ${v}
          </button>
          <div class="acc__body is-open" id="acc-details">
            <ul>${g.details.map(e=>`<li>${d(e)}</li>`).join(``)}</ul>
          </div>
        </div>
        <div class="acc__item">
          <button class="acc__btn" type="button" aria-expanded="false" aria-controls="acc-ship">
            Delivery &amp; returns ${v}
          </button>
          <div class="acc__body" id="acc-ship">
            <p>Standard delivery is 3–5 working days and free over $75. Express is next working day
               where available. Returns are free for 60 days — book a collection and a courier comes
               to you.</p>
          </div>
        </div>
        <div class="acc__item">
          <button class="acc__btn" type="button" aria-expanded="false" aria-controls="acc-brand">
            About ${d(g.brand)} ${v}
          </button>
          <div class="acc__body" id="acc-brand">
            <p>${d(g.brand)} is one of two hundred independent makers on perch. They work in
               small runs, restock rather than discount, and list every material on the product page.</p>
          </div>
        </div>
      </div>
    </div>
  </div>`));var C=document.getElementById(`gal-img`);document.querySelectorAll(`[data-view]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=y[Number(e.dataset.view)];C.style.cssText=t.style,document.querySelectorAll(`[data-view]`).forEach(t=>{t.classList.toggle(`is-on`,t===e),t.setAttribute(`aria-selected`,String(t===e))})})});var w=g.colours[0].name,T=b?g.sizes[0]:null;document.getElementById(`colours`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-colour]`);t&&(w=t.dataset.colour,document.getElementById(`colour-name`).textContent=w,document.querySelectorAll(`[data-colour]`).forEach(e=>{e.classList.toggle(`is-on`,e===t),e.setAttribute(`aria-pressed`,String(e===t))}))});var E=document.getElementById(`add`),D=document.getElementById(`sizes`);D?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-size]`);t&&(T=t.dataset.size,document.getElementById(`size-hint`).textContent=`Size ${T}`,document.querySelectorAll(`[data-size]`).forEach(e=>{e.classList.toggle(`is-on`,e===t),e.setAttribute(`aria-pressed`,String(e===t))}),E.textContent=`Add to bag`)}),E.addEventListener(`click`,()=>{if(!T){document.getElementById(`size-hint`).textContent=`Please pick a size`,D?.scrollIntoView({block:`center`,behavior:`smooth`});return}c(g.slug,{size:b?null:T,colour:w}),s(`${g.name} added to your bag`)});var O=document.getElementById(`save`);O.addEventListener(`click`,()=>{let e=a(g.slug);O.classList.toggle(`is-on`,e),O.setAttribute(`aria-pressed`,String(e)),s(e?`Saved`:`Removed from saved`)}),document.querySelectorAll(`.acc__btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`aria-expanded`)===`true`;e.setAttribute(`aria-expanded`,String(!t)),document.getElementById(e.getAttribute(`aria-controls`)).classList.toggle(`is-open`,!t)})});var k=n.filter(e=>e.cat===g.cat&&e.slug!==g.slug).slice(0,6),A=k.length>=4?k:k.concat(n.filter(e=>e.cat!==g.cat).slice(0,6-k.length)),j=l(`<section class="band" style="margin-top:var(--section-gap)">
  <div class="band__head"><h2>You might also like</h2></div>
  <div class="rail-wrap">
    <div class="rail-scroll" data-rail></div>
    <button class="rail-arrow rail-arrow--prev" type="button" data-rail-prev aria-label="Scroll left" hidden><svg aria-hidden="true"><use href="#i-chevron"/></svg></button>
    <button class="rail-arrow" type="button" data-rail-next aria-label="Scroll right"><svg aria-hidden="true"><use href="#i-chevron"/></svg></button>
  </div></section>`),M=j.querySelector(`[data-rail]`);A.forEach(e=>M.append(f(e))),document.getElementById(`related`).append(j),t(),p(),i();