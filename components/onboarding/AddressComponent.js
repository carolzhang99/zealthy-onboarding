export default function AddressComponent({ value, onChange }) {
    return (
      <div>
        <label>Street</label>
        <input
          type="text"
          placeholder="Street Address"
          className="border p-2 w-full mb-2"
          value={value.street}
          onChange={(e) => onChange({ ...value, street: e.target.value })}
        />
        <label>City</label>
        <input
          type="text"
          placeholder="City"
          className="border p-2 w-full mb-2"
          value={value.city}
          onChange={(e) => onChange({ ...value, city: e.target.value })}
        />
        <label>State</label>
        <input
          type="text"
          placeholder="State"
          className="border p-2 w-full mb-2"
          value={value.state}
          onChange={(e) => onChange({ ...value, state: e.target.value })}
        />
        <label>Zip Code</label>
        <input
          type="text"
          placeholder="Zip Code"
          className="border p-2 w-full mb-4"
          value={value.zip}
          onChange={(e) => onChange({ ...value, zip: e.target.value })}
        />
      </div>
    );
  }