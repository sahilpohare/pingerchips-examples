const pingerchips = new Pingerchips("PINGERCHIPS APP KEY", {
    wsPort: 6001,
    forceTLS: false,
    cluster: "mt1"
});


// Subscribe to a Channel
const channel = pingerchips.subscribe("graph-data");

var cnt = 0;

// Setup a listner on same channel "graph-data" to listen for message events named "client-message"
// Update the graph based on the recieved events
channel.bind("client-message", (data) => {

    Plotly.extendTraces('chart', { y: [[data.value]] }, [0]);
    cnt++;
    if (cnt > 500) {
        Plotly.relayout('chart', {
            xaxis: {
                range: [cnt - 500, cnt]
            }
        });
    }
});
