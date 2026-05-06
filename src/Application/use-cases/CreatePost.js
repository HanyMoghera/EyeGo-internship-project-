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
    const post = new Post({
      title: postData.title,
      content: postData.content,
      author: postData.author,
    });

    const savedPost = await this.postRepository.save(post);

    const postId = savedPost._id || savedPost.id;

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
      console.error(
        `Post ${postId} saved, but Kafka notification failed:`,
        error.message,
      );
    }

    return savedPost;
  }
}

export default CreatePost;
