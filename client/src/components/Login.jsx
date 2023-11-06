import { usePingerchipsStore } from "./store";
export function Login({ onSubmit }) {
    const setUsernames = usePingerchipsStore((state) => state.setUsername);
    const username = usePingerchipsStore((state) => state.username);
    return (
        <>
            <h1>Welcome</h1>
            <p>What should people call you?</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(username);
                }}
            >
                <input
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={(e) => setUsernames(e.target.value)}
                />
                <input type="submit" />
            </form>
        </>
    );
}
