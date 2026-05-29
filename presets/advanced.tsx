export const clock = {
  description: "時計",
  code: `const { camera, create, animate, controls } = init();
controls.connect();
camera.position.set(0, 0, 2);

create.ambientLight();
create.directionalLight();

create.sky();

const r = 1;

const clock = create.group();

const clockBase = create.circle({
  size: r,
  segments: 64,
  option: {
    color: 0xffffff,
  },
  autoAdd: false,
})

const clockText = create.group({
  autoAdd: false,
  children: Array.from(
    { length: 12 },
    (_, i) => {
      const h = i + 1;
      const angle = -h*Math.PI/6 + Math.PI/2;
      return create.text(h, {
        autoAdd: false,
        fontSize: 18,
        size: 0.22,
        //material: "Physical",
        //background: "#ffffff",
        position: [
          0.8*r * Math.cos(angle),
          0.8*r * Math.sin(angle),
          0.001
        ],
      })
    }
  )
})

const second = create.group({
  position: [0, 0, 0.002],
  children: [
    create.plane({
      size: [0.02, r*0.9],
      position: [0, r*0.9/2, 0],
    })
  ],
  autoAdd: false,
})

const minute = create.group({
  position: [0, 0, 0.003],
  children: [
    create.plane({
      size: [0.04, r*0.8],
      position: [0, r*0.8/2, 0],
    })
  ],
  autoAdd: false,
})

const hour = create.group({
  position: [0, 0, 0.004],
  children: [
    create.plane({
      size: [0.08, r*0.5],
      position: [0, r*0.5/2, 0],
    })
  ],
  autoAdd: false,
})


clock.add(clockBase, clockText, second, minute, hour)

animate(({ delta, time }) => {
  const now = new Date();
  second.rotation.z = -now.getSeconds()*Math.PI/30
  minute.rotation.z = -now.getMinutes()*Math.PI/30
  hour.rotation.z = -now.getHours()*Math.PI/6
});`
}