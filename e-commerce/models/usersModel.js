const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Por favor es necesario poner tu nombre']
    },
    email: {
        type: String,
        required: [true, 'es necesario poner tu email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'es necesario poner una contraseña']
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);
