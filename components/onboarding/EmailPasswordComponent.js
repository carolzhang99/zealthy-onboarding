export default function EmailPasswordComponent({ email, setEmail, password, setPassword }) {
    return (
        <div>
            <label>Email</label>
            <input
                type="email"
                placeholder="Enter your email"
                className="border p-2 w-full mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                placeholder="Enter your password"
                className="border p-2 w-full mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    );
}