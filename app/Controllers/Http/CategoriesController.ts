// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";

export default class CategoriesController {
  async getAll({ request, response }): Promise<void> {
    const { page = 1, limit = 10 } = request.all();

    const data = await Database.from("categories").paginate(page, limit);

    return response
      .status(200)
      .json({ error: false, message: "Retrieved Data", data });
  }

  async store({ request, response }): Promise<void> {
    const { name } = request.body();

    const trx = await Database.transaction();
    try {
      await trx.insertQuery().table("categories").insert({ name });
      trx.commit();
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Category Successfully Created" });
  }

  async update({ request, response }): Promise<void> {
    const { id, name } = request.all();

    const trx = await Database.transaction();
    try {
      await trx.from("categories").where("id", id).update({ name });
      trx.commit();
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Category Successfully Updated" });
  }

  async delete({ request, response }): Promise<void> {
    const { id } = request.all();

    const trx = await Database.transaction();
    try {
      await trx.from("categories").where("id", id).delete();
      trx.commit();
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Category Successfully Deleted" });
  }
}
