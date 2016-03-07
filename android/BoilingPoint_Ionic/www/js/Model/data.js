function DataModel(data) {
    
    this.onBool = data && data.On === "True";
    this.onText = this.onBool === true ? "On" : "Off";
    this.temp = data ? data.Temp : 0;
    this.level = data ? data.Level : "0%";
}