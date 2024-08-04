# Ecommerce App

Esta es una aplicación de comercio electrónico desarrollada como parte de una prueba técnica. La aplicación permite a los usuarios registrarse, iniciar sesión, navegar por categorías de productos, agregar productos al carrito, y proceder a la compra.

## Características

- **Login y Registro de Usuarios (Clientes)**
- **Listado de Categorías que contienen Productos**
- **Añadir Producto al Carrito**
- **Opción de Compra**
- **Generación de Factura**

## Tecnologías Utilizadas

- **Backend**: .NET Core
- **Frontend**: Angular
- **Base de Datos**: SQL Server

## Configuración del Proyecto

### Requisitos Previos

- .NET Core SDK
- Node.js y npm
- Angular CLI
- SQL Server

### Instalación

1. **Clona el repositorio**:
    ```bash
    git clone https://github.com/Eliezer-09/Prueba_Tecnica_Viamatica.git
    cd Prueba_Tecnica_Viamatica
    ```

2. **Configuración del Backend**:
    - Navega a la carpeta del backend:
      ```bash
      cd "Back end/EcommerceAPI"
      ```
    - Restaura las dependencias y ejecuta el proyecto:
      ```bash
      dotnet restore
      dotnet run
      ```

3. **Configuración del Frontend**:
    - Navega a la carpeta del frontend:
      ```bash
      cd "../../Front end/ecommerce-app"
      ```
    - Instala las dependencias y ejecuta el proyecto:
      ```bash
      npm install
      ng serve
      ```

4. **Base de Datos**:
    - Configura tu servidor SQL Server y actualiza la cadena de conexión en `appsettings.json`.
    - Ejecuta los scripts SQL para crear las tablas y llenar datos iniciales desde la carpeta `sql`.

### Uso

1. Navega a `http://localhost:4200` en tu navegador.
2. Regístrate o inicia sesión.
3. Navega por las categorías y agrega productos al carrito.
4. Procede a la compra y revisa la factura generada.

## Estructura del Proyecto

- **Backend**: Carpeta `Back end/EcommerceAPI`
- **Frontend**: Carpeta `Front end/ecommerce-app`
- **Scripts SQL**: Carpeta `sql`

## Contacto

Para cualquier pregunta o problema, por favor abre un issue en el repositorio o contacta a elicabezas10@gmail.com

---

Esta aplicación fue desarrollada como parte de una prueba técnica el 4 de agosto de 2024.
