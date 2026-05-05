export const createPost = (createPostUseCase) => async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const result = await createPostUseCase.execute({ title, content, author });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllPosts = (getAllPostsUseCase) => async (req, res) => {
  try {
    const posts = await getAllPostsUseCase.execute();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = (getPostByIdUseCase) => async (req, res) => {
  try {
    const post = await getPostByIdUseCase.execute(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    const msg = error.message;
    if (msg === "Invalid post id" || msg === "Post id is required") {
      return res.status(400).json({ error: msg });
    }
    if (msg === "Post not found") {
      return res.status(404).json({ error: msg });
    }
    res.status(500).json({ error: msg });
  }
};
