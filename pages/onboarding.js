import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from "firebase/firestore";


export default function Onboarding() {
    const [componentsByStep, setComponentsByStep] = useState({
        step2: { aboutMe: true, birthday: true, address: false },
        step3: { aboutMe: false, birthday: false, address: true },
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [signedUp, setSignedUp] = useState(false);
    const [aboutMe, setAboutMe] = useState('');
    const [birthday, setBirthday] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const docSnap = await getDoc(doc(db, 'admin', 'config'));
                if (docSnap.exists()) {
                    setComponentsByStep(docSnap.data());
                }
            } catch (error) {
                console.error('Error fetching admin configurations:', error);
            }
        };

        fetchConfig();
    }, []);

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage('User registered successfully!');
            setTimeout(() => setMessage(''), 3000);
            setSignedUp(true);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleFinalSubmit = async () => {
        try {
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
                email,
                aboutMe,
                birthday,
                address: {
                    street,
                    city,
                    state,
                    zip,
                },
            });
            setMessage('Profile saved successfully!');
        } catch (error) {
            console.error('Error saving to Firestore:', error);
            setMessage(error.message);
        }
    };

    const validateStep = () => {
        if (currentStep === 1) {
            if (!email) {
                setMessage('Email is required.');
                return false;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                setMessage('Enter a valid email address.');
                return false;
            }
            if (password.length < 6) {
                setMessage('Password must be at least 6 characters.');
                return false;
            }
        } else if (currentStep === 2) {
            if (componentsByStep.step2.aboutMe && !aboutMe) {
                setMessage('Please fill out the About Me section.');
                return false;
            }
            if (componentsByStep.step2.birthday && !birthday) {
                setMessage('Please select your birthday.');
                return false;
            }
        } else if (currentStep === 3) {
            if (componentsByStep.step3.address) {
                if (!street || !city || !state || !zip) {
                    setMessage('Please fill out all address fields.');
                    return false;
                }
            }
        }
        setMessage('');
        return true;
    };


    const nextStep = () => {
        if (validateStep()) {
            setMessage('');
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => setCurrentStep((prev) => prev - 1);

    return (

        <div className="p-8">

            <div className="text-center mb-4">
                <p className="text-gray-600">{`Step ${currentStep} of 3`}</p>
            </div>

            {currentStep === 1 && (
                <div>
                    <h2 className="text-xl mb-4">Step 1: Sign Up</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 mb-2 mr-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 mb-2 mr-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!signedUp ? (
                        <button onClick={handleSignUp} className="bg-blue-500 text-white p-2">
                            Sign Up
                        </button>
                    ) : (
                        <button onClick={nextStep} className="bg-green-500 text-white p-2">
                            Next
                        </button>
                    )}
                    {message && <p className="mt-4">{message}</p>}
                </div>

            )}

            {currentStep === 2 && (
                <div>
                    <h2 className="text-xl mb-4">Step 2</h2>
                    {componentsByStep.step2.aboutMe && (
                        <textarea
                            placeholder="Tell us about yourself"
                            className="border p-2 mb-4 w-full"
                            value={aboutMe}
                            onChange={(e) => setAboutMe(e.target.value)}
                        />
                    )}
                    {componentsByStep.step2.birthday && (
                        <input
                            type="date"
                            className="border p-2 mb-4 w-full"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    )}
                    {componentsByStep.step2.address && (
                        <>
                            <input
                                type="text"
                                placeholder="Street"
                                className="border p-2 mb-2 w-full"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="City"
                                className="border p-2 mb-2 w-full"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="State"
                                className="border p-2 mb-2 w-full"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Zip Code"
                                className="border p-2 mb-4 w-full"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </>
                    )}
                    <button onClick={prevStep} className="bg-gray-300 text-black p-2 mr-2">
                        Back
                    </button>
                    <button onClick={nextStep} className="bg-blue-500 text-white p-2">
                        Next
                    </button>
                </div>
            )}

            {currentStep === 3 && (
                <div>
                    <h2 className="text-xl mb-4">Step 3</h2>
                    {componentsByStep.step3.aboutMe && (
                        <textarea
                            placeholder="Tell us about yourself"
                            className="border p-2 mb-4 w-full"
                            value={aboutMe}
                            onChange={(e) => setAboutMe(e.target.value)}
                        />
                    )}
                    {componentsByStep.step3.birthday && (
                        <input
                            type="date"
                            className="border p-2 mb-4 w-full"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    )}
                    {componentsByStep.step3.address && (
                        <>
                            <input
                                type="text"
                                placeholder="Street"
                                className="border p-2 mb-2 w-full"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="City"
                                className="border p-2 mb-2 w-full"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="State"
                                className="border p-2 mb-2 w-full"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Zip Code"
                                className="border p-2 mb-4 w-full"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </>
                    )}
                    <button onClick={prevStep} className="bg-gray-300 text-black p-2 mr-2">
                        Back
                    </button>
                    <button onClick={handleFinalSubmit} className="bg-blue-500 text-white p-2">
                        Submit
                    </button>
                    {message && <p className="mt-4">{message}</p>}
                </div>

            )}
        </div>
    );
}