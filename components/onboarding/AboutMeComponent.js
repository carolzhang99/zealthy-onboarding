export default function AboutMeComponent({ value, onChange }) {
    return (
        <div>
            <label>About Me</label>
            <textarea
                placeholder="Tell us about yourself"
                className="border p-2 w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}