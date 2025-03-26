// Result.jsx
import React from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

function Result({ result, expressions, bitLength }) {
    // Tạo mảng các ô InputOTP cho Binary result
    const binaryResult = result.bin.padStart(bitLength, '0').split('');
    const binaryGroups = [];
    for (let i = 0; i < bitLength; i += 4) {
        binaryGroups.push(binaryResult.slice(i, i + 4));
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-bold mb-2 text-blue-600 font-serif">Result</h2>
            <div className="space-y-4 text-lg font-serif">
                {expressions.dec && (
                    <p className="text-blue-800 font-bold">
                        Decimal: {expressions.dec}
                    </p>
                )}
                {expressions.hex && (
                    <p className="text-blue-800 font-bold">
                        Hexadecimal: {expressions.hex}
                    </p>
                )}
                {expressions.bin && (
                    <div className="text-blue-800 font-bold">
                        Binary Expression:
                        {expressions.bin.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                )}
                <div className="space-y-2">
                    <p>Hex: <span className="font-mono text-blue-800">{result.hex}</span></p>
                    <div>
                        Binary:{' '}
                        <InputOTP maxLength={bitLength} value={result.bin.padStart(bitLength, '0')}>
                            {binaryGroups.map((group, groupIndex) => (
                                <InputOTPGroup key={groupIndex}>
                                    {group.map((digit, slotIndex) => (
                                        <InputOTPSlot
                                            key={slotIndex}
                                            index={groupIndex * 4 + slotIndex}
                                            value={digit}
                                            disabled
                                        />
                                    ))}
                                </InputOTPGroup>
                            ))}
                        </InputOTP>
                    </div>
                    <p>Decimal: <span className="font-mono text-blue-800">{result.dec}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Result;