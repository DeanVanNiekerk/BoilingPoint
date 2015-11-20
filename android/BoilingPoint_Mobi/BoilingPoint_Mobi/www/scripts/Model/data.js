function DataModel(data) {
    
    var onValue = 'Off';
    if (data && data.On === true)
        onValue = 'On';
    
    this.on = onValue;
    this.temp = data ? data.Temp : 0;
    this.level = data ? data.Level : "0%";
}