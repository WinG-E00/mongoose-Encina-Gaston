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
