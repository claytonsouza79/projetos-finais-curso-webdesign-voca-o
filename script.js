const topGrid=document.querySelector('#topGrid'),otherGrid=document.querySelector('#otherGrid'),search=document.querySelector('#search'),classFilter=document.querySelector('#classFilter'),empty=document.querySelector('#empty');
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
function topCard(x){
 const site=x.site?`<a class="btn primary" href="${x.site}" target="_blank" rel="noopener">Ver projeto ↗</a>`:`<span class="btn disabled">Projeto não informado</span>`;
 const git=x.github?`<a class="btn" href="${x.github}" target="_blank" rel="noopener">GitHub ↗</a>`:'';
 return `<article class="card top-card"><div class="rank">#${x.rank}</div><div class="project">${esc(x.project)}</div><div class="student">${esc(x.student)}</div><div class="class">${esc(x.class)}</div><p class="why"><strong>Por que está no Top 11?</strong> ${esc(x.why)}</p>${x.team?'<span class="team">👥 Projeto em equipe</span>':''}${x.live?'<span class="live">● Projeto real no ar</span>':''}<div class="actions">${site}${git}</div></article>`;
}
function groupCard(g){
 const links=g.links.map(([name,url])=>`<a class="project-link" href="${url}" target="_blank" rel="noopener">${esc(name)} ↗</a>`).join('');
 const repos=g.github.map(url=>`<a class="repo-link" href="${url}" target="_blank" rel="noopener">${esc(url.replace('https://github.com/',''))} ↗</a>`).join('');
 return `<article class="card group-card"><span class="team">👥 Equipe / grupo</span><div class="project">${esc(g.project)}</div><div class="class">${esc(g.class)}</div><div class="members"><strong>Integrantes</strong><div>${g.members.map(esc).join(' · ')}</div></div><div class="link-block"><strong>Projetos executáveis</strong>${links}</div><div class="link-block repos"><strong>Repositórios</strong>${repos}</div></article>`;
}
topGrid.innerHTML=top11.map(topCard).join('');
document.querySelector('#allCount').textContent=top11.length+groups.length;
function render(){
 const term=search.value.trim().toLowerCase(), turma=classFilter.value;
 const list=groups.filter(g=>(!term||`${g.project} ${g.class} ${g.members.join(' ')}`.toLowerCase().includes(term))&&(!turma||g.class===turma));
 otherGrid.innerHTML=list.map(groupCard).join('');
 empty.hidden=list.length>0;
}
search.addEventListener('input',render);classFilter.addEventListener('change',render);render();
