export default function BirthdayComponent({ value, onChange }) {
    return (
        <div>
            <label>Birthday</label>
            <input
                type="date"
                className="border p-2 w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}