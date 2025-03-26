// App.jsx
import { useState } from 'react';
import Result from './Result';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Operation from "@/Operation.jsx";
import Input from "./Input.jsx";
import Registers from "./Registers.jsx";

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
    const [maxBit, setMaxBit] = useState(3); // State riêng cho maxBit của Registers

    // Tạo mảng slot cho InputOTP dựa trên bitLength
    const generateSlots = (value, onChange, hasCarry = false) => {
        const binaryValue = value || '';
        const totalBits = Math.max(bitLength, binaryValue.length); // Hiển thị tất cả bit, bao gồm bit tràn
        const binaryGroups = [];
        const currentValue = binaryValue.split(''); // Giá trị hiện tại, không điền số 0

        // Tạo mảng các ô dựa trên totalBits
        const slots = Array.from({ length: totalBits }, (_, index) => currentValue[index] || ''); // Nếu không có giá trị, để trống

        // Tách thành nhóm 4 bit
        for (let i = 0; i < totalBits; i += 4) {
            binaryGroups.push(slots.slice(i, i + 4));
        }

        return (
            <InputOTP
                maxLength={totalBits}
                value={binaryValue}
                onChange={(newValue) => {
                    const cleanedValue = newValue.replace(/[^01]/g, ''); // Chỉ cho phép nhập 0 và 1
                    onChange(cleanedValue);
                }}
            >
                {binaryGroups.map((group, groupIndex) => (
                    <InputOTPGroup key={groupIndex}>
                        {group.map((digit, slotIndex) => {
                            const currentIndex = groupIndex * 4 + slotIndex;
                            const isOverflow = binaryValue.length > bitLength && currentIndex < (binaryValue.length - bitLength);
                            return (
                                <InputOTPSlot
                                    className={`${isOverflow ? 'bg-red-200 border-red-500' : ''}`}
                                    key={slotIndex}
                                    index={currentIndex}
                                />
                            );
                        })}
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
                bin: `${binValue1 || '0'} ${operator} ${binValue2 || '0'} = Error`
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
                bin: `${binValue1 || '0'} ${operator} ${binValue2 || '0'} = ${resultBin}`
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
            <div className="flex flex-col lg:flex-row sm:flex-row xl:flex-row gap-6 w-auto">

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
                        <Input
                            decValue1={decValue1}
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
                        <Input
                            decValue1={decValue2}
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

                <div className={"flex flex-col gap-y-5"}>
                    {/* Registers Section */}
                    <div className="">
                        <Registers maxBit={maxBit} setMaxBit={setMaxBit} />
                    </div>
                    {/* Result Section */}
                    <div className="">
                        <Result result={result} expressions={expressions} bitLength={bitLength} />
                    </div>
                </div>




            </div>
        </div>
    );
}

export default App;