document.addEventListener("DOMContentLoaded", init, false);

function init() {

    var loading = {
	finalWidth: window.innerWidth, // Match css width (85%)
	settings: [
	    { increment: 1, interval: 4, stop: (window.innerWidth*.85) * .05 },
	    { increment: 4, interval: 12, stop: (window.innerWidth*.85) * .25 },
	    { increment: 2, interval: 5, stop: (window.innerWidth*.85) * .38 },
	    { increment: 1, interval: 16, stop: (window.innerWidth*.85) * .45 },
	    { increment: 3, interval: 7, stop: (window.innerWidth*.85) * .6 },
	    { increment: 15, interval: 7, stop: (window.innerWidth*.85) * .75 },
	    { increment: 5, interval: 4, stop: (window.innerWidth*.85) }
	],
	pace: document.querySelector('.pace'),
	paceProgress: document.querySelector('.pace-progress'),

    	setup: function(id) {
	    this.settingID = id || 0;
	    // Set first iteration so that i can be set to the last width if necessary
	    this.firstIteration = true;
	    if (this.settings[this.settingID]) {
		var i = this.settings[this.settingID].increment;
		this.intervalID = window.setInterval(function() {
		    if (this.firstIteration) {
			delete this.firstIteration;
			i = this.settings[this.settingID - 1]
			    ? this.settings[this.settingID -1].stop
			    : 0;
		    }
		    i = i + this.settings[this.settingID].increment;
	    	    this.paceProgress.style.width = i + 'px';
	    	    if (i > this.settings[this.settingID].stop) { this.queueNext(); }
		}.bind(this), this.settings[this.settingID].interval);
	    } else { this.finish(); }
    	},

	finish: function() {
	    this.cancel();
	    this.pace.classList.add('pace-done');
	    this.pace.classList.remove('pace-running');
	},

    	cancel: function() {
    	    window.clearInterval(this.intervalID);
    	    this.intervalID = undefined;
    	},

	queueNext: function() {
	    this.cancel();
	    this.settingID += 1;
	    this.setup(this.settingID);
	}
    };

    loading.setup();
}
