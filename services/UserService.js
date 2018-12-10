class UserService {
  constructor(knex) {
    this.knex = knex;
  }

  async changePW(user, password) {
    try {
      return await this.knex("users")
        .update("password", password)
        .where("username", user);
    } catch (e) {
      console.log(e);
    }
  }

  async getProfile(user) {
    try {
      return await this.knex("users").where("username", user);
    } catch (e) {
      console.log(e);
    }
  }
}
