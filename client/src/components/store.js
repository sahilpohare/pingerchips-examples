import throttle from 'lodash.throttle';
import Pingerchips from 'pingerchips-js';
import { create } from "zustand";

export const usePingerchipsStore = create((set, get) => ({
    subscription: null,
    client: null,
    username: crypto.randomUUID(),
    users: [],
    avgNum: 0,
    avgDenom: 0,
    setUsername: (username) => set({ username }),
    init: () => {
        const client = new Pingerchips("clo68vtnl0004ml08im0hw4n2", {
            wsHost: "ws.pingerchips.com",
            wsPort: 6001,
            forceTLS: false,
            disableStats: true,
            enabledTransports: ["ws", "wss"],
            cluster: "mt1",
        });

        const channel = client.subscribe("cursor-share");
        let setfunc = throttle((message) => set((s) => {
            const { user, state, ts } = message;
            const time = Date.now() - ts;
            const { avgNum, avgDenom } = get();
            const avg = (avgNum + time) / (avgDenom + 1);
            console.log("avg >> ", avg, " time >> ", time, message);
            const users = [...s.users];
            const index = users.findIndex((u) => u.user === user);
            if (index === -1) {
                users.push({ user, state: s });
            } else {
                users[index].state = state;
            }

            return {
                users,
                avgNum: avgNum + time,
                avgDenom: avgDenom + 1,
            };
        }), 50);
        channel.bind("client-cursor", (message) => {


            // set((s) => {
            //     const users = [...s.users];
            //     const index = users.findIndex((u) => u.user === user);
            //     if (index === -1) {
            //         users.push({ user, state: s });
            //     } else {
            //         users[index].state = state;
            //     }

            //     return {
            //         users,
            //         avgNum: avgNum + time,
            //         avgDenom: avgDenom + 1,
            //     };
            // });
            setfunc(message);
        });
        if (channel) {
            console.log("channel >> ", channel)
        }
        set({ client, subscription: channel });
    },
    sendMessage: (message) => {
        const { subscription, username } = get();
        subscription.trigger("client-cursor", {
            ts: Date.now(),
            user: username,
            state: message,
        });
    },
}));
