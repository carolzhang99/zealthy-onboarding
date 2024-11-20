import { useEffect, useState } from 'react';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Admin() {

    const [componentsByStep, setComponentsByStep] = useState({
        step2: { aboutMe: true, birthday: true, address: false },
        step3: { aboutMe: false, birthday: false, address: true },
    });
    const [message, setMessage] = useState('');

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

    const handleSave = async () => {
        try {
            await setDoc(doc(db, 'admin', 'config'), componentsByStep);
            setMessage('Configuration saved successfully!');
        } catch (error) {
            console.error('Error saving admin configuration:', error);
            setMessage(error.message);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Admin Panel</h1>

            <h2 className="text-xl mb-2">Step 2 Components</h2>
            {Object.keys(componentsByStep.step2).map((key) => (
                <label key={`step2-${key}`} className="block mb-2">
                    <input
                        type="checkbox"
                        checked={componentsByStep.step2[key]}
                        onChange={(e) => {
                            const isChecked = e.target.checked;

                            const enabledCount = Object.values(componentsByStep.step2).filter(Boolean).length;

                            if (!isChecked && enabledCount === 1) {
                                alert("Each step must have at least one component enabled!");
                                return;
                            }

                            setComponentsByStep({
                                ...componentsByStep,
                                step2: {
                                    ...componentsByStep.step2,
                                    [key]: isChecked,
                                },
                            });
                        }}
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
                        onChange={(e) => {
                            const isChecked = e.target.checked;

                            const enabledCount = Object.values(componentsByStep.step3).filter(Boolean).length;

                            if (!isChecked && enabledCount === 1) {
                                alert("Each step must have at least one component enabled!");
                                return;
                            }

                            setComponentsByStep({
                                ...componentsByStep,
                                step3: {
                                    ...componentsByStep.step3,
                                    [key]: isChecked,
                                },
                            });
                        }}
                    />
                    {key}
                </label>
            ))}

            <button onClick={handleSave} className="bg-blue-500 text-white p-2 mt-4">
                Save Configuration
            </button>

            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}