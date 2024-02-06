# LuxTrace Watches

En este repositorio se encuentra el prototipo del servicio LuxTrace, diseñado para la trazabilidad y el registro de propiedad de relojes de lujo.

Este prototipo simula la implementación para una compañía de relojes de lujo que desea adoptar el servicio LuxTrace, basado en la creación de una Dapp, para garantizar la trazabilidad y el registro de propiedad de sus productos.

El objetivo de este sistema es permitir que cada reloj cuente su propia historia. Para ello, se genera un NFT que se vincula a cada reloj fabricado por la empresa. En este NFT se registra la historia completa del reloj, desde su fabricación hasta el momento actual, proporcionando a los clientes una forma fiable de verificar la autenticidad de los relojes y registrar la propiedad de los mismos.

El Paper disponible en este mismo GitHub explica qué es LuxTrace a nivel global, los detalles técnicos de la implementación de está solución y realiza un análisis de rendimiento de la Dapp desplegada en Ethereum y en Polygon, asi mismo se peude
consultar el  [siguiente enlace](https://moonlit-cupcake-717850.netlify.app) para ver la página web del proyecto

## Próximos pasos

Los próximos pasos se centran en continuar mejorando el prototipo, específicamente en:

- **Interfaz de usuario:** El prototipo actual cuenta con una interfaz de usuario básica para probar las diferentes opciones. Los siguientes incrementos se enfocarán en fortalecer esta área.
- **Control de roles:** Se ha implementado un contrato inteligente para gestionar los roles que pueden acceder a secciones específicas de la Dapp. Queda pendiente explorar el control de acceso basado en roles que proporciona OpenZeppelin en el contrato AccessControl.
- **Búsqueda avanzada:** En el prototipo actual, para buscar un reloj es necesario introducir su número de serie único. En los siguientes incrementos, se pretende implementar un mecanismo basado en etiquetas que permita a los usuarios escanear con sus móviles y obtener directamente la información desde la blockchain.

## Instalación para desplegar la aplicación en ganache : 
Para ello, es necesario en el archivo hardhat.config.js comentar la red de Mumbai.
En el archivo create.js configurar las claves de sesión con la API del proveedor de IPFS que se tenga.

### 1. Install Dependencies:
`$ npm install`
### 2. Arranque de la Blockchain de desarrollo local, para ello primero hay que descargar Ganache
`$ npx hardhat node`

### 3. Conectar las cuentas del blockchain de desarrollo a Metamask
- Copiar la clave privada de las direcciones e importarla a Metamask
- Conecta tu metamask al hardhat blockchain, 127.0.0.1:8545.

### 4. Migrar los Smart Contracts
`npx hardhat run src/backend/scripts/deploy.js --network ganache`

### 5. Ejecutar los Tests
`$ npx hardhat test`

### 6. Lanzar el Frontend
`$ npm run start`

## Instalación para desplegar la aplicación en Polygon : 
En el archivo create.js configurar las claves de sesión con la API del proveedor de IPFS que se tenga.
### 1. Install Dependencies:
`$ npm install`

### 2. Migrar los Smart Contracts
`npx hardhat run src/backend/scripts/deploy.js --network mumbai`

### 5. Ejecutar los Tests
`$ npx hardhat test`

### 6. Lanzar el Frontend
`$ npm run start`
