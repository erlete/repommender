"""Interfaz de pruebas de endpoints de FastAPI.

Este script permite interactuar con los endpoints de la API de FastAPI
mediante una interfaz de consola. Se pueden realizar peticiones a los
endpoints y visualizar la estructura del cuerpo de la petición y de la
respuesta esperada.

Al ejecutar el script se inicia automáticamente el servidor de FastAPI y
se muestra un menú con los endpoints disponibles. Cuando se seleccione la
opción de salir, se detendrá automáticamente el servidor.

Ejemplo de uso:
    $ python tests/fastapi.py

Autor:
    Paulo Sanchez (@erlete)
"""

import subprocess
import json
from time import sleep
import requests
from colorama import init, Fore, Style
import platform

init(autoreset=False)

print("Iniciando programa de pruebas.")
print(
    "Si no has instalado las dependencias de `requirements.txt`, ¡es un buen momento para hacerlo!"
)
sleep(3)

if platform.system() == "Windows":
    SERVER_INIT_COMMAND = "python -m uvicorn --port 8000 api.index:app > NUL 2>&1"
else:
    SERVER_INIT_COMMAND = "python -m uvicorn --port 8000 api.index:app > /dev/null 2>&1"

ENDPOINTS = {
    "http://localhost:8000/api/fastapi/auth/get-token": {
        "category": "Autenticación",
        "method": "POST",
        "description": "Obtiene un token de acceso",
        "body": {"api_key": {"type": "string", "example": "ABOF147GLFA4"}},
        "response": {"token": {"type": "string", "description": "Token de acceso"}},
    },
    "http://localhost:8000/api/fastapi/auth/renew-token": {
        "category": "Autenticación",
        "method": "POST",
        "description": "Renueva un token de acceso",
        "body": {"token": {"type": "string", "example": "68gad5a69f7jl"}},
        "response": {"token": {"type": "string", "description": "Token de acceso"}},
    },
    "http://localhost:8000/api/fastapi/recommendations/get-popular-repositories": {
        "category": "Recomendaciones",
        "method": "POST",
        "description": "Obtiene los repositorios más populares",
        "body": {
            "token": {"type": "string", "example": "68gad5a69f7jl"},
            "count": {"type": "int", "example": 10},
            "language": {"type": "string | None", "example": "Python"},
        },
        "response": {
            "repositories": {
                "type": "list",
                "description": "Lista de repositorios más populares",
            }
        },
    },
    "http://localhost:8000/api/fastapi/recommendations/get-similar-repositories": {
        "category": "Recomendaciones",
        "method": "POST",
        "description": "Obtiene repositorios similares",
        "body": {
            "token": {"type": "string", "example": "68gad5a69f7jl"},
            "repository_id": {"type": "int", "example": 123},
            "count": {"type": "int", "example": 10},
        },
        "response": {
            "repositories": {
                "type": "list",
                "description": "Lista de repositorios similares",
            }
        },
    },
    "http://localhost:8000/api/fastapi/recommendations/get-similar-users": {
        "category": "Recomendaciones",
        "method": "POST",
        "description": "Obtiene usuarios similares",
        "body": {
            "token": {"type": "string", "example": "68gad5a69f7jl"},
            "count": {"type": "int", "example": 10},
            "language": {"type": "list[string]", "example": ["Python", "TypeScript"]},
            "interests": {
                "type": "list[string]",
                "example": ["Machine Learning", "Data Science"],
            },
            "age": {"type": "int", "example": 32},
            "location": {"type": "string", "example": "Madrid"},
        },
        "response": {
            "users": {"type": "list", "description": "Lista de usuarios similares"}
        },
    },
    "http://localhost:8000/api/fastapi/recommendations/get-interesting-repositories": {
        "category": "Recomendaciones",
        "method": "POST",
        "description": "Obtiene repositorios interesantes",
        "body": {
            "token": {"type": "string", "example": "68gad5a69f7jl"},
            "count": {"type": "int", "example": 10},
        },
        "response": {
            "repositories": {
                "type": "list",
                "description": "Lista de repositorios interesantes",
            }
        },
    },
    "http://localhost:8000/api/fastapi/data/get-repository-summary": {
        "category": "Datos",
        "method": "POST",
        "description": "Obtiene un resumen de un repositorio",
        "body": {
            "token": {"type": "string", "example": "68gad5a69f7jl"},
            "repository_id": {"type": "int", "example": 123},
        },
        "response": {
            "repository": {"type": "object", "description": "Resumen del repositorio"}
        },
    },
    "http://localhost:8000/api/fastapi/data/get-repository-info": {
        "category": "Datos",
        "method": "POST",
        "description": "Obtiene información de un repositorio",
        "body": {
            "token": {"type": "string", "example": "68gad5a69f7jl"},
            "repository_id": {"type": "int", "example": 123},
        },
        "response": {
            "repository": {
                "type": "object",
                "description": "Información del repositorio",
            }
        },
    },
}


def run_server():
    """Inicia el servidor de FastAPI."""
    process = subprocess.Popen(SERVER_INIT_COMMAND, shell=True)
    print(
        Fore.GREEN + "[INFO] Proceso de servidor iniciado correctamente",
        Style.RESET_ALL,
    )
    return process


def stop_server(process):
    """Finaliza el servidor de FastAPI.

    Args:
        process (subprocess.Popen): El proceso del servidor.
    """
    process.terminate()
    process.wait()
    print(
        Fore.GREEN + "[INFO] Proceso de servidor finalizado correctamente",
        Style.RESET_ALL,
    )


def display_menu():
    """Muestra el menú de selección de endpoints."""
    print("Selecciona un endpoint con el que interactuar:")
    for i, (endpoint, details) in enumerate(ENDPOINTS.items(), start=1):
        print(
            f" {str(i).zfill(len(str(len(ENDPOINTS))))} - {endpoint.strip('/').split('/')[-1]} [{details['category']}] ({details['method']}): {details['description']}"
        )
    print(
        f" {str(len(ENDPOINTS) + 1).zfill(len(str(len(ENDPOINTS))))} - Finalizar servidor y salir"
    )


def get_user_input(prompt, default=None):
    """Recibe una entrada del usuario.

    Args:
        prompt (str): El mensaje de solicitud de entrada.
        default (str): El valor por defecto si no se introduce nada.

    Returns:
        str: La entrada del usuario.
    """
    user_input = input(prompt)
    return user_input if user_input else default


def main():
    """Función principal."""
    server_process = run_server()

    try:
        while True:
            print()

            display_menu()
            user_input = get_user_input("\n> Introduce tu seleccion: ")

            if (
                user_input is None
                or not user_input.isdigit()
                or not 1 <= int(user_input) < len(ENDPOINTS) + 2
            ):
                print(
                    Fore.RED + "Seleccion invalida. Intentalo de nuevo.",
                    Style.RESET_ALL,
                )
                continue

            choice = int(user_input)
            if choice == len(ENDPOINTS) + 1:
                break

            endpoint = list(ENDPOINTS.keys())[choice - 1]
            details = ENDPOINTS[endpoint]

            print(f"Endpoint seleccionado: {endpoint}")
            print(
                Fore.BLUE + Style.NORMAL,
                " Estructura del cuerpo de la peticion ".center(80, "-"),
                json.dumps(details["body"], indent=2),
                "-" * 80,
                Style.RESET_ALL,
                sep="\n",
            )

            print(
                Fore.BLUE + Style.BRIGHT,
                " Estructura de la respuesta esperada ".center(80, "-"),
                json.dumps(details["response"], indent=2),
                "-" * 80,
                Style.RESET_ALL,
                sep="\n",
            )

            body = {}
            for key, value in details["body"].items():
                body[key] = get_user_input(
                    f'>> Introduce el valor para "{key}" ({value["type"]}, ej: {value["example"]}): ',
                    None,
                )

            response = requests.request(details["method"], endpoint, json=body)

            print(
                Fore.GREEN + Style.BRIGHT,
                " Respuesta del servidor ".center(80, "-"),
                json.dumps(response.json(), indent=2),
                "-" * 80,
                Style.RESET_ALL,
                sep="\n",
            )

            sleep(2)

    # Mitiga las interrupciones por Ctrl+C:
    except KeyboardInterrupt:
        pass

    finally:
        stop_server(server_process)


if __name__ == "__main__":
    main()
