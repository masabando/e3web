export const simple = {
  description: "シンプル",
  code: `const { camera, create, animate, controls } = init();
controls.connect();
camera.position.set(-2, 2, 2);

create.ambientLight();
create.directionalLight();

create.cube();

animate(({ delta, time }) => {
});`
}

export const ocean = {
  description: "海と空",
  code: `const { camera, create, animate, controls } = init();
controls.connect();
camera.position.set(-2, 2, 2);

create.ambientLight();
create.directionalLight();

create.sky()

const cube = create.cube({
  position: [0, 1, 0]
});

const ocean = create.ocean("./textures/NormalMap-1.jpg")

animate(({ delta, time }) => {
  ocean.update(delta)
  cube.rotation.x += delta;
  cube.rotation.y += delta;
});`
}