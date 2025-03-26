// Registers.jsx
import React from 'react';

function Registers({ maxBit, setMaxBit }) {
    // Tính số lượng registers: 2^maxBit
    const numRegisters = Math.pow(2, maxBit);

    // Tạo danh sách registers
    const registers = Array.from({ length: numRegisters }, (_, index) => {
        // Chuyển chỉ số (index) thành giá trị nhị phân với độ dài maxBit
        const binaryValue = index.toString(2).padStart(maxBit, '0');
        return { name: `R${index}`, value: binaryValue };
    });

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h2 className="text-3xl font-bold mb-4 text-black">Registers</h2>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Max Bits:</span>
                <input
                    type="text"
                    min="0"
                    value={maxBit}
                    onChange={(e) => {
                        const newMaxBit = parseInt(e.target.value) || 0;
                        setMaxBit(Math.max(0, newMaxBit)); // Đảm bảo maxBit >= 1
                    }}
                    className="w-16 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="grid grid-cols-3 gap-y-3 gap-x-4">
                {registers.map((reg, index) => (
                    <div key={index} className="flex w-fit items-center gap-3 shadow-md p-2 bg-white rounded">
                        <span className="font-bold text-gray-700 text-xl">{reg.name}:</span>
                        <span className="text-lg">{reg.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Registers;