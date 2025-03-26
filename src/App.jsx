// // App.jsx
// import { useState } from 'react';
// import Result from './Result';
// import {
//     InputOTP,
//     InputOTPGroup,
//     InputOTPSlot,
// } from "@/components/ui/input-otp";
//
// function App() {
//     const [hexValue1, setHexValue1] = useState('');
//     const [hexValue2, setHexValue2] = useState('');
//     const [binValue1, setBinValue1] = useState('');
//     const [binValue2, setBinValue2] = useState('');
//     const [decValue1, setDecValue1] = useState('');
//     const [decValue2, setDecValue2] = useState('');
//     const [bitLength, setBitLength] = useState(4);
//     const [result, setResult] = useState({ hex: '', bin: '', dec: '' });
//     const [activeOperator, setActiveOperator] = useState('');
//     const [expressions, setExpressions] = useState({ dec: '', hex: '', bin: '' });
//
//     // Tạo mảng slot cho InputOTP dựa trên bitLength
//     const generateSlots = (value, setter, hasCarry = false) => {
//         const binaryGroups = [];
//         const paddedValue = (value || '').padStart(bitLength, '0').split('');
//         for (let i = 0; i < bitLength; i += 4) {
//             binaryGroups.push(paddedValue.slice(i, i + 4));
//         }
//         return (
//             <InputOTP
//                 maxLength={bitLength + (hasCarry ? 1 : 0)}
//                 value={hasCarry ? '1' + value : value}
//                 onChange={(newValue) => setter(newValue, true)}
//             >
//                 {hasCarry && (
//                     <InputOTPGroup>
//                         <InputOTPSlot index={0} className="bg-red-200 border-red-500" />
//                     </InputOTPGroup>
//                 )}
//                 {binaryGroups.map((group, groupIndex) => (
//                     <InputOTPGroup key={groupIndex}>
//                         {group.map((_, slotIndex) => (
//                             <InputOTPSlot
//                                 key={slotIndex}
//                                 index={(hasCarry ? 1 : 0) + groupIndex * 4 + slotIndex}
//                             />
//                         ))}
//                     </InputOTPGroup>
//                 ))}
//             </InputOTP>
//         );
//     };
//
//     // Cập nhật khi số bit thay đổi
//     const handleBitLengthChange = (value) => {
//         const newBitLength = parseInt(value) || 1;
//         setBitLength(newBitLength);
//         setBinValue1('');
//         setBinValue2('');
//         setResult({ hex: '', bin: '', dec: '' });
//         setExpressions({ dec: '', hex: '', bin: '' });
//     };
//
//     // Hàm kiểm tra carry flag
//     const hasCarryFlag = (value) => {
//         if (!value || bitLength <= 0) return false;
//         const maxValue = Math.pow(2, bitLength) - 1;
//         const decimal = parseInt(value, 2);
//         return !isNaN(decimal) && decimal > maxValue;
//     };
//
//     // Hàm xử lý toán tử
//     const calculate = (operator) => {
//         const dec1 = parseInt(decValue1, 10) || 0;
//         const dec2 = parseInt(decValue2, 10) || 0;
//         let resultDec;
//
//         switch (operator) {
//             case '+': resultDec = dec1 + dec2; break;
//             case '-': resultDec = dec1 - dec2; break;
//             case '*': resultDec = dec1 * dec2; break;
//             case '/': resultDec = dec2 !== 0 ? dec1 / dec2 : 'Error'; break;
//             case '&': resultDec = dec1 & dec2; break;
//             case '|': resultDec = dec1 | dec2; break;
//             case '^': resultDec = dec1 ^ dec2; break;
//             default: return;
//         }
//
//         setActiveOperator(operator);
//
//         if (resultDec === 'Error') {
//             setResult({ hex: 'Error', bin: 'Error', dec: 'Error' });
//             setExpressions({
//                 dec: `${dec1} ${operator} ${dec2} = Error`,
//                 hex: `${hexValue1 || '0'} ${operator} ${hexValue2 || '0'} = Error`,
//                 bin: `${binValue1 || '0'}\n${operator}\n${binValue2 || '0'}\n= Error`
//             });
//         } else {
//             const resultBin = resultDec.toString(2);
//             setResult({
//                 hex: resultDec.toString(16).toUpperCase(),
//                 bin: resultBin,
//                 dec: resultDec.toString(10)
//             });
//             setExpressions({
//                 dec: `${dec1} ${operator} ${dec2} = ${resultDec}`,
//                 hex: `${hexValue1 || '0'} ${operator} ${hexValue2 || '0'} = ${resultDec.toString(16).toUpperCase()}`,
//                 bin: `${binValue1 || '0'}\n${operator}\n${binValue2 || '0'}\n= ${resultBin}`
//             });
//         }
//     };
//
//     // Hàm chuyển đổi từ Hex
//     const handleHexChange = (value, isFirst) => {
//         const setter = isFirst ? setHexValue1 : setHexValue2;
//         const decSetter = isFirst ? setDecValue1 : setDecValue2;
//         const binSetter = isFirst ? setBinValue1 : setBinValue2;
//
//         setter(value.toUpperCase());
//         try {
//             const decimal = parseInt(value, 16);
//             if (isNaN(decimal)) {
//                 decSetter('');
//                 binSetter('');
//                 return;
//             }
//             decSetter(decimal.toString(10));
//             binSetter(decimal.toString(2));
//         } catch (e) {
//             decSetter('');
//             binSetter('');
//         }
//     };
//
//     // Hàm chuyển đổi từ Binary
//     const handleBinChange = (value, isFirst) => {
//         const cleanedValue = value.replace(/[^01]/g, '');
//         const setter = isFirst ? setBinValue1 : setBinValue2;
//         const decSetter = isFirst ? setDecValue1 : setDecValue2;
//         const hexSetter = isFirst ? setHexValue1 : setHexValue2;
//
//         setter(cleanedValue);
//         try {
//             const decimal = parseInt(cleanedValue, 2);
//             if (isNaN(decimal)) {
//                 hexSetter('');
//                 decSetter('');
//                 return;
//             }
//             decSetter(decimal.toString(10));
//             hexSetter(decimal.toString(16).toUpperCase());
//         } catch (e) {
//             hexSetter('');
//             decSetter('');
//         }
//     };
//
//     // Hàm chuyển đổi từ Decimal
//     const handleDecChange = (value, isFirst) => {
//         const setter = isFirst ? setDecValue1 : setDecValue2;
//         const hexSetter = isFirst ? setHexValue1 : setHexValue2;
//         const binSetter = isFirst ? setBinValue1 : setBinValue2;
//
//         setter(value);
//         try {
//             const decimal = parseInt(value, 10);
//             if (isNaN(decimal)) {
//                 hexSetter('');
//                 binSetter('');
//                 return;
//             }
//             hexSetter(decimal.toString(16).toUpperCase());
//             binSetter(decimal.toString(2));
//         } catch (e) {
//             hexSetter('');
//             binSetter('');
//         }
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//             <div className="flex flex-row gap-6 w-full max-w-4xl">
//                 {/* Input Section */}
//                 <div className="bg-white p-6 rounded-lg shadow-md flex-1">
//                     <h1 className="text-2xl font-bold text-center mb-6">
//                         Number System Calculator
//                     </h1>
//
//                     <div className="space-y-6">
//                         {/* Hexadecimal Inputs */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Hexadecimal</label>
//                             <div className="flex items-center gap-2">
//                                 <input
//                                     type="text"
//                                     value={hexValue1}
//                                     onChange={(e) => handleHexChange(e.target.value, true)}
//                                     placeholder="First Hex"
//                                     className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 <div className="h-8 border-l border-gray-300"></div>
//                                 <input
//                                     type="text"
//                                     value={hexValue2}
//                                     onChange={(e) => handleHexChange(e.target.value, false)}
//                                     placeholder="Second Hex"
//                                     className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                         </div>
//
//                         {/* Binary Inputs */}
//                         <div>
//                             <div className="flex items-center justify-between mb-1">
//                                 <label className="block text-sm font-medium text-gray-700">Binary</label>
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-sm text-gray-600">Bits:</span>
//                                     <input
//                                         type="number"
//                                         min="1"
//                                         value={bitLength}
//                                         onChange={(e) => handleBitLengthChange(e.target.value)}
//                                         className="w-16 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <div className="w-full">
//                                     {generateSlots(binValue1, handleBinChange.bind(null, true), hasCarryFlag(binValue1))}
//                                 </div>
//                                 <div className="h-8 border-l border-gray-300"></div>
//                                 <div className="w-full">
//                                     {generateSlots(binValue2, handleBinChange.bind(null, false), hasCarryFlag(binValue2))}
//                                 </div>
//                             </div>
//                             <p className={`text-sm mt-1 ${hasCarryFlag(binValue1) || hasCarryFlag(binValue2) ? 'text-red-500' : 'text-green-500'}`}>
//                                 {hasCarryFlag(binValue1) || hasCarryFlag(binValue2)
//                                     ? `Carry Flag: ON (Exceeds ${bitLength}-bit limit)`
//                                     : 'Carry Flag: OFF'}
//                             </p>
//                         </div>
//
//                         {/* Decimal Inputs */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Decimal</label>
//                             <div className="flex items-center gap-2">
//                                 <input
//                                     type="text"
//                                     value={decValue1}
//                                     onChange={(e) => handleDecChange(e.target.value, true)}
//                                     placeholder="First Decimal"
//                                     className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 <div className="h-8 border-l border-gray-300"></div>
//                                 <input
//                                     type="text"
//                                     value={decValue2}
//                                     onChange={(e) => handleDecChange(e.target.value, false)}
//                                     placeholder="Second Decimal"
//                                     className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                         </div>
//
//                         {/* Operator Buttons */}
//                         <div className="grid grid-cols-4 gap-2">
//                             {['+', '-', '*', '/', '&', '|', '^'].map((op) => (
//                                 <button
//                                     key={op}
//                                     onClick={() => calculate(op)}
//                                     className={`p-2 text-white rounded hover:bg-blue-600 ${
//                                         activeOperator === op ? 'bg-blue-700' : 'bg-blue-500'
//                                     }`}
//                                 >
//                                     {op === '&' ? 'AND' : op === '|' ? 'OR' : op === '^' ? 'XOR' : op}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Result Section */}
//                 <div className="flex-1">
//                     <Result result={result} expressions={expressions} bitLength={bitLength} />
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default App;

// App.jsx
import { useState } from 'react';
import Result from './Result';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

function App() {
    const [hexValue1, setHexValue1] = useState('');
    const [hexValue2, setHexValue2] = useState('');
    const [binValue1, setBinValue1] = useState('');
    const [binValue2, setBinValue2] = useState('');
    const [decValue1, setDecValue1] = useState('');
    const [decValue2, setDecValue2] = useState('');
    const [bitLength, setBitLength] = useState(1);
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
            <div className="flex flex-col gap-6 w-auto">
                <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Number System Calculator
                    </h1>

                    <div className="space-y-6">
                        {/* Hexadecimal Inputs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hexadecimal</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={hexValue1}
                                    onChange={(e) => handleHexChange(e.target.value, true)}
                                    placeholder="First Hex"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="h-8 border-l border-gray-300"></div>
                                <input
                                    type="text"
                                    value={hexValue2}
                                    onChange={(e) => handleHexChange(e.target.value, false)}
                                    placeholder="Second Hex"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Binary Inputs */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700">Binary</label>
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
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-full">
                                    {generateSlots(binValue1, (val) => handleBinChange(val, true), hasCarryFlag(binValue1))}
                                </div>
                                <div className="h-8 border-l border-gray-300"></div>
                                <div className="w-full">
                                    {generateSlots(binValue2, (val) => handleBinChange(val, false), hasCarryFlag(binValue2))}
                                </div>
                            </div>
                            <p className={`text-sm mt-1 ${hasCarryFlag(binValue1) || hasCarryFlag(binValue2) ? 'text-red-500' : 'text-green-500'}`}>
                                {hasCarryFlag(binValue1) || hasCarryFlag(binValue2)
                                    ? `Carry Flag: ON (Exceeds ${bitLength}-bit limit)`
                                    : 'Carry Flag: OFF'}
                            </p>
                        </div>

                        {/* Decimal Inputs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Decimal</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={decValue1}
                                    onChange={(e) => handleDecChange(e.target.value, true)}
                                    placeholder="First Decimal"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="h-8 border-l border-gray-300"></div>
                                <input
                                    type="text"
                                    value={decValue2}
                                    onChange={(e) => handleDecChange(e.target.value, false)}
                                    placeholder="Second Decimal"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Operator Buttons */}
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
                    </div>
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
