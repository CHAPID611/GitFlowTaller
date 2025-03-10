// eslint-disable-next-line react/prop-types
export default function InputField({ label, value, onChange, placeholder }) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value
    if (/^\d+$/.test(inputValue)) {
      onChange(e)
    }
  }

  return (
    <div className="text-3xl">
      <label className="text-stone-200">{label}:</label>
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        className="w-20 bg-transparent text-blue-400"
        onChange={handleInputChange}
      />
    </div>
  )
}
