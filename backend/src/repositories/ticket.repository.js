import { ticketModel } from "../models/ticket.model.js";

class TicketRepository {
  async getAll() {
    return await ticketModel.find();
  }

  async getById(id) {
    return await ticketModel.findById(id);
  }

  async create(ticket) {
    return await ticketModel.create(ticket);
  }

  async update(id, ticket) {
    return await ticketModel.findByIdAndUpdate(id, ticket, { new: true });
  }

  async delete(id) {
    return await ticketModel.findByIdAndDelete(id);
  }
}

export const ticketRepository = new TicketRepository();
