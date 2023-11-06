import throttle from "lodash.throttle";
import React, { useEffect, useRef } from "react";
import { Cursor } from "./Cursor";
import { usePingerchipsStore } from "./store";

const renderCursors = (users) => {
    console.log(users);
    return users.map((s) => {
        return (
            <Cursor
                key={s.user}
                userId={s.user}
                point={[s.state.x, s.state.y]}
            />
        );
    });
};

const renderUsersList = (users) => {
    return (
        <ul>
            {users.map((s) => {
                return <li key={s.user}>{s.user}</li>;
            })}
        </ul>
    );
};
const counter = 0;
export function Home({ username }) {
    const sendMessage = usePingerchipsStore((state) => state.sendMessage);
    const users = usePingerchipsStore((state) => state.users);
    const init = usePingerchipsStore((state) => state.init);

    const THROTTLE = 200;
    const sendJsonMessageThrottled = useRef(throttle(sendMessage, THROTTLE));

    useEffect(() => {
        init();
        window.addEventListener("mousemove", (e) => {
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY,
            });
        });
    }, []);

    return (
        <>
            <h1>Users</h1>
            {renderUsersList(users)}
            {/* ideally batch updates */}
            {renderCursors(users)}
        </>
    );
}
