self.onmessage = function(e) {
	self.postMessage(e.data.number * 2);
};
