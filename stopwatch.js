function Stopwatch(args) {

    // ************************************************************************ 
    // PRIVATE VARIABLES AND FUNCTIONS 
    // ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
    // ***********************************************************************
    this.timeSpan = new TimeSpan();
    
    var status = 0;

    var timer = 0;

    var initialTime = this.timeSpan;

    var elapsedTime = new TimeSpan(0, 0, 0);

    var oneSecond = new TimeSpan(0, 0, 1);

    // ************************************************************************ 
    // PRIVILEGED METHODS 
    // MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
    // MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
    // ************************************************************************

    this.do_elapsedTime = function () {
        elapsedTime = elapsedTime.add(oneSecond);
    }

    // ************************************************************************ 
    // GETTERS AND SETTERS
    // Stupid amount of getters and setters, 
    // not sure if they are needed to this extent
    // ************************************************************************

    this.getStatus = function () {
        return status
    }

    this.setStatus = function (val) {
        status = val;
    }

    this.getTimer = function () {
        return timer;
    };

    this.setTimer = function (val) {
        timer = val;
    };

    this.getInitialTime = function () {
        return initialTime;
    };

    this.setInitialTime = function (val) {
        initialTime = val;
    };

    this.getElapsedTime = function () {
        return elapsedTime;
    };

    this.setElapsedTime = function (val) {
        elapsedTime = val;
    };
}

Stopwatch.prototype.start = function () {
    var elapsedTime = this.getInitialTime();
    this.setElapsedTime(elapsedTime);

    var timer = setInterval(this.do_elapsedTime, 1000);
    this.setTimer(timer);

    this.setStatus(1);
}

Stopwatch.prototype.stop = function () {
    var timer = this.getTimer();
    var clearedTimer = clearInterval(timer);
    this.setTimer(clearedTimer);

    this.setStatus(0);
}

Stopwatch.prototype.reset = function () {
    var timer = this.getTimer();
    var clearedTimer = clearInterval(timer);
    this.setTimer(clearedTimer);

    var resetTime = new TimeSpan(0, 0, 0);
    this.setElapsedTime(resetTime);

    this.setStatus(0);
}

Stopwatch.prototype.toMilliseconds = function () {
    var time = this.getElapsedTime();

    time = time.totalMilliseconds();
    return time;
}

Stopwatch.prototype.toHoursRounded = function () {
    var time = this.getElapsedTime();

    time = Math.round(time.totalHours() * 100) / 100;

    return (time % 1 == 0 ? time + '.00' : time)
}

Stopwatch.prototype.toJson = function () {

    var time = this.getElapsedTime();

    var timeJson = { days: TimeSpan.pad(Math.abs(time.days())),
        hours: TimeSpan.pad(Math.abs(time.hours())),
        minutes: TimeSpan.pad(Math.abs(time.minutes())),
        seconds: TimeSpan.pad(Math.abs(time.seconds())),
        milliseconds: TimeSpan.pad(Math.abs(time.milliseconds()))
    };

    return timeJson;
}

Stopwatch.prototype.toString = function (returnMode) {
    var time = this.getElapsedTime();

    ms = time.milliseconds();
    sec = time.seconds();
    min = time.minutes();
    hr = time.hours();
    day = time.days();

    totalMs = time.totalMillisecondsRounded();
    totalSec = time.totalSecondsRounded();
    totalMin = time.totalMinutesRounded();
    totalHr = time.totalHoursRounded();
    totalDay = time.totalDaysRounded();

    switch (returnMode) {
        case 0: // output: 1.02:03:00 day.hour:min:sec
            return (time._millis < 0 ? "-" : "") +
                       (Math.abs(day) ? TimeSpan.pad(Math.abs(day)) + "." : "") +
                       TimeSpan.pad(Math.abs(hr)) + ":" +
                       TimeSpan.pad(Math.abs(min)) + ":" +
                       TimeSpan.pad(Math.abs(sec));
            break;
        case 1: // output: 01 day 02 hours 03 mins 00 secs
            if (Math.abs(day))
                return (time._millis < 0 ? "-" : "") +
                           (Math.abs(day) == 1 ? TimeSpan.pad(Math.abs(day)) + " day " : TimeSpan.pad(Math.abs(day)) + " days ") +
                           (Math.abs(hr) == 1 ? TimeSpan.pad(Math.abs(hr)) + " hour " : TimeSpan.pad(Math.abs(hr)) + " hours ") +
                           (Math.abs(min) == 1 ? TimeSpan.pad(Math.abs(min)) + " min " : TimeSpan.pad(Math.abs(min)) + " mins ") +
                           (Math.abs(sec) == 1 ? TimeSpan.pad(Math.abs(sec)) + " sec " : TimeSpan.pad(Math.abs(sec)) + " secs ");
            else
                return (time._millis < 0 ? "-" : "") +
                           (Math.abs(hr) == 1 ? TimeSpan.pad(Math.abs(hr)) + " hour " : TimeSpan.pad(Math.abs(hr)) + " hours ") +
                           (Math.abs(min) == 1 ? TimeSpan.pad(Math.abs(min)) + " min " : TimeSpan.pad(Math.abs(min)) + " mins ") +
                           (Math.abs(sec) == 1 ? TimeSpan.pad(Math.abs(sec)) + " sec " : TimeSpan.pad(Math.abs(sec)) + " secs ");
            break;
        case 2: // output: 1 day 2 hours 3 mins 0 secs
            if (Math.abs(day))
                return (time._millis < 0 ? "-" : "") +
                           (Math.abs(day) == 1 ? Math.abs(day) + " day " : Math.abs(day) + " days ") +
                           (Math.abs(hr) == 1 ? Math.abs(hr) + " hour " : Math.abs(hr) + " hours ") +
                           (Math.abs(min) == 1 ? Math.abs(min) + " min " : Math.abs(min) + " mins ") +
                           (Math.abs(sec) == 1 ? Math.abs(sec) + " sec " : Math.abs(sec) + " secs ");
            else
                return (time._millis < 0 ? "-" : "") +
                           (Math.abs(hr) == 1 ? Math.abs(hr) + " hour " : Math.abs(hr) + " hours ") +
                           (Math.abs(min) == 1 ? Math.abs(min) + " min " : Math.abs(min) + " mins ") +
                           (Math.abs(sec) == 1 ? Math.abs(sec) + " sec " : Math.abs(sec) + " secs ");
            break;
        case 3: // output: 26 hours 3 mins 0 secs - note - does not display days only hours
            return (time._millis < 0 ? "-" : "") +
                           (Math.abs(totalHr) == 1 ? Math.abs(totalHr) + " hour " : Math.abs(totalHr) + " hours ") +
                           (Math.abs(min) == 1 ? Math.abs(min) + " min " : Math.abs(min) + " mins ") +
                           (Math.abs(sec) == 1 ? Math.abs(sec) + " sec " : Math.abs(sec) + " secs ");
            break;
        case 4: // output: 26:03:00 hour:min:sec - note - does not display days only hours
                return (time._millis < 0 ? "-" : "") +
                           TimeSpan.pad(Math.abs(totalHr)) + ":"  +
                           TimeSpan.pad(Math.abs(min)) + ":" +
                           TimeSpan.pad(Math.abs(sec));
            break;
        default: // output: 1.02:03:00 day.hour:min:sec
            return (time._millis < 0 ? "-" : "") +
                           (Math.abs(day) ? TimeSpan.pad(Math.abs(day)) + "." : "") +
                           TimeSpan.pad(Math.abs(hr)) + ":" +
                           TimeSpan.pad(Math.abs(min)) + ":" + TimeSpan.pad(Math.abs(sec)) + "." +
                           Math.abs(ms);
    }

}

/**
* Class that handles time related operations.
* It is very similar to .NET's TimeSpan class
* Find reference and documentation at: http://menendezpoo.com
*/
function TimeSpan() {

    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;

    switch (arguments.length) {
        case 0:
            break;
        case 1:
            milliseconds = arguments[0];
            break;
        case 2:
            days = arguments[0];
            hours = arguments[1];
            break;
        case 3:
            hours = arguments[0];
            minutes = arguments[1];
            seconds = arguments[2];
            break;
        case 4:
            days = arguments[0];
            hours = arguments[1];
            minutes = arguments[2];
            seconds = arguments[3];
            break;
        case 5:
            days = arguments[0];
            hours = arguments[1];
            minutes = arguments[2];
            seconds = arguments[3];
            milliseconds = arguments[4];
            break;
        default:
            throw ("No constructor of TimeSpan supports " + arguments.length + " arguments");
    }
    this._millis = (days * 86400000) + (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + milliseconds;
};

TimeSpan.prototype = {
    /* Methods */
    add: function (timespan) {
        return new TimeSpan(timespan._millis + this._millis);
    },

    compareTo: function (timespan) {
        if (this._millis > timespan._millis) return 1;
        if (this._millis == timespan._millis) return 0;
        if (this._millis < timespan._millis) return -1;
    },

    duration: function () {
        return new TimeSpan(Math.abs(this._millis));
    },

    equals: function (timespan) {
        return this._millis == timespan._millis;
    },

    negate: function () {
        this._millis *= -1;
    },

    subtract: function (timespan) {
        return new TimeSpan(this._millis - timespan._millis);
    },

    rounder: function (number) {
        if (this._millis < 0)
            return Math.ceil(number);
        return Math.floor(number);
    },

    /* Properties */

    days: function () {
        return this.rounder(this._millis / (24 * 3600 * 1000));
    },

    hours: function () {
        return this.rounder((this._millis / (60 * 60 * 1000) % 24));
    },

    minutes: function () {
        return this.rounder((this._millis / (60 * 1000)) % 60);
    },

    seconds: function () {
        return this.rounder((this._millis / 1000) % 60);
    },

    milliseconds: function () {
        return this.rounder(this._millis % 1000);
    },

    totalDays: function () {
        return this._millis / (24 * 3600 * 1000);
    },

    totalHours: function () {
        return this._millis / (3600 * 1000);
    },

    totalMinutes: function () {
        return this._millis / (60 * 1000);
    },

    totalSeconds: function () {
        return this._millis / 1000;
    },

    totalMilliseconds: function () {
        return this._millis;
    },

    totalDaysRounded: function () {
        return this.rounder(this._millis / (24 * 3600 * 1000));
    },

    totalHoursRounded: function () {
        return this.rounder(this._millis / (3600 * 1000));
    },

    totalMinutesRounded: function () {
        return this.rounder(this._millis / (60 * 1000));
    },

    totalSecondsRounded: function () {
        return this.rounder(this._millis / 1000);
    },

    totalMillisecondsRounded: function () {
        return this.rounder(this._millis);
    },

    toString: function () {
        return (this._millis < 0 ? "-" : "") +
                (Math.abs(this.days()) ? TimeSpan.pad(Math.abs(this.days())) + "." : "") +
                TimeSpan.pad(Math.abs(this.hours())) + ":" +
                TimeSpan.pad(Math.abs(this.minutes())) + ":" +
                TimeSpan.pad(Math.abs(this.seconds())) + "." +
                Math.abs(this.milliseconds());
    }
};

TimeSpan.pad = function (number) {
    return (number < 10 ? '0' : '') + number;
};