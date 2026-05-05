import Post from "../../Domain/entities/Post.js";
import IPostRepository from "../../Domain/interfaces/IPostRepository.js";

class CreatePost {
  constructor(postRepository, kafkaProducer) {
    if (!(postRepository instanceof IPostRepository)) {
      throw new Error("Repository must implement IPostRepository");
    }
    this.postRepository = postRepository;
    this.kafkaProducer = kafkaProducer;
  }

  async execute(postData) {
    // 1. Create Domain Entity
    const post = new Post({
      title: postData.title,
      content: postData.content,
      author: postData.author,
    });

    // 2. Persist to MongoDB via Infrastructure Repository
    const savedPost = await this.postRepository.save(post);

    // 3. Extract correct ID (handling Mongoose _id or generic id)
    const postId = savedPost._id || savedPost.id;

    // 4. Send Event to Kafka
    try {
      await this.kafkaProducer.sendEvent("post-events", {
        eventType: "POST_CREATED",
        data: {
          id: postId,
          title: savedPost.title,
          author: savedPost.author,
          createdAt: new Date(),
        },
      });
      console.log(`Event published for Post: ${postId}`);
    } catch (error) {
      // We log the error but return the savedPost so the user's request doesn't "fail"
      // just because the notification system is lagging.
      console.error(
        `Post ${postId} saved, but Kafka notification failed:`,
        error.message,
      );
    }

    return savedPost;
  }
}

export default CreatePost;
