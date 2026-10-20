
const menu=document.querySelector('.menu'),navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu'}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu'});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menu.focus()}});
document.querySelector('#year').textContent=new Date().getFullYear();
const form=document.querySelector('#quote-form');
if(form){
const selectedService=new URLSearchParams(location.search).get('service');
if(selectedService&&Array.from(document.querySelector('#service').options).some(o=>o.value===selectedService))document.querySelector('#service').value=selectedService;
const today=new Date();document.querySelector('#date').min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
document.querySelector('#quote-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const val=k=>String(data.get(k)||'').trim();const message=['Hello Pro Active Lifeguard Services, I would like a quote.','',`Name: ${val('name')}`,`Service: ${val('service')}`,`Venue / location: ${val('location')}`,`Date: ${val('date')||'To be confirmed'}`,`Working hours: ${val('hours')||'To be confirmed'}`,val('details')?`Additional details: ${val('details')}`:''].filter(Boolean).join('\n');const url='https://wa.me/27751141212?text='+encodeURIComponent(message);const status=document.querySelector('#form-status');status.replaceChildren(document.createTextNode('Your enquiry is ready. '));const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open WhatsApp to review and send';status.append(link);status.hidden=false;window.open(url,'_blank','noopener,noreferrer')});

}
