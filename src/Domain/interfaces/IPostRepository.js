class IPostRepository {
  save(post) {
    throw new Error("Method 'save()' must be implemented.");
  }
  findById(id) {
    throw new Error("Method 'findById()' must be implemented.");
  }
  findAll() {
    throw new Error("Method 'findAll()' must be implemented.");
  }
}

export default IPostRepository;
