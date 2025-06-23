module.exports = {
  apps: [
    {
      name: "my-app",
      script: "ts-node",
      args: "src/server.ts",
      interpreter: "npx",
      watch: ["src"],
    },
  ],
};
