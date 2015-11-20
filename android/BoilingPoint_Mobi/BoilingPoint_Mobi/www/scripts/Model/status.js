function StatusModel(data) {
    this.type = data ? data.Type : "";
    this.data = new DataModel(data ? data.Data : null);
}