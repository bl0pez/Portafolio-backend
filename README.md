# Portafolio

## Instalación
1. Clonar el repositorio
2. Clonar el archivo .env.example y renombrarlo a .env
2. Ejecutar el proyecto en docker
    - Desarrollo
        ```bash
        docker compose -f docker-compose-dev.yml up
        ```
    - Producción
        ```bash
        docker compose up
        ```

## ENDPOINTS
- [GET] /api/portafolio - Obtener todos los proyectos
- [POST] /api/send-email - Enviar un correo electrónico
- [POST] /api/seed - Carga los proyectos en la base de datos



