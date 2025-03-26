const Operation = ({calculate, activeOperator}) => {
    return (
        <div className="grid grid-cols-4 gap-2">
            {['+', '-', 'X', '/', '&', '|', '^'].map((op) => (
                <button
                    key={op}
                    onClick={() => calculate(op)}
                    className={`p-2 text-white rounded text-lg font-semibold hover:bg-gray-700 ${activeOperator === op ? 'bg-gray-600' : 'bg-gray-900'}`}
                >
                    {op === '&' ? 'AND' : op === '|' ? 'OR' : op === '^' ? 'XOR' : op}
                </button>
            ))}
        </div>
    );
}

export default Operation;