const requestsPanel=document.createElement('section');
requestsPanel.className='panel';requestsPanel.style.margin='20px 0';
requestsPanel.innerHTML='<div class="panelhead"><div><h2>Solicitudes por asignar <span id="requestCount" class="pill">0</span></h2><p class="muted">Pedidos de clientes pendientes de conductor. Asígnalos desde el planificador de ruta.</p></div></div><div id="requestList"></div>';
document.querySelector('#rutas .grid').before(requestsPanel);
function showRequests(){
 const pending=orders.filter(o=>o.product&&!o.vehicle&&o.status==='Pendiente');
 document.getElementById('requestCount').textContent=pending.length;
 const list=document.getElementById('requestList');list.replaceChildren();
 if(!pending.length){list.textContent='No hay solicitudes pendientes de asignación.';return}
 pending.forEach(o=>{const row=document.createElement('div');row.className='stop';const text=document.createElement('div');const strong=document.createElement('strong');strong.textContent='#'+o.id+' · '+o.client;const small=document.createElement('small');small.textContent=o.product+' · '+o.zone+' · '+(o.priority==='Alta'?'Prioritaria':'Normal')+' · '+money(o.price);text.append(strong,small);row.append(text);list.append(row)});
}
let renderBeforeRequests=render;render=function(){renderBeforeRequests();showRequests()};showRequests();
window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY){let incoming=[];try{incoming=JSON.parse(event.newValue||'[]')}catch{}const prior=new Set(orders.map(o=>o.id));if(Array.isArray(incoming)&&incoming.some(o=>o.product&&!prior.has(o.id)))notify('Nueva solicitud de pedido recibida. Revisa Rutas y pedidos.');}} ,true);
