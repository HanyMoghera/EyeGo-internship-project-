class Post {
  constructor({ id, title, content, author, createdAt }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt || new Date();
    this.validate();
  }

  validate() {
    if (!this.title || this.title.length < 5) {
      throw new Error("Title is required and must at least 5 charachters long");
    }
    if (!this.content) {
      throw new Error("Content is required");
    }
    if (!this.author || String(this.author).trim().length === 0) {
      throw new Error("Author is required");
    }
  }
}

export default Post;
