const fnEnv = {
    server: () => import("./serverSide"),
    client: () => import("./clientSide"),
};

export default fnEnv;
