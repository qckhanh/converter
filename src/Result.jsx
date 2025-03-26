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
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h2 className="text-3xl font-bold mb-2 text-black">Result</h2>
            <br/>
            <div className="space-y-4 text-lg">
                {expressions.dec && (
                    <p className=" font-semibold border-b-1 border-gray-200 pb-2">
                        Decimal: <br/> {expressions.dec}
                    </p>
                )}
                <br/>


                {expressions.hex && (
                    <p className="font-semibold border-b-1 border-gray-200">
                        Hexadecimal: <br/> {expressions.hex}
                    </p>
                )}
                <br/>
                {expressions.bin && (
                    <div className=" font-semibold">
                        Binary Expression: <br/>
                        {expressions.bin.split(' ').map((line, index) => (
                            // <p key={index}>{line}</p>
                            ((line[0] === "1" || line[0] === "0" || (line.length !== 1 && line[0] == '-')) ?
                                (
                                    <p key={index}>
                                        <InputOTP maxLength={bitLength} value={line.padStart(bitLength, '0')}>
                                            {binaryGroups.map((group, groupIndex) => (
                                                <InputOTPGroup key={groupIndex}>
                                                    {group.map((digit, slotIndex) => (
                                                        <InputOTPSlot
                                                            className={`${result.bin === line ? 'bg-green-300 font-bold' : ''}`}
                                                            key={slotIndex}
                                                            index={groupIndex * 4 + slotIndex}
                                                            value={digit}
                                                            disabled
                                                        />
                                                    ))}
                                                </InputOTPGroup>
                                            ))}
                                        </InputOTP>
                                    </p>
                                ) : (<p>{line}</p>)

                            )


                ))}
                        {/*<div className="flex items-center justify-start">*/}
                        {/*    {expressions.bin + "   "}*/}
                        {/*    <InputOTP maxLength={bitLength} value={result.bin.padStart(bitLength, '0')}>*/}
                        {/*        {binaryGroups.map((group, groupIndex) => (*/}
                        {/*            <InputOTPGroup key={groupIndex}>*/}
                        {/*                {group.map((digit, slotIndex) => (*/}
                        {/*                    <InputOTPSlot*/}
                        {/*                        key={slotIndex}*/}
                        {/*                        index={groupIndex * 4 + slotIndex}*/}
                        {/*                        value={digit}*/}
                        {/*                        disabled*/}
                        {/*                    />*/}
                        {/*                ))}*/}
                        {/*            </InputOTPGroup>*/}
                        {/*        ))}*/}
                        {/*    </InputOTP>*/}
                        {/*</div>*/}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Result;