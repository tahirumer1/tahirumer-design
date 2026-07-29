import{C as e,_ as t,b as n,g as r,l as i,o as a,p as o,s,t as c,u as l,v as u,w as d,x as f,y as p}from"./shell-DV6JbPcv.js";i({page:`home`});var m=[{k:`a`,slug:`chunky-rib-knit`,x:0,y:128,w:16.2,rot:-8,z:3,depth:.75,dur:7.4,delay:0},{k:`b`,slug:`court-sneaker`,x:12.3,y:16,w:18.3,rot:-4,z:4,depth:.95,dur:8.6,delay:-1.2},{k:`c`,slug:`pearl-hoop-earrings`,x:25.8,y:136,w:13.7,rot:-1.5,z:1,depth:.42,dur:6.8,delay:-2.4},{k:`d`,slug:`radiance-serum`,x:60.6,y:136,w:13.7,rot:1.5,z:1,depth:.42,dur:7.1,delay:-.6},{k:`e`,slug:`envelope-tote`,x:69.4,y:16,w:18.3,rot:4,z:4,depth:.95,dur:9.2,delay:-3.1},{k:`f`,slug:`stoneware-vase`,x:83.8,y:128,w:16.2,rot:8,z:3,depth:.75,dur:7.9,delay:-1.8}],h=document.getElementById(`stage`);if(m.forEach(t=>{let n=e(t.slug);h.append(a(`
    <div class="fc fc--${t.k}" data-depth="${t.depth}"
         style="--x:${t.x}%; --y:${t.y}px; --w:${t.w}%; --r:${t.rot}deg;
                z-index:${t.z}; --dur:${t.dur}s; --delay:${t.delay}s">
      <div class="fc__inner">
        <div class="fc__img"><img src="img/${n.img}.jpg" alt="" /></div>
        <div class="fc__meta">
          <p class="fc__brand">${s(n.brand)}</p>
          ${o(n.rating,n.reviews)}
        </div>
      </div>
    </div>`))}),!c&&matchMedia(`(hover: hover)`).matches){let e=[...h.querySelectorAll(`.fc`)],t=document.querySelector(`.hero`),n=null,r=0,i=0,a=()=>{e.forEach(e=>{let t=parseFloat(e.dataset.depth);e.style.transform=`translate3d(${r*22*t}px, ${i*14*t}px, 0)`}),n=null},o=()=>{n||=requestAnimationFrame(a)};t.addEventListener(`pointermove`,e=>{let t=h.getBoundingClientRect();r=(e.clientX-(t.left+t.width/2))/(t.width/2),i=(e.clientY-(t.top+t.height/2))/(t.height/2),o()}),t.addEventListener(`pointerleave`,()=>{r=i=0,o()})}innerWidth<560&&(document.getElementById(`q`).placeholder=`What are you shopping for?`);var g=document.getElementById(`pills`);[...p,{slug:null,label:`Electronics`,colour:`var(--cat-tech)`},{slug:null,label:`Pets`,colour:`var(--cat-pets)`}].forEach(e=>{g.append(a(`<a class="pill" href="${e.slug?`category.html?c=${e.slug}`:`#`}">
      <span class="pill__dot" style="--c:${e.colour}"></span>${e.label}</a>`))});var _=document.getElementById(`bands`),v=(e,t)=>`
  <div class="band__head">
    <h2>${e}</h2>
    <a class="band__more" href="category.html?c=${t}" aria-label="Browse all ${e}">
      <svg aria-hidden="true"><use href="#i-chevron" /></svg>
    </a>
  </div>`,y=a(`<section class="band" id="band-women">${v(`Women`,`women`)}
  <div class="rail-wrap">
    <div class="rail-scroll" data-rail></div>
    <button class="rail-arrow rail-arrow--prev" type="button" data-rail-prev aria-label="Scroll left" hidden><svg aria-hidden="true"><use href="#i-chevron"/></svg></button>
    <button class="rail-arrow" type="button" data-rail-next aria-label="Scroll right"><svg aria-hidden="true"><use href="#i-chevron"/></svg></button>
  </div></section>`),b=y.querySelector(`[data-rail]`);b.append(a(`
  <a class="feature" href="category.html?c=women">
    <img src="img/women-hero.jpg" alt="Marrow &amp; Vine womenswear" />
    <div class="feature__over">
      <p class="feature__name">Marrow<br />&amp; Vine</p>
      ${o(4.8,1204,`stars--md stars--light`)}
    </div>
  </a>`)),[[`women-1`,`Linen & Summer`],[`women-2`,`Knitwear`],[`women-3`,`Denim`],[`hero-3`,`Bags`],[`hero-5`,`Fine Jewellery`]].forEach(([e,t])=>{b.append(a(`<a class="tile" href="category.html?c=women">
    <img src="img/${e}.jpg" alt="${t}" loading="lazy" />
    <span class="tile__chip">${t}</span></a>`))}),_.append(y);var x=a(`<section class="band" id="band-men">${v(`Men`,`men`)}<div class="grid grid--4"></div></section>`),S=x.querySelector(`.grid`);[`pique-polo`,`loop-sweatshirt`,`fair-isle-knit`,`belted-trench`].forEach(t=>{let n=e(t);S.append(a(`
    <a class="dark" href="product.html?p=${n.slug}">
      <div class="dark__img">
        <img src="img/${n.img}.jpg" alt="${s(n.name)} by ${s(n.brand)}" loading="lazy" />
        <p class="dark__name">${s(n.brand)}</p>
      </div>
      <div class="dark__meta">
        <span class="dark__label">${s(n.type)}</span>
        <span class="dark__price">from ${d(n.price)}</span>
      </div>
    </a>`))}),_.append(x);var C=a(`<section class="band" id="band-beauty">${v(`Beauty`,`beauty`)}<div class="grid grid--4"></div></section>`),w=C.querySelector(`.grid`);f.forEach((e,t)=>{let r=n.filter(e=>e.cat===`beauty`)[t];w.append(a(`
    <a class="spot" href="product.html?p=${r.slug}">
      <div class="spot__img"><img src="img/${e.img}.jpg" alt="${s(e.brand)}" loading="lazy" /></div>
      <div class="spot__meta"><p class="spot__brand">${s(e.brand)}</p>${o(e.rating,e.reviews)}</div>
      <div class="spot__thumbs">
        ${e.thumbs.map(e=>`<span><img src="img/${e}.jpg" alt="" loading="lazy" /></span>`).join(``)}
      </div>
    </a>`))}),_.append(C);var T=a(`<section class="band" id="band-home">${v(`Home`,`home`)}<div class="grid grid--home"></div></section>`),E=T.querySelector(`.grid`);[[`home-1`,`Tableware`],[`home-2`,`Bedding`],[`home-3`,`Storage`]].forEach(([e,t])=>{E.append(a(`<a class="tile" href="category.html?c=home">
    <img src="img/${e}.jpg" alt="${t}" loading="lazy" />
    <span class="tile__chip">${t}</span></a>`))}),E.append(a(`
  <a class="feature" href="category.html?c=home">
    <img src="img/home-hero.jpg" alt="Nokku Studio homeware" loading="lazy" />
    <div class="feature__over">
      <p class="feature__name">Nokku<br />Studio</p>
      ${o(4.9,873,`stars--md stars--light`)}
    </div>
  </a>`)),_.append(T);var D=a(`<section class="band" id="band-baby">${v(`Baby &amp; Toddler`,`baby`)}<div class="grid grid--4"></div></section>`),O=D.querySelector(`.grid`);[[`baby-1`,`Sleep & Play`],[`baby-2`,`Wooden Toys`],[`baby-3`,`Nursery`],[`baby-4`,`First Shoes`]].forEach(([e,t])=>{O.append(a(`<a class="tile" href="category.html?c=baby">
    <img src="img/${e}.jpg" alt="${t}" loading="lazy" />
    <span class="tile__chip">${t}</span></a>`))}),_.append(D);var k=a(`<section class="band" id="band-picks">
  <div class="band__head"><h2>Editors' picks</h2></div>
  <div class="rail-wrap">
    <div class="rail-scroll" data-rail></div>
    <button class="rail-arrow rail-arrow--prev" type="button" data-rail-prev aria-label="Scroll left" hidden><svg aria-hidden="true"><use href="#i-chevron"/></svg></button>
    <button class="rail-arrow" type="button" data-rail-next aria-label="Scroll right"><svg aria-hidden="true"><use href="#i-chevron"/></svg></button>
  </div></section>`),A=k.querySelector(`[data-rail]`);[`envelope-tote`,`mohair-crew`,`no7-eau-de-parfum`,`washed-linen-bedding`,`court-sneaker`,`wood-block-set`,`belted-trench`].forEach(t=>{A.append(l(e(t)))}),_.append(k),t(),u(),r(),document.querySelector(`.hero .search`).addEventListener(`submit`,e=>{document.getElementById(`q`).value.trim()||(e.preventDefault(),document.getElementById(`q`).focus())});