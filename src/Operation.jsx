const Operation = ({calculate, activeOperator}) => {
    return (
        <div className="grid grid-cols-4 gap-2">
            {['+', '-', '*', '/', '&', '|', '^'].map((op) => (
                <button
                    key={op}
                    onClick={() => calculate(op)}
                    className={`p-2 text-white rounded hover:bg-blue-600 ${activeOperator === op ? 'bg-blue-700' : 'bg-blue-500'}`}
                >
                    {op === '&' ? 'AND' : op === '|' ? 'OR' : op === '^' ? 'XOR' : op}
                </button>
            ))}
        </div>
    );
}

export default Operation;