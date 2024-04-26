# PARA EL FRONTEND:
Ingresar a la capeta del frontend
```bash
cd ./invento-track-frontend
```
Instalar dependencias 
```bash
npm install
```
Ejecutar proyecto 
```bash
npm run dev
```

# PARA EL BACKEND:

## Requisitos previos

Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente:

- Python 3.x
- PostgreSQL

## Configuración inicial

### 1. Crear un entorno virtual

```bash
python3 -m venv venv
```

### 2. Activar el entorno virtual

En sistemas Unix o MacOS:

```bash
source venv/bin/activate
```
Windows:
```bash
venv\Scripts\activate
```

### 3. Instalar las dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar PostgreSQL
.-Crea una nueva base de datos en PostgreSQL para el proyecto.
.-Actualiza la URI de conexión en el archivo config.py con los detalles de tu base de datos.

```bash
psql -U tu_usuario -c "CREATE DATABASE inventoTrack;"
```

## Ejecutar la aplicación:

```bash
python run.py
```


