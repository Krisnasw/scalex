// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";

export default class MastersController {
  async getAll({ request, response }): Promise<void> {
    const { page = 1, limit = 10 } = request.all();

    const data = await Database.from("masters").paginate(page, limit);

    return response
      .status(200)
      .json({ error: false, message: "Retrieved Data", data });
  }

  async store({ request, response }): Promise<void> {
    const { firstName, lastName, description, favorites } = request.body();

    const trx = await Database.transaction();

    try {
      await trx.insertQuery().table("masters").insert({
        first_name: firstName,
        last_name: lastName,
        description,
        favorites,
      });
      trx.commit();
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Successfully Create Master" });
  }

  async show({ request, response }): Promise<void> {
    const { id } = request.all();

    const data = await Database.from("masters").where(id).first();

    return response
      .status(200)
      .json({ error: false, message: "Retrieve Data", data });
  }

  async update({ request, response }): Promise<void> {
    const { id, firstName, lastName, description, favorites } = request.all();

    const trx = await Database.transaction();

    try {
      await trx.from("masters").where("id", id).update({ first_name: firstName, last_name: lastName, description, favorites });
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Successfully Update Master" });
  }

  async delete({ request, response }): Promise<void> {
    const { id } = request.all();

    const trx = await Database.transaction();

    try {
      await trx.from("masters").where(id).delete();
      trx.commit();
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Successfully Delete Master" });
  }
}
