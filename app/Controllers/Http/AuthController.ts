// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  async doLogin({ auth, request, response }): Promise<void> {
    const { email, password } = request.body();
    let token = null;

    try {
      if (email && password) {
        token = await auth.attempt(email, password);
      } else {
        return response
          .status(400)
          .json({ error: true, message: "Email or Password is Empty" });
      }
    } catch (error) {
      return response.status(400).json({ error: true, message: error.message });
    }

    return response.status(200).json({
      error: false,
      message: "Successfully Login",
      accessToken: token,
    });
  }

  async doLogout({ auth, response }): Promise<void> {
    await auth.use("api").revoke();
    return response
      .status(200)
      .json({ error: false, message: "Logout successfully" });
  }
}
