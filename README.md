### Relacion N:M
En la relacion de muchos a muchos se utilizo el referenciado en una coleccion intermedia para poder crear las relaciones entre owners y stores

### Relacion 1:M
En la relacion de uno muchos se utilizo se utilizo el referenciado para que al crear un producto, se utilize el id de la tabla tienda para crear la relacion y asi que muchos productos posean una sola tienda.


### Relacion de 1:1
En esta la relacion se hace mediante el referenciado de la tienda y se indica que al momento de agregar la referencia el valor es unico indicandole asi a a el modelo que esta relacion no se va a repetir.
// Relacion de uno a uno con la tienda
    tienda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
        unique: true
    }







  


