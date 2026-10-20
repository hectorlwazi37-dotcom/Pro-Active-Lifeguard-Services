
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

/* Pro Active 24-hour automated enquiry assistant */
(() => {
  if (document.querySelector('#pa-chat')) return;
  const style = document.createElement('style');
  style.textContent = `
#pa-chat{position:fixed;right:20px;bottom:22px;z-index:1000;font:14px/1.5 Arial,sans-serif;color:#082a3f}
#pa-chat *{box-sizing:border-box}
#pa-chat button,#pa-chat input,#pa-chat a{font:inherit}
#pa-chat button{cursor:pointer}
#pa-chat button:focus-visible,#pa-chat a:focus-visible,#pa-chat input:focus-visible{outline:3px solid #eaaa00;outline-offset:3px}
#pa-chat-toggle{border:0;border-radius:28px;padding:14px 20px;background:#b82129;color:white;box-shadow:0 4px 24px #082a3f30;font-weight:700!important}
#pa-chat-panel{width:360px;max-width:calc(100vw - 24px);height:510px;max-height:calc(100dvh - 120px);background:white;border:1px solid #d9e2e7;border-radius:18px;box-shadow:0 12px 50px #082a3f35;overflow:hidden;display:flex;flex-direction:column;margin-bottom:12px}
#pa-chat-panel[hidden]{display:none}
.pa-chat-head{display:flex;justify-content:space-between;align-items:center;padding:16px;background:#082a3f;color:white}
.pa-chat-head strong{display:block;font-size:16px}.pa-chat-head small{color:#f7d663}
#pa-chat-close{border:0;background:transparent;color:white;font-size:26px!important;min-width:40px;min-height:40px}
#pa-chat-log{flex:1;overflow-y:auto;padding:14px;min-height:60px;overscroll-behavior:contain}
.pa-chat-msg{padding:11px 13px;margin:0 0 10px;border-radius:12px;background:#f0f4f6;white-space:pre-wrap;overflow-wrap:anywhere}
.pa-chat-user{background:#fff3c4;margin-left:30px}
#pa-chat-log a{display:inline-block;color:#9c1720;text-decoration:underline;margin-top:8px;font-weight:700}
#pa-chat-choices{display:flex;gap:6px;flex-wrap:wrap;padding:0 12px 10px}
#pa-chat-choices button{padding:7px 9px;border:1px solid #d9e2e7;border-radius:16px;background:white;color:#082a3f;font-size:12px}
#pa-chat-form{display:flex;gap:8px;padding:12px;border-top:1px solid #e2e8eb}
#pa-chat-input{min-width:0;flex:1;padding:10px;border:1px solid #bdcbd3;border-radius:8px;background:white;color:#082a3f;font-size:16px}
#pa-chat-form button{border:0;border-radius:8px;background:#b82129;color:white;padding:10px}
@media(max-width:760px){#pa-chat{right:12px;bottom:90px}#pa-chat-panel{max-height:calc(100dvh - 175px)}#pa-chat-toggle{padding:12px 16px}}
`;
  document.head.append(style);
  const host = document.createElement('div');
  host.id = 'pa-chat';
  host.innerHTML = `<section id="pa-chat-panel" aria-label="Pro Active automated chat" hidden>
<div class="pa-chat-head"><div><strong>Pro Active Assistant</strong><small>Automated help · Available 24/7</small></div><button id="pa-chat-close" type="button" aria-label="Close chat">×</button></div>
<div id="pa-chat-log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages"></div>
<div id="pa-chat-choices" aria-label="Common questions"></div>
<form id="pa-chat-form"><input id="pa-chat-input" aria-label="Your question" placeholder="Type your question…" maxlength="500" autocomplete="off" required><button type="submit">Send</button></form>
</section><button id="pa-chat-toggle" type="button" aria-controls="pa-chat-panel" aria-expanded="false">Chat with us · 24/7</button>`;
  document.body.append(host);
  const panel = host.querySelector('#pa-chat-panel');
  const toggle = host.querySelector('#pa-chat-toggle');
  const input = host.querySelector('#pa-chat-input');
  const log = host.querySelector('#pa-chat-log');
  function addMessage(text, user, links = []) {
    const item = document.createElement('div');
    item.className = 'pa-chat-msg' + (user ? ' pa-chat-user' : '');
    const label = document.createElement('strong');
    label.textContent = user ? 'You: ' : 'Assistant: ';
    item.append(label, document.createTextNode(text));
    links.forEach(([title, url]) => {
      item.append(document.createElement('br'));
      const a = document.createElement('a');
      a.textContent = title; a.href = url;
      if (url.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      item.append(a);
    });
    log.append(item);
    while (log.children.length > 50) log.firstElementChild.remove();
    log.scrollTop = log.scrollHeight;
  }
  const whatsapp = ['Continue on WhatsApp', 'https://wa.me/27751141212?text=' + encodeURIComponent('Hello Pro Active Lifeguard Services, I have an enquiry from your website.')];
  function reply(question) {
    const q = question.toLowerCase();
    if (/emergency|drowning|unconscious|not breathing|injured/.test(q))
      return ['This automated chat is not monitored for emergencies. Contact local emergency services immediately and alert the lifeguard or venue staff.'];
    if (/price|cost|rate|how much|quote|book|availab|hire/.test(q))
      return ['For a quote, share your name, event date, venue, working hours and expected number of swimmers (including children). Our team will confirm the price, staffing and availability. A chat enquiry does not confirm a booking.', [['Request a quote', 'quote.html'], whatsapp]];
    if (/insurance|liability|insured|cover.*claim/.test(q))
      return ['Pro Active holds public liability insurance. Cover is subject to policy terms, exclusions, excess and limits.', [['Read about our cover', 'about.html#insurance']]];
    if (/accredit|lifesaving|lsa|certif/.test(q))
      return ['Our website lists accreditation with Lifesaving South Africa. Contact our team for accreditation or lifeguard certificate enquiries.', [['Accreditation information', 'about.html#accreditation'], whatsapp]];
    if (/job|vacan|apply|career|work for|employment/.test(q))
      return ['You can view lifeguard requirements and application details on our Vacancies page.', [['View vacancies', 'vacancies.html']]];
    if (/review|feedback|rating/.test(q))
      return ['Read client feedback or use the Google review link on our Reviews page.', [['Client reviews', 'reviews.html']]];
    if (/service|party|parties|resort|hotel|school|pool|event/.test(q))
      return ['We provide lifeguard cover for private pool parties and events, hotels, resorts, estates and schools. Our team can help plan staffing for your venue and swimmers.', [['Explore services', 'services.html'], ['Request a quote', 'quote.html']]];
    if (/contact|human|person|whatsapp|phone|email|manager|talk/.test(q))
      return ['Contact our team on 075 114 1212 or proactivelifeguard@yahoo.com. Automated answers are available 24/7; personal replies depend on team availability.', [whatsapp, ['Email the team', 'mailto:proactivelifeguard@yahoo.com']]];
    if (/hours|24|open|online/.test(q))
      return ['This automated assistant is available 24 hours a day. For event cover, send your date and working hours so our team can confirm availability.', [['Request a quote', 'quote.html'], whatsapp]];
    if (/^(hi|hello|hey|good morning|good afternoon)[!. ]*$/.test(q))
      return ['Hello! I can help with services, quotes, insurance, reviews and vacancies. What would you like to know?'];
    if (/thank/.test(q)) return ['You are welcome! Let me know if you need help with a quote or contacting our team.'];
    return ['I can help with common questions about services, quotes, insurance, reviews and vacancies. For anything else, please message our team on WhatsApp. You will need to review and send your message there.', [whatsapp]];
  }
  let busy = false;
  let aiReady = false;
  const history = [];
  fetch('/api/chat/status').then(r => r.ok ? r.json() : null).then(data => {
    if (data && data.enabled === true) {
      aiReady = true;
      host.querySelector('.pa-chat-head small').textContent = 'AI assistant · Available 24/7';
      addMessage('AI chat is enabled. Your questions are sent to our AI provider to generate replies. Please avoid sharing sensitive personal information. AI answers may be mistaken; our team confirms bookings and prices.', false);
    }
  }).catch(() => {});
  async function ask(text) {
    if (busy) return;
    addMessage(text, true);
    const [answer, links] = reply(text);
    if (!aiReady || /emergency|drowning|unconscious|not breathing|injured/i.test(text)) {
      addMessage(answer, false, links || []); return;
    }
    busy = true;
    host.querySelectorAll('#pa-chat-form button, #pa-chat-choices button').forEach(b => b.disabled = true);
    log.setAttribute('aria-busy', 'true');
    const pending = document.createElement('p'); pending.textContent = 'Thinking…'; log.append(pending);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({messages: [...history, {role:'user', content:text}].slice(-9)}),
        signal: AbortSignal.timeout(25000)
      });
      if (!response.ok) throw new Error('Unavailable');
      const data = await response.json();
      if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('Empty answer');
      pending.remove();
      addMessage(data.reply, false, links || [whatsapp]);
      history.push({role:'user', content:text}, {role:'assistant', content:data.reply});
      if (history.length > 8) history.splice(0, history.length - 8);
    } catch {
      pending.remove();
      addMessage('AI is temporarily unavailable. Here is our standard help: ' + answer, false, links || [whatsapp]);
    } finally {
      busy = false; log.setAttribute('aria-busy', 'false');
      host.querySelectorAll('#pa-chat-form button, #pa-chat-choices button').forEach(b => b.disabled = false);
    }
  }
  ['Get a quote', 'Our services', 'Insurance', 'Reviews', 'Vacancies', 'Contact team'].forEach(text => {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = text;
    button.addEventListener('click', () => ask(text));
    host.querySelector('#pa-chat-choices').append(button);
  });
  function setOpen(open) {
    panel.hidden = !open; toggle.setAttribute('aria-expanded', String(open));
    if (open) input.focus(); else toggle.focus();
  }
  toggle.addEventListener('click', () => setOpen(panel.hidden));
  host.querySelector('#pa-chat-close').addEventListener('click', () => setOpen(false));
  host.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { e.stopPropagation(); setOpen(false); } });
  host.querySelector('#pa-chat-form').addEventListener('submit', e => {
    e.preventDefault(); const text = input.value.trim();
    if (!text) return;
    ask(text); input.value = ''; input.focus();
  });
  addMessage('Hello! I’m Pro Active’s automated assistant, available 24/7 for common enquiries. Choose a topic or type your question. Our team confirms all quotes and bookings. Messages here are not sent to our team; use WhatsApp to contact them.', false);
})();
