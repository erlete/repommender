# Repommender - Encuentra el repositorio perfecto para tus proyectos

> [!IMPORTANT]
> Este repositorio no es más que una simulación de una funcionalidad de sistema de recomendación mixto (por popularidad, basado en contenido y por colaboración). Mientras que algunas partes del frontend y el backend son completamente funcionales, hay otras que provienen de datos pregenerados o preprocesados (otros usuarios del sistema, repositorios sugeridos, etc.). Es por este motivo que este repositorio debería ser utilizado únicamente con propósitos educativos.

## Tecnologías utilizadas

- [Node.js 21](https://nodejs.org/)
- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Python 3.10+](https://www.python.org/)
- [Pydantic](https://pydantic-docs.helpmanual.io/)

Además, se hace uso de numerosos paquetes de Python para el procesamiento de datos y la generación de recomendaciones, como [`pandas`](https://pandas.pydata.org/), [`scikit-learn`](https://scikit-learn.org/stable/), [`numpy`](https://numpy.org/), [`scipy`](https://www.scipy.org/), [`nltk`](https://www.nltk.org/), etc.

## Requisitos mínimos

Para poder ejecutar este proyecto, es necesario tener instaladas las tecnologías de Node.js 21+ y Python 3.10+. Además, se recomienda tener instalado un gestor de paquetes de Node.js (como `npm`, `yarn`, `pnpm`, etc.) y un entorno virtual de Python (como `venv`, `virtualenv`, `conda`, etc.).

## Instalación

Debido a que este proyecto hace uso de dos tipos de backend (uno en Node.js y otro en Python), es necesario instalar ambas tecnologías y sus dependencias.

### Dependencias de Node.js

Para instalar las dependencias de Node.js, es necesario ejecutar el siguiente comando en la carpeta raíz del proyecto:

```bash
npm install
```

Según preferencias, también se pueden utilizar los gestores de paquetes `yarn`, `pnpm`, etc.

### Dependencias de Python

Para instalar las dependencias de Python, es necesario ejecutar el siguiente comando en la carpeta `backend` del proyecto:

```bash
python -m pip install -r requirements.txt
```

En caso de que se quieran instalar también las dependencias de desarrollo (linters, formateadores, etc.), se debería ejecutar, a mayores del comando anterior, el siguiente comando:

```bash
python -m pip install -r requirements-dev.txt
```

## Preparación de los datos

El proyecto utiliza un conjunto de datos preprocesado para generar las recomendaciones. Para ello, es necesario ejecutar el siguiente comando en la carpeta raíz del proyecto:

```bash
python scripts/setup.py
```

Este script se encargará de descargar los datos necesarios, procesarlos y almacenarlos en la carpeta `data`. También verificará la versión de Python y sus dependencias.

## Ejecución

El proyecto permite ejecutar las partes correspondientes a cada sistema de backend independientemente (`npm run next-dev` para Node.js y `npm run fastapi-dev` para Python). Los comandos deben ser ejecutados en la carpeta raíz del proyecto.

Para llevar a cabo la ejecución conjunta de ambos sistemas, se puede utilizar el siguiente comando:

```bash
npm run dev
```

Este comando ejecutará ambos sistemas de backend y permitirá acceder a la aplicación a través de la dirección `http://localhost:3000`. Como recordatorio, no es necesario utilizar específicamente `npm` para ejecutar el proyecto, sino que se pueden utilizar otros gestores de paquetes de Node.js.

## Licencia

El proyecto está licenciado bajo la [licencia MIT](./LICENSE).
