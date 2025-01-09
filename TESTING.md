# Instrucciones de testeo backend

El procedimiento descrito en este documento tiene como objetivo proporcionar una guía para testear el backend de la aplicación. Para ello, se detallan los pasos necesarios para la instalación de requisitos, generación del estado inicial de la base de datos y ejecución de los tests de la API.

> [!IMPORTANT]
> El funcionamiento de la API se ha probado para versiones de Python 3.11.x y 3.12.x. No se garantiza el correcto funcionamiento en versiones anteriores y/o posteriores. Se recomienda usar un módulo como `virtualenv` para aislar el entorno de desarrollo, puesto que [los requisitos](./requirements.txt) especifican versiones concretas de las dependencias, lo que puede generar incompatibilidades en el entorno global. Finalmente, se recomienda realizar toda la ejecución de comandos desde la raíz del repositorio, puesto que hay importaciones y ejecuciones relativas a la estructura de carpetas que se asumen desde la raíz.

> [!WARNING]
> Si no se ha realizado la instalación de [los requisitos](./requirements.txt), se recomienda hacerlo antes de continuar con el testeo de la API y/o su puesta en marcha. De lo contrario, se podrán producir errores de ejecución.

> [!WARNING]
> De manera previa a la ejecución del módulo de tests y/o la puesta en marcha del servidor, es imprescindible ejecutar el script de [configuración inicial](./setup/setup.py), puesto que es el encargado de crear la base de datos y cargar los datos iniciales. Más información sobre este proceso en la [sección correspondiente](#2-configuración-inicial).

## 1. Instalación de requisitos

Para instalar los requisitos necesarios para la ejecución de los tests, se debe ejecutar el siguiente comando en la terminal:

```bash
python -m pip install -r requirements.txt
```

Existe otro archivo llamado [`requirements-dev.txt`](./requirements-dev.txt) que contiene dependencias de formato y estilo de código, pero no serán necesarias para el testeo.

## 2. Configuración inicial

Este repositorio simula ciertas tablas de la base de datos que utiliza el backend. Para crear la base de datos y cargar los datos iniciales, se debe ejecutar el siguiente comando en la terminal:

```bash
python setup/setup.py
```

Este script se encargará de crear la base de datos, cargar los datos iniciales y finalmente mostrará un mensaje indicando que la configuración ha finalizado con éxito. Los parámetros de generación del estado inicial se pueden modificar a través del archivo [`config.json`](./setup/config.json).

## 3. Ejecución de tests

Para ejecutar los tests de la API, se debe ejecutar el siguiente comando en la terminal:

```bash
python api_tests.py
```

Este script ([`api_tests.py`](./api_tests.py)) se encargará del proceso completo de inicialización y terminación del servidor backend, así como de la ejecución de una interfaz por línea de comandos interactiva que te permitirá probar cada uno de los endpoints, pudiendo ver su información asociada, estructura de petición, estructura de respuesta y respuesta del servidor, respectivamente.

## 4. Puesta en marcha del servicio completo (opcional)

Para llevar a cabo la puesta en marcha del servicio completo (frontend y backend), será necesario tener instalado Node.js 21+ y un gestor de paquetes del mismo (`npm`, `pnpm`, etc.). Tras verificar la instalación, se procederá a ejecutar los siguientes comandos:

```bash
# En caso de `npm`:
npm run setup:npm

# En caso de `pnpm`:
pnpm run setup:pnpm
```

Esto realizará toda la instalación de dependencias tanto del frontend como del backend, y finalmente se podrá ejecutar el servicio completo con el siguiente comando:

```bash
# En caso de `npm`:
npm run dev

# En caso de `pnpm`:
pnpm run dev
```

El frontend estará entonces disponible en [localhost:3000](http://localhost:3000) y el backend en [localhost:8000](http://localhost:8000). Se debe tener en cuenta que la carga inicial de cada una de las páginas puede tardar unos segundos, puesto que se compilan en tiempo de ejecución.

Como nota adicional, cabe destacar que los README de los repositorios renderizados desde el frontend no se podrán visualizar a no ser que exista una variable de entorno llamada `GITHUB_PAT` definida con un token de acceso personal de GitHub. En caso de no tenerlo, el error no afectará al funcionamiento de la aplicación, pero no se podrán visualizar los README de los repositorios.
