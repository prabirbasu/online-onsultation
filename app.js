(() => {
  'use strict';
  const resources = window.RESOURCES || [];
  const topics = ['All topics', 'Prostate health', 'Kidney & urinary health', 'Reproductive health', 'Sexual health', 'Everyday wellbeing'];
  const symbols = ['▦', '◉', '♧', '❋', '♡', '☀'];
  const palettes = [['#e7ecdb','#798b58'],['#eae3d9','#a58b70'],['#e6e3ee','#9684ab'],['#e0e8e3','#739789'],['#f0e6d4','#ac9163'],['#e6ead7','#8a9a58']];
  const drawings = [
    '<circle cx="75" cy="54" r="35"/><circle cx="75" cy="54" r="25" stroke-dasharray="2 5"/><path d="M60 18q15-10 30 0M62 42q13-12 26 0v17q-13 17-26 0zM75 68v32M68 100h14M34 53H18m114 0h-16"/>',
    '<path d="M56 24C19 6 18 77 44 88c18 9 26-14 12-23-10-7-8-15 2-18 10-4 7-16-2-23zM94 24c37-18 38 53 12 64-18 9-26-14-12-23 10-7 8-15-2-18-10-4-7-16 2-23zM60 64q10 9 9 37m21-37q-10 9-9 37"/><path d="M32 38q-7 27 12 38m74-38q7 27-12 38" opacity=".5"/>',
    '<rect x="29" y="22" width="92" height="65" rx="7"/><circle cx="75" cy="54" r="21"/><path d="m70 43 16 11-16 11zM59 101h32M75 87v14"/><path d="M19 12h15M12 19v15m104-22h15m7 7v15" opacity=".6"/>',
    '<path d="M75 33C55 18 29 25 22 30v62c21-9 36-5 53 5 17-10 32-14 53-5V30c-7-5-33-12-53 3zM75 33v64M32 42q16-5 31 3m-31 8q16-5 31 3m-31 8q16-5 31 3m25-22q15-8 29-3m-29 14q15-8 29-3m-29 14q15-8 29-3"/>',
    '<path d="M38 24C88 21 62 92 111 96M112 24C62 21 88 92 39 96M43 30h64M50 41h50M61 52h28M61 67h28M50 79h50M43 91h64"/><circle cx="38" cy="24" r="4"/><circle cx="112" cy="24" r="4"/><circle cx="39" cy="96" r="4"/><circle cx="111" cy="96" r="4"/>',
    '<path d="M75 100V50M75 72C30 75 29 36 29 36s48-4 46 36zM75 59c0-32 38-37 38-37s2 40-38 37zM75 89c1-26 36-26 36-26s-1 30-36 26zM75 100H53m22 0h22"/><path d="m75 72-30-24m30 11 24-23m-24 53 22-16" opacity=".5"/>'
  ];
  let saved = new Set();
  try { const values = JSON.parse(localStorage.getItem('basu-library-saved') || '[]'); if (Array.isArray(values)) saved = new Set(values.filter(id => resources.some(r => r.id === id))); } catch (_) {}
  const state = {topic:'All topics', format:'all', language:'all', query:'', savedOnly:false, sort:'recommended', limit:6};
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normalize = value => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
  function filtered() {
    const terms = normalize(state.query).trim().split(/\s+/).filter(Boolean);
    const items = resources.filter(r => (state.topic === 'All topics' || r.topic === state.topic) && (state.format === 'all' || r.format === state.format) && (state.language === 'all' || r.language === state.language) && (!state.savedOnly || saved.has(r.id)) && terms.every(term => normalize([r.title,r.topic,r.description,r.language,r.format].join(' ')).includes(term)));
    if (state.sort === 'title') items.sort((a,b) => a.title.localeCompare(b.title));
    if (state.sort === 'format') items.sort((a,b) => a.format.localeCompare(b.format) || a.title.localeCompare(b.title));
    return items;
  }
  function card(r, index) {
    const art = r.format === 'Video' ? 2 : r.topic === 'Kidney & urinary health' ? 1 : r.topic === 'Prostate health' ? 0 : r.topic === 'Reproductive health' ? 4 : r.topic === 'Everyday wellbeing' ? (r.format === 'Course' && /starter/i.test(r.title) ? 3 : 5) : 3;
    const palette = palettes[index % palettes.length];
    const savedState = saved.has(r.id);
    const lang = r.language === 'Not specified' ? 'Dr Prabir Basu' : r.language;
    return `<article class="resource-card" style="--tint:${palette[0]};--accent:${palette[1]}"><div class="card-art"><div class="art-pattern"></div><svg viewBox="0 0 150 120" aria-hidden="true">${drawings[art]}</svg><span class="format-badge">${r.format === 'Article' ? '▤' : r.format === 'Video' ? '▷' : '▥'} &nbsp; ${escape(r.format)}</span><button class="save-button" data-save="${escape(r.id)}" aria-label="${savedState ? 'Unsave' : 'Save'} ${escape(r.title)}" aria-pressed="${savedState}"><svg viewBox="0 0 12 16" aria-hidden="true"><path d="M2 1h8v13l-4-3-4 3z"/></svg></button></div><div class="card-body"><p class="card-topic">${escape(r.topic)}</p><h3><a href="${escape(r.url)}" target="_blank" rel="noopener">${escape(r.title)}</a></h3><p class="card-description">${escape(r.description)}</p><div class="card-meta"><span>${escape(lang)} · ${escape(r.access)}</span><a href="${escape(r.url)}" target="_blank" rel="noopener" aria-label="Open ${escape(r.title)} (new tab)">↗</a></div></div></article>`;
  }
  function render() {
    const items = filtered();
    $('resource-grid').innerHTML = items.slice(0,state.limit).map(card).join('');
    $('result-count').textContent = `${items.length} resource${items.length === 1 ? '' : 's'}${state.savedOnly ? ' in your saved collection' : ' to explore'}${state.query ? ` for “${state.query}”` : ''}`;
    $('empty-state').hidden = items.length > 0;
    if (state.savedOnly && !items.length) { $('empty-state').querySelector('h3').textContent = saved.size ? 'No saved resources match' : 'Your reading list starts here'; $('empty-state').querySelector('p').textContent = saved.size ? 'Try a different search or filter.' : 'Use the bookmark on any resource to keep it here for later.'; }
    else { $('empty-state').querySelector('h3').textContent = 'No resources found'; $('empty-state').querySelector('p').textContent = 'Try a different search, topic or language.'; }
    $('load-more').hidden = items.length <= state.limit;
    $('saved-count').textContent = saved.size;
    $('saved-toggle').setAttribute('aria-pressed', state.savedOnly);
    $('reset').hidden = state.topic === 'All topics' && state.format === 'all' && state.language === 'all' && !state.query && !state.savedOnly;
    document.querySelectorAll('[data-topic]').forEach(b => { const selected = b.dataset.topic === state.topic; b.classList.toggle('selected',selected); b.setAttribute('aria-pressed',selected); });
    document.querySelectorAll('[data-format]').forEach(b => { const selected = b.dataset.format === state.format; b.classList.toggle('selected',selected); b.setAttribute('aria-pressed',selected); });
  }
  $('topic-filters').innerHTML = topics.map((topic,i) => `<button data-topic="${escape(topic)}" aria-pressed="${i===0}"><span class="topic-icon" aria-hidden="true">${symbols[i]}</span>${escape(topic)}<b>${i ? resources.filter(r => r.topic === topic).length : resources.length}</b></button>`).join('');
  function reset() { Object.assign(state,{topic:'All topics',format:'all',language:'all',query:'',savedOnly:false,sort:'recommended',limit:6}); $('search').value=''; $('language').value='all'; $('sort').value='recommended'; render(); }
  $('search-form').addEventListener('submit',event => {event.preventDefault(); state.query=$('search').value; state.limit=6; render(); $('library').scrollIntoView({behavior:'smooth'});});
  $('search').addEventListener('input',event => {state.query=event.target.value;state.limit=6;render();});
  $('topic-filters').addEventListener('click',event => {const button=event.target.closest('[data-topic]');if(button){state.topic=button.dataset.topic;state.limit=6;render();}});
  document.querySelectorAll('[data-format]').forEach(button => button.addEventListener('click',() => {state.format=button.dataset.format;state.limit=6;render();}));
  document.querySelectorAll('[data-quick-topic]').forEach(button => button.addEventListener('click',() => {reset();state.topic=button.dataset.quickTopic;render();$('library').scrollIntoView({behavior:'smooth'});}));
  $('language').addEventListener('change',event => {state.language=event.target.value;state.limit=6;render();});
  $('sort').addEventListener('change',event => {state.sort=event.target.value;render();});
  $('saved-toggle').addEventListener('click',() => {state.savedOnly=!state.savedOnly;state.limit=6;render();});
  $('reset').addEventListener('click',reset);$('empty-reset').addEventListener('click',reset);
  $('load-more').addEventListener('click',() => {const firstNew=state.limit;state.limit+=6;render();const link=$('resource-grid').children[firstNew]?.querySelector('h3 a');if(link)link.focus({preventScroll:true});});
  let toastTimer;
  $('resource-grid').addEventListener('click',event => {
    const button=event.target.closest('[data-save]');if(!button)return;
    const id=button.dataset.save;const had=saved.has(id);had?saved.delete(id):saved.add(id);
    let persistent=true;try{localStorage.setItem('basu-library-saved',JSON.stringify([...saved]));}catch(_){persistent=false;}
    render();document.querySelector(`[data-save="${id}"]`)?.focus({preventScroll:true});
    $('toast').textContent=had?'Removed from saved resources':persistent?'Saved to your reading list':'Saved for this visit (browser storage unavailable)';
    $('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(() => $('toast').classList.remove('visible'),2500);
  });
  document.querySelectorAll('.header nav a').forEach(link => link.addEventListener('click',() => {document.querySelectorAll('.header nav a').forEach(a => a.classList.remove('active'));link.classList.add('active');}));
  $('year').textContent=new Date().getFullYear();
  render();
})();
