const Operation = ({calculate, activeOperator}) => {
    return (
        <div className="grid grid-cols-4 gap-2">
            {['+', '-', '*', '/', '&', '|', '^'].map((op) => (
                <button
                    key={op}
                    onClick={() => calculate(op)}
                    className={`p-2 text-white rounded hover:bg-gray-700 ${activeOperator === op ? 'bg-gray-600' : 'bg-black'}`}
                >
                    {op === '&' ? 'AND' : op === '|' ? 'OR' : op === '^' ? 'XOR' : op}
                </button>
            ))}
        </div>
    );
}

export default Operation;