import{a as e,i as t,l as n,m as r,o as i,r as a,s as o,w as s}from"./shell-CsP8Yqvb.js";n({page:`checkout`});var c=75,l={standard:{label:`Standard`,sub:`3–5 working days`,price:0},express:{label:`Express`,sub:`Next working day`,price:12}},u=`standard`,d=document.getElementById(`checkout`),f=()=>{let e=a(),n=t(),r=u===`express`?l.express.price:n>=c?0:8;return`
    <aside class="summary">
      <h2>Order</h2>
      ${e.map(e=>`
        <div class="summary__row">
          <span>${o(e.product.name)}${e.qty>1?` × ${e.qty}`:``}<br>
            <small style="color:var(--stone)">${o([e.colour,e.size].filter(Boolean).join(` · `))}</small></span>
          <b>${s(e.product.price*e.qty)}</b>
        </div>`).join(``)}
      <div class="summary__row" style="border-top:1px solid var(--hairline);margin-top:var(--s-8);padding-top:var(--s-12)">
        <span>Subtotal</span><b>${s(n)}</b>
      </div>
      <div class="summary__row"><span>Delivery — ${l[u].label}</span><b>${r===0?`Free`:s(r)}</b></div>
      <div class="summary__total"><span>Total</span><b>${s(n+r)}</b></div>
      <p class="summary__note">No payment is taken. This page sends nothing anywhere.</p>
    </aside>`};function p(){d.innerHTML=``,d.append(i(`
    <div class="empty">
      <h2>There's nothing to check out</h2>
      <p>Add something to your bag first and this page will fill itself in.</p>
      <a class="btn btn--accent btn--lg" href="category.html?c=women">Browse the catalogue</a>
    </div>`))}function m(){d.innerHTML=``,d.append(i(`
    <div>
      <div class="demo-note">
        <svg aria-hidden="true"><use href="#i-lock" /></svg>
        <span><b>This is a design demo.</b> The card fields below are disabled on purpose — no
          payment can be taken, nothing you type is saved, and this page makes no network requests.</span>
      </div>

      <div class="steps" aria-label="Checkout progress">
        <span class="step is-on"><span class="step__n">1</span><span>Contact</span></span>
        <span class="steps__sep"></span>
        <span class="step is-on"><span class="step__n">2</span><span>Delivery</span></span>
        <span class="steps__sep"></span>
        <span class="step is-on"><span class="step__n">3</span><span>Payment</span></span>
      </div>

      <div class="bag">
        <form id="co-form" novalidate autocomplete="off">
          <section class="fset">
            <h3>Contact</h3>
            <div class="frow">
              <div class="field">
                <label for="fname">First name</label>
                <input id="fname" name="fname" type="text" required />
                <span class="field__err" data-err="fname"></span>
              </div>
              <div class="field">
                <label for="lname">Last name</label>
                <input id="lname" name="lname" type="text" required />
                <span class="field__err" data-err="lname"></span>
              </div>
            </div>
            <div class="frow frow--1">
              <div class="field">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" />
                <span class="field__err" data-err="email"></span>
              </div>
            </div>
          </section>

          <section class="fset">
            <h3>Delivery address</h3>
            <div class="frow frow--1">
              <div class="field">
                <label for="addr">Address</label>
                <input id="addr" name="addr" type="text" required />
                <span class="field__err" data-err="addr"></span>
              </div>
            </div>
            <div class="frow">
              <div class="field">
                <label for="city">City</label>
                <input id="city" name="city" type="text" required />
                <span class="field__err" data-err="city"></span>
              </div>
              <div class="field">
                <label for="post">Postcode</label>
                <input id="post" name="post" type="text" required />
                <span class="field__err" data-err="post"></span>
              </div>
            </div>
            <div class="frow frow--1">
              <div class="field">
                <label for="country">Country</label>
                <select id="country" name="country">
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                </select>
              </div>
            </div>
          </section>

          <section class="fset">
            <h3>Delivery speed</h3>
            <div class="radios" id="ship">
              ${Object.entries(l).map(([e,t])=>`
                <label class="radio ${e===u?`is-on`:``}">
                  <input type="radio" name="ship" value="${e}" ${e===u?`checked`:``} />
                  <span class="radio__body">
                    <span class="radio__title">${t.label}</span>
                    <span class="radio__sub">${t.sub}</span>
                  </span>
                  <span class="radio__price">${t.price===0?`Free over $75`:s(t.price)}</span>
                </label>`).join(``)}
            </div>
          </section>

          <section class="fset">
            <h3>Payment</h3>
            <div class="frow frow--1">
              <div class="field">
                <label for="card">Card number — disabled in this demo</label>
                <input id="card" type="text" value="•••• •••• •••• ••••" disabled aria-describedby="card-note" />
              </div>
            </div>
            <div class="frow">
              <div class="field">
                <label for="exp">Expiry</label>
                <input id="exp" type="text" value="••/••" disabled />
              </div>
              <div class="field">
                <label for="cvc">Security code</label>
                <input id="cvc" type="text" value="•••" disabled />
              </div>
            </div>
            <p class="field__err" id="card-note" style="color:var(--ink-2)">
              These inputs are switched off at the markup level. A real build would hand this step to a
              payment provider's hosted fields so card details never touch the site.
            </p>
          </section>

          <button class="btn btn--accent btn--lg btn--block" type="submit">Place order</button>
        </form>

        ${f()}
      </div>
    </div>`)),d.querySelectorAll(`#ship input`).forEach(e=>e.addEventListener(`change`,()=>{u=e.value,d.querySelectorAll(`.radio`).forEach(t=>t.classList.toggle(`is-on`,t.contains(e)&&e.checked)),d.querySelector(`.summary`).outerHTML=f()}));let e=d.querySelector(`#co-form`);e.addEventListener(`submit`,t=>{t.preventDefault();let n=[`fname`,`lname`,`email`,`addr`,`city`,`post`],i=null;if(n.forEach(t=>{let n=e.elements[t],r=e.querySelector(`[data-err="${t}"]`),a=``;n.value.trim()?t===`email`&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(n.value.trim())&&(a=`Enter a valid email`):a=`Required`,r.textContent=a,n.setAttribute(`aria-invalid`,String(!!a)),a&&!i&&(i=n)}),i){i.focus(),r(`Check the highlighted fields`);return}h()})}function h(){let n=s(t()+(u===`express`?l.express.price:t()>=c?0:8)),r=`PCH-`+String(Date.now()).slice(-8);e(),d.innerHTML=``,d.append(i(`
    <div class="confirm">
      <div class="confirm__tick"><svg aria-hidden="true"><use href="#i-check" /></svg></div>
      <h1>That's the flow complete</h1>
      <p>In a real store this is where the confirmation would land, with the receipt on its way by
         email. Nothing was charged and nothing was sent — this is a portfolio demonstration.</p>
      <span class="confirm__ref">${r} · ${n}</span>
      <div class="confirm__actions">
        <a class="btn btn--accent" href="index.html">Back to the homepage</a>
        <a class="btn" href="category.html?c=women">Keep browsing</a>
      </div>
    </div>`)),document.querySelector(`.phead`)?.remove()}a().length?m():p();