class CommentService {
  constructor(knex) {
    this.knex = knex;
  }

  async list(recipeID) {
    try {
      let query = await this.knex
        .select("users.id", "users.username", "comments.content")
        .from("comments")
        .innerJoin("recipes", "comments.recipe_id", "recipes.id")
        .innerJoin("users", "comments.user_id", "users.id")
        .where("recipes.id", recipeID);
      return query;
    } catch (e) {
      console.log(e);
    }
  }

  async add(recipeID, user, content) {
    try {
      let query = await this.knex
        .select("id")
        .from("users")
        .where("users.username", user)
        .first();
      return this.knex
        .insert({
          content: content,
          recipe_id: recipeID,
          user_id: query.id
        })
        .into("comments");
    } catch (e) {
      console.log(e);
    }
  }
}
