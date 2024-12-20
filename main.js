const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const initialCarX = road.getLaneCenter(Math.floor(road.laneCount / 2));
const car = new Car(initialCarX, 500, 30, 50, "KEYS");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
];

animate();

function animate() {
    for (const t of traffic) {
        t.update(road.borders, []);
    }
    car.update(road.borders, traffic);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for (const t of traffic) {
        t.draw(ctx, "red");
    }
    car.draw(ctx, "blue");
    ctx.restore();
    requestAnimationFrame(animate);
}