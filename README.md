# RutaÓptima Pro

RutaÓptima Pro es una demostración de un sistema para organizar pedidos, asignar vehículos y visualizar el estado de las entregas desde un panel de operaciones.

## Funciones principales

- Registro de pedidos y consulta de sus estados: pendiente, en camino y entregado.
- Planificación de rutas por zonas y asignación de vehículos y conductores.
- Mapa de Quito con ubicaciones y movimiento simulados.
- Registro de gastos y reportes de combustible, puntualidad y costo por entrega.
- Formulario de pedidos para clientes, con prioridad y precio de ejemplo.
- Confirmación de pedido y comprobante imprimible con seguimiento de la asignación.
- Simulación de pedidos y entregas para mostrar el funcionamiento del sistema.

## Ejecutar en Windows

1. Instala [Python](https://www.python.org/downloads/) y activa la opción **Add Python to PATH** durante la instalación.
2. Abre la carpeta `demo` y haz doble clic en **Abrir RutaOptima.bat**.
3. Mantén abierta la ventana del servidor. La aplicación se abrirá en el navegador; la dirección aparecerá en esa ventana.

También puedes iniciarla desde una terminal:

```powershell
cd demo
python iniciar.py
```

El acceso de demostración utiliza el usuario **Brian Jimenez** y la contraseña **123456**. La página de inicio incluye un enlace para hacer un pedido como cliente.

## Alcance de la demostración

Los pedidos y gastos se guardan en el navegador del dispositivo. Las pestañas del mismo navegador pueden compartirlos, pero no se sincronizan entre computadoras o celulares. Al borrar los datos del navegador se eliminan los registros guardados.

El pago es simulado: no se realiza ningún cobro real y el comprobante no es una factura fiscal. El mapa necesita conexión a internet; las rutas, ubicaciones y movimientos son ilustrativos y no utilizan GPS ni calculan rutas reales. El inicio de sesión es de demostración y no protege información real.

Para más información sobre el uso de la aplicación, consulta [LEEME.txt](demo/LEEME.txt).
