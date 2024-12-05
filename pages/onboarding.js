import { useEffect, useState } from 'react';
import { fetchOnboardingConfig, saveUserProfile, fetchUserProfile } from '../services/firebaseService';
import EmailPasswordComponent from '../components/onboarding/EmailPasswordComponent';
import AboutMeComponent from '../components/onboarding/AboutMeComponent';
import BirthdayComponent from '../components/onboarding/BirthdayComponent';
import AddressComponent from '../components/onboarding/AddressComponent';
import Nav from '../components/Nav';

export default function Onboarding() {
    const [steps, setSteps] = useState([]); // Steps configuration
    const [currentStep, setCurrentStep] = useState(0); // Track the user's current step
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // Track loading state
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        aboutMe: '',
        birthday: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
        },
    });

    useEffect(() => {
        const loadConfigAndProgress = async () => {
            try {
                const config = await fetchOnboardingConfig();
                setSteps([
                    { name: 'Step 1', components: ['emailPassword'] },
                    ...config,
                ]);

                const savedProfile = await fetchUserProfile('user-id-placeholder');
                if (savedProfile) {
                    setUserData(savedProfile);
                    setCurrentStep(savedProfile.currentStep || 0);
                } else {
                    console.log('No user profile found. Using default data.');
                    setUserData({
                        email: '',
                        password: '',
                        aboutMe: '',
                        birthday: '',
                        address: {
                            street: '',
                            city: '',
                            state: '',
                            zip: '',
                        },
                    });
                    setCurrentStep(0);
                }
            } catch (error) {
                console.error('Error loading onboarding configuration or user data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadConfigAndProgress();
    }, []);


    const handlePrev = () => setCurrentStep((prev) => Math.max(0, prev - 1));

    const validateStep = () => {
        const currentStepConfig = steps[currentStep];
        if (!currentStepConfig || !currentStepConfig.components) {
            console.error('Invalid step configuration:', currentStepConfig);
            setMessage('An error occurred. Please try again later.');
            return false;
        }

        for (const component of currentStepConfig.components) {
            if (component === 'emailPassword') {
                if (!userData.email) {
                    setMessage('Please fill in the email field.');
                    return false;
                }
                if (!userData.password || userData.password.length < 6) {
                    setMessage('Password must be at least 6 characters.');
                    return false;
                }
            } else if (component === 'address') {
                if (!userData.address.street || !userData.address.city || !userData.address.state || !userData.address.zip) {
                    setMessage('Please fill in all address fields.');
                    return false;
                }
            } else if (!userData[component]) {
                setMessage(`Please fill in the ${component} field.`);
                return false;
            }
        }

        setMessage('');
        return true;
    };

    const handleNext = async () => {
        if (validateStep()) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);

            await saveUserProfile('user-id-placeholder', { ...userData, currentStep: nextStep });
        }
    };

    const handleSubmit = async () => {
        await saveUserProfile('user-id-placeholder', { ...userData, completed: true });
        setMessage('Profile saved successfully!');
    };

    const renderComponent = (type) => {
        switch (type) {
            case 'emailPassword':
                return (
                    <EmailPasswordComponent
                        email={userData.email}
                        setEmail={(val) => setUserData({ ...userData, email: val })}
                        password={userData.password}
                        setPassword={(val) => setUserData({ ...userData, password: val })}
                    />
                );
            case 'aboutMe':
                return (
                    <AboutMeComponent
                        value={userData.aboutMe}
                        onChange={(val) => setUserData({ ...userData, aboutMe: val })}
                    />
                );
            case 'birthday':
                return (
                    <BirthdayComponent
                        value={userData.birthday}
                        onChange={(val) => setUserData({ ...userData, birthday: val })}
                    />
                );
            case 'address':
                return (
                    <AddressComponent
                        value={userData.address}
                        onChange={(val) => setUserData({ ...userData, address: val })}
                    />
                );
            default:
                return null;
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-8">
            <Nav />
            <h1 className="text-2xl font-bold mb-4">{steps[currentStep]?.name || 'Onboarding'}</h1>
            {steps[currentStep]?.components.map((component, index) => (
                <div key={`${component}-${index}`}>
                    {renderComponent(component)}
                </div>
            ))}      <div className="mt-4">
                {currentStep > 0 && (
                    <button onClick={handlePrev} className="bg-gray-300 text-black p-2 mr-2 rounded">
                        Back
                    </button>
                )}
                {currentStep === steps.length - 1 ? (
                    <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
                        Submit
                    </button>
                ) : (
                    <button onClick={handleNext} className="bg-blue-500 text-white p-2 rounded">
                        Next
                    </button>
                )}
            </div>
            {message && <p className="text-red-500 mt-4">{message}</p>}
        </div>
    );
}

const defaultSteps = [
    { name: 'Step 1', components: ['emailPassword'] },
    { name: 'Step 2', components: ['aboutMe', 'birthday'] },
    { name: 'Step 3', components: ['address'] },
];