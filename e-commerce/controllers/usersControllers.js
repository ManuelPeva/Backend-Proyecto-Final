const crearUser = (req, res) => {
    res.status(201).json({message: 'Crear Usuario' })
}

const loginUser = (req, res) => {
    res.status(201).json({message: 'Login del usuario' })
}

const datosUser = (req, res) => {
    res.status(201).json({message: 'Datos del usuario' })
}
