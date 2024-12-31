import { useEffect, useState, useRef } from "react";
import { HStack, Container } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Api } from "@/constants/api";

// TODO: 1. create loading component
// TODO: 2. create interface for api call using axios
// TODO: 3. connect lucid website to iframe
// TODO: 4. handling error status

// required status : init, loading, done ,error

type DTxStatus = "init" | "loading" | "done" | "error";

export function DtxFragment() {
    const [currentStatus, setCurrentStatus] = useState<DTxStatus>("init");
    useEffect(
        () => {},
        // 1. post -> fetch token
        // wait, -> rendering loading component
        // 2. get ->  fetch website to iframe
        []
    );

    return (
        <Container>
            {currentStatus === "init" && <SelectDtxComponent />}
            {currentStatus === "loading" && <LoadingComponent />}
            {currentStatus === "done" && <EmbbededLucid />}
            {currentStatus === "error" && <DtxErrorItem />}
        </Container>
    );
}

// init
// selectable buttons,
function SelectDtxComponent() {
    return <HStack></HStack>;
}

function LoadingComponent() {
    return <></>;
}

function DtxErrorItem() {
    return <></>;
}

function EmbbededLucid() {
    // experience key
    // const url = Api.lucid + "";
    return <iframe></iframe>;
}
