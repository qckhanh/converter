// Result.jsx
import React from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

function Result({ result, expressions, bitLength }) {
    // Hàm tạo InputOTP cho một giá trị binary
    const createBinaryInput = (binaryValue, maxBits) => {
        const paddedValue = binaryValue.padStart(maxBits, '0').split(''); // Đệm để có độ dài bằng maxBits
        const totalBits = paddedValue.length; // Tổng số bit sau khi đệm
        const binaryGroups = [];

        // Tách thành nhóm 4 bit
        for (let i = 0; i < totalBits; i += 4) {
            binaryGroups.push(paddedValue.slice(i, i + 4));
        }

        return (
            <InputOTP maxLength={totalBits} value={paddedValue.join('')}>
                {binaryGroups.map((group, groupIndex) => (
                    <InputOTPGroup key={groupIndex}>
                        {group.map((digit, slotIndex) => {
                            const currentIndex = groupIndex * 4 + slotIndex;
                            const isOverflow = currentIndex < (totalBits - bitLength); // Các bit vượt quá bitLength
                            return (
                                <InputOTPSlot
                                    className={`${isOverflow ? 'bg-red-200 border-red-500' : ''}`}
                                    key={slotIndex}
                                    index={currentIndex}
                                    value={digit}
                                    disabled
                                />
                            );
                        })}
                    </InputOTPGroup>
                ))}
            </InputOTP>
        );
    };

    // Tìm độ dài bit lớn nhất trong các giá trị nhị phân
    const getMaxBits = () => {
        if (!expressions.bin) return bitLength;
        const parts = expressions.bin.split(' ');
        const binaryValues = parts.filter(part => /^[01]+$/.test(part)); // Lấy các giá trị nhị phân
        const lengths = binaryValues.map(val => val.length);
        return Math.max(...lengths, bitLength); // Đảm bảo ít nhất bằng bitLength
    };

    const maxBits = getMaxBits();

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h2 className="text-3xl font-bold mb-2 text-black">Result</h2>
            <br />
            <div className="space-y-4 text-lg">
                {expressions.dec && (
                    <p className="font-semibold border-b-1 border-gray-200 pb-2">
                        Decimal: <br /> {expressions.dec}
                    </p>
                )}
                <br />
                {expressions.hex && (
                    <p className="font-semibold border-b-1 border-gray-200">
                        Hexadecimal: <br /> {expressions.hex}
                    </p>
                )}
                <br />
                {expressions.bin && (
                    <div className="font-semibold">
                        Binary Expression: <br />
                        {expressions.bin.split(' ').map((line, index) => (
                            (line[0] === "1" || line[0] === "0" || (line.length !== 1 && line[0] === '-')) ? (
                                <p key={index}>
                                    {createBinaryInput(line, maxBits)}
                                </p>
                            ) : (
                                <p key={index}>{line}</p>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Result;