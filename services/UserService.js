class UserService {
  constructor(knex) {
    this.knex = knex;
  }

  async create(username, password, email) {
    try {
      return await this.knex("users").insert({
        username: username,
        password: password,
        email: email
      });
    } catch (e) {
      console.log(e);
    }
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
