const napa = require("napajs");

const NUMBER_OF_WORKERS = 4;

let zone = napa.zone.create("zone", { workers: NUMBER_OF_WORKERS });

function estimatePI(points) {
	let i = points;

	let inside = 0;
	while (i-- > 0) {
		let x = Math.random();
		let y = Math.random();
		if (x * x + y * y <= 1) {
			inside++;
		}
	}
	return (inside / points) * 4;
}

function run(points, batches) {
	let start = Date.now();

	let promises = [];
	for (let i = 0; i < batches; ++i) {
		promises[i] = zone.execute(estimatePI, [points / batches]);
	}

	return Promise.all(promises).then(values => {
		let aggregate = 0;
		values.forEach(result => (aggregate += result.value));
		printResult(points, batches, aggregate / batches, Date.now() - start);
	});
}

function printResult(points, batches, pi, ms) {
	console.log("\t" + points + "\t\t" + batches + "\t\t" + NUMBER_OF_WORKERS + "\t\t" + ms + "\t\t" + pi.toPrecision(7) + "\t" + Math.abs(pi - Math.PI).toPrecision(7));
	console.log();
	console.log("\t# of points\t# of batches\t# of workers\tlatency in MS\testimated π\tdeviation");
	console.log("\t---------------------------------------------------------------------------------------");
}

run(400000, 1)
	.then(result => run(400000, 2))
	.then(result => run(400000, 4))
	.then(result => run(400000, 8));
