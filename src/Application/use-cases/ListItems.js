class ListItems {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute() {
    return await this.postRepository.findAll();
  }
}

export default ListItems;
