# Trabajo práctico de Mongoose

API desarrollada con Node.js, Express y Mongoose para administrar tiendas, propietarios, productos y habilitaciones en MongoDB.

## Cómo iniciar el proyecto

1. Tener instalados Node.js y npm, y disponer de una base de datos MongoDB local o en MongoDB Atlas.
2. Abrir una terminal en la carpeta del proyecto e instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz del proyecto con estas variables:

   ```env
   PORT=3000
   URI_MONGODBATLAS=mongodb://127.0.0.1:27017/tiendas
   ```

   El ejemplo utiliza MongoDB local, que debe estar en ejecución. Si se utiliza Atlas, reemplazar la URI por la cadena de conexión de la propia base de datos y habilitar el acceso desde la IP del equipo en Atlas.

4. Iniciar el servidor:

   ```bash
   npm run dev
   ```

   Este comando ejecuta `app.js` con `node --watch`, por lo que el servidor se reinicia al guardar cambios. Para detenerlo, presionar `Ctrl+C`.

5. Abrir `http://localhost:3000/test`. Si el servidor está funcionando, responde `Ok`. Además, comprobar en la terminal el mensaje `Se conecto correctamente a la base de datos de mongodb`, porque la ruta `/test` solo comprueba el servidor, no la conexión a la base de datos.

Las rutas de la API comienzan con `/api`; por ejemplo, `GET http://localhost:3000/api/store/getAllStores` permite consultar las tiendas.

## Cómo funcionan los IDs y las relaciones

MongoDB genera un campo `_id` para identificar cada documento. Los campos de tipo `Schema.Types.ObjectId` con `ref` guardan el `_id` de un documento de otro modelo. Por ejemplo, `Product.tienda` guarda el `_id` de una tienda, no su nombre ni todos sus datos.

| Campo que guarda la referencia | ID al que apunta | Para qué sirve |
| --- | --- | --- |
| `OwnerStore.owner` | `Owner._id` | Identificar al propietario de la asociación. |
| `OwnerStore.store` | `Store._id` | Identificar la tienda de la asociación. |
| `Product.tienda` | `Store._id` | Indicar a qué tienda pertenece el producto. |
| `Habilitacion.tienda` | `Store._id` | Indicar a qué tienda corresponde la habilitación. |

Primero se crean la tienda y el propietario. Luego se usan sus `_id` para crear productos, habilitaciones y asociaciones en `OwnerStore`. El `_id` propio de un producto, una habilitación o una asociación identifica ese documento; es distinto del ID de la tienda o del propietario que referencia.

Por ejemplo, si una tienda tiene `_id: "507f1f77bcf86cd799439011"`, un producto asociado debe guardar `tienda: "507f1f77bcf86cd799439011"`. Varios productos pueden guardar ese mismo valor porque pertenecen a la misma tienda.

## Relaciones entre los modelos

### Relación N:M Propietarios y tiendas

En la relación de muchos a muchos, un propietario (`Owner`) puede estar asociado a varias tiendas (`Store`), y una tienda puede tener varios propietarios. Para conectar ambos modelos se utiliza una colección intermedia llamada `OwnerStore`.

Cada documento de esta colección guarda dos referencias de tipo `Schema.Types.ObjectId`: `owner`, con el identificador del propietario, y `store`, con el identificador de la tienda. Así, cada documento representa una asociación entre ambos, sin duplicar sus datos. Además, un índice compuesto único sobre `owner` y `store` evita registrar dos veces la misma pareja de propietario y tienda.

### Relación 1:M Tiendas y productos

En la relación de uno a muchos, una tienda (`Store`) puede tener varios productos (`Product`), pero cada producto pertenece a una sola tienda.

Esta conexión se realiza desde el modelo `Product`, mediante el campo obligatorio `tienda`, que guarda el identificador de la tienda como un `Schema.Types.ObjectId` con `ref: 'Store'`. Como este campo no es único, varios productos pueden guardar el mismo identificador de tienda y quedar asociados a ella.

### Relación 1:1 Tiendas y habilitaciones

En la relación de uno a uno, cada habilitación (`Habilitacion`) está asociada a una sola tienda (`Store`), y una tienda puede tener como máximo una habilitación registrada.

La conexión se realiza mediante el campo `tienda` del modelo `Habilitacion`:

```js
tienda: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
    unique: true
}
```

La opción `required: true` hace obligatoria la referencia a una tienda. Por su parte, `unique: true` define un índice único que impide guardar dos habilitaciones con el mismo identificador de tienda. Esto limita la relación a una habilitación por tienda, aunque no obliga a que todas las tiendas tengan una habilitación.


## Datos embebidos: la vigencia de una habilitación

En `Habilitacion`, el campo `vigencia` es un objeto embebido (anidado) que contiene `fechaEmision` y `fechaVencimiento`:

```json
{
  "numero": 123,
  "actividad": "Venta de alimentos",
  "vigencia": {
    "fechaEmision": "2026-01-01T00:00:00.000Z",
    "fechaVencimiento": "2027-01-01T00:00:00.000Z"
  },
  "tienda": "507f1f77bcf86cd799439011"
}
```

`vigencia` se guarda dentro del mismo documento de la habilitación. No es un modelo independiente, no tiene una colección propia ni un `_id` propio en este esquema, y no utiliza `ref`.

Tiene sentido embeber estas fechas porque describen la vigencia de esa habilitación, se consultan junto con ella y no necesitan compartirse con otros documentos. Así se obtienen todos esos datos en una sola consulta, sin crear otra colección para dos fechas.

En cambio, las tiendas y los propietarios tienen datos y operaciones propios, y pueden participar en distintas asociaciones. Por eso se guardan como documentos separados y se relacionan mediante referencias.
