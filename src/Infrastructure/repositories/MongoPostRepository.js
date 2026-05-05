import { PostModel } from "../database/models/PostModel.js";
import Post from "../../Domain/entities/Post.js";
import IPostRepository from "../../Domain/interfaces/IPostRepository.js";

class MongoPostRepository extends IPostRepository {
  async save(post) {
    const persistencePost = new PostModel({
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
    });

    const savedDoc = await persistencePost.save();

    return new Post({
      id: savedDoc._id.toString(),
      title: savedDoc.title,
      content: savedDoc.content,
      author: savedDoc.author,
      createdAt: savedDoc.createdAt,
    });
  }

  async findAll() {
    const docs = await PostModel.find();
    return docs.map(
      (doc) =>
        new Post({
          id: doc._id.toString(),
          title: doc.title,
          content: doc.content,
          author: doc.author,
          createdAt: doc.createdAt,
        }),
    );
  }

  async findById(id) {
    const doc = await PostModel.findById(id);
    if (!doc) return null;
    return new Post({
      id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      author: doc.author,
      createdAt: doc.createdAt,
    });
  }
}

export default MongoPostRepository;
