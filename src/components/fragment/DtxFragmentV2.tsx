import { useEffect, useState, useRef } from "react";
// TODO: 1. create loading component
// TODO: 2. create interface for api call using axios
// TODO: 3. connect lucid website to iframe
// TODO: 4. handling error status

// required status : init, loading, done ,error
type DTxStatus = "init" | "loading" | "done" | "error";

const DtxFragmentV2 = () => {
    const [status, setStatus] = useState<DTxStatus>("init");

    if (status === "init") return <div>Init</div>;
    if (status === "loading") return <div>Loading</div>;
    if (status === "done") return <div>Done</div>;
    if (status === "error") return <div>Error</div>;

    return <div></div>;
};

export default DtxFragmentV2;
