import Operation from "@/Operation.jsx";

const Input = ({calculate, activeOperator, handleDecChange, decValue1, generateSlots, hexValue1, handleHexChange, binValue1, handleBinChange, hasCarryFlag, binValue2, bitLength, isTrack}) => {
    return (
        <div className="space-y-6 bg-white p-4 rounded-lg border border-gray-200 shadow-lg w-full">
            <div className="text-2xl font-bold text-gray-900  border-gray-200">
                {isTrack ? 'First' : 'Second'} Operand
            </div>
            {/* Decimal Inputs */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Decimal</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={decValue1}
                        onChange={(e) => handleDecChange(e.target.value, isTrack)}
                        placeholder={`${isTrack ? 'First' : 'Second'} decimal`}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>
            </div>

            {/* Hexadecimal Inputs */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hexadecimal</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={hexValue1}
                        onChange={(e) => handleHexChange(e.target.value, isTrack)}
                        placeholder={`${isTrack ? 'First' : 'Second'} hexadecimal`}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Binary Inputs */}
            <div>
                <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">Binary</label>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-full">
                        {generateSlots(binValue1, (val) => handleBinChange(val, isTrack), hasCarryFlag(binValue1))}
                    </div>
                </div>
                <p className={`text-sm mt-1 ${hasCarryFlag(binValue1) || hasCarryFlag(binValue2) ? 'text-red-500 font-semibold' : 'text-green-500'}`}>
                    {hasCarryFlag(binValue1) || hasCarryFlag(binValue2)
                        ? `Carry Flag: True (Exceeds ${bitLength}-bit limit)`
                        : 'Carry Flag: False'}
                </p>
            </div>


        </div>
    );
}

export default Input;