
import { useState } from 'react';
import Result from './Result';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Operation from "@/Operation.jsx";
import Input from "../Input.jsx";

function App() {
    const [hexValue1, setHexValue1] = useState('');
    const [hexValue2, setHexValue2] = useState('');
    const [binValue1, setBinValue1] = useState('');
    const [binValue2, setBinValue2] = useState('');
    const [decValue1, setDecValue1] = useState('');
    const [decValue2, setDecValue2] = useState('');
    const [bitLength, setBitLength] = useState(8);
    const [result, setResult] = useState({ hex: '', bin: '', dec: '' });
    const [activeOperator, setActiveOperator] = useState('');
    const [expressions, setExpressions] = useState({ dec: '', hex: '', bin: '' });

    // Tạo mảng slot cho InputOTP dựa trên bitLength
    const generateSlots = (value, onChange, hasCarry = false) => {
        const binaryGroups = [];
        const paddedValue = (value || '').padStart(bitLength, '0').split('');
        for (let i = 0; i < bitLength; i += 4) {
            binaryGroups.push(paddedValue.slice(i, i + 4));
        }
        return (
            <InputOTP
                maxLength={bitLength + (hasCarry ? 1 : 0)}
                value={hasCarry ? '1' + value : value}
                onChange={(newValue) => {
                    const clean = hasCarry ? newValue.slice(1) : newValue;
                    onChange(clean.replace(/[^01]/g, ''));
                }}
            >
                {hasCarry && (
                    <InputOTPGroup>
                        <InputOTPSlot index={0} className="bg-red-200 border-red-500" />
                    </InputOTPGroup>
                )}
                {binaryGroups.map((group, groupIndex) => (
                    <InputOTPGroup key={groupIndex}>
                        {group.map((_, slotIndex) => (
                            <InputOTPSlot
                                key={slotIndex}
                                index={(hasCarry ? 1 : 0) + groupIndex * 4 + slotIndex}
                            />
                        ))}
                    </InputOTPGroup>
                ))}
            </InputOTP>
        );
    };

    const handleBitLengthChange = (value) => {
        const newBitLength = parseInt(value) || 0;
        setBitLength(newBitLength);
        setBinValue1('');
        setBinValue2('');
        setHexValue1('');
        setHexValue2('');
        setDecValue1('');
        setDecValue2('');
        setResult({ hex: '', bin: '', dec: '' });
        setExpressions({ dec: '', hex: '', bin: '' });
    };

    const hasCarryFlag = (value) => {
        if (!value || bitLength <= 0) return false;
        const maxValue = Math.pow(2, bitLength) - 1;
        const decimal = parseInt(value, 2);
        return !isNaN(decimal) && decimal > maxValue;
    };

    const calculate = (operator) => {
        const dec1 = parseInt(decValue1, 10) || 0;
        const dec2 = parseInt(decValue2, 10) || 0;
        let resultDec;

        switch (operator) {
            case '+': resultDec = dec1 + dec2; break;
            case '-': resultDec = dec1 - dec2; break;
            case '*': resultDec = dec1 * dec2; break;
            case '/': resultDec = dec2 !== 0 ? dec1 / dec2 : 'Error'; break;
            case '&': resultDec = dec1 & dec2; break;
            case '|': resultDec = dec1 | dec2; break;
            case '^': resultDec = dec1 ^ dec2; break;
            default: return;
        }

        setActiveOperator(operator);

        if (resultDec === 'Error') {
            setResult({ hex: 'Error', bin: 'Error', dec: 'Error' });
            setExpressions({
                dec: `${dec1} ${operator} ${dec2} = Error`,
                hex: `${hexValue1 || '0'} ${operator} ${hexValue2 || '0'} = Error`,
                bin: `${binValue1 || '0'}\n${operator}\n${binValue2 || '0'}\n= Error`
            });
        } else {
            const resultBin = resultDec.toString(2);
            setResult({
                hex: resultDec.toString(16).toUpperCase(),
                bin: resultBin,
                dec: resultDec.toString(10)
            });
            setExpressions({
                dec: `${dec1} ${operator} ${dec2} = ${resultDec}`,
                hex: `${hexValue1 || '0'} ${operator} ${hexValue2 || '0'} = ${resultDec.toString(16).toUpperCase()}`,
                bin: `${binValue1 || '0'}\n${operator}\n${binValue2 || '0'}\n= ${resultBin}`
            });
        }
    };

    const handleHexChange = (value, isFirst) => {
        const setter = isFirst ? setHexValue1 : setHexValue2;
        const decSetter = isFirst ? setDecValue1 : setDecValue2;
        const binSetter = isFirst ? setBinValue1 : setBinValue2;

        setter(value.toUpperCase());
        try {
            const decimal = parseInt(value, 16);
            if (isNaN(decimal)) {
                decSetter('');
                binSetter('');
                return;
            }
            decSetter(decimal.toString(10));
            binSetter(decimal.toString(2));
        } catch (e) {
            decSetter('');
            binSetter('');
        }
    };

    const handleBinChange = (value, isFirst) => {
        const cleanedValue = value.replace(/[^01]/g, '');
        const setter = isFirst ? setBinValue1 : setBinValue2;
        const decSetter = isFirst ? setDecValue1 : setDecValue2;
        const hexSetter = isFirst ? setHexValue1 : setHexValue2;

        setter(cleanedValue);
        try {
            const decimal = parseInt(cleanedValue, 2);
            if (isNaN(decimal)) {
                hexSetter('');
                decSetter('');
                return;
            }
            decSetter(decimal.toString(10));
            hexSetter(decimal.toString(16).toUpperCase());
        } catch (e) {
            hexSetter('');
            decSetter('');
        }
    };

    const handleDecChange = (value, isFirst) => {
        const setter = isFirst ? setDecValue1 : setDecValue2;
        const hexSetter = isFirst ? setHexValue1 : setHexValue2;
        const binSetter = isFirst ? setBinValue1 : setBinValue2;

        setter(value);
        try {
            const decimal = parseInt(value, 10);
            if (isNaN(decimal)) {
                hexSetter('');
                binSetter('');
                return;
            }
            hexSetter(decimal.toString(16).toUpperCase());
            binSetter(decimal.toString(2));
        } catch (e) {
            hexSetter('');
            binSetter('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="flex flex-col gap-6 w-auto gap">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-y-4 w-fit">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Dec0xb1n Calculator - For Tomorrow Embedded Test
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Bits:</span>
                        <input
                            type="text"
                            min="0"
                            value={bitLength}
                            onChange={(e) => handleBitLengthChange(e.target.value)}
                            className="w-16 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className={"flex flex-col gap-y-5 lg:gap-x-5 lg:flex-row md:flex-col sm:flex-col"}>
                        <Input decValue1={decValue1}
                            handleDecChange={handleDecChange}
                            generateSlots={generateSlots}
                            hexValue1={hexValue1}
                            handleHexChange={handleHexChange}
                            binValue1={binValue1}
                            handleBinChange={handleBinChange}
                            hasCarryFlag={hasCarryFlag}
                            binValue2={binValue1}
                            bitLength={bitLength}
                            activeOperator={activeOperator}
                            calculate={calculate}
                               isTrack={true}
                        />
                        <Input decValue1={decValue2}
                               handleDecChange={handleDecChange}
                               generateSlots={generateSlots}
                               hexValue1={hexValue2}
                               handleHexChange={handleHexChange}
                               binValue1={binValue2}
                               handleBinChange={handleBinChange}
                               hasCarryFlag={hasCarryFlag}
                               binValue2={binValue2}
                               bitLength={bitLength}
                               activeOperator={activeOperator}
                               calculate={calculate}
                               isTrack={false}
                        />
                    </div>
                    <Operation activeOperator={activeOperator} calculate={calculate} />



                </div>

                {/* Result Section */}
                <div className="">
                    <Result result={result} expressions={expressions} bitLength={bitLength} />
                </div>
            </div>
        </div>
    );
}

export default App;
