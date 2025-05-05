const fnEnv = {
    server: () => import("./serverSide"),
    client: () => import("./clientSide"),
};

export { fnEnv };