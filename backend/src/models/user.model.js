import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Para el hashing de contraseñas

export const userCollectionName = "users";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(value) {
        // Expresión regular para validar el formato del email
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
}, { timestamps: true });

// Middleware de Mongoose para encriptar la contraseña antes de guardar
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next(); // Si no se modificó la contraseña, pasar al siguiente middleware

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Hashear la contraseña
    next();
  } catch (err) {
    next(err);
  }
});

// Método para verificar la contraseña
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Comparar contraseña en texto plano con el hash
};

// Método para ocultar la contraseña cuando se serializa el objeto
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password; // Eliminar la contraseña del objeto JSON
  return obj;
};

const User = mongoose.model(userCollectionName, userSchema);
export default User;