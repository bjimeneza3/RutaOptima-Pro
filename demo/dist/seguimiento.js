const defaultDrivers={'RO-01':'Carlos Paredes','RO-02':'Ana Torres','RO-03':'Luis Herrera','RO-04':'María Ruiz','RO-05':'Jorge Vega'};
const defaultPlates={'RO-01':'PBA-1041','RO-02':'PBA-2082','RO-03':'PBA-3093','RO-04':'PBA-4104','RO-05':'PBA-5115'};
let trackedOrderId=null;
function updateTracking(){
  if(trackedOrderId===null)return;
  let list=[],fleet={};
  try{list=JSON.parse(localStorage.getItem(key)||'[]');fleet=JSON.parse(localStorage.getItem('rutaoptima_fleet_v1')||'{}')}catch{return}
  const order=Array.isArray(list)?list.find(o=>o.id===trackedOrderId):null;
  const box=document.getElementById('tracking');
  if(!order){box.textContent='Este pedido ya no está disponible en este navegador.';return}
  const vehicle=order.vehicle, driver=vehicle?(fleet[vehicle]?.driver||defaultDrivers[vehicle]||'Sin registrar'):'Pendiente de asignación';
  const plate=vehicle?(fleet[vehicle]?.plate||defaultPlates[vehicle]||'No registrada'):'Pendiente de asignación';
  box.textContent='Estado: '+order.status+' · Conductor: '+driver+' · Vehículo: '+(vehicle||'Pendiente')+' · Placa: '+plate;
}
window.addEventListener('storage',event=>{if(event.key===key||event.key==='rutaoptima_fleet_v1')updateTracking()});
window.showTracking=function(id){
  trackedOrderId=id;updateTracking();
  const qr=document.getElementById('qr');
  qr.replaceChildren();
  try{if(!window.QRCode)throw new Error('Generador no disponible');new QRCode(qr,{text:'RutaOptima Pro - Pedido de demostracion #'+id+' confirmado',width:160,height:160,correctLevel:QRCode.CorrectLevel.M});}
  catch(error){qr.textContent='No se pudo generar el codigo QR. Pedido #'+id;console.error(error)}
};
