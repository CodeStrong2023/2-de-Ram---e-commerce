import mercadopago from "../config/mercadoPagoConfig.js";  // Asegúrate de importar correctamente

export const createPaymentPreference = async (req, res) => {
  const { items } = req.body;  // Los productos enviados desde el frontend

  // Estructura de la preferencia para Mercado Pago
  const preference = {
    items: items.map(item => ({

        
      title: item.name,  // Asegúrate de que el nombre del producto esté correcto
      quantity: item.quantity,
      currency_id: "ARS",  // La moneda en la que se va a pagar (ARS - Pesos Argentinos)
      unit_price: item.price,  // El precio del producto
    })),
    back_urls: {
      success: "http://localhost:3000/success",  // URL donde se redirige al usuario después de un pago exitoso
      failure: "http://localhost:3000/failure",  // URL en caso de que el pago falle
      pending: "http://localhost:3000/pending",  // URL para estado de pago pendiente
    },
    auto_return: "approved",  // Redirigir automáticamente al aprobar el pago
  };

  try {
    // Crear la preferencia de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);

    // Enviar el punto de inicio de la transacción (init_point) al frontend
    res.status(200).json({ id: response.body.id, init_point: response.body.init_point });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({ error: "Error al crear la preferencia de pago" });
  }
};