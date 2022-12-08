// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Category from 'App/Models/Category'

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

  async update({ params, request, response }): Promise<void> {
    const { name } = request.all();

    const trx = await Database.transaction();
    try {
      const data = await trx.from("categories").where("id", params.id).first();
      if (!data) {
        return response.status(404).json({ error: false, message: 'Data not found' });
      }
      await trx.from("categories").where("id", params.id).update({ name });
      trx.commit();
    } catch (error) {
      trx.rollback();
      return response.status(400).json({ error: true, message: error.message });
    }

    return response
      .status(200)
      .json({ error: false, message: "Category Successfully Updated" });
  }

  async delete({ params, response }): Promise<void> {
    const trx = await Database.transaction();
    try {
      const category = await Category.findOrFail(params.id);
      await category.delete();
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
