import { config } from "../config";

export function createPreviewHtml(code: string) {
  const encodedCode = encodeURIComponent(code);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    canvas {
      display: block;
    }
    pre {
      color: red;
      padding: 16px;
      white-space: pre-wrap;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@${config.three.version}/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@${config.three.version}/examples/jsm/",
      "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
      "@masabando/easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@${config.easyThree.version}/dist/easy-three.js",
      "three-mesh-bvh": "https://cdn.jsdelivr.net/npm/three-mesh-bvh@0.9.10/build/index.module.js",
      "three-bvh-csg": "https://cdn.jsdelivr.net/npm/three-bvh-csg@0.0.18/build/index.module.js"
    }
  }
  </script>
  <script type="module">
    const userCode = decodeURIComponent("${encodedCode}");
    const moduleSource = \`import { init } from "@masabando/easy-three";\\n\` + userCode;
    const blob = new Blob([moduleSource], { type: "text/javascript" });
    const blobUrl = URL.createObjectURL(blob);
    import(blobUrl)
      .catch((error) => {
        document.body.innerHTML = "<pre>" + (error.stack || error.message || error) + "</pre>";
      });
  </script>
</body>
</html>`;
}
