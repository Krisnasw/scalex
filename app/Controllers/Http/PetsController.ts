// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";

export default class PetsController {
  async getAll({ request, response }): Promise<void> {
    const { page = 1, limit = 10 } = request.all();

    const data = await Database.from("pets")
      .select("pets.*")
      .paginate(page, limit);

    return response
      .status(200)
      .json({ error: false, message: "Retrieved Data", data });
  }

  async store({ request, response }): Promise<void> {
    const { masterId, categoryId, name, dob } = request.body();

    const trx = await Database.transaction();

    try {
      await trx.insertQuery().table("pets").insert({
        master_id: masterId,
        category_id: categoryId,
        name,
        dob,
      });
      trx.commit();
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Successfully Create Pet" });
  }

  async update({ params, request, response }): Promise<void> {
    const { masterId, categoryId, name, dob } = request.all();

    const trx = await Database.transaction();

    try {
      const data = await trx.from("pets").where("id", params.id).first();
      if (!data) {
        return response.status(404).json({ error: false, message: 'Data not found' });
      }
      await trx.from("pets").where("id", params.id).update({ master_id: masterId, category_id: categoryId, name, dob });
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Successfully Update Pet" });
  }

  async delete({ params, response }): Promise<void> {
    const trx = await Database.transaction();

    try {
      const data = await trx.from("pets").where("id", params.id).first();
      if (!data) {
        return response.status(404).json({ error: false, message: 'Data not found' });
      }
      await trx.from("pets").where("id", params.id).delete();
      trx.commit();
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Successfully Delete Pet" });
  }
}
