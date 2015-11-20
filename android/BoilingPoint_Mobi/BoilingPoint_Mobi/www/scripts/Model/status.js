function StatusModel(data) {
    this.type = data.Type || "";
    this.data = new DataModel(data.Data || null);
}