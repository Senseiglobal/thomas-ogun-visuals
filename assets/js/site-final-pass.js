(() => {
  const page = (location.pathname.split('/').pop() || 'index.html').replace('.html','') || 'index';
  document.body.dataset.page = page === 'portfolio' ? 'portfolio' : page;
  document.querySelectorAll('header .brand img.tov-brand-icon, header .brand img.brand-icon, .site-header .brand img.tov-brand-icon, .site-header .brand img.brand-icon').forEach(el => el.remove());
  document.querySelectorAll('img').forEach((img,i)=>{ if(i>1 && !img.hasAttribute('loading')) img.loading='lazy'; if(!img.hasAttribute('decoding')) img.decoding='async'; if(!img.alt) img.alt='Thomas Ogun Visuals project image'; });
  document.querySelectorAll('a').forEach(a => { const text=(a.textContent||'').trim().toLowerCase(); const href=a.getAttribute('href')||''; if(text.includes('book a consultation') && /service-inquiry\.html#services/.test(href)) a.setAttribute('href','service-inquiry.html#focused-session'); });
  document.querySelectorAll('h1,h2,h3,p,a,button,span').forEach(el=>{ if((el.textContent||'').trim()==='Ask about the work') el.textContent='How can I help?'; });
  document.querySelectorAll('form').forEach(form => {
    const text=(form.textContent||'').toLowerCase(); const email=form.querySelector('input[type="email"], input[name="email"]'); if(!email) return;
    if(text.includes('newsletter') || form.closest('.site-footer') || form.className.toLowerCase().includes('newsletter')){
      form.setAttribute('action','https://buttondown.com/api/emails/embed-subscribe/thomasogunvisuals'); form.setAttribute('method','post');
      if(!form.querySelector('input[name="embed"]')){ const h=document.createElement('input'); h.type='hidden'; h.name='embed'; h.value='1'; form.appendChild(h); }
      form.addEventListener('submit',()=>{ const msg=form.querySelector('[data-form-message]')||document.createElement('p'); msg.dataset.formMessage='true'; msg.textContent='Thank you. Please check your inbox to confirm your subscription.'; msg.style.marginTop='12px'; if(!msg.parentNode) form.appendChild(msg); });
    } else if(!form.getAttribute('action')){
      form.addEventListener('submit', e => { e.preventDefault(); let msg=form.querySelector('[data-form-message]'); if(!msg){msg=document.createElement('p'); msg.dataset.formMessage='true'; form.appendChild(msg);} msg.textContent='Thank you. Your message has been noted. Thomas Ogun Visuals will review it shortly.'; });
    }
  });
})();
