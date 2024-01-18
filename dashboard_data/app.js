let week = [
    [ // monday 
        {name: "OPH", start: "8:00"}, {name: "pause", start: "8:45"}, {name: "CIT", start: "8:55"}, {name: "pause", start: "9:40"}, {name: "CJL", start: "10:00"}, {name: "free", start: "10:45"}, {name: "ANJ", start: "11:50"}, {name: "pause", start: "12:35"}, {name: "PRG", start: "12:45"}, {name: "pause", start: "13:30"}, {name: "PRA", start: "13:40"}, {name: "end", start: "15:40"}
    ],
    [ // tuesday
        {name: "MAT", start: "8:00"}, {name: "pause", start: "8:45"}, {name: "FYZ", start: "8:55"}, {name: "pause", start: "9:40"}, {name: "ZSV", start: "10:00"}, {name: "free", start: "10:45"}, {name: "OPH", start: "11:50"}, {name: "pause", start: "13:20"}, {name: "FYZ", start: "13:40"}, {name: "end", start: "14:25"}
    ],
    [ // wednesday
        {name: "DBS", start: "8:00"}, {name: "pause", start: "8:45"}, {name: "CIT", start: "8:55"}, {name: "pause", start: "9:40"}, {name: "ANJ", start: "10:00"}, {name: "free", start: "10:45"}, {name: "OPH", start: "11:50"}, {name: "pause", start: "12:35"}, {name: "ZSV", start: "12:45"}, {name: "pause", start: "13:30"}, {name: "MAT", start: "13:40"}, {name: "pause", start: "14:25"}, {name: "DBS", start: "14:35"}, {name: "end", start: "16:05"}
    ],
    [ // thursday
        {name: "CJL", start: "8:00"}, {name: "pause", start: "8:45"}, {name: "WEB", start: "8:55"}, {name: "pause", start: "9:40"}, {name: "MAT", start: "10:00"}, {name: "pause", start: "10:45"}, {name: "ANJ", start: "10:55"}, {name: "pause", start: "11:40"}, {name: "TEV", start: "11:50"}, {name: "end", start: "13:20"}
    ],
    [ // friday
        {name: "MME", start: "8:00"}, {name: "pause", start: "9:30"}, {name: "PRG", start: "10:00"}, {name: "pause", start: "11:30"}, {name: "WEB", start: "11:50"}, {name: "end", start: "13:20"}
    ],
    [], [] // saturday, sunday
];

let trams = [
    "3 13:08", "2 13:16", "3 13:23", "2 13:31", "3 13:38", "2 13:46", "3 13:53", 
    "2 14:01", "3 14:08", "2 14:16", "3 14:23", "2 14:31", "3 14:38", "2 14:46", "3 14:53",
    "2 15:01", "3 15:08", "2 15:16", "3 15:23", "2 15:31", "3 15:38", "2 15:46", "3 15:53",
    "2 16:01", "3 16:08", "2 16:16", "3 16:23", "2 16:31", "3 16:38", "2 16:46", "3 16:53",
    "2 17:01", "3 17:09", "2 17:19", "3 17:29", "3 17:39", "2 17:49",
    "3 18:01", "2 18:13", "3 18:25", "2 18:37", "3 18:49"
];

window.addEventListener("load", (event) => {
    const date = new Date();
    let dayIndex = date.getDay() - 1;
    if (dayIndex == -1) {
        dayIndex = 6;
    }

    let dayArray = week[dayIndex];

    let time = date.getHours() * 60 + date.getMinutes()
    // let time = 10 * 60 + 32

    let empty = true;

    for (const key in dayArray) {
        const hour = dayArray[key];

        let timeArr = hour.start.split(":");
        let hourTime = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);

        if (time <= hourTime && hour.name != "end") {
            empty = false;
            const main = document.createElement("div");
            main.className = "schedule__item";
            if (hour.name == "pause") {
                main.className = "schedule__item schedule__item--pause";
            }
            const para = document.createElement("p");
            let futureTime = dayArray[parseInt(key) + 1];
            let futureTimeArr = futureTime.start.split(":");
            let node = document.createTextNode(hour.name + " : " + timeArr[0] + ":" + timeArr[1] + " - " + futureTimeArr[0] + ":" + futureTimeArr[1]);
            para.appendChild(node);
            main.appendChild(para);

            const element = document.getElementById("today");
            element.appendChild(main);
        }
    }

    if (empty) {
        const main = document.createElement("div");
        main.className = "schedule__item";
        const para = document.createElement("p");
        let node = document.createTextNode("Nothing here!");
        para.appendChild(node);
        main.appendChild(para);

        const element = document.getElementById("today");
        element.appendChild(main);   
    }

    let possibleTrams = [];

    for (const hour of trams) {
        let timeArr = hour.split(" ")[1].split(":");
        let hourTime = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);

        if (time <= hourTime) {
            possibleTrams.push(hour);
        }         
    
        if (possibleTrams.length >= 10) {break;};
    }

    for (const hour of possibleTrams) {
        const main = document.createElement("div");
        main.className = "schedule__item schedule__item--tram";
        const para = document.createElement("p");
        let timeArr = hour.split(" ")[1].split(":");
        let node = document.createTextNode(hour.split(" ")[0] + " - " + timeArr[0] + ":" + timeArr[1]);
        para.appendChild(node);
        main.appendChild(para);

        const element = document.getElementById("trams");
        element.appendChild(main);
    }
});