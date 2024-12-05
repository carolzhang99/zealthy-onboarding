import { useEffect, useState } from 'react';
import { fetchOnboardingConfig, saveOnboardingConfig } from '../services/firebaseService';
import Nav from '../components/Nav';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Admin() {
    const [componentsByStep, setComponentsByStep] = useState({
        step2: { aboutMe: true, birthday: true, address: false },
        step3: { aboutMe: false, birthday: false, address: true },
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadConfig = async () => {
            const config = await fetchOnboardingConfig();
            if (config?.componentsByStep) {
                setComponentsByStep(config.componentsByStep);
            }
        };
        loadConfig();
    }, []);

    const handleToggleComponent = (step, component) => {
        const otherStep = step === 'step2' ? 'step3' : 'step2';

        // Prevent enabling the same component in both steps
        if (
            componentsByStep[otherStep][component] &&
            !componentsByStep[step][component]
        ) {
            alert(`The ${component} component is already assigned to ${otherStep}.`);
            return;
        }

        const updatedComponentsByStep = {
            ...componentsByStep,
            [step]: {
                ...componentsByStep[step],
                [component]: !componentsByStep[step][component],
            },
        };

        // Ensure at least one component remains enabled in the current step
        const enabledCount = Object.values(updatedComponentsByStep[step]).filter(Boolean).length;
        if (enabledCount === 0) {
            alert('Each step must have at least one component enabled!');
            return;
        }

        setComponentsByStep(updatedComponentsByStep);
    };

    const handleSave = async () => {
        try {
          await setDoc(doc(db, 'admin', 'config'), componentsByStep);
          setMessage('Configuration saved successfully!');
          console.log('Saved configuration to Firestore:', componentsByStep);
        } catch (error) {
          console.error('Error saving configuration:', error);
          setMessage('Error saving configuration. Please try again.');
        }
      };

    return (
        <div className="p-8">
            <Nav />
            <h1 className="text-2xl mb-4">Admin Panel</h1>

            <h2 className="text-xl mb-2">Step 2 Components</h2>
            {Object.keys(componentsByStep.step2).map((key) => (
                <label key={`step2-${key}`} className="block mb-2">
                    <input
                        type="checkbox"
                        checked={componentsByStep.step2[key]}
                        onChange={() => handleToggleComponent('step2', key)}
                    />
                    {key}
                </label>
            ))}

            <h2 className="text-xl mt-4 mb-2">Step 3 Components</h2>
            {Object.keys(componentsByStep.step3).map((key) => (
                <label key={`step3-${key}`} className="block mb-2">
                    <input
                        type="checkbox"
                        checked={componentsByStep.step3[key]}
                        onChange={() => handleToggleComponent('step3', key)}
                    />
                    {key}
                </label>
            ))}

            <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-700 transition"
            >
                Save Configuration
            </button>

            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
}
