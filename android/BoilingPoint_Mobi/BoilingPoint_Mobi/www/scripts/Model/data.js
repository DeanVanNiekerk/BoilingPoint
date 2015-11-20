function DataModel(data) {
    this.on = data.On || null;
    this.temp = data.Temp || 0;
    this.level = data.Level || "";
}