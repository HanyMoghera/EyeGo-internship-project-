import mongoose from "mongoose";

class GetItem {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute(id) {
    if (!id || String(id).trim() === "") {
      throw new Error("Post id is required");
    }
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid post id");
    }

    let post;
    try {
      post = await this.postRepository.findById(id);
    } catch (error) {
      if (error.name === "CastError") {
        throw new Error("Invalid post id");
      }
      throw error;
    }

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }
}

export default GetItem;
