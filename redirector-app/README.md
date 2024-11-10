# App de redirección para Repommender

> [!IMPORTANT]
> La existencia de esta aplicación sólo tiene sentido si se está ejecutando de manera local un servidor del repositorio de Repommender con NextJS y FastAPI, a la par que un tunel de Ngrok para poder acceder a la aplicación desde cualquier lugar.

Esta aplicación sirve para permitir el alojamiento simulado de la aplicación principal en un dominio personalizado utilizando Ngrok para realizar un puente entre el servidor local y la red pública. Toda la carga de computación se realiza en el servidor local, puesto que el plan gratuito de Vercel no permite semejante cantidad de procesamiento; sin embargo, la aplicación principal se aloja en Vercel para poder ser accesible desde cualquier lugar, siempre y cuando exista un tunel de Ngrok activo.
